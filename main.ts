// TODO: change_scene should accept a AssetPath filtered on tscn
// TODO: Move get/set to the same hoisting thing - and then classes - and then functions.
// TODO: Modulo expects int instead of float and will error if it sees the wrong one...
// TODO: sanitize variable and function name generation
// TODO: There's a bug where cleaning up self. can cause variable name collisions.
// TODO: Clean up TS errors and output - only output if something is
// seriously wrong!
// TODO: this.blah.add() doesnt parse right
// TODO: Because I consider Dictionary = {}, it considers everything
// to be a Dictionary... even Node2D
// TODO: SUbtracting vectors gives a number for some reason
// TODO: Workout SpontaneousDialog.instance()
// TODO: Handle the case when a class exists in multiple scenes - probably just error at this point.
// TODO: Mark things as onready with @onready

// TODO: You can have _ready() and constructor
// TODO: _prefixed names could possibly clash
// TODO: Discarded return values from function calls?
// TODO: The whole Class() thing is clearly possible - see String() for
//       an example!
// TODO: I don't know how to do { [key: Vector2]: value }. except maybe not 
//       using {}, which is kind of lame. 
// TODO: Node2D has a size() property.
// TODO: tile_get_shapes is any[] when it shouldn't be
// TODO: Use chokidar rather than my ... thing.
// TODO: Labeled break??? See SpontaneousDialog.ts say() for an example
// TODO: Use AST transformers?

import ts from "typescript";
import fs from 'fs';
import path from 'path';

import * as process from 'process'
import { generateGodotLibraryDefinitions } from "./generate_library";
import { parseNode } from "./parse_node";
import { buildNodePathsTypeForScript } from "./build_paths_for_node";
import { GodotNode, ParsedScene, TsGdProject } from "./ts_utils";
import { buildSceneImports } from "./build_scene_imports";
import { TsGdProjectClass } from "./project";

let verbose = false;
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
  const errorMessage = ts.flattenDiagnosticMessageText(diagnostic.messageText, formatHost.getNewLine());

  // Quiet the errors which are not really errors.

  if (errorMessage.match(/Operator '[+\-*/]=?' cannot be applied to types 'Vector[23]' and '(Vector[23]|number)'/)) {
    return;
  }

  if (errorMessage.match(/The left-hand side of an 'in' expression must be of type/)) {
    return;
  }

  // console.error("Error", diagnostic.code, ":", errorMessage);
  // console.log(diagnostic.file?.fileName, diagnostic.start);
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
  const source = watchProgram.getProgram().getSourceFile(sourceFile.tsFullPath);

  if (!source) {
    console.error('invalid path to source file!');
    process.exit();
  }

  let id = 0;
  const genUniqueName = () => `func${++id}`;

  const result = parseNode(
    source, {
    indent: "",
    isConstructor: false,
    genUniqueName,
    project,
    mostRecentControlStructureIsSwitch: false,
    isAutoload: false,
    program: program,
    usages: new Map(),
  });

  fs.mkdirSync(path.dirname(sourceFile.gdPath), { recursive: true })
  fs.writeFileSync(sourceFile.gdPath, result.content);

  for (const { content, name } of result.enums ?? []) {
    fs.writeFileSync(sourceFile.gdPath.slice(0, -'.gd'.length) + '_' + name + ".gd", content);
  }

  if (verbose) console.log('[write]:', sourceFile.gdPath);
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

  const destPath = path.join(project.godotDefsPath, '@asset_paths.d.ts')
  fs.writeFileSync(destPath, assetFileContents);
}

