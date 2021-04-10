
/**
 * A 6-sided 3D texture typically used for faking reflections. It can be used to make an object look as if it's reflecting its surroundings. This usually delivers much better performance than other reflection methods.
 *
*/
declare class CubeMap extends Resource {

  
/**
 * A 6-sided 3D texture typically used for faking reflections. It can be used to make an object look as if it's reflecting its surroundings. This usually delivers much better performance than other reflection methods.
 *
*/
  "new"(): CubeMap;
  static "new"(): CubeMap;



/** The render flags for the [CubeMap]. See the [enum Flags] constants for details. */
flags: int;

/** The lossy storage quality of the [CubeMap] if the storage mode is set to [constant STORAGE_COMPRESS_LOSSY]. */
lossy_storage_quality: float;

/** The [CubeMap]'s storage mode. See [enum Storage] constants. */
storage_mode: int;

/** Returns the [CubeMap]'s height. */
get_height(): int;

/** Returns an [Image] for a side of the [CubeMap] using one of the [enum Side] constants. */
get_side(side: int): Image;

/** Returns the [CubeMap]'s width. */
get_width(): int;

/** Sets an [Image] for a side of the [CubeMap] using one of the [enum Side] constants. */
set_side(side: int, image: Image): void;

  connect<T extends SignalsOf<CubeMap>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Store the [CubeMap] without any compression.
 *
*/
static STORAGE_RAW: 0;

/**
 * Store the [CubeMap] with strong compression that reduces image quality.
 *
*/
static STORAGE_COMPRESS_LOSSY: 1;

/**
 * Store the [CubeMap] with moderate compression that doesn't reduce image quality.
 *
*/
static STORAGE_COMPRESS_LOSSLESS: 2;

/**
 * Identifier for the left face of the [CubeMap].
 *
*/
static SIDE_LEFT: 0;

/**
 * Identifier for the right face of the [CubeMap].
 *
*/
static SIDE_RIGHT: 1;

/**
 * Identifier for the bottom face of the [CubeMap].
 *
*/
static SIDE_BOTTOM: 2;

/**
 * Identifier for the top face of the [CubeMap].
 *
*/
static SIDE_TOP: 3;

/**
 * Identifier for the front face of the [CubeMap].
 *
*/
static SIDE_FRONT: 4;

/**
 * Identifier for the back face of the [CubeMap].
 *
*/
static SIDE_BACK: 5;

/**
 * Generate mipmaps, to enable smooth zooming out of the texture.
 *
*/
static FLAG_MIPMAPS: 1;

/**
 * Repeat (instead of clamp to edge).
 *
*/
static FLAG_REPEAT: 2;

/**
 * Turn on magnifying filter, to enable smooth zooming in of the texture.
 *
*/
static FLAG_FILTER: 4;

/**
 * Default flags. Generate mipmaps, repeat, and filter are enabled.
 *
*/
static FLAGS_DEFAULT: 7;


  
}
