
/**
 * Helper class for parsing JSON data. For usage example and other important hints, see [JSONParseResult].
 *
*/
declare class JSONClass extends Object {

  
/**
 * Helper class for parsing JSON data. For usage example and other important hints, see [JSONParseResult].
 *
*/
  "new"(): JSONClass;
  static "new"(): JSONClass;




/** Parses a JSON-encoded string and returns a [JSONParseResult] containing the result. */
parse(json: string): JSONParseResult;

/**
 * Converts a [Variant] var to JSON text and returns the result. Useful for serializing data to store or send over the network.
 *
 * **Note:** The JSON specification does not define integer or float types, but only a **number** type. Therefore, converting a Variant to JSON text will convert all numerical values to [float] types.
 *
 * Use `indent` parameter to pretty print the output.
 *
 * **Example output:**
 *
 * @example 
 * 
 * ## JSON.print(my_dictionary)
 * {"name":"my_dictionary","version":"1.0.0","entities":[{"name":"entity_0","value":"value_0"},{"name":"entity_1","value":"value_1"}]}
 * ## JSON.print(my_dictionary, "\t")
 * {
 *         "name": "my_dictionary",
 *         "version": "1.0.0",
 *         "entities": [
 *                 {
 *                         "name": "entity_0",
 *                         "value": "value_0"
 *                 },
 *                 {
 *                         "name": "entity_1",
 *                         "value": "value_1"
 *                 }
 *         ]
 * }
 * @summary 
 * 
 *
*/
print(value: any, indent?: string, sort_keys?: boolean): string;

  connect<T extends SignalsOf<JSONClass>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
