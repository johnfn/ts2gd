
/**
*/
declare class ImageTextureLayered extends TextureLayered {

  
/**
*/
  "new"(): this;
  static "new"(): this;




/** No documentation provided. */
create_from_images(images: any[]): int;

/** No documentation provided. */
update_layer(image: Image, layer: int): void;

  connect<T extends SignalsOf<ImageTextureLayered>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
