
/**
 * The JavaScript singleton is implemented only in the HTML5 export. It's used to access the browser's JavaScript context. This allows interaction with embedding pages or calling third-party JavaScript APIs.
 *
 * **Note:** This singleton can be disabled at build-time to improve security. By default, the JavaScript singleton is enabled. Official export templates also have the JavaScript singleton enabled. See [url=https://docs.godotengine.org/en/3.4/development/compiling/compiling_for_web.html]Compiling for the Web[/url] in the documentation for more information.
 *
*/
declare class JavaScriptClass extends Object {

  
/**
 * The JavaScript singleton is implemented only in the HTML5 export. It's used to access the browser's JavaScript context. This allows interaction with embedding pages or calling third-party JavaScript APIs.
 *
 * **Note:** This singleton can be disabled at build-time to improve security. By default, the JavaScript singleton is enabled. Official export templates also have the JavaScript singleton enabled. See [url=https://docs.godotengine.org/en/3.4/development/compiling/compiling_for_web.html]Compiling for the Web[/url] in the documentation for more information.
 *
*/
  "new"(): JavaScriptClass;
  static "new"(): JavaScriptClass;




/** Creates a reference to a script function that can be used as a callback by JavaScript. The reference must be kept until the callback happens, or it won't be called at all. See [JavaScriptObject] for usage. */
create_callback(object: Object, method: string): JavaScriptObject;

/** Creates a new JavaScript object using the [code]new[/code] constructor. The [code]object[/code] must a valid property of the JavaScript [code]window[/code]. See [JavaScriptObject] for usage. */
create_object(...args: any[]): any;

/**
 * Prompts the user to download a file containing the specified `buffer`. The file will have the given `name` and `mime` type.
 *
 * **Note:** The browser may override the [url=https://en.wikipedia.org/wiki/Media_type]MIME type[/url] provided based on the file `name`'s extension.
 *
 * **Note:** Browsers might block the download if [method download_buffer] is not being called from a user interaction (e.g. button click).
 *
 * **Note:** Browsers might ask the user for permission or block the download if multiple download requests are made in a quick succession.
 *
*/
download_buffer(buffer: PoolByteArray, name: string, mime?: string): void;

/**
 * Execute the string `code` as JavaScript code within the browser window. This is a call to the actual global JavaScript function `eval()`.
 *
 * If `use_global_execution_context` is `true`, the code will be evaluated in the global execution context. Otherwise, it is evaluated in the execution context of a function within the engine's runtime environment.
 *
*/
eval(code: string, use_global_execution_context?: boolean): any;

/** Returns an interface to a JavaScript object that can be used by scripts. The [code]interface[/code] must be a valid property of the JavaScript [code]window[/code]. The callback must accept a single [Array] argument, which will contain the JavaScript [code]arguments[/code]. See [JavaScriptObject] for usage. */
get_interface(interface: string): JavaScriptObject;

  // connect<T extends SignalsOf<JavaScriptClass>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<JavaScriptClassSignals>>(signal: T, method: SignalFunction<JavaScriptClassSignals[T]>): number;




}

declare class JavaScriptClassSignals extends ObjectSignals {
  
}
