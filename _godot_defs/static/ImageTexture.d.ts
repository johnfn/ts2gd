
/**
 * A [Texture] based on an [Image]. For an image to be displayed, an [ImageTexture] has to be created from it using the [method create_from_image] method:
 *
 * @example 
 * 
 * var texture = ImageTexture.new()
 * var image = Image.new()
 * image.load("res://icon.png")
 * texture.create_from_image(image)
 * $Sprite.texture = texture
 * @summary 
 * 
 *
 * This way, textures can be created at run-time by loading images both from within the editor and externally.
 *
 * **Warning:** Prefer to load imported textures with [method @GDScript.load] over loading them from within the filesystem dynamically with [method Image.load], as it may not work in exported projects:
 *
 * @example 
 * 
 * var texture = load("res://icon.png")
 * $Sprite.texture = texture
 * @summary 
 * 
 *
 * This is because images have to be imported as [StreamTexture] first to be loaded with [method @GDScript.load]. If you'd still like to load an image file just like any other [Resource], import it as an [Image] resource instead, and then load it normally using the [method @GDScript.load] method.
 *
 * But do note that the image data can still be retrieved from an imported texture as well using the [method Texture.get_data] method, which returns a copy of the data:
 *
 * @example 
 * 
 * var texture = load("res://icon.png")
 * var image : Image = texture.get_data()
 * @summary 
 * 
 *
 * An [ImageTexture] is not meant to be operated from within the editor interface directly, and is mostly useful for rendering images on screen dynamically via code. If you need to generate images procedurally from within the editor, consider saving and importing images as custom texture resources implementing a new [EditorImportPlugin].
 *
 * **Note:** The maximum texture size is 16384×16384 pixels due to graphics hardware limitations.
 *
*/
declare class ImageTexture extends Texture  {

  
/**
 * A [Texture] based on an [Image]. For an image to be displayed, an [ImageTexture] has to be created from it using the [method create_from_image] method:
 *
 * @example 
 * 
 * var texture = ImageTexture.new()
 * var image = Image.new()
 * image.load("res://icon.png")
 * texture.create_from_image(image)
 * $Sprite.texture = texture
 * @summary 
 * 
 *
 * This way, textures can be created at run-time by loading images both from within the editor and externally.
 *
 * **Warning:** Prefer to load imported textures with [method @GDScript.load] over loading them from within the filesystem dynamically with [method Image.load], as it may not work in exported projects:
 *
 * @example 
 * 
 * var texture = load("res://icon.png")
 * $Sprite.texture = texture
 * @summary 
 * 
 *
 * This is because images have to be imported as [StreamTexture] first to be loaded with [method @GDScript.load]. If you'd still like to load an image file just like any other [Resource], import it as an [Image] resource instead, and then load it normally using the [method @GDScript.load] method.
 *
 * But do note that the image data can still be retrieved from an imported texture as well using the [method Texture.get_data] method, which returns a copy of the data:
 *
 * @example 
 * 
 * var texture = load("res://icon.png")
 * var image : Image = texture.get_data()
 * @summary 
 * 
 *
 * An [ImageTexture] is not meant to be operated from within the editor interface directly, and is mostly useful for rendering images on screen dynamically via code. If you need to generate images procedurally from within the editor, consider saving and importing images as custom texture resources implementing a new [EditorImportPlugin].
 *
 * **Note:** The maximum texture size is 16384×16384 pixels due to graphics hardware limitations.
 *
*/
  new(): ImageTexture; 
  static "new"(): ImageTexture 



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

/** Initializes the texture by allocating and setting the data from an [Image] with [code]flags[/code] from [enum Texture.Flags]. An sRGB to linear color space conversion can take place, according to [enum Image.Format]. */
create_from_image(image: Image, flags?: int): void;

/** Returns the format of the texture, one of [enum Image.Format]. */
get_format(): int;

/**
 * Loads an image from a file path and creates a texture from it.
 *
 * **Note:** This method is deprecated and will be removed in Godot 4.0, use [method Image.load] and [method create_from_image] instead.
 *
*/
load(path: string): int;

/**
 * Replaces the texture's data with a new [Image].
 *
 * **Note:** The texture has to be initialized first with the [method create_from_image] method before it can be updated. The new image dimensions, format, and mipmaps configuration should match the existing texture's image configuration, otherwise it has to be re-created with the [method create_from_image] method.
 *
 * Use this method over [method create_from_image] if you need to update the texture frequently, which is faster than allocating additional memory for a new texture each time.
 *
*/
set_data(image: Image): void;

/** Resizes the texture to the specified dimensions. */
set_size_override(size: Vector2): void;

  connect<T extends SignalsOf<ImageTexture>>(signal: T, method: SignalFunction<ImageTexture[T]>): number;



/**
 * [Image] data is stored raw and unaltered.
 *
*/
static STORAGE_RAW: any;

/**
 * [Image] data is compressed with a lossy algorithm. You can set the storage quality with [member lossy_quality].
 *
*/
static STORAGE_COMPRESS_LOSSY: any;

/**
 * [Image] data is compressed with a lossless algorithm.
 *
*/
static STORAGE_COMPRESS_LOSSLESS: any;



}

