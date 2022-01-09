import chalk from "chalk"

import { ParsedArgs } from "../parse_args"
import { getInstalledVersion } from "../check_version"

export function showLoadingMessage(
  msg: string,
  args: ParsedArgs,
  done = false
) {
  if (!args.debug) console.clear()
  console.info(
    `${chalk.whiteBright("ts2gd v" + getInstalledVersion())}: ${
      msg + (done ? "" : "...")
    }`
  )
}
