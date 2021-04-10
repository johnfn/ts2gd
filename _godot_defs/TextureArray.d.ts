
/**
 * [TextureArray]s store an array of images in a single [Texture] primitive. Each layer of the texture array has its own mipmap chain. This makes it is a good alternative to texture atlases.
 *
*/
declare class TextureArray extends TextureLayered {

  
/**
 * [TextureArray]s store an array of images in a single [Texture] primitive. Each layer of the texture array has its own mipmap chain. This makes it is a good alternative to texture atlases.
 *
*/
  "new"(): TextureArray;
  static "new"(): TextureArray;






  connect<T extends SignalsOf<TextureArray>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
