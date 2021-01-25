
/**
 * Native image datatype. Contains image data, which can be converted to a [Texture], and several functions to interact with it. The maximum width and height for an [Image] are [constant MAX_WIDTH] and [constant MAX_HEIGHT].
 *
 * **Note:** The maximum image size is 16384×16384 pixels due to graphics hardware limitations. Larger images will fail to import.
 *
*/
declare class Image extends Resource {

  
/**
 * Native image datatype. Contains image data, which can be converted to a [Texture], and several functions to interact with it. The maximum width and height for an [Image] are [constant MAX_WIDTH] and [constant MAX_HEIGHT].
 *
 * **Note:** The maximum image size is 16384×16384 pixels due to graphics hardware limitations. Larger images will fail to import.
 *
*/
  "new"(): Image;
  static "new"(): Image;



/** Holds all of the image's color data in a given format. See [enum Format] constants. */
data: Dictionary;

/** Alpha-blends [code]src_rect[/code] from [code]src[/code] image to this image at coordinates [code]dest[/code]. */
blend_rect(src: Image, src_rect: Rect2, dst: Vector2): void;

/** Alpha-blends [code]src_rect[/code] from [code]src[/code] image to this image using [code]mask[/code] image at coordinates [code]dst[/code]. Alpha channels are required for both [code]src[/code] and [code]mask[/code]. [code]dst[/code] pixels and [code]src[/code] pixels will blend if the corresponding mask pixel's alpha value is not 0. [code]src[/code] image and [code]mask[/code] image [b]must[/b] have the same size (width and height) but they can have different formats. */
blend_rect_mask(src: Image, mask: Image, src_rect: Rect2, dst: Vector2): void;

/** Copies [code]src_rect[/code] from [code]src[/code] image to this image at coordinates [code]dst[/code]. */
blit_rect(src: Image, src_rect: Rect2, dst: Vector2): void;

/** Blits [code]src_rect[/code] area from [code]src[/code] image to this image at the coordinates given by [code]dst[/code]. [code]src[/code] pixel is copied onto [code]dst[/code] if the corresponding [code]mask[/code] pixel's alpha value is not 0. [code]src[/code] image and [code]mask[/code] image [b]must[/b] have the same size (width and height) but they can have different formats. */
blit_rect_mask(src: Image, mask: Image, src_rect: Rect2, dst: Vector2): void;

/** Converts a bumpmap to a normalmap. A bumpmap provides a height offset per-pixel, while a normalmap provides a normal direction per pixel. */
bumpmap_to_normalmap(bump_scale?: float): void;

/** Removes the image's mipmaps. */
clear_mipmaps(): void;

/** Compresses the image to use less memory. Can not directly access pixel data while the image is compressed. Returns error if the chosen compression mode is not available. See [enum CompressMode] and [enum CompressSource] constants. */
compress(mode: int, source: int, lossy_quality: float): int;

/** Converts the image's format. See [enum Format] constants. */
convert(format: int): void;

/** Copies [code]src[/code] image to this image. */
copy_from(src: Image): void;

/** Creates an empty image of given size and format. See [enum Format] constants. If [code]use_mipmaps[/code] is [code]true[/code] then generate mipmaps for this image. See the [method generate_mipmaps]. */
create(width: int, height: int, use_mipmaps: boolean, format: int): void;

/** Creates a new image of given size and format. See [enum Format] constants. Fills the image with the given raw data. If [code]use_mipmaps[/code] is [code]true[/code] then loads mipmaps for this image from [code]data[/code]. See [method generate_mipmaps]. */
create_from_data(width: int, height: int, use_mipmaps: boolean, format: int, data: PoolByteArray): void;

/** Crops the image to the given [code]width[/code] and [code]height[/code]. If the specified size is larger than the current size, the extra area is filled with black pixels. */
crop(width: int, height: int): void;

/** Decompresses the image if it is compressed. Returns an error if decompress function is not available. */
decompress(): int;

/** Returns [constant ALPHA_BLEND] if the image has data for alpha values. Returns [constant ALPHA_BIT] if all the alpha values are stored in a single bit. Returns [constant ALPHA_NONE] if no data for alpha values is found. */
detect_alpha(): int;

/** Stretches the image and enlarges it by a factor of 2. No interpolation is done. */
expand_x2_hq2x(): void;

/** Fills the image with a given [Color]. */
fill(color: Color): void;

/** Blends low-alpha pixels with nearby pixels. */
fix_alpha_edges(): void;

/** Flips the image horizontally. */
flip_x(): void;

/** Flips the image vertically. */
flip_y(): void;

/** Generates mipmaps for the image. Mipmaps are pre-calculated and lower resolution copies of the image. Mipmaps are automatically used if the image needs to be scaled down when rendered. This improves image quality and the performance of the rendering. Returns an error if the image is compressed, in a custom format or if the image's width/height is 0. */
generate_mipmaps(renormalize?: boolean): int;

/** Returns a copy of the image's raw data. */
get_data(): PoolByteArray;

/** Returns the image's format. See [enum Format] constants. */
get_format(): int;

/** Returns the image's height. */
get_height(): int;

/** Returns the offset where the image's mipmap with index [code]mipmap[/code] is stored in the [code]data[/code] dictionary. */
get_mipmap_offset(mipmap: int): int;

/** Returns the color of the pixel at [code](x, y)[/code] if the image is locked. If the image is unlocked, it always returns a [Color] with the value [code](0, 0, 0, 1.0)[/code]. This is the same as [method get_pixelv], but two integer arguments instead of a Vector2 argument. */
get_pixel(x: int, y: int): Color;

/** Returns the color of the pixel at [code]src[/code] if the image is locked. If the image is unlocked, it always returns a [Color] with the value [code](0, 0, 0, 1.0)[/code]. This is the same as [method get_pixel], but with a Vector2 argument instead of two integer arguments. */
get_pixelv(src: Vector2): Color;

/** Returns a new image that is a copy of the image's area specified with [code]rect[/code]. */
get_rect(rect: Rect2): Image;

/** Returns the image's size (width and height). */
get_size(): Vector2;

/** Returns a [Rect2] enclosing the visible portion of the image, considering each pixel with a non-zero alpha channel as visible. */
get_used_rect(): Rect2;

/** Returns the image's width. */
get_width(): int;

/** Returns [code]true[/code] if the image has generated mipmaps. */
has_mipmaps(): boolean;

/** Returns [code]true[/code] if the image is compressed. */
is_compressed(): boolean;

/** Returns [code]true[/code] if the image has no data. */
is_empty(): boolean;

/** Returns [code]true[/code] if all the image's pixels have an alpha value of 0. Returns [code]false[/code] if any pixel has an alpha value higher than 0. */
is_invisible(): boolean;

/** Loads an image from file [code]path[/code]. See [url=https://docs.godotengine.org/en/latest/getting_started/workflow/assets/importing_images.html#supported-image-formats]Supported image formats[/url] for a list of supported image formats and limitations. */
load(path: string): int;

/** Loads an image from the binary contents of a JPEG file. */
load_jpg_from_buffer(buffer: PoolByteArray): int;

/** Loads an image from the binary contents of a PNG file. */
load_png_from_buffer(buffer: PoolByteArray): int;

/** Loads an image from the binary contents of a TGA file. */
load_tga_from_buffer(buffer: PoolByteArray): int;

/** Loads an image from the binary contents of a WebP file. */
load_webp_from_buffer(buffer: PoolByteArray): int;

/** Locks the data for reading and writing access. Sends an error to the console if the image is not locked when reading or writing a pixel. */
lock(): void;

/** Converts the image's data to represent coordinates on a 3D plane. This is used when the image represents a normalmap. A normalmap can add lots of detail to a 3D surface without increasing the polygon count. */
normalmap_to_xy(): void;

/** Multiplies color values with alpha values. Resulting color values for a pixel are [code](color * alpha)/256[/code]. */
premultiply_alpha(): void;

/** Resizes the image to the given [code]width[/code] and [code]height[/code]. New pixels are calculated using [code]interpolation[/code]. See [code]interpolation[/code] constants. */
resize(width: int, height: int, interpolation?: int): void;

/** Resizes the image to the nearest power of 2 for the width and height. If [code]square[/code] is [code]true[/code] then set width and height to be the same. */
resize_to_po2(square?: boolean): void;

/** Converts a standard RGBE (Red Green Blue Exponent) image to an sRGB image. */
rgbe_to_srgb(): Image;

/** Saves the image as an EXR file to [code]path[/code]. If [code]grayscale[/code] is [code]true[/code] and the image has only one channel, it will be saved explicitly as monochrome rather than one red channel. This function will return [constant ERR_UNAVAILABLE] if Godot was compiled without the TinyEXR module. */
save_exr(path: string, grayscale?: boolean): int;

/** Saves the image as a PNG file to [code]path[/code]. */
save_png(path: string): int;

/** No documentation provided. */
save_png_to_buffer(): PoolByteArray;

/**
 * Sets the [Color] of the pixel at `(x, y)` if the image is locked. Example:
 *
 * @example 
 * 
 * var img = Image.new()
 * img.create(img_width, img_height, false, Image.FORMAT_RGBA8)
 * img.lock()
 * img.set_pixel(x, y, color) # Works
 * img.unlock()
 * img.set_pixel(x, y, color) # Does not have an effect
 * @summary 
 * 
 *
*/
set_pixel(x: int, y: int, color: Color): void;

/**
 * Sets the [Color] of the pixel at `(dst.x, dst.y)` if the image is locked. Note that the `dst` values must be integers. Example:
 *
 * @example 
 * 
 * var img = Image.new()
 * img.create(img_width, img_height, false, Image.FORMAT_RGBA8)
 * img.lock()
 * img.set_pixelv(Vector2(x, y), color) # Works
 * img.unlock()
 * img.set_pixelv(Vector2(x, y), color) # Does not have an effect
 * @summary 
 * 
 *
*/
set_pixelv(dst: Vector2, color: Color): void;

/** Shrinks the image by a factor of 2. */
shrink_x2(): void;

/** Converts the raw data from the sRGB colorspace to a linear scale. */
srgb_to_linear(): void;

/** Unlocks the data and prevents changes. */
unlock(): void;

