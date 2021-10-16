
/**
 * Given a set of colors, this resource will interpolate them in order. This means that if you have color 1, color 2 and color 3, the ramp will interpolate from color 1 to color 2 and from color 2 to color 3. The ramp will initially have 2 colors (black and white), one (black) at ramp lower offset 0 and the other (white) at the ramp higher offset 1.
 *
*/
declare class Gradient extends Resource {

  
/**
 * Given a set of colors, this resource will interpolate them in order. This means that if you have color 1, color 2 and color 3, the ramp will interpolate from color 1 to color 2 and from color 2 to color 3. The ramp will initially have 2 colors (black and white), one (black) at ramp lower offset 0 and the other (white) at the ramp higher offset 1.
 *
*/
  "new"(): Gradient;
  static "new"(): Gradient;



/** Gradient's colors returned as a [PoolColorArray]. */
colors: PoolColorArray;

/** Gradient's offsets returned as a [PoolRealArray]. */
offsets: PoolRealArray;

/** Adds the specified color to the end of the ramp, with the specified offset. */
add_point(offset: float, color: Color): void;

/** Returns the color of the ramp color at index [code]point[/code]. */
get_color(point: int): Color;

/** Returns the offset of the ramp color at index [code]point[/code]. */
get_offset(point: int): float;

/** Returns the number of colors in the ramp. */
get_point_count(): int;

/** Returns the interpolated color specified by [code]offset[/code]. */
interpolate(offset: float): Color;

/** Removes the color at the index [code]point[/code]. */
remove_point(point: int): void;

/** Sets the color of the ramp color at index [code]point[/code]. */
set_color(point: int, color: Color): void;

/** Sets the offset for the ramp color at index [code]point[/code]. */
set_offset(point: int, offset: float): void;

  // connect<T extends SignalsOf<Gradient>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<GradientSignals>>(signal: T, method: SignalFunction<GradientSignals[T]>): number;




}

declare class GradientSignals extends ResourceSignals {
  
}
