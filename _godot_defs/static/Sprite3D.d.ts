
/**
 * A node that displays a 2D texture in a 3D environment. The texture displayed can be a region from a larger atlas texture, or a frame from a sprite sheet animation.
 *
*/
declare class Sprite3D extends SpriteBase3D  {

  
/**
 * A node that displays a 2D texture in a 3D environment. The texture displayed can be a region from a larger atlas texture, or a frame from a sprite sheet animation.
 *
*/
  new(): Sprite3D; 
  static "new"(): Sprite3D 


/** Current frame to display from sprite sheet. [member hframes] or [member vframes] must be greater than 1. */
frame: int;

/** Coordinates of the frame to display from sprite sheet. This is as an alias for the [member frame] property. [member hframes] or [member vframes] must be greater than 1. */
frame_coords: Vector2;

/** The number of columns in the sprite sheet. */
hframes: int;

/** If [code]true[/code], texture will be cut from a larger atlas texture. See [member region_rect]. */
region_enabled: boolean;

/** The region of the atlas texture to display. [member region_enabled] must be [code]true[/code]. */
region_rect: Rect2;

/** [Texture] object to draw. If [member GeometryInstance.material_override] is used, this will be overridden. */
texture: Texture;

/** The number of rows in the sprite sheet. */
vframes: int;



  connect<T extends SignalsOf<Sprite3D>>(signal: T, method: SignalFunction<Sprite3D[T]>): number;





/**
 * Emitted when the [member frame] changes.
 *
*/
$frame_changed: Signal<() => void>

}