async function buildNodePathsType(sceneFsPath: string, project: TsGdProject) {
  const scene = project.scenes.find(scene => scene.fsPath === sceneFsPath)!;
  const classesInScene = scene.resources.filter(res => res.resPath.endsWith('.gd')).map(res => {
    let result = project.sourceFiles.find(source => source.resPath === res.resPath);

    if (!result) {
      console.error('cant find class for', res.resPath, 'in', sceneFsPath);
      return undefined!;
    }

    return result;
  });

  const nodesInScene = scene.nodes;

  const allClassesInScene = [
    ...classesInScene,
    ...(project.mainScene.fsPath === sceneFsPath ? project.sourceFiles.filter(source => source.isAutoload) : []),
  ];

  // Scene Dialog
  // - Node Graphic
  //   - Node Text
  //   - Node Button

  for (const { resPath, className, tsFullPath, tsRelativePath } of allClassesInScene) {
    let assetFileContents = `
declare type NodePathToType${className} = {\n`

    for (const node of nodesInScene) {
      const { scenePath, type } = node;

      const script = node.getScript(project.scenes);

      if (script) {
        const associatedClass = project.sourceFiles.find(source => {
          return source.className === script.type;
        })!;

        if (!associatedClass) {
          throw new Error(`\nCan't find the class for ${script.type}
  in scene ${sceneFsPath}
  script.type=${script.type}
`)
        }

        assetFileContents += `  '${scenePath}': import("${associatedClass.tsFullPath.slice(0, -'.ts'.length)}").${script.type},\n`;
      } else {
        assetFileContents += `  '${scenePath}': ${type},\n`;
      }
    }

    assetFileContents += '}\n\n';
    assetFileContents += `import ${className} from './../${tsgdJson.source}/${path.basename(tsFullPath).slice(0, -'.ts'.length)}';
`;

    assetFileContents += `
declare module './../${tsRelativePath.slice(0, -'.ts'.length)}' {
  interface ${className} {
    get_node<T extends keyof NodePathToType${className}>(path: T): NodePathToType${className}[T];
    connect<T extends SignalsOf<${className}>, U extends Node>(signal: T, node: U, method: keyof U): number;
  }
}`

    const destPath = path.join(project.godotDefsPath, `@node_paths_${className}.d.ts`)
    fs.writeFileSync(destPath, assetFileContents);
  }

}

export type ParsedSourceFile = {
  /** Path like res://src/MyFile.gd */
  resPath: string;

  /** Path like /Users/johnfn/MyGame/src/file.gd */
  gdPath: string;

  /** Name of the class declared in the source file */
  className: string;

  /** Path like /Users/johnfn/MyGame/src/file.ts */
  tsFullPath: string;

  /** Path like src/file.ts, relative to tsgd.json */
  tsRelativePath: string;

  /** Unused? */
  tsFileContent: string;

  /** Is this an autoload class? */
  isAutoload: boolean;
};

const getAutoloadFiles = () => {
  const projectFile = fs.readFileSync(path.join(tsgdPath, "project.godot"), "utf-8");
  const lines = projectFile.split('\n');

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

const getSourceFile = (sourceFilePath: string, autoloads: { resPath: string }[]) => {
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
    tsRelativePath: sourceFilePath.slice(tsgdPath.length + 1),
    gdPath,
    isAutoload: !!autoloads.find(autoload => autoload.resPath === resPath),
  };

  return result;
};

