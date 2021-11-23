import { TsGdReturn } from "../../errors"

export abstract class BaseAsset {
  abstract resPath: string

  abstract fsPath: string

  abstract tsType(): TsGdReturn<string> | null
}
