import { main } from "../main"

export const test = () => {
  console.log("Hello world")

  main({
    buildLibraries: false,
    help: false,
    init: false,
  })
}

test()
