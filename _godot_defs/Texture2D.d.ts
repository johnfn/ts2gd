
/**
 * A texture works by registering an image in the video hardware, which then can be used in 3D models or 2D [Sprite2D] or GUI [Control].
 *
 * Textures are often created by loading them from a file. See [method @GDScript.load].
 *
 * [Texture2D] is a base for other resources. It cannot be used directly.
 *
*/
declare class Texture2D extends Texture {

  
/**
 * A texture works by registering an image in the video hardware, which then can be used in 3D models or 2D [Sprite2D] or GUI [Control].
 *
 * Textures are often created by loading them from a file. See [method @GDScript.load].
 *
 * [Texture2D] is a base for other resources. It cannot be used directly.
 *
*/
  "new"(): this;
  static "new"(): this;




/** Draws the texture using a [CanvasItem] with the [RenderingServer] API at the specified [code]position[/code]. */
draw(canvas_item: RID, position: Vector2, modulate?: Color, transpose?: boolean, normal_map?: Texture2D, specular_map?: Texture2D, specular_color_shininess?: Color, texture_filter?: int, texture_repeat?: int): void;

/** Draws the texture using a [CanvasItem] with the [RenderingServer] API. */
draw_rect(canvas_item: RID, rect: Rect2, tile: boolean, modulate?: Color, transpose?: boolean, normal_map?: Texture2D, specular_map?: Texture2D, specular_color_shininess?: Color, texture_filter?: int, texture_repeat?: int): void;

/** Draws a part of the texture using a [CanvasItem] with the [RenderingServer] API. */
draw_rect_region(canvas_item: RID, rect: Rect2, src_rect: Rect2, modulate?: Color, transpose?: boolean, normal_map?: Texture2D, specular_map?: Texture2D, specular_color_shininess?: Color, texture_filter?: int, texture_repeat?: int, clip_uv?: boolean): void;

/** Returns an [Image] that is a copy of data from this [Texture2D]. [Image]s can be accessed and manipulated directly. */
get_data(): Image;

/** Returns the texture height. */
get_height(): int;

/** Returns the texture size. */
get_size(): Vector2;

/** Returns the texture width. */
get_width(): int;

/** Returns [code]true[/code] if this [Texture2D] has an alpha channel. */
has_alpha(): boolean;

  connect<T extends SignalsOf<Texture2D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
