import { ParsedArgs } from "../parse_args"

import { mockProjectPath } from "./test_utils"

export const args: ParsedArgs = {
  buildLibraries: false,
  buildOnly: false,
  printVersion: false,
  debug: false,
  help: false,
  init: false,
  tsgdPath: mockProjectPath("ts2gd.json"),
}
