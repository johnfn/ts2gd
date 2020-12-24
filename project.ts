import chokidar from 'chokidar'
import path from 'path'
import fs from 'fs'

type Asset = 
  | { type: 'script'; path: string }
  | { type: 'scene'; path: string }
  | { type: 'project'; path: string }

export class TsGdProjectClass {
  /** Path to the tsgd.json file. */
  tsgdPath: string;

  /** Parsed tsgd.json file. */
  tsgdJson: TsGdJson;

  /** Parsed project.godot file. */
  godotProject: GodotProjectFile;

  /** Info about each source file. */
  sourceFiles: TsGdSourceFile[] = [];

  constructor(tsgdPath: string) {
    this.tsgdPath = tsgdPath;
    this.tsgdJson = new TsGdJson();
    this.godotProject = new GodotProjectFile(tsgdPath);

    this.monitor();
  }


  getAsset(path: string): Asset {
    if (path.endsWith('.ts')) {
      return { type: 'script', path };
    }

    if (path.endsWith('.tscn')) {
      return { type: 'scene', path };
    }

    if (path.endsWith('.godot')) {
      return { type: 'project', path };
    }

    throw new Error(`unhandled asset type: ${ path }`);
  }

  monitor() {
    chokidar.watch(this.tsgdPath, {
      ignored: (path: string, stats: any) => {
        if (!path.includes('.')) {
          return false;
        }

        if (path.includes('godot_defs')) {
          return true;
        }

        if (path.includes('.git')) {
          return true;
        }

        if (path.endsWith('.gd')) {
          return true;
        }

        if (path.endsWith('.ts')) {
          return false;
        }

        if (path.endsWith('.d.ts')) {
          return true;
        }

        if (path.endsWith('.tscn')) {
          return false;
        }

        if (path.endsWith('.godot')) {
          return false;
        }

        return true;
      }
    })
      .on('add', path => {
        this.add(this.getAsset(path));
      })
      .on('change', path => console.log("added", path))
      .on('unlink', path => console.log("deleted", path));
  }

  add(asset: Asset) {
    if (asset.type === "script") {
      this.sourceFiles.push(new TsGdSourceFile(asset.path, this));
    }

    console.log(this)
  }

  resPathToFsPath(resPath: string) {
    return path.join(this.tsgdPath, resPath.slice('res://'.length));
  }

  fsPathToResPath(fsPath: string) {
    return "res://" + fsPath.slice(this.tsgdPath.length + 1);
  }
}

export class TsGdJson {
  /** Where the .ts files live. */
  sourceTsPath: string;

  /** Where the compiled .gd files go. */
  destGdPath: string;

  constructor() {
    const inputPath = process.argv[2];

    if (!inputPath) {
      console.error("Please specify a tsgd.json file on the command line. Thanks!");
      process.exit(0);
    }

    let tsgdPathWithFilename: string;
    let tsgdPath: string;

    if (inputPath.startsWith("/")) {
      // absolute path

      tsgdPathWithFilename = inputPath;
    } else if (inputPath.startsWith('.')) {
      // some sort of relative path, so resolve it

      tsgdPathWithFilename = path.join(process.execPath, inputPath);
    } else {
      console.error("That appears to be an invalid path.");
      process.exit(0);
    }

    tsgdPath = path.dirname(tsgdPathWithFilename)

    const tsgdJson = JSON.parse(fs.readFileSync(tsgdPathWithFilename, 'utf-8'));

    this.sourceTsPath = path.join(tsgdPath, tsgdJson.source);
    this.destGdPath = path.join(tsgdPath, tsgdJson.destination);
  }
}

export class GodotProjectFile {
  projectFileContent: string;
  autoloads: { resPath: string }[];

  constructor(tsgdPath: string) {
    this.projectFileContent = fs.readFileSync(path.join(tsgdPath, "project.godot"), "utf-8");
    this.autoloads = this.getAutoloadFiles();
  }

  getAutoloadFiles() {
    const lines = this.projectFileContent.split('\n');

    let inAutoloadSection = false;
    let results: { resPath: string }[] = [];

    for (const line of lines) {
      if (line.trim() == '[autoload]') {
        inAutoloadSection = true;
        continue;
      }

      if (line.startsWith('[')) {
        inAutoloadSection = false;
      }

      if (inAutoloadSection) {
        const re = /.*="\*res:\/\/(.*).gd"/;
        const match = re.exec(line);

        if (match) {
          const [line, className] = match

          results.push({
            resPath: `res://${className}.gd`,
          });
        }
      }
    }

    return results;
  };
}

export class TsGdSourceFile {
  className: string;
  tsFileContent: string;
  resPath: string;
  tsFullPath: string;
  tsRelativePath: string;
  gdPath: string;
  isAutoload: boolean;

  constructor(sourceFilePath: string, project: TsGdProjectClass) {
    let tsFileContent = fs.readFileSync(sourceFilePath, 'utf-8');
    // TODO: this is a bit brittle
    let classNameMatch = [...tsFileContent.matchAll(/^(?:export )?class ([^ ]*?) /mg)];
    let className = "";
    let gdPath = path.join(project.tsgdJson.destGdPath, sourceFilePath.slice(project.tsgdJson.sourceTsPath.length, -path.extname(sourceFilePath).length) + ".gd");
    let resPath = project.fsPathToResPath(gdPath);

    if (classNameMatch && classNameMatch.length === 1) {
      className = classNameMatch[0][1];
    } else {
      if (classNameMatch.length > 1) {
        throw new Error(`Found too many exported classes in ${sourceFilePath}`);
      } else {
        throw new Error(`Couldn't find an exported class in ${sourceFilePath}`);
      }
    }

    this.className = className;
    this.tsFileContent = '';
    this.resPath = project.fsPathToResPath(gdPath);
    this.tsFullPath = sourceFilePath;
    this.tsRelativePath = sourceFilePath.slice(project.tsgdPath.length + 1);
    this.gdPath = gdPath;
    this.isAutoload = !!project.godotProject.autoloads.find(autoload => autoload.resPath === resPath);
  }
}