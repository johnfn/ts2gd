
/**
 * Base class for [Texture3D] and [TextureArray]. Cannot be used directly, but contains all the functions necessary for accessing and using [Texture3D] and [TextureArray]. Data is set on a per-layer basis. For [Texture3D]s, the layer specifies the depth or Z-index, they can be treated as a bunch of 2D slices. Similarly, for [TextureArray]s, the layer specifies the array layer.
 *
*/
declare class TextureLayered extends Resource {

  
/**
 * Base class for [Texture3D] and [TextureArray]. Cannot be used directly, but contains all the functions necessary for accessing and using [Texture3D] and [TextureArray]. Data is set on a per-layer basis. For [Texture3D]s, the layer specifies the depth or Z-index, they can be treated as a bunch of 2D slices. Similarly, for [TextureArray]s, the layer specifies the array layer.
 *
*/
  "new"(): TextureLayered;
  static "new"(): TextureLayered;



/** Returns a dictionary with all the data used by this texture. */
data: Dictionary<any, any>;

/** Specifies which [enum Flags] apply to this texture. */
flags: int;

/** Returns the depth of the texture. Depth is the 3rd dimension (typically Z-axis). */
get_depth(): int;

/** Returns the current format being used by this texture. See [enum Image.Format] for details. */
get_format(): int;

/** Returns the height of the texture. Height is typically represented by the Y-axis. */
get_height(): int;

/** Returns an [Image] resource with the data from specified [code]layer[/code]. */
get_layer_data(layer: int): Image;

/** Returns the width of the texture. Width is typically represented by the X-axis. */
get_width(): int;

/** Partially sets the data for a specified [code]layer[/code] by overwriting using the data of the specified [code]image[/code]. [code]x_offset[/code] and [code]y_offset[/code] determine where the [Image] is "stamped" over the texture. The [code]image[/code] must fit within the texture. */
set_data_partial(image: Image, x_offset: int, y_offset: int, layer: int, mipmap?: int): void;

/** Sets the data for the specified layer. Data takes the form of a 2-dimensional [Image] resource. */
set_layer_data(image: Image, layer: int): void;

  // connect<T extends SignalsOf<TextureLayered>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<TextureLayeredSignals>>(signal: T, method: SignalFunction<TextureLayeredSignals[T]>): number;



/**
 * Default flags for [TextureArray]. [constant FLAG_MIPMAPS], [constant FLAG_REPEAT] and [constant FLAG_FILTER] are enabled.
 *
*/
static FLAGS_DEFAULT_TEXTURE_ARRAY: any;

/**
 * Default flags for [Texture3D]. [constant FLAG_FILTER] is enabled.
 *
*/
static FLAGS_DEFAULT_TEXTURE_3D: any;

/**
 * Texture will generate mipmaps on creation.
 *
*/
static FLAG_MIPMAPS: any;

/**
 * Texture will repeat when UV used is outside the 0-1 range.
 *
*/
static FLAG_REPEAT: any;

/**
 * Use filtering when reading from texture. Filtering smooths out pixels. Turning filtering off is slightly faster and more appropriate when you need access to individual pixels.
 *
*/
static FLAG_FILTER: any;

/**
 * Uses anisotropic mipmap filtering. Generates smaller versions of the same texture with different aspect ratios.
 *
 * This results in better-looking textures when viewed from oblique angles.
 *
*/
static FLAG_ANISOTROPIC_FILTER: any;

}

declare class TextureLayeredSignals extends ResourceSignals {
  
}
