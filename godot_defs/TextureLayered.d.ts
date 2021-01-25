
/**
 * Base class for [Texture3D] and [TextureArray]. Cannot be used directly, but contains all the functions necessary for accessing and using [Texture3D] and [TextureArray]. Data is set on a per-layer basis. For [Texture3D]s, the layer sepcifies the depth or Z-index, they can be treated as a bunch of 2D slices. Similarly, for [TextureArray]s, the layer specifies the array layer.
 *
*/
declare class TextureLayered extends Resource {

  
/**
 * Base class for [Texture3D] and [TextureArray]. Cannot be used directly, but contains all the functions necessary for accessing and using [Texture3D] and [TextureArray]. Data is set on a per-layer basis. For [Texture3D]s, the layer sepcifies the depth or Z-index, they can be treated as a bunch of 2D slices. Similarly, for [TextureArray]s, the layer specifies the array layer.
 *
*/
  "new"(): TextureLayered;
  static "new"(): TextureLayered;



/** Returns a dictionary with all the data used by this texture. */
data: Dictionary;

/** Specifies which [enum Flags] apply to this texture. */
flags: int;

/** Creates the [Texture3D] or [TextureArray] with specified [code]width[/code], [code]height[/code], and [code]depth[/code]. See [enum Image.Format] for [code]format[/code] options. See [enum Flags] enumerator for [code]flags[/code] options. */
create(width: int, height: int, depth: int, format: int, flags?: int): void;

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

  connect<T extends SignalsOf<TextureLayered>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Texture will generate mipmaps on creation.
 *
*/
static FLAG_MIPMAPS: 1;

/**
 * Texture will repeat when UV used is outside the 0-1 range.
 *
*/
static FLAG_REPEAT: 2;

/**
 * Use filtering when reading from texture. Filtering smooths out pixels. Turning filtering off is slightly faster and more appropriate when you need access to individual pixels.
 *
*/
static FLAG_FILTER: 4;

/**
 * Equivalent to [constant FLAG_FILTER].
 *
*/
static FLAGS_DEFAULT: 4;


  
}
