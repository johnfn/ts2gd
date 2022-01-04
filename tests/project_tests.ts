import { main } from "../main"

export async function test() {
  return main({
    buildLibraries: false,
    help: false,
    init: false,
    debug: false,
    printVersion: false,
    buildOnly: false,
  })
}

void (async () => {
  try {
    await test()
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()
