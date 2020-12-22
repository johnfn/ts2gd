import { TsGdProject } from "./ts_utils";
import path from 'path';
import fs from 'fs';

export const buildSceneImports = (project: TsGdProject) => {
  let result = ``

  for (const scene of project.scenes) {
    const sceneScript = scene.rootNode.getScript(project.scenes);

    if (!sceneScript) { continue; }
    const sourceFile = project.sourceFiles.find(sf => sf.gdPath === sceneScript.fsPath);

    if (!sourceFile) { continue }

    result += `export const ${ path.basename(scene.fsPath, '.tscn')}Tscn: PackedScene<import('${sourceFile.tsFullPath.slice(0, -'.ts'.length)}').${ sourceFile.className }>\n`;
  }

  const destPath = path.join(project.godotDefsPath, "@scenes.d.ts")

  fs.writeFileSync(destPath, result);
}
