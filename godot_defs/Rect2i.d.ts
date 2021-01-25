
/**
 * [Rect2i] consists of a position, a size, and several utility functions. It is typically used for fast overlap tests.
 *
 * It uses integer coordinates. If you need floating-point coordinates, use [Rect2] instead.
 *
*/
declare class Rect2i {

  
/**
 * [Rect2i] consists of a position, a size, and several utility functions. It is typically used for fast overlap tests.
 *
 * It uses integer coordinates. If you need floating-point coordinates, use [Rect2] instead.
 *
*/

  constructor(position: Vector2, size: Vector2);
  constructor(x: int, y: int, width: int, height: int);
  constructor(from: Rect2);
  static "new"(): this;



/** Ending corner. This is calculated as [code]position + size[/code]. Setting this value will change the size. */
end: Vector2i;

/** Beginning corner. Typically has values lower than [member end]. */
position: Vector2i;

/**
 * Size from [member position] to [member end]. Typically all components are positive.
 *
 * If the size is negative, you can use [method abs] to fix it.
 *
*/
size: Vector2i;







/** Returns a [Rect2i] with equivalent position and area, modified so that the top-left corner is the origin and [code]width[/code] and [code]height[/code] are positive. */
abs(): Rect2i;

/** Returns the intersection of this [Rect2i] and b. */
clip(b: Rect2i): Rect2i;

/** Returns [code]true[/code] if this [Rect2i] completely encloses another one. */
encloses(b: Rect2i): boolean;

/** Returns this [Rect2i] expanded to include a given point. */
expand(to: Vector2i): Rect2i;

/** Returns the area of the [Rect2i]. */
get_area(): int;

/** Returns a copy of the [Rect2i] grown a given amount of units towards all the sides. */
grow(by: int): Rect2i;

/** Returns a copy of the [Rect2i] grown a given amount of units towards each direction individually. */
grow_individual(left: int, top: int, right: int,  bottom: int): Rect2i;

/** Returns a copy of the [Rect2i] grown a given amount of units towards the [enum Margin] direction. */
grow_margin(margin: int, by: int): Rect2i;

/** Returns [code]true[/code] if the [Rect2i] is flat or empty. */
has_no_area(): boolean;

/** Returns [code]true[/code] if the [Rect2i] contains a point. */
has_point(point: Vector2i): boolean;

/**
 * Returns `true` if the [Rect2i] overlaps with `b` (i.e. they have at least one point in common).
 *
 * If `include_borders` is `true`, they will also be considered overlapping if their borders touch, even without intersection.
 *
*/
intersects(b: Rect2i): boolean;

/** Returns a larger [Rect2i] that contains this [Rect2i] and [code]b[/code]. */
merge(b: Rect2i): Rect2i;

  connect<T extends SignalsOf<Rect2i>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
