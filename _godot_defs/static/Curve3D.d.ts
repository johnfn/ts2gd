
/**
 * This class describes a Bézier curve in 3D space. It is mainly used to give a shape to a [Path], but can be manually sampled for other purposes.
 *
 * It keeps a cache of precalculated points along the curve, to speed up further calculations.
 *
*/
declare class Curve3D extends Resource  {

  
/**
 * This class describes a Bézier curve in 3D space. It is mainly used to give a shape to a [Path], but can be manually sampled for other purposes.
 *
 * It keeps a cache of precalculated points along the curve, to speed up further calculations.
 *
*/
  new(): Curve3D; 
  static "new"(): Curve3D 


/** The distance in meters between two adjacent cached points. Changing it forces the cache to be recomputed the next time the [method get_baked_points] or [method get_baked_length] function is called. The smaller the distance, the more points in the cache and the more memory it will consume, so use with care. */
bake_interval: float;

/** If [code]true[/code], the curve will bake up vectors used for orientation. This is used when [member PathFollow.rotation_mode] is set to [constant PathFollow.ROTATION_ORIENTED]. Changing it forces the cache to be recomputed. */
up_vector_enabled: boolean;

/**
 * Adds a point to a curve at `position`, with control points `in` and `out`.
 *
 * If `at_position` is given, the point is inserted before the point number `at_position`, moving that point (and every point after) after the inserted point. If `at_position` is not given, or is an illegal value (`at_position <0` or `at_position >= [method get_point_count]`), the point will be appended at the end of the point list.
 *
*/
add_point(position: Vector3, _in?: Vector3, out?: Vector3, at_position?: int): void;

/** Removes all points from the curve. */
clear_points(): void;

/** Returns the total length of the curve, based on the cached points. Given enough density (see [member bake_interval]), it should be approximate enough. */
get_baked_length(): float;

/** Returns the cache of points as a [PoolVector3Array]. */
get_baked_points(): PoolVector3Array;

/** Returns the cache of tilts as a [PoolRealArray]. */
get_baked_tilts(): PoolRealArray;

/**
 * Returns the cache of up vectors as a [PoolVector3Array].
 *
 * If [member up_vector_enabled] is `false`, the cache will be empty.
 *
*/
get_baked_up_vectors(): PoolVector3Array;

/**
 * Returns the closest offset to `to_point`. This offset is meant to be used in [method interpolate_baked] or [method interpolate_baked_up_vector].
 *
 * `to_point` must be in this curve's local space.
 *
*/
get_closest_offset(to_point: Vector3): float;

/**
 * Returns the closest baked point (in curve's local space) to `to_point`.
 *
 * `to_point` must be in this curve's local space.
 *
*/
get_closest_point(to_point: Vector3): Vector3;

/** Returns the number of points describing the curve. */
get_point_count(): int;

/** Returns the position of the control point leading to the vertex [code]idx[/code]. The returned position is relative to the vertex [code]idx[/code]. If the index is out of bounds, the function sends an error to the console, and returns [code](0, 0, 0)[/code]. */
get_point_in(idx: int): Vector3;

/** Returns the position of the control point leading out of the vertex [code]idx[/code]. The returned position is relative to the vertex [code]idx[/code]. If the index is out of bounds, the function sends an error to the console, and returns [code](0, 0, 0)[/code]. */
get_point_out(idx: int): Vector3;

/** Returns the position of the vertex [code]idx[/code]. If the index is out of bounds, the function sends an error to the console, and returns [code](0, 0, 0)[/code]. */
get_point_position(idx: int): Vector3;

/** Returns the tilt angle in radians for the point [code]idx[/code]. If the index is out of bounds, the function sends an error to the console, and returns [code]0[/code]. */
get_point_tilt(idx: int): float;

/**
 * Returns the position between the vertex `idx` and the vertex `idx + 1`, where `t` controls if the point is the first vertex (`t = 0.0`), the last vertex (`t = 1.0`), or in between. Values of `t` outside the range (`0.0 >= t <=1`) give strange, but predictable results.
 *
 * If `idx` is out of bounds it is truncated to the first or last vertex, and `t` is ignored. If the curve has no points, the function sends an error to the console, and returns `(0, 0, 0)`.
 *
*/
interpolate(idx: int, t: float): Vector3;

/**
 * Returns a point within the curve at position `offset`, where `offset` is measured as a distance in 3D units along the curve.
 *
 * To do that, it finds the two cached points where the `offset` lies between, then interpolates the values. This interpolation is cubic if `cubic` is set to `true`, or linear if set to `false`.
 *
 * Cubic interpolation tends to follow the curves better, but linear is faster (and often, precise enough).
 *
*/
interpolate_baked(offset: float, cubic?: boolean): Vector3;

/**
 * Returns an up vector within the curve at position `offset`, where `offset` is measured as a distance in 3D units along the curve.
 *
 * To do that, it finds the two cached up vectors where the `offset` lies between, then interpolates the values. If `apply_tilt` is `true`, an interpolated tilt is applied to the interpolated up vector.
 *
 * If the curve has no up vectors, the function sends an error to the console, and returns `(0, 1, 0)`.
 *
*/
interpolate_baked_up_vector(offset: float, apply_tilt?: boolean): Vector3;

/** Returns the position at the vertex [code]fofs[/code]. It calls [method interpolate] using the integer part of [code]fofs[/code] as [code]idx[/code], and its fractional part as [code]t[/code]. */
interpolatef(fofs: float): Vector3;

/** Deletes the point [code]idx[/code] from the curve. Sends an error to the console if [code]idx[/code] is out of bounds. */
remove_point(idx: int): void;

/** Sets the position of the control point leading to the vertex [code]idx[/code]. If the index is out of bounds, the function sends an error to the console. The position is relative to the vertex. */
set_point_in(idx: int, position: Vector3): void;

/** Sets the position of the control point leading out of the vertex [code]idx[/code]. If the index is out of bounds, the function sends an error to the console. The position is relative to the vertex. */
set_point_out(idx: int, position: Vector3): void;

/** Sets the position for the vertex [code]idx[/code]. If the index is out of bounds, the function sends an error to the console. */
set_point_position(idx: int, position: Vector3): void;

/**
 * Sets the tilt angle in radians for the point `idx`. If the index is out of bounds, the function sends an error to the console.
 *
 * The tilt controls the rotation along the look-at axis an object traveling the path would have. In the case of a curve controlling a [PathFollow], this tilt is an offset over the natural tilt the [PathFollow] calculates.
 *
*/
set_point_tilt(idx: int, tilt: float): void;

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
tessellate(max_stages?: int, tolerance_degrees?: float): PoolVector3Array;

  connect<T extends SignalsOf<Curve3D>>(signal: T, method: SignalFunction<Curve3D[T]>): number;






}

