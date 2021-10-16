
/**
 * [Texture] resource that crops out one part of the [member atlas] texture, defined by [member region]. The main use case is cropping out textures from a texture atlas, which is a big texture file that packs multiple smaller textures. Consists of a [Texture] for the [member atlas], a [member region] that defines the area of [member atlas] to use, and a [member margin] that defines the border width.
 *
 * [AtlasTexture] cannot be used in an [AnimatedTexture], cannot be tiled in nodes such as [TextureRect], and does not work properly if used inside of other [AtlasTexture] resources. Multiple [AtlasTexture] resources can be used to crop multiple textures from the atlas. Using a texture atlas helps to optimize video memory costs and render calls compared to using multiple small files.
 *
 * **Note:** AtlasTextures don't support repetition. The [constant Texture.FLAG_REPEAT] and [constant Texture.FLAG_MIRRORED_REPEAT] flags are ignored when using an AtlasTexture.
 *
*/
declare class AtlasTexture extends Texture {

  
/**
 * [Texture] resource that crops out one part of the [member atlas] texture, defined by [member region]. The main use case is cropping out textures from a texture atlas, which is a big texture file that packs multiple smaller textures. Consists of a [Texture] for the [member atlas], a [member region] that defines the area of [member atlas] to use, and a [member margin] that defines the border width.
 *
 * [AtlasTexture] cannot be used in an [AnimatedTexture], cannot be tiled in nodes such as [TextureRect], and does not work properly if used inside of other [AtlasTexture] resources. Multiple [AtlasTexture] resources can be used to crop multiple textures from the atlas. Using a texture atlas helps to optimize video memory costs and render calls compared to using multiple small files.
 *
 * **Note:** AtlasTextures don't support repetition. The [constant Texture.FLAG_REPEAT] and [constant Texture.FLAG_MIRRORED_REPEAT] flags are ignored when using an AtlasTexture.
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



  // connect<T extends SignalsOf<AtlasTexture>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AtlasTextureSignals>>(signal: T, method: SignalFunction<AtlasTextureSignals[T]>): number;




}

declare class AtlasTextureSignals extends TextureSignals {
  
}
