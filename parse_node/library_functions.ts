export type LibraryFunctionName =
  | "map"
  | "filter"
  | "max_by"
  | "min_by"
  | "join"
  | "entries"
  | "flatten"
  | "random_element"
  | "add_vec_lib"
  | "sub_vec_lib"
  | "mul_vec_lib"
  | "div_vec_lib"

export const LibraryFunctions: {
  [key in LibraryFunctionName]: {
    name: LibraryFunctionName
    definition: (name: string) => string
  }
} = {
  entries: {
    name: "entries",
    definition: () => `
func __entries(dict):
  var result = []

  for key in dict.keys():
    var value = dict[key]

    result.push_back([key, value])
  
  return result
`,
  },

  add_vec_lib: {
    name: "add_vec_lib",
    definition: () => `
func add_vec_lib(v1, v2):
  return null if (v1 == null or v2 == null) else v1 + v2
`,
  },

  sub_vec_lib: {
    name: "sub_vec_lib",
    definition: () => `
func sub_vec_lib(v1, v2):
  return null if (v1 == null or v2 == null) else v1 - v2
`,
  },

  div_vec_lib: {
    name: "div_vec_lib",
    definition: () => `
func div_vec_lib(v1, v2):
  return null if (v1 == null or v2 == null) else v1 / v2
`,
  },

  mul_vec_lib: {
    name: "mul_vec_lib",
    definition: () => `
func mul_vec_lib(v1, v2):
  return null if (v1 == null or v2 == null) else v1 * v2
`,
  },

  map: {
    name: "map",
    definition: (name: string) => `
func ${name}(list, fn):
  var result = []

  for item in list:
    result.append(fn[0].call_func(item, fn[1]))

  return result
    `,
  },

  flatten: {
    name: "flatten",
    definition: (name: string) => `
func ${name}(list):
  var result = []

  for item in list:
    if (typeof(item) == TYPE_ARRAY):
      var inner_result = ${name}(item)

      for inner in inner_result:
        result.append(inner)
    else:
      result.append(item)

  return result
    `,
  },

  filter: {
    name: "filter",
    definition: (name: string) => `
func ${name}(list, fn):
  var result = []

  for item in list:
    if fn[0].call_func(item, fn[1]):
      result.append(item)

  return result
    `,
  },

  max_by: {
    name: "max_by",
    definition: (name: string) => `
func ${name}(list, fn):
  if len(list) == 0: 
    return null

  var result = []
  var best = null
  var best_score = -INF

  for item in list:
    var score = fn[0].call_func(item, fn[1])

    if score > best_score:
      best_score = score
      best = item

  return best
    `,
  },

  min_by: {
    name: "min_by",
    definition: (name: string) => `
func ${name}(list, fn):
  if len(list) == 0: 
    return null

  var result = []
  var best = null
  var best_score = INF

  for item in list:
    var score = fn[0].call_func(item, fn[1])

    if score < best_score:
      best_score = score
      best = item

  return best
    `,
  },

  join: {
    name: "join",
    definition: (name: string) => `
func ${name}(list, join_str):
  var result = ""

  for i in range(len(list)):
    result += str(list[i])

    if i != len(list) - 1:
      result += join_str

  return result
    `,
  },

  random_element: {
    name: "random_element",
    definition: (name: string) => `
func ${name}(list):
  if len(list) == 0: 
    return null
  return list[randi() % len(list)]
    `,
  },
}
