
/**
*/
declare class JSONRPC extends Object {

  
/**
*/
  "new"(): JSONRPC;
  static "new"(): JSONRPC;




/** No documentation provided. */
make_notification(method: string, params: any): Dictionary;

/** No documentation provided. */
make_request(method: string, params: any, id: any): Dictionary;

/** No documentation provided. */
make_response(result: any, id: any): Dictionary;

/** No documentation provided. */
make_response_error(code: int, message: string, id?: any): Dictionary;

/** No documentation provided. */
process_action(action: any, recurse?: boolean): any;

/** No documentation provided. */
process_string(action: string): string;

/** No documentation provided. */
set_scope(scope: string, target: Object): void;

  connect<T extends SignalsOf<JSONRPC>, U extends Node>(signal: T, node: U, method: keyof U): number;



/** No documentation provided. */
 static PARSE_ERROR: null;

/** No documentation provided. */
 static INVALID_REQUEST: null;

/** No documentation provided. */
 static METHOD_NOT_FOUND: null;

/** No documentation provided. */
 static INVALID_PARAMS: null;

/** No documentation provided. */
 static INTERNAL_ERROR: null;


  
}
