import TsGdProject from "../project"

export type AssetConstructor<T extends BaseAsset> = new (
  fsPath: string,
  project: TsGdProject
) => T

export abstract class BaseAsset {
  /** e.g. /Users/johnfn/GodotProject/Scenes/my_scene.tscn */
  readonly fsPath: string

  /** e.g. res://Scenes/my_scene.tscn */
  readonly resPath: string

  /** e.g. import('/Users/johnfn/GodotGame/scripts/Enemy').Enemy */
  abstract tsType(): string | null

  /** file extensions which this asset class should be used for */
  static readonly extensions: string[] = []

  readonly project: TsGdProject
  constructor(fsPath: string, project: TsGdProject) {
    this.project = project
    this.fsPath = fsPath
    this.resPath = project.paths.fsPathToResPath(fsPath)
  }
}

export function isBaseAsset(input?: object): input is BaseAsset {
  return Boolean(input) && input instanceof BaseAsset
}
