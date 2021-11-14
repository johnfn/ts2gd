
/**
 * Texture3D is a 3-dimensional texture that has a width, height, and depth.
 *
*/
declare class Texture3D extends TextureLayered  {

  
/**
 * Texture3D is a 3-dimensional texture that has a width, height, and depth.
 *
*/
  new(): Texture3D; 
  static "new"(): Texture3D 




/** Creates the Texture3D with specified [code]width[/code], [code]height[/code], and [code]depth[/code]. See [enum Image.Format] for [code]format[/code] options. See [enum TextureLayered.Flags] enumerator for [code]flags[/code] options. */
create(width: int, height: int, depth: int, format: int, flags?: int): void;

  connect<T extends SignalsOf<Texture3D>>(signal: T, method: SignalFunction<Texture3D[T]>): number;






}

