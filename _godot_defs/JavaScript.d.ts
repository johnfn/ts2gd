
/**
 * The JavaScript singleton is implemented only in the HTML5 export. It's used to access the browser's JavaScript context. This allows interaction with embedding pages or calling third-party JavaScript APIs.
 *
*/
declare class JavaScriptClass extends Object {

  
/**
 * The JavaScript singleton is implemented only in the HTML5 export. It's used to access the browser's JavaScript context. This allows interaction with embedding pages or calling third-party JavaScript APIs.
 *
*/
  "new"(): JavaScriptClass;
  static "new"(): JavaScriptClass;




/**
 * Execute the string `code` as JavaScript code within the browser window. This is a call to the actual global JavaScript function `eval()`.
 *
 * If `use_global_execution_context` is `true`, the code will be evaluated in the global execution context. Otherwise, it is evaluated in the execution context of a function within the engine's runtime environment.
 *
*/
eval(code: string, use_global_execution_context?: boolean): any;

  connect<T extends SignalsOf<JavaScriptClass>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
