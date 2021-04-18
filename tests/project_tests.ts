import { main } from "../main"

export const test = () => {
  main({
    buildLibraries: false,
    help: false,
    init: false,
    debug: false,
  })
}

test()