  connect<T extends SignalsOf<Image>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * The maximal width allowed for [Image] resources.
 *
*/
static MAX_WIDTH: 16384;

/**
 * The maximal height allowed for [Image] resources.
 *
*/
static MAX_HEIGHT: 16384;

/**
 * Texture format with a single 8-bit depth representing luminance.
 *
*/
static FORMAT_L8: 0;

/**
 * OpenGL texture format with two values, luminance and alpha each stored with 8 bits.
 *
*/
static FORMAT_LA8: 1;

/**
 * OpenGL texture format `RED` with a single component and a bitdepth of 8.
 *
*/
static FORMAT_R8: 2;

/**
 * OpenGL texture format `RG` with two components and a bitdepth of 8 for each.
 *
*/
static FORMAT_RG8: 3;

/**
 * OpenGL texture format `RGB` with three components, each with a bitdepth of 8.
 *
 * **Note:** When creating an [ImageTexture], an sRGB to linear color space conversion is performed.
 *
*/
static FORMAT_RGB8: 4;

/**
 * OpenGL texture format `RGBA` with four components, each with a bitdepth of 8.
 *
 * **Note:** When creating an [ImageTexture], an sRGB to linear color space conversion is performed.
 *
*/
static FORMAT_RGBA8: 5;

/**
 * OpenGL texture format `RGBA` with four components, each with a bitdepth of 4.
 *
*/
static FORMAT_RGBA4444: 6;

/**
 * OpenGL texture format `GL_RGB5_A1` where 5 bits of depth for each component of RGB and one bit for alpha.
 *
*/
static FORMAT_RGBA5551: 7;

/**
 * OpenGL texture format `GL_R32F` where there's one component, a 32-bit floating-point value.
 *
*/
static FORMAT_RF: 8;

/**
 * OpenGL texture format `GL_RG32F` where there are two components, each a 32-bit floating-point values.
 *
*/
static FORMAT_RGF: 9;

/**
 * OpenGL texture format `GL_RGB32F` where there are three components, each a 32-bit floating-point values.
 *
*/
static FORMAT_RGBF: 10;

/**
 * OpenGL texture format `GL_RGBA32F` where there are four components, each a 32-bit floating-point values.
 *
*/
static FORMAT_RGBAF: 11;

/**
 * OpenGL texture format `GL_R32F` where there's one component, a 16-bit "half-precision" floating-point value.
 *
*/
static FORMAT_RH: 12;

/**
 * OpenGL texture format `GL_RG32F` where there are two components, each a 16-bit "half-precision" floating-point value.
 *
*/
static FORMAT_RGH: 13;

/**
 * OpenGL texture format `GL_RGB32F` where there are three components, each a 16-bit "half-precision" floating-point value.
 *
*/
static FORMAT_RGBH: 14;

/**
 * OpenGL texture format `GL_RGBA32F` where there are four components, each a 16-bit "half-precision" floating-point value.
 *
*/
static FORMAT_RGBAH: 15;

/**
 * A special OpenGL texture format where the three color components have 9 bits of precision and all three share a single 5-bit exponent.
 *
*/
static FORMAT_RGBE9995: 16;

/**
 * The [url=https://en.wikipedia.org/wiki/S3_Texture_Compression]S3TC[/url] texture format that uses Block Compression 1, and is the smallest variation of S3TC, only providing 1 bit of alpha and color data being premultiplied with alpha.
 *
 * **Note:** When creating an [ImageTexture], an sRGB to linear color space conversion is performed.
 *
*/
static FORMAT_DXT1: 17;

/**
 * The [url=https://en.wikipedia.org/wiki/S3_Texture_Compression]S3TC[/url] texture format that uses Block Compression 2, and color data is interpreted as not having been premultiplied by alpha. Well suited for images with sharp alpha transitions between translucent and opaque areas.
 *
 * **Note:** When creating an [ImageTexture], an sRGB to linear color space conversion is performed.
 *
*/
static FORMAT_DXT3: 18;

/**
 * The [url=https://en.wikipedia.org/wiki/S3_Texture_Compression]S3TC[/url] texture format also known as Block Compression 3 or BC3 that contains 64 bits of alpha channel data followed by 64 bits of DXT1-encoded color data. Color data is not premultiplied by alpha, same as DXT3. DXT5 generally produces superior results for transparent gradients compared to DXT3.
 *
 * **Note:** When creating an [ImageTexture], an sRGB to linear color space conversion is performed.
 *
*/
static FORMAT_DXT5: 19;

/**
 * Texture format that uses [url=https://www.khronos.org/opengl/wiki/Red_Green_Texture_Compression]Red Green Texture Compression[/url], normalizing the red channel data using the same compression algorithm that DXT5 uses for the alpha channel.
 *
*/
static FORMAT_RGTC_R: 20;

/**
 * Texture format that uses [url=https://www.khronos.org/opengl/wiki/Red_Green_Texture_Compression]Red Green Texture Compression[/url], normalizing the red and green channel data using the same compression algorithm that DXT5 uses for the alpha channel.
 *
*/
static FORMAT_RGTC_RG: 21;

/**
 * Texture format that uses [url=https://www.khronos.org/opengl/wiki/BPTC_Texture_Compression]BPTC[/url] compression with unsigned normalized RGBA components.
 *
 * **Note:** When creating an [ImageTexture], an sRGB to linear color space conversion is performed.
 *
*/
static FORMAT_BPTC_RGBA: 22;

/**
 * Texture format that uses [url=https://www.khronos.org/opengl/wiki/BPTC_Texture_Compression]BPTC[/url] compression with signed floating-point RGB components.
 *
*/
static FORMAT_BPTC_RGBF: 23;

/**
 * Texture format that uses [url=https://www.khronos.org/opengl/wiki/BPTC_Texture_Compression]BPTC[/url] compression with unsigned floating-point RGB components.
 *
*/
static FORMAT_BPTC_RGBFU: 24;

/**
 * Texture format used on PowerVR-supported mobile platforms, uses 2-bit color depth with no alpha. More information can be found [url=https://en.wikipedia.org/wiki/PVRTC]here[/url].
 *
 * **Note:** When creating an [ImageTexture], an sRGB to linear color space conversion is performed.
 *
*/
static FORMAT_PVRTC2: 25;

/**
 * Same as [url=https://en.wikipedia.org/wiki/PVRTC]PVRTC2[/url], but with an alpha component.
 *
*/
static FORMAT_PVRTC2A: 26;

/**
 * Similar to [url=https://en.wikipedia.org/wiki/PVRTC]PVRTC2[/url], but with 4-bit color depth and no alpha.
 *
*/
static FORMAT_PVRTC4: 27;

/**
 * Same as [url=https://en.wikipedia.org/wiki/PVRTC]PVRTC4[/url], but with an alpha component.
 *
*/
static FORMAT_PVRTC4A: 28;

/**
 * [url=https://en.wikipedia.org/wiki/Ericsson_Texture_Compression#ETC1]Ericsson Texture Compression format 1[/url], also referred to as "ETC1", and is part of the OpenGL ES graphics standard. This format cannot store an alpha channel.
 *
*/
static FORMAT_ETC: 29;

/**
 * [url=https://en.wikipedia.org/wiki/Ericsson_Texture_Compression#ETC2_and_EAC]Ericsson Texture Compression format 2[/url] (`R11_EAC` variant), which provides one channel of unsigned data.
 *
*/
static FORMAT_ETC2_R11: 30;

/**
 * [url=https://en.wikipedia.org/wiki/Ericsson_Texture_Compression#ETC2_and_EAC]Ericsson Texture Compression format 2[/url] (`SIGNED_R11_EAC` variant), which provides one channel of signed data.
 *
*/
static FORMAT_ETC2_R11S: 31;

/**
 * [url=https://en.wikipedia.org/wiki/Ericsson_Texture_Compression#ETC2_and_EAC]Ericsson Texture Compression format 2[/url] (`RG11_EAC` variant), which provides two channels of unsigned data.
 *
*/
static FORMAT_ETC2_RG11: 32;

/**
 * [url=https://en.wikipedia.org/wiki/Ericsson_Texture_Compression#ETC2_and_EAC]Ericsson Texture Compression format 2[/url] (`SIGNED_RG11_EAC` variant), which provides two channels of signed data.
 *
*/
static FORMAT_ETC2_RG11S: 33;

/**
 * [url=https://en.wikipedia.org/wiki/Ericsson_Texture_Compression#ETC2_and_EAC]Ericsson Texture Compression format 2[/url] (`RGB8` variant), which is a follow-up of ETC1 and compresses RGB888 data.
 *
 * **Note:** When creating an [ImageTexture], an sRGB to linear color space conversion is performed.
 *
*/
static FORMAT_ETC2_RGB8: 34;

/**
 * [url=https://en.wikipedia.org/wiki/Ericsson_Texture_Compression#ETC2_and_EAC]Ericsson Texture Compression format 2[/url] (`RGBA8`variant), which compresses RGBA8888 data with full alpha support.
 *
 * **Note:** When creating an [ImageTexture], an sRGB to linear color space conversion is performed.
 *
*/
static FORMAT_ETC2_RGBA8: 35;

/**
 * [url=https://en.wikipedia.org/wiki/Ericsson_Texture_Compression#ETC2_and_EAC]Ericsson Texture Compression format 2[/url] (`RGB8_PUNCHTHROUGH_ALPHA1` variant), which compresses RGBA data to make alpha either fully transparent or fully opaque.
 *
 * **Note:** When creating an [ImageTexture], an sRGB to linear color space conversion is performed.
 *
*/
static FORMAT_ETC2_RGB8A1: 36;

/**
 * Represents the size of the [enum Format] enum.
 *
*/
static FORMAT_MAX: 37;

/**
 * Performs nearest-neighbor interpolation. If the image is resized, it will be pixelated.
 *
*/
static INTERPOLATE_NEAREST: 0;

/**
 * Performs bilinear interpolation. If the image is resized, it will be blurry. This mode is faster than [constant INTERPOLATE_CUBIC], but it results in lower quality.
 *
*/
static INTERPOLATE_BILINEAR: 1;

/**
 * Performs cubic interpolation. If the image is resized, it will be blurry. This mode often gives better results compared to [constant INTERPOLATE_BILINEAR], at the cost of being slower.
 *
*/
static INTERPOLATE_CUBIC: 2;

/**
 * Performs bilinear separately on the two most-suited mipmap levels, then linearly interpolates between them.
 *
 * It's slower than [constant INTERPOLATE_BILINEAR], but produces higher-quality results with much less aliasing artifacts.
 *
 * If the image does not have mipmaps, they will be generated and used internally, but no mipmaps will be generated on the resulting image.
 *
 * **Note:** If you intend to scale multiple copies of the original image, it's better to call [method generate_mipmaps]] on it in advance, to avoid wasting processing power in generating them again and again.
 *
 * On the other hand, if the image already has mipmaps, they will be used, and a new set will be generated for the resulting image.
 *
*/
static INTERPOLATE_TRILINEAR: 3;

/**
 * Performs Lanczos interpolation. This is the slowest image resizing mode, but it typically gives the best results, especially when downscalng images.
 *
*/
static INTERPOLATE_LANCZOS: 4;

/**
 * Image does not have alpha.
 *
*/
static ALPHA_NONE: 0;

/**
 * Image stores alpha in a single bit.
 *
*/
static ALPHA_BIT: 1;

/**
 * Image uses alpha.
 *
*/
static ALPHA_BLEND: 2;

/**
 * Use S3TC compression.
 *
*/
static COMPRESS_S3TC: 0;

/**
 * Use PVRTC2 compression.
 *
*/
static COMPRESS_PVRTC2: 1;

/**
 * Use PVRTC4 compression.
 *
*/
static COMPRESS_PVRTC4: 2;

/**
 * Use ETC compression.
 *
*/
static COMPRESS_ETC: 3;

/**
 * Use ETC2 compression.
 *
*/
static COMPRESS_ETC2: 4;

/**
 * Source texture (before compression) is a regular texture. Default for all textures.
 *
*/
static COMPRESS_SOURCE_GENERIC: 0;

/**
 * Source texture (before compression) is in sRGB space.
 *
*/
static COMPRESS_SOURCE_SRGB: 1;

/**
 * Source texture (before compression) is a normal texture (e.g. it can be compressed into two channels).
 *
*/
static COMPRESS_SOURCE_NORMAL: 2;


  
}