const getProjectProperties = async (): Promise<TsGdProject> => {
  const allFiles = await walk(tsgdPath);
  const autoloads = getAutoloadFiles();

  let scenePaths = allFiles.filter(f => f.endsWith('.tscn'));

  const sourceFilePaths = watchProgram.getProgram().getSourceFiles().map(source => source.fileName).filter(path => !path.endsWith('.d.ts') && !path.includes('/test/'));
  const sourceFiles = sourceFilePaths.map(sourceFilePath => getSourceFile(sourceFilePath, autoloads));

  let scenes = scenePaths.map(scenePath => parseScene(scenePath));

  let assets = allFiles
    // TODO: A more resilient check to exclude compiled files.
    .filter(f => (f.endsWith('.tscn') || f.endsWith('.gd') || f.endsWith('.ttf')) && !f.includes("/compiled/"))
    .map(fsPath => {
      let resPath = "res://" + fsPath.slice(tsgdPath.length + 1);
      let className: string;

      if (resPath.endsWith('.gd')) {
        const sourceFile = sourceFiles.find(file => file.resPath === resPath);

        if (!sourceFile) {
          throw new Error(`Couldn't find source file for ${resPath}
  in ${fsPath}`);
        }

        className = `import('${sourceFile.tsFullPath.slice(0, -'.ts'.length)}').${sourceFile.className}`;
      } else if (resPath.endsWith('.tscn')) {
        const scene = scenes.find(scene => scene.fsPath === fsPath)!;

        const script = scene.rootNode.getScript(scenes);
        if (script) {
          let sourceFile = sourceFiles.find(file => file.resPath === script.resPath);

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
    godotDefsPath: path.join(tsgdPath, "godot_defs"),
    tsgdPath,
    tsgdPathWithFilename,
    sourcePath: tsgdJson.source,
    mainScene: getMainScene(),
    sourceFiles,
    autoloads,
  };
};

const parseScene = (fsPath: string): ParsedScene => {
  const content = fs.readFileSync(fsPath, 'utf-8');
  const extResourceRe = /^\[ext_resource path="(.*)" type="(.*)" id=([0-9]+)\]$/gm;

  const extResources = [...content.matchAll(extResourceRe)].map(match => ({
    resPath: match[1],
    fsPath: resPathToFsPath(match[1]),
    // TODO: Assumes that filename === classname
    type: match[1].slice(match[1].lastIndexOf('/') + 1, match[1].lastIndexOf('.')),
    id: Number(match[3]),
  }));

  const nodeRe = /^\[node name="(?<name>[^"]+)"( type="(?<type>[^"]+)")?( parent="(?<parent>[^"]+)")?( instance=ExtResource\( (?<instanceId>[0-9]+) \))?( groups=\[(?<groups>[^\]]+)\])?\](?<rest>[^]*?)(\n\n|\n$)/gm;
  const allNodes: GodotNode[] = [...content.matchAll(nodeRe)].map((match) => {
    const groups = match.groups!;
    const scriptRe = /^script = ExtResource\( ([0-9]+) \)$/gm;
    const scriptReResult = scriptRe.exec(groups.rest);
    const script = scriptReResult ? extResources.find(resource => resource.id === Number(scriptReResult[1])) : undefined;

    let instanceId = groups.instanceId ? Number(groups.instanceId) : undefined;

    if (instanceId) {
      const instanceResource = extResources.find(res => res.id === instanceId);
      const instancedSceneFsPath = instanceResource?.fsPath;

      return new GodotNode({
        name: groups.name,
        type: groups.type,
        isRoot: !groups.parent,
        // script: groups.script,
        script: script,
        parent: groups.parent,
        groups: groups.groups,
        scenePath: '',
        rest: groups.rest,
        instancedSceneFsPath: instancedSceneFsPath,
        // Will be filled in in the next pass
        children: [],
      });
    }

    return new GodotNode({
      name: groups.name,
      type: groups.type,
      isRoot: !groups.parent,
      // script: groups.script,
      script: script,
      parent: groups.parent,
      groups: groups.groups,
      scenePath: '',
      rest: groups.rest,

      // Will be filled in in the next pass
      children: [],
    });
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

  for (const node of allNodes) {
    // Find my children
    let pathThatAChildWouldHave = "";

    if (!node.parent) {
      pathThatAChildWouldHave = ".";
    } else {
      if (node.parent === ".") {
        pathThatAChildWouldHave = node.name
      } else {
        pathThatAChildWouldHave = node.parent + "/" + node.name
      }
    }

    node.children = allNodes.filter(node => node.parent === pathThatAChildWouldHave);
  }

  const result: ParsedScene = {
    nodes: allNodes,
    resources: extResources,
    fsPath,
    resPath: fsPathToResPath(fsPath),
    name: path.basename(fsPath, ".tscn"),
    rootNode: allNodes.find(node => !node.parent)!,
  };

  return result;
};

const main = async () => {
  const proj = new TsGdProjectClass(tsgdPath);

  const start = new Date().getTime();

  project = await getProjectProperties();

  buildAssetPathsType(project);

  for (const script of project.sourceFiles) {
    buildNodePathsTypeForScript(script, project);
  }

  buildSceneImports(project);
  generateGodotLibraryDefinitions(project);


  for (const sourceFile of project.sourceFiles) {
    compile(sourceFile, project);

    fs.watchFile(sourceFile.tsFullPath, { persistent: true, interval: 250 }, (curr, prev) => {
      if (+curr.mtime <= +prev.mtime) {
        return;
      }

      const compileTs = new Date().getTime();

      compile(sourceFile, project);

      console.log(`Compiled ${ sourceFile.tsRelativePath} in`, (new Date().getTime() - compileTs) / 1000 + 's')
    });
  }

  console.log('Initial compilation complete in', (new Date().getTime() - start) / 1000 + 's')
};

main();