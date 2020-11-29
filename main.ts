import ts from "typescript";
import fs from 'fs';
import path from 'path';

import * as process from 'process'
import { generateGodotLibraryDefinitions } from "./generate_library";
import { parseNodeToString } from "./parse_node";

const inputPath = process.argv[2];
let tsgdPathWithFilename: string;
let tsgdPath: string;
let project: TsGdProject; // needs to be initialized async

if (!inputPath) {
  console.error("Please specify a tsgd.json file on the command line. Thanks!");
  process.exit(0);
}

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
const srcRootPath = path.join(tsgdPath, tsgdJson.source);
const srcDestPath = path.join(tsgdPath, tsgdJson.destination);

const configPath = ts.findConfigFile(path.dirname(tsgdPathWithFilename), ts.sys.fileExists, "tsconfig.json");

if (!configPath) {
  console.error("tsconfig.json must be in the same folder as tsgd.json. Thanks!");
  process.exit(0);
}

const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: path => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine,
};

function reportDiagnostic(diagnostic: ts.Diagnostic) {
  console.error("Error", diagnostic.code, ":", ts.flattenDiagnosticMessageText(diagnostic.messageText, formatHost.getNewLine()));
  console.log(diagnostic.file?.fileName, diagnostic.start)
}

export let program: ts.Program;

const host = ts.createWatchCompilerHost(configPath, {}, ts.sys, ts.createEmitAndSemanticDiagnosticsBuilderProgram, reportDiagnostic, reportWatchStatusChanged)
const watchProgram = ts.createWatchProgram(host);
program = watchProgram.getProgram().getProgram(); // This API i tell you...
const configFile = ts.readJsonConfigFile(configPath, ts.sys.readFile);
const opt = ts.parseConfigFileTextToJson(configPath, configFile.text);

opt.config.useCaseSensitiveFileNames = false;

function reportWatchStatusChanged(diagnostic: ts.Diagnostic, newLine: string) {
  if (!program) { return; }

  const sourcePath = diagnostic.file?.fileName;

  if (sourcePath && !sourcePath.endsWith('.d.ts') && project) {
    compile(project.sourceFiles.find(file => file.tsFullPath === sourcePath)!, project);
  }
}

function compile(sourceFile: ParsedSourceFile, project: TsGdProject): void {
  const source = watchProgram.getProgram().getSourceFile(sourceFile.tsRelativePath);

  if (!source) {
    console.error('invalid path to source file!');
    process.exit();
  }

  const gdSource = parseNodeToString(
    source, {
    indent: "",
    isConstructor: false,
    isAutoload: false,
    mostRecentControlStructureIsSwitch: false,
  });

  fs.mkdirSync(path.dirname(sourceFile.gdPath), { recursive: true })
  fs.writeFileSync(sourceFile.gdPath, gdSource);

  console.log('[write]:', sourceFile.gdPath);
}

async function* walkCo(dir: string): AsyncGenerator<string, undefined, undefined> {
  for await (const entry of await fs.promises.opendir(dir)) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      yield* walkCo(entryPath);
    } else if (entry.isFile()) {
      yield entryPath;
    }
  }

  return;
}

async function walk(dir: string): Promise<string[]> {
  const result: string[] = [];

  for await (const f of walkCo(dir)) {
    result.push(f);
  }

  return result;
}

async function buildAssetPathsType(project: TsGdProject) {
  const assetFileContents = `
declare type AssetType = {
${project.assets.map(({ resPath, fsPath, className }) => `  '${resPath}': ${className}`).join(',\n')}
}

declare type AssetPath = keyof AssetType;
  `;

  const destPath = path.join(tsgdPath, "godot_defs", '@asset_paths.d.ts')
  fs.writeFileSync(destPath, assetFileContents);
}

