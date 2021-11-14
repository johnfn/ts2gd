
/**
 * A curve that can be saved and re-used for other objects. By default, it ranges between `0` and `1` on the Y axis and positions points relative to the `0.5` Y position.
 *
*/
declare class Curve extends Resource  {

  
/**
 * A curve that can be saved and re-used for other objects. By default, it ranges between `0` and `1` on the Y axis and positions points relative to the `0.5` Y position.
 *
*/
  new(): Curve; 
  static "new"(): Curve 


/** The number of points to include in the baked (i.e. cached) curve data. */
bake_resolution: int;

/** The maximum value the curve can reach. */
max_value: float;

/** The minimum value the curve can reach. */
min_value: float;

/** Adds a point to the curve. For each side, if the [code]*_mode[/code] is [constant TANGENT_LINEAR], the [code]*_tangent[/code] angle (in degrees) uses the slope of the curve halfway to the adjacent point. Allows custom assignments to the [code]*_tangent[/code] angle if [code]*_mode[/code] is set to [constant TANGENT_FREE]. */
add_point(position: Vector2, left_tangent?: float, right_tangent?: float, left_mode?: int, right_mode?: int): int;

/** Recomputes the baked cache of points for the curve. */
bake(): void;

/** Removes points that are closer than [code]CMP_EPSILON[/code] (0.00001) units to their neighbor on the curve. */
clean_dupes(): void;

/** Removes all points from the curve. */
clear_points(): void;

/** Returns the number of points describing the curve. */
get_point_count(): int;

/** Returns the left [enum TangentMode] for the point at [code]index[/code]. */
get_point_left_mode(index: int): int;

/** Returns the left tangent angle (in degrees) for the point at [code]index[/code]. */
get_point_left_tangent(index: int): float;

/** Returns the curve coordinates for the point at [code]index[/code]. */
get_point_position(index: int): Vector2;

/** Returns the right [enum TangentMode] for the point at [code]index[/code]. */
get_point_right_mode(index: int): int;

/** Returns the right tangent angle (in degrees) for the point at [code]index[/code]. */
get_point_right_tangent(index: int): float;

/** Returns the Y value for the point that would exist at the X position [code]offset[/code] along the curve. */
interpolate(offset: float): float;

/** Returns the Y value for the point that would exist at the X position [code]offset[/code] along the curve using the baked cache. Bakes the curve's points if not already baked. */
interpolate_baked(offset: float): float;

/** Removes the point at [code]index[/code] from the curve. */
remove_point(index: int): void;

/** Sets the left [enum TangentMode] for the point at [code]index[/code] to [code]mode[/code]. */
set_point_left_mode(index: int, mode: int): void;

/** Sets the left tangent angle for the point at [code]index[/code] to [code]tangent[/code]. */
set_point_left_tangent(index: int, tangent: float): void;

/** Sets the offset from [code]0.5[/code]. */
set_point_offset(index: int, offset: float): int;

/** Sets the right [enum TangentMode] for the point at [code]index[/code] to [code]mode[/code]. */
set_point_right_mode(index: int, mode: int): void;

/** Sets the right tangent angle for the point at [code]index[/code] to [code]tangent[/code]. */
set_point_right_tangent(index: int, tangent: float): void;

/** Assigns the vertical position [code]y[/code] to the point at [code]index[/code]. */
set_point_value(index: int, y: float): void;

  connect<T extends SignalsOf<Curve>>(signal: T, method: SignalFunction<Curve[T]>): number;



/**
 * The tangent on this side of the point is user-defined.
 *
*/
static TANGENT_FREE: any;

/**
 * The curve calculates the tangent on this side of the point as the slope halfway towards the adjacent point.
 *
*/
static TANGENT_LINEAR: any;

/**
 * The total number of available tangent modes.
 *
*/
static TANGENT_MODE_COUNT: any;


/**
 * Emitted when [member max_value] or [member min_value] is changed.
 *
*/
$range_changed: Signal<() => void>

}

