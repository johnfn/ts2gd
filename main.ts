// Immediately necessary:
// TODO: load(.tscn) into a scene of the appropriate type!
// TODO: Relative node paths as well as absolute ones.
// TODO: Figure out callables - not just strings!
// TODO: Figure out connect - again, not strings!
// TODO: Translate .add() .sub() etc
// TODO: When i migrate to only using compiled gdscripts, adjust the imports() appropriately to figure out where
// the compiled versions are.

// TODO: extends must come before everything else, including enum declarations.

// Would be nice:
// TODO: add a way to install ts2gd as a global command
// TODO: add a way to use ts2gd via installer rather than command line
// TODO: Whether to hide away constants into enums or not could be parameterizeable.
//   * Some sort of error if an autoload class is not entirely static.
// TODO:yield(this.get_tree(), "idle_frame"); could autocomplete idle_frame? 
//        - yep, it's possible: just get all the signals on the object.
// TODO: Fancy language features
// * TODO: destructuring
// * TODO: ...
// TODO: Handle the thing where if u never yield its never a coroutine
// TODO: Map, filter, NOT reduce.
// TODO: int/float classes - ugh, but then you can't add them
// TODO: Skip compiled/
//  * maybe number for int; bigint for float.

// TODO: ../ node paths

// TODO: Assumes that filename === classname
// TODO: handle actions
// TODO: get_nodes_in_group could at least be a Node[]
//         might be able to parse scenes to get a better type
// TODO: Onready vs nonready

// TODO: Handle adding new files.
// TODO: Handle deleting old files.
// TODO: Random newlines at beginning of file.

// TODO: mark unused variables with _ to avoid warnings
// TODO: Rewrite the code so you dont even need to add autoload classes bc they just get auto registered.
// TODO: Is there a better way to do Dictionary, with strongly typed k/v?
// TODO: Sourcemaps???

import ts, { ClassDeclaration, HeritageClause, SourceFile, SyntaxKind, ConstructorDeclaration, PropertyDeclaration, CallExpression, PropertyAccessExpression, ThisExpression, Identifier, StringLiteral, Block, ExpressionStatement, SuperExpression, MethodDeclaration, ParameterDeclaration, TypeReference, TypeReferenceNode, IfStatement, BinaryExpression, ImportDeclaration, LiteralToken, NumericLiteral, VariableStatement, ForStatement, VariableDeclarationList, VariableDeclaration, PostfixUnaryExpression, AsExpression, ForOfStatement, BreakStatement, PrefixUnaryExpression, ReturnStatement, ElementAccessExpression, YieldExpression, ParenthesizedExpression, NewExpression, ClassExpression, ForInStatement, WhileStatement, EnumDeclaration, SwitchStatement, SignatureKind, ArrayLiteralExpression, classicNameResolver, parseJsonSourceFileConfigFileContent, ObjectLiteralExpression } from "typescript";
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
    compile(sourcePath, project);
  }
}

function compile(sourcePath: string, project: TsGdProject): void {
  const source = watchProgram.getProgram().getSourceFile(sourcePath);

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

  const destPath = path.join(srcDestPath, sourcePath.slice(srcRootPath.length, -path.extname(sourcePath).length) + ".gd");

  fs.mkdirSync(path.dirname(destPath), { recursive: true })
  fs.writeFileSync(destPath, gdSource);

  console.log('[write]:', destPath);
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
${project.assets.map(({ assetPath, fsPath }) => `  '${assetPath}': ${(() => {
    if (assetPath.endsWith('.gd')) {
      return assetPath.slice(assetPath.lastIndexOf('/') + 1, -'.gd'.length);
    } else if (assetPath.endsWith('.tscn')) {
      const scene = project.scenes.find(scene => scene.fsPath === fsPath)!;

      return scene.rootNode.script?.type ?? scene.rootNode.type;
    } else if (assetPath.endsWith('.ttf')) {
      return 'DynamicFontData';
    }
  })()
    }`).join(',\n')}
}

declare type AssetPath = keyof AssetType;
  `;

  const destPath = path.join(tsgdPath, "godot_defs", '@asset_paths.d.ts')
  fs.writeFileSync(destPath, assetFileContents);
}

function getClassNameFromResPath(resPath: string): string {
  return resPath.slice(resPath.lastIndexOf('/') + 1, resPath.lastIndexOf('.'));
}

async function buildNodePathsType(sceneFsPath: string, project: TsGdProject) {
  const scene = project.scenes.find(scene => scene.fsPath === sceneFsPath)!;
  // TODO: Assumes that filename === classname
  const classesInScene = scene.resources.map(res => ({
    resPath: res.resPath,
    className: getClassNameFromResPath(res.resPath),
  }));
  const nodesInScene = scene.nodes;

  const allClasses = [
    ...classesInScene,
    ...(project.mainScene.fsPath === sceneFsPath ? project.autoloads : []),
  ];

  for (const { resPath, className } of allClasses) {
    const isAutoload = project.autoloads.find(a => a.resPath === resPath);

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

    if (isAutoload) {
      assetFileContents += `
declare module './../${tsgdJson.source}/${className}' {
  namespace ${className} {
    export function get_node<T extends keyof NodePathToType${className}>(path: T): NodePathToType${className}[T];
  }
}`

    } else {
      assetFileContents += `
declare module './../${tsgdJson.source}/${className}' {
  interface ${className} {
    get_node<T extends keyof NodePathToType${className}>(path: T): NodePathToType${className}[T];
  }
}`
    }

    const destPath = path.join(tsgdPath, "godot_defs", `@node_paths_${className}.d.ts`)
    fs.writeFileSync(destPath, assetFileContents);
  }

}

export type TsGdProject = {
  sourceFilePaths: string[];
  scenes: Scene[];
  autoloads: { className: string; resPath: string }[];
  assets: { assetPath: string; fsPath: string }[];
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

  let assets = allFiles
    .filter(f => f.endsWith('.tscn') || f.endsWith('.gd') || f.endsWith('.ttf'))
    .map(f => ({
      assetPath: "res://" + f.slice(tsgdPath.length + 1),
      fsPath: f,
      className: f.slice(tsgdPath.length + 1, tsgdPath.lastIndexOf('.')),
    }));

  let scenePaths = allFiles.filter(f => f.endsWith('.tscn'));

  return {
    sourceFilePaths: watchProgram.getProgram().getSourceFiles().map(source => source.fileName).filter(path => !path.endsWith('.d.ts')),
    scenes: scenePaths.map(scenePath => parseScene(scenePath)),
    assets,
    autoloads: getAutoloadFiles(),
    mainScene: getMainScene(),
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
};

type Scene = {
  nodes: Node[];
  fsPath: string;
  resPath: string;
  resources: { resPath: string; fsPath: string; type: string; id: number }[];
  rootNode: Node;
}

const parseScene = (fsPath: string): Scene => {
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

    return {
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

  for (const path of project.sourceFilePaths) {
    compile(path, project);

    fs.watchFile(path, { persistent: true, interval: 250 }, (curr, prev) => {
      if (+curr.mtime <= +prev.mtime) {
        return;
      }

      compile(path, project);
    });
  }
};

main();