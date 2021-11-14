
/**
 * A texture that is loaded from a `.stex` file.
 *
*/
declare class StreamTexture extends Texture  {

  
/**
 * A texture that is loaded from a `.stex` file.
 *
*/
  new(): StreamTexture; 
  static "new"(): StreamTexture 



/** The StreamTexture's file path to a [code].stex[/code] file. */
load_path: string;

/** Loads the texture from the given path. */
load(path: string): int;

  connect<T extends SignalsOf<StreamTexture>>(signal: T, method: SignalFunction<StreamTexture[T]>): number;






}

