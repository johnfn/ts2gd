export type ParsedArgs = {
  help: boolean
  buildLibraries: boolean
  buildOnly: boolean
  printVersion: boolean
  init: boolean
  debug: boolean
  tsgdPath?: string
}

export const parseArgs = (): ParsedArgs => {
  const args = process.argv.slice(2)
  const flags: ParsedArgs = {
    help: false,
    buildLibraries: false,
    buildOnly: false,
    printVersion: false,
    init: false,
    debug: false,
  }

  for (const arg of args) {
    if (arg.trim().length === 0) {
      continue
    }

    if (arg === "--help") {
      flags.help = true
    } else if (arg === "--buildLibraries") {
      flags.buildLibraries = true
    } else if (arg === "--buildOnly") {
      flags.buildOnly = true
    } else if (arg === "--version") {
      flags.printVersion = true
    } else if (arg === "--debug") {
      flags.debug = true
    } else if (arg === "--init") {
      flags.init = true
    } else if (arg.includes("/") || arg.includes(".json")) {
      flags.tsgdPath = arg
    } else {
      flags.help = true
    }
  }

  return flags
}

export const printHelp = () => {
  console.info()
  console.info("Arguments:")
  console.info(
    "--buildLibraries    Force ts2gd to regenerate the TypeScript definitions for Godot."
  )
  console.info(
    "--buildOnly         Compiles the project to TypeScript and immediately exits."
  )
  console.info("--init              Initialize a ts2gd project here.")
  console.info("--help              Print this help.")
  console.info()
  console.info()
  console.info(
    "See README on GitHub for much more detail: https://github.com/johnfn/ts2gd"
  )
}
