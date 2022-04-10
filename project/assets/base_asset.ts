export abstract class BaseAsset {
  abstract resPath: string

  abstract fsPath: string

  abstract tsType(): string | null
}

export function isBaseAsset(input?: object): input is BaseAsset {
  return Boolean(input) && input instanceof BaseAsset
}
