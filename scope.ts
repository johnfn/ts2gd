import ts, { SyntaxKind } from "typescript"

export class Scope {
  namesInScope: [
    ts.BindingName | ts.ParameterDeclaration | undefined,
    string
  ][][] = [[]]
  program: ts.Program

  constructor(program: ts.Program) {
    this.program = program
  }

  enterScope() {
    this.namesInScope.push([])
  }

  leaveScope() {
    this.namesInScope.pop()
  }

  getName(node: ts.BindingName): string | null {
    let ourSymbol = this.program.getTypeChecker().getSymbolAtLocation(node)

    // Match the provided node to an existing name in scope by symbol reference.
    for (const scope of this.namesInScope.slice().reverse()) {
      for (const [otherNode, name] of scope) {
        if (!otherNode) {
          continue
        }

        const theirSymbol = this.program
          .getTypeChecker()
          .getSymbolAtLocation(otherNode)

        if (ourSymbol === theirSymbol) {
          return name
        }
      }
    }

    return null
  }

  addName(node: ts.BindingName): void {
    let declaredVariableName = ""

    if (node.kind === SyntaxKind.Identifier) {
      declaredVariableName = (node as ts.Identifier).text
    } else if (node.kind === SyntaxKind.ObjectBindingPattern) {
      throw new Error(" Havent handled destructuring yet")
    } else if (node.kind === SyntaxKind.ArrayBindingPattern) {
      throw new Error(" Havent handled destructuring yet")
    }

    // Don't use a keyword as a name
    if (keywords.includes(declaredVariableName)) {
      declaredVariableName = declaredVariableName + "_"
    }

    const matchingNames = this.namesInScope.flat()
    let newName = declaredVariableName
    let increment = 0

    while (matchingNames.filter((x) => x[1] === newName).length > 0) {
      newName = declaredVariableName + String(++increment)
    }

    this.namesInScope[this.namesInScope.length - 1].push([node, newName])
  }

  createUniqueName(): string {
    let declaredVariableName = "__gen"

    const matchingNames = this.namesInScope.flat()
    let newName = declaredVariableName
    let increment = 0

    while (matchingNames.filter((x) => x[1] === newName).length > 0) {
      newName = declaredVariableName + String(++increment)
    }

    this.namesInScope[this.namesInScope.length - 1].push([undefined, newName])

    return newName
  }
}

const keywords = [
  // Godot keywords
  "if",
  "elif",
  "else",
  "for",
  "while",
  "match",
  "break",
  "continue",
  "pass",
  "return",
  "class",
  "class_name",
  "extends",
  "is",
  "as",
  "self",
  "tool",
  "signal",
  "func",
  "static",
  "const",
  "enum",
  "var",
  "onready",
  "export",
  "setget",
  "breakpoint",
  "preload",
  "yield",
  "assert",
  "remote",
  "master",
  "puppet",
  "remotesync",
  "mastersync",
  "puppetsync",
  "PI",
  "TAU",
  "INF",
  "NAN",

  // GDScript global variables
  "Color8",
  "ColorN",
  "abs",
  "acos",
  "asin",
  "assert",
  "atan",
  "atan2",
  "bytes2var",
  "cartesian2polar",
  "ceil",
  "char",
  "clamp",
  "convert",
  "cos",
  "cosh",
  "db2linear",
  "decimals",
  "dectime",
  "deg2rad",
  "dict2inst",
  "ease",
  "exp",
  "floor",
  "fmod",
  "fposmod",
  "funcref",
  "get_stack",
  "hash",
  "inst2dict",
  "instance_from_id",
  "inverse_lerp",
  "is_equal_approx",
  "is_inf",
  "is_instance_valid",
  "is_nan",
  "is_zero_approx",
  "len",
  "lerp",
  "lerp_angle",
  "linear2db",
  "load",
  "log",
  "max",
  "min",
  "move_toward",
  "nearest_po2",
  "ord",
  "parse_json",
  "polar2cartesian",
  "posmod",
  "pow",
  "preload",
  "print",
  "print_debug",
  "print_stack",
  "printerr",
  "printraw",
  "prints",
  "printt",
  "push_error",
  "push_warning",
  "rad2deg",
  "rand_range",
  "rand_seed",
  "randf",
  "randi",
  "randomize",
  "range",
  "range_lerp",
  "round",
  "seed",
  "sign",
  "sin",
  "sinh",
  "smoothstep",
  "sqrt",
  "step_decimals",
  "stepify",
  "str",
  "str2var",
  "tan",
  "tanh",
  "to_json",
  "type_exists",
  "typeof",
  "validate_json",
  "var2bytes",
  "var2str",
  "weakref",
  "wrapf",
  "wrapi",
  "yield",
]
