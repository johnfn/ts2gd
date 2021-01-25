
/**
 * A [Texture] based on an [Image]. Can be created from an [Image] with [method create_from_image].
 *
 * **Note:** The maximum image size is 16384×16384 pixels due to graphics hardware limitations. Larger images will fail to import.
 *
*/
declare class ImageTexture extends Texture {

  
/**
 * A [Texture] based on an [Image]. Can be created from an [Image] with [method create_from_image].
 *
 * **Note:** The maximum image size is 16384×16384 pixels due to graphics hardware limitations. Larger images will fail to import.
 *
*/
  "new"(): ImageTexture;
  static "new"(): ImageTexture;




/** The storage quality for [constant STORAGE_COMPRESS_LOSSY]. */
lossy_quality: float;

/** The storage type (raw, lossy, or compressed). */
storage: int;

/**
 * Create a new [ImageTexture] with `width` and `height`.
 *
 * `format` is a value from [enum Image.Format], `flags` is any combination of [enum Texture.Flags].
 *
*/
create(width: int, height: int, format: int, flags?: int): void;

/** Create a new [ImageTexture] from an [Image] with [code]flags[/code] from [enum Texture.Flags]. An sRGB to linear color space conversion can take place, according to [enum Image.Format]. */
create_from_image(image: Image, flags?: int): void;

/** Returns the format of the [ImageTexture], one of [enum Image.Format]. */
get_format(): int;

/** Load an [ImageTexture] from a file path. */
load(path: string): int;

/** Sets the [Image] of this [ImageTexture]. */
set_data(image: Image): void;

/** Resizes the [ImageTexture] to the specified dimensions. */
set_size_override(size: Vector2): void;

  connect<T extends SignalsOf<ImageTexture>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * [Image] data is stored raw and unaltered.
 *
*/
static STORAGE_RAW: 0;

/**
 * [Image] data is compressed with a lossy algorithm. You can set the storage quality with [member lossy_quality].
 *
*/
static STORAGE_COMPRESS_LOSSY: 1;

/**
 * [Image] data is compressed with a lossless algorithm.
 *
*/
static STORAGE_COMPRESS_LOSSLESS: 2;


  
}
