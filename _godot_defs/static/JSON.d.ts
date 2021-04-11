
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



  connect<T extends SignalsOf<JSONClass>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