async function buildNodePathsType(sceneFsPath: string, project: TsGdProject) {
  const scene = project.scenes.find(scene => scene.fsPath === sceneFsPath)!;
  const classesInScene = scene.resources.filter(res => res.resPath.endsWith('.gd')).map(res => {
    let result = project.sourceFiles.find(source => source.resPath === res.resPath);

    if (!result) {
      console.log('cant find class for', res.resPath, 'in', sceneFsPath);
      return undefined!;
    }

    return result;
  });

  const nodesInScene = scene.nodes;

  const allClasses = [
    ...classesInScene,
    ...(project.mainScene.fsPath === sceneFsPath ? project.sourceFiles.filter(source => source.isAutoload) : []),
  ];

  for (const { resPath, className, isAutoload } of allClasses) {
    let assetFileContents = `
declare type NodePathToType${className} = {`

    for (const { scenePath, type, script } of nodesInScene) {
      if (script) {
        let tsPath = script.fsPath.slice(0, script.fsPath.lastIndexOf('/')) + "/src/" + script.type;

        assetFileContents += `  '${scenePath}': import("${tsPath}").${script.type},\n`;
      } else {
        assetFileContents += `  '${scenePath}': ${type},\n`;
      }
    }
    assetFileContents += '}\n\n';
    assetFileContents += `import ${className} from './../${tsgdJson.source}/${className}';
`;

    assetFileContents += `
declare module './../${tsgdJson.source}/${className}' {
  interface ${className} {
    get_node<T extends keyof NodePathToType${className}>(path: T): NodePathToType${className}[T];
  }
}`

    const destPath = path.join(tsgdPath, "godot_defs", `@node_paths_${className}.d.ts`)
    fs.writeFileSync(destPath, assetFileContents);
  }

}

export type ParsedSourceFile = {
  resPath: string;
  gdPath: string;
  className: string;
  tsFullPath: string;
  tsRelativePath: string;
  tsFileContent: string;
  isAutoload: boolean;
};

export type TsGdProject = {
  sourceFiles: ParsedSourceFile[];
  scenes: ParsedScene[];
  assets: { resPath: string; fsPath: string; className: string; }[];
  mainScene: { resPath: string; fsPath: string };
}

const getAutoloadFiles = () => {
  const projectFile = fs.readFileSync(path.join(tsgdPath, "project.godot"), "utf-8");
  const lines = projectFile.split('\n');

  let inAutoloadSection = false;
  let results: { className: string; resPath: string }[] = [];

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
          className,
          resPath: `res://${className}.gd`,
        });
      }
    }
  }

  return results;
};

const resPathToFsPath = (resPath: string) => {
  return path.join(tsgdPath, resPath.slice('res://'.length));
};
const fsPathToResPath = (fsPath: string) => {
  return "res://" + fsPath.slice(tsgdPath.length + 1);
};

const getMainScene = () => {
  const projectFile = fs.readFileSync(path.join(tsgdPath, "project.godot"), "utf-8");
  const re = /run\/main_scene="([^"]+)"/;

  const match = re.exec(projectFile);

  if (match) {
    let resPath = match[1];
    let fsPath = resPathToFsPath(resPath);

    return { resPath, fsPath };
  } else {
    throw new Error("No main scene found in project.godot!");
  }
};

const getProjectProperties = async (): Promise<TsGdProject> => {
  const allFiles = await walk(tsgdPath);
  const autoloads = getAutoloadFiles();

  let scenePaths = allFiles.filter(f => f.endsWith('.tscn'));

  const sourceFilePaths = watchProgram.getProgram().getSourceFiles().map(source => source.fileName).filter(path => !path.endsWith('.d.ts') && !path.includes('/test/'));
  const sourceFiles = sourceFilePaths.map(sourceFilePath => {
    let tsFileContent = fs.readFileSync(sourceFilePath, 'utf-8');
    // TODO: this is a bit brittle
    let classNameMatch = [...tsFileContent.matchAll(/^(?:export )?class ([^ ]*?) /mg)];
    let className = "";
    let gdPath = path.join(srcDestPath, sourceFilePath.slice(srcRootPath.length, -path.extname(sourceFilePath).length) + ".gd");
    let resPath = fsPathToResPath(gdPath);

    if (classNameMatch && classNameMatch.length === 1) {
      className = classNameMatch[0][1];
    } else {
      if (classNameMatch.length > 1) {
        throw new Error(`Found too many exported classes in ${sourceFilePath}`);
      } else {
        throw new Error(`Couldn't find an exported class in ${sourceFilePath}`);
      }
    }

    const result: ParsedSourceFile = {
      className,
      tsFileContent: '',
      resPath: fsPathToResPath(gdPath),
      tsFullPath: sourceFilePath,
      tsRelativePath: sourceFilePath,
      gdPath,
      isAutoload: !!autoloads.find(autoload => autoload.resPath === resPath),
    };

    return result;
  });

  let scenes = scenePaths.map(scenePath => parseScene(scenePath));

  let assets = allFiles
    .filter(f => f.endsWith('.tscn') || f.endsWith('.gd') || f.endsWith('.ttf'))
    .map(fsPath => {
      let resPath = "res://" + fsPath.slice(tsgdPath.length + 1);
      let className: string;

      if (resPath.endsWith('.gd')) {
        const sourceFile = sourceFiles.find(file => file.resPath === resPath);

        if (!sourceFile) {
          throw new Error(`Couldn't find source file for ${resPath}`);
        }

        className = `import('${sourceFile.tsFullPath.slice(0, -'.ts'.length)}').${sourceFile.className}`;
      } else if (resPath.endsWith('.tscn')) {
        const scene = scenes.find(scene => scene.fsPath === fsPath)!;

        if (scene.rootNode.script) {
          let sourceFile = sourceFiles.find(file => file.resPath === scene.rootNode.script?.resPath);

          className = `PackedScene<import('${sourceFile?.tsFullPath.slice(0, -'.ts'.length)}').${sourceFile?.className}>`;
        } else {
          className = `PackedScene<${scene.rootNode.type}>`;
        }
      } else if (resPath.endsWith('.ttf')) {
        className = 'DynamicFontData';
      } else {
        throw new Error("unhandled asset type! " + resPath);
      }

      return {
        resPath: "res://" + fsPath.slice(tsgdPath.length + 1),
        fsPath,
        className,
      };
    });

  return {
    scenes,
    assets,
    mainScene: getMainScene(),
    sourceFiles,
  };
};

