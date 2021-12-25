export function sanitizeGodotNameForTs(
  name: string,
  type: "argument" | "property"
): string {
  if (
    name === "with" ||
    name === "var" ||
    name === "class" ||
    name === "enum" ||
    name === "default" ||
    name === "in"
  ) {
    if (type === "argument") {
      return "_" + name
    } else {
      return `"${name}"`
    }
  }

  // for enum names in @GlobalScope
  name = name.replace(".", "_")

  // Bizarre case in SliderJoint3D.xml
  if (name.includes("/")) {
    if (type === "argument") {
      return name.replace("/", "_")
    } else {
      return `"${name}"`
    }
  }

  return name
}

export function godotTypeToTsType(godotType: string): string {
  if (godotType === "int") {
    return "int"
  }

  if (godotType === "float") {
    return "float"
  }

  if (godotType === "bool") {
    return "boolean"
  }

  if (godotType === "Array") {
    return "any[]"
  }

  if (godotType === "PackedScene") {
    return "PackedScene<any>"
  }

  if (godotType === "Variant") {
    return "any"
  }

  if (godotType === "String") {
    return "string"
  }

  if (godotType.startsWith("Transform2D")) {
    return "Transform2D"
  }

  if (godotType === "Dictionary") {
    return "Dictionary<any, any>"
  }

  if (godotType === "NodePath") {
    // TODO
    return "NodePathType"
  }

  if (godotType.match(/^[0-9]+$/)) {
    return "int"
  }

  return godotType
}

export function formatJsDoc(input: string): string {
  if (!input) {
    return `/** No documentation provided. */`
  }

  let lines = input.split("\n")

  if (lines.length === 1) {
    return `/** ${input} */`
  }

  const indentationLength = lines[1].length - lines[1].trimStart().length

  // All lines are indented except the first one for some reason.
  lines = [
    lines[0],
    ...lines.slice(1).map((line) => line.slice(indentationLength)),
  ]

  lines = lines.filter((line) => line.trim() !== "")

  let result = "/**\n"

  let insideCodeBlock = false

  for (let line of lines) {
    if (line.includes("[codeblock]")) {
      result += " * @example \n"
      insideCodeBlock = true
    }

    if (line.includes("[/codeblock]")) {
      result += " * @summary \n"
      insideCodeBlock = false
    }

    if (line.includes("[codeblocks]")) {
      result += " * @example \n"
      insideCodeBlock = true
    }

    if (line.includes("[/codeblocks]")) {
      result += " * @summary \n"
      insideCodeBlock = false
    }

    line = line.replaceAll("[gdscript]", "")
    line = line.replaceAll("[/gdscript]", "")
    line = line.replaceAll("[csharp]", "")
    line = line.replaceAll("[/csharp]", "")
    line = line.replaceAll("[b]", "**")
    line = line.replaceAll("[/b]", "**")
    line = line.replaceAll("[i]", "**")
    line = line.replaceAll("[/i]", "**")
    line = line.replaceAll("[code]", "`")
    line = line.replaceAll("[/code]", "`")
    line = line.replaceAll("[codeblock]", "")
    line = line.replaceAll("[/codeblock]", "")
    line = line.replaceAll("[codeblocks]", "")
    line = line.replaceAll("[/codeblocks]", "")

    // This is the most fun edge case of all time - in RichTextLabel.xml
    line = line.replaceAll("*/", "")

    result += " * " + line + "\n" + (!insideCodeBlock ? " *\n" : "")
  }

  result += "*/"

  return result
}
