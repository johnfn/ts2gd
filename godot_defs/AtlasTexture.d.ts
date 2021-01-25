
/**
 * [Texture] resource aimed at managing big textures files that pack multiple smaller textures. Consists of a [Texture], a margin that defines the border width, and a region that defines the actual area of the AtlasTexture.
 *
*/
declare class AtlasTexture extends Texture {

  
/**
 * [Texture] resource aimed at managing big textures files that pack multiple smaller textures. Consists of a [Texture], a margin that defines the border width, and a region that defines the actual area of the AtlasTexture.
 *
*/
  "new"(): AtlasTexture;
  static "new"(): AtlasTexture;



/** The texture that contains the atlas. Can be any [Texture] subtype. */
atlas: Texture;

/** If [code]true[/code], clips the area outside of the region to avoid bleeding of the surrounding texture pixels. */
filter_clip: boolean;


/** The margin around the region. The [Rect2]'s [member Rect2.size] parameter ("w" and "h" in the editor) resizes the texture so it fits within the margin. */
margin: Rect2;

/** The AtlasTexture's used region. */
region: Rect2;



  connect<T extends SignalsOf<AtlasTexture>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
