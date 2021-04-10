
/**
*/
declare class ImageTexture3D extends Texture3D {

  
/**
*/
  "new"(): this;
  static "new"(): this;




/** No documentation provided. */
create(format: int, width: int, height: int, depth: int, use_mipmaps: boolean, data: Image[]): int;

/** No documentation provided. */
update(data: Image[]): void;

  connect<T extends SignalsOf<ImageTexture3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
