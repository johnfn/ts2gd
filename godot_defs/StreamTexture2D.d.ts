
/**
 * A texture that is loaded from a `.stex` file.
 *
*/
declare class StreamTexture2D extends Texture2D {

  
/**
 * A texture that is loaded from a `.stex` file.
 *
*/
  "new"(): this;
  static "new"(): this;



/** The StreamTexture's file path to a [code].stex[/code] file. */
load_path: String;

/** Loads the texture from the given path. */
load(path: String): int;

  connect<T extends SignalsOf<StreamTexture2D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
