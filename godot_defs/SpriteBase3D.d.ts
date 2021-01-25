
/**
 * A node that displays 2D texture information in a 3D environment.
 *
*/
declare class SpriteBase3D extends GeometryInstance {

  
/**
 * A node that displays 2D texture information in a 3D environment.
 *
*/
  "new"(): SpriteBase3D;
  static "new"(): SpriteBase3D;




/** The direction in which the front of the texture faces. */
axis: int;


/** If [code]true[/code], texture will be centered. */
centered: boolean;

/** If [code]true[/code], texture can be seen from the back as well, if [code]false[/code], it is invisible when looking at it from behind. */
double_sided: boolean;

/** If [code]true[/code], texture is flipped horizontally. */
flip_h: boolean;

/** If [code]true[/code], texture is flipped vertically. */
flip_v: boolean;

/** A color value that gets multiplied on, could be used for mood-coloring or to simulate the color of light. */
modulate: Color;

/** The texture's drawing offset. */
offset: Vector2;

/** The objects visibility on a scale from [code]0[/code] fully invisible to [code]1[/code] fully visible. */
opacity: float;

/** The size of one pixel's width on the sprite to scale it in 3D. */
pixel_size: float;

/** If [code]true[/code], the [Light] in the [Environment] has effects on the sprite. */
shaded: boolean;

/** If [code]true[/code], the texture's transparency and the opacity are used to make those parts of the sprite invisible. */
transparent: boolean;

/** No documentation provided. */
generate_triangle_mesh(): TriangleMesh;

/** Returns the value of the specified flag. */
get_draw_flag(flag: int): boolean;

/** Returns the rectangle representing this sprite. */
get_item_rect(): Rect2;

/** If [code]true[/code], the specified flag will be enabled. */
set_draw_flag(flag: int, enabled: boolean): void;

  connect<T extends SignalsOf<SpriteBase3D>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * If set, the texture's transparency and the opacity are used to make those parts of the sprite invisible.
 *
*/
static FLAG_TRANSPARENT: 0;

/**
 * If set, lights in the environment affect the sprite.
 *
*/
static FLAG_SHADED: 1;

/**
 * If set, texture can be seen from the back as well, if not, it is invisible when looking at it from behind.
 *
*/
static FLAG_DOUBLE_SIDED: 2;

/**
 * Represents the size of the [enum DrawFlags] enum.
 *
*/
static FLAG_MAX: 3;

/** No documentation provided. */
static ALPHA_CUT_DISABLED: 0;

/** No documentation provided. */
static ALPHA_CUT_DISCARD: 1;

/** No documentation provided. */
static ALPHA_CUT_OPAQUE_PREPASS: 2;


  
}
