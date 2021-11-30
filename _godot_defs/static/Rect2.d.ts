
/**
 * [Rect2] consists of a position, a size, and several utility functions. It is typically used for fast overlap tests.
 *
 * It uses floating-point coordinates.
 *
 * The 3D counterpart to [Rect2] is [AABB].
 *
*/
declare class Rect2Constructor {

  
/**
 * [Rect2] consists of a position, a size, and several utility functions. It is typically used for fast overlap tests.
 *
 * It uses floating-point coordinates.
 *
 * The 3D counterpart to [Rect2] is [AABB].
 *
*/


/** Ending corner. This is calculated as [code]position + size[/code]. Setting this value will change the size. */
end: Vector2;

/** Beginning corner. Typically has values lower than [member end]. */
position: Vector2;

/**
 * Size from [member position] to [member end]. Typically, all components are positive.
 *
 * If the size is negative, you can use [method abs] to fix it.
 *
*/
size: Vector2;





/** Returns a [Rect2] with equivalent position and area, modified so that the top-left corner is the origin and [code]width[/code] and [code]height[/code] are positive. */
abs(): Rect2;

/** Returns the intersection of this [Rect2] and b. */
clip(b: Rect2): Rect2;

/** Returns [code]true[/code] if this [Rect2] completely encloses another one. */
encloses(b: Rect2): boolean;

/**
 * Returns a copy of this [Rect2] expanded to include a given point.
 *
 * **Example:**
 *
 * @example 
 * 
 * # position (-3, 2), size (1, 1)
 * var rect = Rect2(Vector2(-3, 2), Vector2(1, 1))
 * # position (-3, -1), size (3, 4), so we fit both rect and Vector2(0, -1)
 * var rect2 = rect.expand(Vector2(0, -1))
 * @summary 
 * 
 *
*/
expand(to: Vector2): Rect2;

/** Returns the area of the [Rect2]. */
get_area(): float;

/** Returns a copy of the [Rect2] grown a given amount of units towards all the sides. */
grow(by: float): Rect2;

/** Returns a copy of the [Rect2] grown a given amount of units towards each direction individually. */
grow_individual(left: float, top: float, right: float,  bottom: float): Rect2;

/** Returns a copy of the [Rect2] grown a given amount of units towards the [enum Margin] direction. */
grow_margin(margin: int, by: float): Rect2;

/** Returns [code]true[/code] if the [Rect2] is flat or empty. */
has_no_area(): boolean;

/**
 * Returns `true` if the [Rect2] contains a point. By convention, the right and bottom edges of the [Rect2] are considered exclusive, so points on these edges are **not** included.
 *
 * **Note:** This method is not reliable for [Rect2] with a **negative size**. Use [method abs] to get a positive sized equivalent rectangle to check for contained points.
 *
*/
has_point(point: Vector2): boolean;

/**
 * Returns `true` if the [Rect2] overlaps with `b` (i.e. they have at least one point in common).
 *
 * If `include_borders` is `true`, they will also be considered overlapping if their borders touch, even without intersection.
 *
*/
intersects(b: Rect2, include_borders?: boolean): boolean;

/** Returns [code]true[/code] if this [Rect2] and [code]rect[/code] are approximately equal, by calling [code]is_equal_approx[/code] on each component. */
is_equal_approx(rect: Rect2): boolean;

/** Returns a larger [Rect2] that contains this [Rect2] and [code]b[/code]. */
merge(b: Rect2): Rect2;

  connect<T extends SignalsOf<Rect2>>(signal: T, method: SignalFunction<Rect2[T]>): number;






}

declare type Rect2 = Rect2Constructor;
declare var Rect2: typeof Rect2Constructor & {
  
  new(position: Vector2, size: Vector2): Rect2;
  new(x: float, y: float, width: float, height: float): Rect2;

  (position: Vector2, size: Vector2): Rect2;
  (x: float, y: float, width: float, height: float): Rect2;

}
