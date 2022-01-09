import { fixtures, mockProjectPath } from "../tests"

import { Paths } from "./paths"

describe("Project", () => {
  test("check instantiation", () => {
    const project = new Paths(fixtures.args)
    expect(project.rootPath).toBe(mockProjectPath())
  })
})
