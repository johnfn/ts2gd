
/**
 * [url=https://www.jsonrpc.org/]JSON-RPC[/url] is a standard which wraps a method call in a [JSON] object. The object has a particular structure and identifies which method is called, the parameters to that function, and carries an ID to keep track of responses. This class implements that standard on top of [Dictionary]; you will have to convert between a [Dictionary] and [JSON] with other functions.
 *
*/
declare class JSONRPC extends Object {

  
/**
 * [url=https://www.jsonrpc.org/]JSON-RPC[/url] is a standard which wraps a method call in a [JSON] object. The object has a particular structure and identifies which method is called, the parameters to that function, and carries an ID to keep track of responses. This class implements that standard on top of [Dictionary]; you will have to convert between a [Dictionary] and [JSON] with other functions.
 *
*/
  "new"(): JSONRPC;
  static "new"(): JSONRPC;




/**
 * Returns a dictionary in the form of a JSON-RPC notification. Notifications are one-shot messages which do not expect a response.
 *
 * - `method`: Name of the method being called.
 *
 * - `params`: An array or dictionary of parameters being passed to the method.
 *
*/
make_notification(method: string, params: any): Dictionary<any, any>;

/**
 * Returns a dictionary in the form of a JSON-RPC request. Requests are sent to a server with the expectation of a response. The ID field is used for the server to specify which exact request it is responding to.
 *
 * - `method`: Name of the method being called.
 *
 * - `params`: An array or dictionary of parameters being passed to the method.
 *
 * - `id`: Uniquely identifies this request. The server is expected to send a response with the same ID.
 *
*/
make_request(method: string, params: any, id: any): Dictionary<any, any>;

/**
 * When a server has received and processed a request, it is expected to send a response. If you did not want a response then you need to have sent a Notification instead.
 *
 * - `result`: The return value of the function which was called.
 *
 * - `id`: The ID of the request this response is targeted to.
 *
*/
make_response(result: any, id: any): Dictionary<any, any>;

/**
 * Creates a response which indicates a previous reply has failed in some way.
 *
 * - `code`: The error code corresponding to what kind of error this is. See the [enum ErrorCode] constants.
 *
 * - `message`: A custom message about this error.
 *
 * - `id`: The request this error is a response to.
 *
*/
make_response_error(code: int, message: string, id?: any): Dictionary<any, any>;

/**
 * Given a Dictionary which takes the form of a JSON-RPC request: unpack the request and run it. Methods are resolved by looking at the field called "method" and looking for an equivalently named function in the JSONRPC object. If one is found that method is called.
 *
 * To add new supported methods extend the JSONRPC class and call [method process_action] on your subclass.
 *
 * `action`: The action to be run, as a Dictionary in the form of a JSON-RPC request or notification.
 *
*/
process_action(action: any, recurse?: boolean): any;

/** No documentation provided. */
process_string(action: string): string;

/** No documentation provided. */
set_scope(scope: string, target: Object): void;

  // connect<T extends SignalsOf<JSONRPC>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<JSONRPCSignals>>(signal: T, method: SignalFunction<JSONRPCSignals[T]>): number;



/** No documentation provided. */
static PARSE_ERROR: any;

/** No documentation provided. */
static INVALID_REQUEST: any;

/**
 * A method call was requested but no function of that name existed in the JSONRPC subclass.
 *
*/
static METHOD_NOT_FOUND: any;

/** No documentation provided. */
static INVALID_PARAMS: any;

/** No documentation provided. */
static INTERNAL_ERROR: any;

}

declare class JSONRPCSignals extends ObjectSignals {
  
}
