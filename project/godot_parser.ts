import fs from "fs"
import util from "util"

export const parseGodotConfigFile = (path: string) => {
  const file = fs.readFileSync(path, "utf-8")

  let index = 0
  const getchar = (expected?: string) => {
    let x: string

    x = file[index++]
    while (x.trim() === "") x = file[index++]

    if (expected) {
      if (expected !== x) {
        throw new Error(`Expected ${expected} but got ${x}`)
      }
    }

    return x
  }

  const getCharIncludingWhitespace = (expected?: string) => {
    let x = file[index++]

    if (expected) {
      if (expected !== x) {
        throw new Error(`Expected ${expected} but got ${x}`)
      }
    }

    return x
  }

  const peekchar = () => {
    let nextNonemptyIndex = index

    while (file[nextNonemptyIndex].trim() === "") {
      ++nextNonemptyIndex
    }

    return file[nextNonemptyIndex]
  }

  const peekcharIncludingWhitespace = () => {
    return file[index]
  }

  const eof = () => {
    let nextNonemptyIndex = index

    while (file[nextNonemptyIndex].trim() === "") {
      ++nextNonemptyIndex

      if (nextNonemptyIndex >= file.length) return true
    }

    return nextNonemptyIndex >= file.length
  }

  const getComment = () => {
    let comment = ""

    while (peekcharIncludingWhitespace() !== "\n") {
      comment += getCharIncludingWhitespace()
    }

    getCharIncludingWhitespace("\n")

    return comment
  }

  const getSection = () => {
    let section = ""

    while (peekcharIncludingWhitespace() !== "\n") {
      section += getCharIncludingWhitespace()
    }

    getCharIncludingWhitespace("\n")

    return section.slice(1, -1)
  }

  const getVariableName = () => {
    let variableName = ""

    while (peekchar() !== "=") {
      variableName += getchar()
    }

    return variableName
  }

  const getArray = (): any[] => {
    let result: any[] = []

    getchar("[")

    while (peekchar() !== "]") {
      result.push(getValue())

      if (peekchar() === ",") {
        getchar()
      }
    }

    getchar("]")

    return result
  }

  const getJson = () => {
    let result: { [key: string]: any } = {}

    getchar("{")

    while (peekchar() !== "}") {
      const key = getString()
      getchar(":")
      const value = getValue()

      result[key] = value

      if (peekchar() === ",") {
        getchar(",")
      }
    }

    getchar("}")

    return result
  }

  const getNumber = () => {
    let result = ""

    while (/[0-9.]/.exec(peekchar())) {
      result += getchar()
    }

    return Number(result)
  }

  const getString = () => {
    let result = ""

    getchar('"')

    while (peekchar() !== '"') {
      result += getchar()
    }

    getchar('"')

    return result
  }

  const getIdentifier = () => {
    let result = getchar() // note - implicitly advances past any initial whitespace

    while (/[a-zA-Z]/.exec(peekcharIncludingWhitespace())) {
      result += getchar()
    }

    if (result.trim() === "") {
      throw new Error("Expected identifier!")
    }

    return result
  }

  const getObject = (identifier: string) => {
    let result: {
      args: any[]
      identifier: string
    } = {
      args: [],
      identifier,
    }

    getchar("(")

    while (peekchar() !== ")") {
      const key = getValue()

      if (peekchar() === ",") {
        // This is a single value
        result.args.push(key)
      } else if (peekchar() === ":") {
        // This is a key-value pair
        getchar(":")
        const value = getValue()

        result.args.push([key, value])
      } else {
        throw new Error("Unexpected token in object constructor")
      }

      if (peekchar() === ",") {
        getchar(",")
      }
    }

    getchar(")")

    return result
  }

  const getValue = () => {
    if (peekchar() === "[") {
      return getArray()
    } else if (peekchar() === "{") {
      return getJson()
    } else if (peekchar() === '"') {
      return getString()
    } else if (/[0-9.]/.exec(peekchar())) {
      return getNumber()
    } else {
      const identifier = getIdentifier()

      if (peekchar() === "(") {
        return getObject(identifier)
      } else {
        return identifier
      }
    }
  }

  let currentSection = "globals"

  const result: { [key: string]: any } = {}

  while (!eof()) {
    const peek = peekchar()

    if (peek === ";") {
      let c = getComment()
    } else if (peek === "[") {
      currentSection = getSection()
    } else if (peek.trim() !== "") {
      const variableName = getVariableName()

      getchar("=")

      let variableValue = getValue()

      result[currentSection] = result[currentSection] || {}
      result[currentSection][variableName] = variableValue
    }
  

  return result;
  // console.log(util.inspect(result, false, 6, true))
}
