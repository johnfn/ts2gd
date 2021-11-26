import { AssetSourceFile } from "../project/assets/asset_source_file"

export const createStubSourceFileAsset = (name: string): AssetSourceFile => {
  const sourceFileAsset: AssetSourceFile = {
    exportedTsClassName: () => "",
    fsPath: `${name}.ts`,
    name: name,
    isProjectAutoload: () => false,
    resPath: `res://compiled/${name}.gd`,
    gdPath: `/Users/johnfn/MyGame/compiled/${name}.gd`,
    tsRelativePath: "",
    isAutoload: () => false,
    gdContainingDirectory: "/Users/johnfn/MyGame/compiled/",
    destroy: () => {},
    project: {} as any,
    tsType: () => "",
    compile: async () => {},
    reload: () => {},
    ...({} as any),
  }

  return sourceFileAsset
}
