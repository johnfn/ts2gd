
/**
 * Returned by [method JSON.parse], [JSONParseResult] contains the decoded JSON or error information if the JSON source wasn't successfully parsed. You can check if the JSON source was successfully parsed with `if json_result.error == OK`.
 *
*/
declare class JSONParseResult extends Reference {

  
/**
 * Returned by [method JSON.parse], [JSONParseResult] contains the decoded JSON or error information if the JSON source wasn't successfully parsed. You can check if the JSON source was successfully parsed with `if json_result.error == OK`.
 *
*/
  "new"(): JSONParseResult;
  static "new"(): JSONParseResult;



/** The error type if the JSON source was not successfully parsed. See the [enum Error] constants. */
error: int;

/** The line number where the error occurred if the JSON source was not successfully parsed. */
error_line: int;

/** The error message if the JSON source was not successfully parsed. See the [enum Error] constants. */
error_string: string;

/**
 * A [Variant] containing the parsed JSON. Use [method @GDScript.typeof] or the `is` keyword to check if it is what you expect. For example, if the JSON source starts with curly braces (`{}`), a [Dictionary] will be returned. If the JSON source starts with brackets (`[]`), an [Array] will be returned.
 *
 * **Note:** The JSON specification does not define integer or float types, but only a **number** type. Therefore, parsing a JSON text will convert all numerical values to [float] types.
 *
 * **Note:** JSON objects do not preserve key order like Godot dictionaries, thus, you should not rely on keys being in a certain order if a dictionary is constructed from JSON. In contrast, JSON arrays retain the order of their elements:
 *
 * @example 
 * 
 * var p = JSON.parse('["hello", "world", "!"]')
 * if typeof(p.result) == TYPE_ARRAY:
 *     print(p.result[0]) # Prints "hello"
 * else:
 *     push_error("Unexpected results.")
 * @summary 
 * 
 *
*/
result: any;



  connect<T extends SignalsOf<JSONParseResult>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
