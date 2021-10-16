
/**
 * A texture that is loaded from a `.stex` file.
 *
*/
declare class StreamTexture extends Texture {

  
/**
 * A texture that is loaded from a `.stex` file.
 *
*/
  "new"(): StreamTexture;
  static "new"(): StreamTexture;




/** The StreamTexture's file path to a [code].stex[/code] file. */
load_path: string;

/** Loads the texture from the given path. */
load(path: string): int;

  // connect<T extends SignalsOf<StreamTexture>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<StreamTextureSignals>>(signal: T, method: SignalFunction<StreamTextureSignals[T]>): number;




}

declare class StreamTextureSignals extends TextureSignals {
  
}
