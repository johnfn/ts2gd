
/**
 * This class describes a Bézier curve in 2D space. It is mainly used to give a shape to a [Path2D], but can be manually sampled for other purposes.
 *
 * It keeps a cache of precalculated points along the curve, to speed up further calculations.
 *
*/
declare class Curve2D extends Resource {

  
/**
 * This class describes a Bézier curve in 2D space. It is mainly used to give a shape to a [Path2D], but can be manually sampled for other purposes.
 *
 * It keeps a cache of precalculated points along the curve, to speed up further calculations.
 *
*/
  "new"(): Curve2D;
  static "new"(): Curve2D;



/** The distance in pixels between two adjacent cached points. Changing it forces the cache to be recomputed the next time the [method get_baked_points] or [method get_baked_length] function is called. The smaller the distance, the more points in the cache and the more memory it will consume, so use with care. */
bake_interval: float;

/**
 * Adds a point to a curve at `position`, with control points `in` and `out`.
 *
 * If `at_position` is given, the point is inserted before the point number `at_position`, moving that point (and every point after) after the inserted point. If `at_position` is not given, or is an illegal value (`at_position <0` or `at_position >= [method get_point_count]`), the point will be appended at the end of the point list.
 *
*/
add_point(position: Vector2, _in?: Vector2, out?: Vector2, at_position?: int): void;

/** Removes all points from the curve. */
clear_points(): void;

/** Returns the total length of the curve, based on the cached points. Given enough density (see [member bake_interval]), it should be approximate enough. */
get_baked_length(): float;

/** Returns the cache of points as a [PoolVector2Array]. */
get_baked_points(): PoolVector2Array;

/**
 * Returns the closest offset to `to_point`. This offset is meant to be used in [method interpolate_baked].
 *
 * `to_point` must be in this curve's local space.
 *
*/
get_closest_offset(to_point: Vector2): float;

/**
 * Returns the closest point (in curve's local space) to `to_point`.
 *
 * `to_point` must be in this curve's local space.
 *
*/
get_closest_point(to_point: Vector2): Vector2;

/** Returns the number of points describing the curve. */
get_point_count(): int;

/** Returns the position of the control point leading to the vertex [code]idx[/code]. If the index is out of bounds, the function sends an error to the console, and returns [code](0, 0)[/code]. */
get_point_in(idx: int): Vector2;

/** Returns the position of the control point leading out of the vertex [code]idx[/code]. If the index is out of bounds, the function sends an error to the console, and returns [code](0, 0)[/code]. */
get_point_out(idx: int): Vector2;

/** Returns the position of the vertex [code]idx[/code]. If the index is out of bounds, the function sends an error to the console, and returns [code](0, 0)[/code]. */
get_point_position(idx: int): Vector2;

/**
 * Returns the position between the vertex `idx` and the vertex `idx + 1`, where `t` controls if the point is the first vertex (`t = 0.0`), the last vertex (`t = 1.0`), or in between. Values of `t` outside the range (`0.0 >= t <=1`) give strange, but predictable results.
 *
 * If `idx` is out of bounds it is truncated to the first or last vertex, and `t` is ignored. If the curve has no points, the function sends an error to the console, and returns `(0, 0)`.
 *
*/
interpolate(idx: int, t: float): Vector2;

/**
 * Returns a point within the curve at position `offset`, where `offset` is measured as a pixel distance along the curve.
 *
 * To do that, it finds the two cached points where the `offset` lies between, then interpolates the values. This interpolation is cubic if `cubic` is set to `true`, or linear if set to `false`.
 *
 * Cubic interpolation tends to follow the curves better, but linear is faster (and often, precise enough).
 *
*/
interpolate_baked(offset: float, cubic?: boolean): Vector2;

/** Returns the position at the vertex [code]fofs[/code]. It calls [method interpolate] using the integer part of [code]fofs[/code] as [code]idx[/code], and its fractional part as [code]t[/code]. */
interpolatef(fofs: float): Vector2;

/** Deletes the point [code]idx[/code] from the curve. Sends an error to the console if [code]idx[/code] is out of bounds. */
remove_point(idx: int): void;

/** Sets the position of the control point leading to the vertex [code]idx[/code]. If the index is out of bounds, the function sends an error to the console. */
set_point_in(idx: int, position: Vector2): void;

/** Sets the position of the control point leading out of the vertex [code]idx[/code]. If the index is out of bounds, the function sends an error to the console. */
set_point_out(idx: int, position: Vector2): void;

/** Sets the position for the vertex [code]idx[/code]. If the index is out of bounds, the function sends an error to the console. */
set_point_position(idx: int, position: Vector2): void;

/**
 * Returns a list of points along the curve, with a curvature controlled point density. That is, the curvier parts will have more points than the straighter parts.
 *
 * This approximation makes straight segments between each point, then subdivides those segments until the resulting shape is similar enough.
 *
 * `max_stages` controls how many subdivisions a curve segment may face before it is considered approximate enough. Each subdivision splits the segment in half, so the default 5 stages may mean up to 32 subdivisions per curve segment. Increase with care!
 *
 * `tolerance_degrees` controls how many degrees the midpoint of a segment may deviate from the real curve, before the segment has to be subdivided.
 *
*/
tessellate(max_stages?: int, tolerance_degrees?: float): PoolVector2Array;

  connect<T extends SignalsOf<Curve2D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
