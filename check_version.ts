import https from "https"

import chalk from "chalk"
import pkginfo from "pkginfo"

pkginfo(module, "version")

export function getInstalledVersion() {
  return module.exports.version as string
}

export const checkVersionAsync = async () => {
  const version = getInstalledVersion()
  console.info(chalk.whiteBright("ts2gd", "v" + version))

  const options = {
    hostname: "registry.npmjs.org",
    path: "/ts2gd",
  }

  let response = ""

  await new Promise<void>((resolve) => {
    const req = https.request(options, (res) => {
      res.on("data", (d: Buffer) => {
        response += d
      })

      res.on("end", () => {
        resolve()
      })
    })

    req.end()
  })

  const versionNameDate: [string, Date][] = Object.entries(
    JSON.parse(response).time as { [key: string]: string }
  )
    .sort(
      (first: [string, string], second: [string, string]) =>
        new Date(second[1]).getTime() - new Date(first[1]).getTime()
    )
    .map(([a, b]) => [a, new Date(b)])

  let latestPublishedVersion = ""
  for (const [versionName, date] of versionNameDate) {
    if (versionName === "modified") {
      continue
    }

    latestPublishedVersion = versionName
    break
  }

  if (latestPublishedVersion !== version) {
    console.info(``)
    console.info(
      `There is a new version (${latestPublishedVersion}) of ts2gd. (You have ${version}.)`
    )
    console.info(`Install it with`)
    console.info(``)
    console.info(chalk.blue(`npm install --global ts2gd`))
  }
}
