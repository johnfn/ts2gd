export abstract class BaseAsset {
  abstract resPath: string

  abstract fsPath: string

  abstract tsImportName(): string
}
