
/**
 * A texture works by registering an image in the video hardware, which then can be used in 3D models or 2D [Sprite] or GUI [Control].
 *
 * Textures are often created by loading them from a file. See [method @GDScript.load].
 *
 * [Texture] is a base for other resources. It cannot be used directly.
 *
*/
declare class Texture extends Resource {

  
/**
 * A texture works by registering an image in the video hardware, which then can be used in 3D models or 2D [Sprite] or GUI [Control].
 *
 * Textures are often created by loading them from a file. See [method @GDScript.load].
 *
 * [Texture] is a base for other resources. It cannot be used directly.
 *
*/
  "new"(): Texture;
  static "new"(): Texture;



/** The texture's [enum Flags]. [enum Flags] are used to set various properties of the [Texture]. */
flags: int;

/** Draws the texture using a [CanvasItem] with the [VisualServer] API at the specified [code]position[/code]. Equivalent to [method VisualServer.canvas_item_add_texture_rect] with a rect at [code]position[/code] and the size of this [Texture]. */
draw(canvas_item: RID, position: Vector2, modulate?: Color, transpose?: boolean, normal_map?: Texture): void;

/** Draws the texture using a [CanvasItem] with the [VisualServer] API. Equivalent to [method VisualServer.canvas_item_add_texture_rect]. */
draw_rect(canvas_item: RID, rect: Rect2, tile: boolean, modulate?: Color, transpose?: boolean, normal_map?: Texture): void;

/** Draws a part of the texture using a [CanvasItem] with the [VisualServer] API. Equivalent to [method VisualServer.canvas_item_add_texture_rect_region]. */
draw_rect_region(canvas_item: RID, rect: Rect2, src_rect: Rect2, modulate?: Color, transpose?: boolean, normal_map?: Texture, clip_uv?: boolean): void;

/** Returns an [Image] that is a copy of data from this [Texture]. [Image]s can be accessed and manipulated directly. */
get_data(): Image;

/** Returns the texture height. */
get_height(): int;

/** Returns the texture size. */
get_size(): Vector2;

/** Returns the texture width. */
get_width(): int;

/** Returns [code]true[/code] if this [Texture] has an alpha channel. */
has_alpha(): boolean;

  connect<T extends SignalsOf<Texture>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Default flags. [constant FLAG_MIPMAPS], [constant FLAG_REPEAT] and [constant FLAG_FILTER] are enabled.
 *
*/
static FLAGS_DEFAULT: 7;

/**
 * Generates mipmaps, which are smaller versions of the same texture to use when zoomed out, keeping the aspect ratio.
 *
*/
static FLAG_MIPMAPS: 1;

/**
 * Repeats the texture (instead of clamp to edge).
 *
*/
static FLAG_REPEAT: 2;

/**
 * Uses a magnifying filter, to enable smooth zooming in of the texture.
 *
*/
static FLAG_FILTER: 4;

/**
 * Uses anisotropic mipmap filtering. Generates smaller versions of the same texture with different aspect ratios.
 *
 * This results in better-looking textures when viewed from oblique angles.
 *
*/
static FLAG_ANISOTROPIC_FILTER: 8;

/**
 * Converts the texture to the sRGB color space.
 *
*/
static FLAG_CONVERT_TO_LINEAR: 16;

/**
 * Repeats the texture with alternate sections mirrored.
 *
*/
static FLAG_MIRRORED_REPEAT: 32;

/**
 * Texture is a video surface.
 *
*/
static FLAG_VIDEO_SURFACE: 2048;


  
}