type Node = {
  name: string;
  type: string;
  isRoot: boolean;
  scenePath: string;
  script?: { resPath: string; type: string; id: number; fsPath: string; };
  parent?: string;
  groups?: string;
  rest: string;
};

type ParsedScene = {
  nodes: Node[];
  fsPath: string;
  resPath: string;
  resources: { resPath: string; fsPath: string; type: string; id: number }[];
  rootNode: Node;
}

const parseScene = (fsPath: string): ParsedScene => {
  const content = fs.readFileSync(fsPath, 'utf-8');
  const extResourceRe = /^\[ext_resource path="(.*)" type="(.*)" id=([0-9]+)\]$/gm;

  const extResources = [...content.matchAll(extResourceRe)].map(match => ({
    resPath: match[1],
    fsPath: resPathToFsPath(match[1]),
    // TODO: Assumes that filename === classname
    type: match[1].slice(match[1].lastIndexOf('/') + 1, match[1].lastIndexOf('.')),
    id: Number(match[3]),
  }))

  const nodeRe = /^\[node name="(?<name>[^"]+)" type="(?<type>[^"]+)"( parent="(?<parent>[^"]+)")?( groups=\[(?<groups>[^\]]+)\])?\](?<rest>[^]*?)\n\n/gm;
  const allNodes: Node[] = [...content.matchAll(nodeRe)].map((match) => {
    const groups = match.groups!;
    const scriptRe = /^script = ExtResource\( ([0-9]+) \)$/gm;
    const scriptReResult = scriptRe.exec(groups.rest);
    const script = scriptReResult ? extResources.find(resource => resource.id === Number(scriptReResult[1])) : undefined;

    let node: Node = {
      name: groups.name,
      type: groups.type,
      isRoot: !groups.parent,
      // script: groups.script,
      script: script,
      parent: groups.parent,
      groups: groups.groups,
      scenePath: '',
      rest: groups.rest,
    }

    return node;
  });

  const rootNode = allNodes.find(node => !node.parent)!;

  for (const node of allNodes) {
    let path = "";

    if (node.parent === ".") {
      path = '/root/' + rootNode.name + "/" + node.name;
    } else if (node.parent === undefined) {
      path = '/root/' + rootNode.name;
    } else {
      path = '/root/' + rootNode.name + "/" + node.parent + "/" + node.name;
    }

    node.scenePath = path;
  }

  return {
    nodes: allNodes,
    resources: extResources,
    fsPath,
    resPath: fsPathToResPath(fsPath),
    rootNode: allNodes.find(node => !node.parent)!,
  };
};

const main = async () => {
  project = await getProjectProperties();

  buildAssetPathsType(project);

  for (const scene of project.scenes) {
    buildNodePathsType(scene.fsPath, project);
  }

  generateGodotLibraryDefinitions(tsgdPath);

  for (const sourceFile of project.sourceFiles) {
    compile(sourceFile, project);

    fs.watchFile(sourceFile.tsFullPath, { persistent: true, interval: 250 }, (curr, prev) => {
      if (+curr.mtime <= +prev.mtime) {
        return;
      }

      compile(sourceFile, project);
    });
  }
};

main();