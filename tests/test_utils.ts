import path from "path"

export function mockProjectPath(...segments: string[]): string {
  return path.join(process.cwd(), "mockProject/", ...segments)
}
