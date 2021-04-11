
/**
 * A node that displays a 2D texture. The texture displayed can be a region from a larger atlas texture, or a frame from a sprite sheet animation.
 *
*/
declare class Sprite extends Node2D {

  
/**
 * A node that displays a 2D texture. The texture displayed can be a region from a larger atlas texture, or a frame from a sprite sheet animation.
 *
*/
  "new"(): Sprite;
  static "new"(): Sprite;



/** If [code]true[/code], texture is centered. */
centered: boolean;

/** If [code]true[/code], texture is flipped horizontally. */
flip_h: boolean;

/** If [code]true[/code], texture is flipped vertically. */
flip_v: boolean;

/** Current frame to display from sprite sheet. [member vframes] or [member hframes] must be greater than 1. */
frame: int;

/** Coordinates of the frame to display from sprite sheet. This is as an alias for the [member frame] property. [member vframes] or [member hframes] must be greater than 1. */
frame_coords: Vector2;

/** The number of columns in the sprite sheet. */
hframes: int;

/**
 * The normal map gives depth to the Sprite.
 *
 * **Note:** Godot expects the normal map to use X+, Y-, and Z+ coordinates. See [url=http://wiki.polycount.com/wiki/Normal_Map_Technical_Details#Common_Swizzle_Coordinates]this page[/url] for a comparison of normal map coordinates expected by popular engines.
 *
*/
normal_map: Texture;

/** The texture's drawing offset. */
offset: Vector2;

/** If [code]true[/code], texture is cut from a larger atlas texture. See [member region_rect]. */
region_enabled: boolean;

/** If [code]true[/code], the outermost pixels get blurred out. */
region_filter_clip: boolean;

/** The region of the atlas texture to display. [member region_enabled] must be [code]true[/code]. */
region_rect: Rect2;

/** [Texture] object to draw. */
texture: Texture;

/** The number of rows in the sprite sheet. */
vframes: int;

/**
 * Returns a [Rect2] representing the Sprite's boundary in local coordinates. Can be used to detect if the Sprite was clicked. Example:
 *
 * @example 
 * 
 * func _input(event):
 *     if event is InputEventMouseButton and event.pressed and event.button_index == BUTTON_LEFT:
 *         if get_rect().has_point(to_local(event.position)):
 *             print("A click!")
 * @summary 
 * 
 *
*/
get_rect(): Rect2;

/**
 * Returns `true`, if the pixel at the given position is opaque and `false` in other case.
 *
 * **Note:** It also returns `false`, if the sprite's texture is `null` or if the given position is invalid.
 *
*/
is_pixel_opaque(pos: Vector2): boolean;

  connect<T extends SignalsOf<Sprite>, U extends Node>(signal: T, node: U, method: keyof U): number;





  /**
 * Emitted when the [member frame] changes.
 *
*/
frame_changed: Signal<() => void>

/**
 * Emitted when the [member texture] changes.
 *
*/
texture_changed: Signal<() => void>

}
