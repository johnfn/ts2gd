
/**
 * 2-element structure that can be used to represent positions in 2D space or any other pair of numeric values.
 *
 * **Note:** In a boolean context, a Vector2 will evaluate to `false` if it's equal to `Vector2(0, 0)`. Otherwise, a Vector2 will always evaluate to `true`.
 *
*/
declare class Vector2Constructor {

  
/**
 * 2-element structure that can be used to represent positions in 2D space or any other pair of numeric values.
 *
 * **Note:** In a boolean context, a Vector2 will evaluate to `false` if it's equal to `Vector2(0, 0)`. Otherwise, a Vector2 will always evaluate to `true`.
 *
*/


/** The vector's X component. Also accessible by using the index position [code][0][/code]. */
x: float;

/** The vector's Y component. Also accessible by using the index position [code][1][/code]. */
y: float;



/** Returns a new vector with all components in absolute values (i.e. positive). */
abs(): Vector2;

/**
 * Returns this vector's angle with respect to the positive X axis, or `(1, 0)` vector, in radians.
 *
 * For example, `Vector2.RIGHT.angle()` will return zero, `Vector2.DOWN.angle()` will return `PI / 2` (a quarter turn, or 90 degrees), and `Vector2(1, -1).angle()` will return `-PI / 4` (a negative eighth turn, or -45 degrees).
 *
 * [url=https://raw.githubusercontent.com/godotengine/godot-docs/master/img/vector2_angle.png]Illustration of the returned angle.[/url]
 *
 * Equivalent to the result of [method @GDScript.atan2] when called with the vector's [member y] and [member x] as parameters: `atan2(y, x)`.
 *
*/
angle(): float;

/**
 * Returns the angle to the given vector, in radians.
 *
 * [url=https://raw.githubusercontent.com/godotengine/godot-docs/master/img/vector2_angle_to.png]Illustration of the returned angle.[/url]
 *
*/
angle_to(to: Vector2): float;

/**
 * Returns the angle between the line connecting the two points and the X axis, in radians.
 *
 * [url=https://raw.githubusercontent.com/godotengine/godot-docs/master/img/vector2_angle_to_point.png]Illustration of the returned angle.[/url]
 *
*/
angle_to_point(to: Vector2): float;

/** Returns the aspect ratio of this vector, the ratio of [member x] to [member y]. */
aspect(): float;

/** Returns the vector "bounced off" from a plane defined by the given normal. */
bounce(n: Vector2): Vector2;

/** Returns the vector with all components rounded up (towards positive infinity). */
ceil(): Vector2;

/** Returns the vector with a maximum length by limiting its length to [code]length[/code]. */
clamped(length: float): Vector2;

/** Returns the cross product of this vector and [code]with[/code]. */
cross(_with: Vector2): float;

/** Cubically interpolates between this vector and [code]b[/code] using [code]pre_a[/code] and [code]post_b[/code] as handles, and returns the result at position [code]weight[/code]. [code]weight[/code] is on the range of 0.0 to 1.0, representing the amount of interpolation. */
cubic_interpolate(b: Vector2, pre_a: Vector2, post_b: Vector2, weight: float): Vector2;

/** Returns the normalized vector pointing from this vector to [code]b[/code]. This is equivalent to using [code](b - a).normalized()[/code]. */
direction_to(b: Vector2): Vector2;

/**
 * Returns the squared distance between this vector and `b`.
 *
 * This method runs faster than [method distance_to], so prefer it if you need to compare vectors or need the squared distance for some formula.
 *
*/
distance_squared_to(to: Vector2): float;

/** Returns the distance between this vector and [code]to[/code]. */
distance_to(to: Vector2): float;

/**
 * Returns the dot product of this vector and `with`. This can be used to compare the angle between two vectors. For example, this can be used to determine whether an enemy is facing the player.
 *
 * The dot product will be `0` for a straight angle (90 degrees), greater than 0 for angles narrower than 90 degrees and lower than 0 for angles wider than 90 degrees.
 *
 * When using unit (normalized) vectors, the result will always be between `-1.0` (180 degree angle) when the vectors are facing opposite directions, and `1.0` (0 degree angle) when the vectors are aligned.
 *
 * **Note:** `a.dot(b)` is equivalent to `b.dot(a)`.
 *
*/
dot(_with: Vector2): float;

/** Returns the vector with all components rounded down (towards negative infinity). */
floor(): Vector2;

/** Returns [code]true[/code] if this vector and [code]v[/code] are approximately equal, by running [method @GDScript.is_equal_approx] on each component. */
is_equal_approx(v: Vector2): boolean;

/** Returns [code]true[/code] if the vector is normalized, [code]false[/code] otherwise. */
is_normalized(): boolean;

/** Returns the length (magnitude) of this vector. */
length(): float;

/**
 * Returns the squared length (squared magnitude) of this vector.
 *
 * This method runs faster than [method length], so prefer it if you need to compare vectors or need the squared distance for some formula.
 *
*/
length_squared(): float;

/** Returns the result of the linear interpolation between this vector and [code]to[/code] by amount [code]weight[/code]. [code]weight[/code] is on the range of 0.0 to 1.0, representing the amount of interpolation. */
linear_interpolate(to: Vector2, weight: float): Vector2;

/** Moves the vector toward [code]to[/code] by the fixed [code]delta[/code] amount. */
move_toward(to: Vector2, delta: float): Vector2;

/** Returns the vector scaled to unit length. Equivalent to [code]v / v.length()[/code]. */
normalized(): Vector2;

/** Returns a vector composed of the [method @GDScript.fposmod] of this vector's components and [code]mod[/code]. */
posmod(mod: float): Vector2;

/** Returns a vector composed of the [method @GDScript.fposmod] of this vector's components and [code]modv[/code]'s components. */
posmodv(modv: Vector2): Vector2;

/** Returns the vector projected onto the vector [code]b[/code]. */
project(b: Vector2): Vector2;

/** Returns the vector reflected from a plane defined by the given normal. */
reflect(n: Vector2): Vector2;

/** Returns the vector rotated by [code]phi[/code] radians. See also [method @GDScript.deg2rad]. */
rotated(phi: float): Vector2;

/** Returns the vector with all components rounded to the nearest integer, with halfway cases rounded away from zero. */
round(): Vector2;

/** Returns the vector with each component set to one or negative one, depending on the signs of the components. If a component is zero, it returns positive one. */
sign(): Vector2;

/**
 * Returns the result of spherical linear interpolation between this vector and `to`, by amount `weight`. `weight` is on the range of 0.0 to 1.0, representing the amount of interpolation.
 *
 * **Note:** Both vectors must be normalized.
 *
*/
slerp(to: Vector2, weight: float): Vector2;

/** Returns this vector slid along a plane defined by the given normal. */
slide(n: Vector2): Vector2;

/** Returns this vector with each component snapped to the nearest multiple of [code]step[/code]. This can also be used to round to an arbitrary number of decimals. */
snapped(by: Vector2): Vector2;

/** Returns a perpendicular vector rotated 90 degrees counter-clockwise compared to the original, with the same length. */
tangent(): Vector2;

  connect<T extends SignalsOf<Vector2>>(signal: T, method: SignalFunction<Vector2[T]>): number;


add(other: number | Vector2): Vector2;
sub(other: number | Vector2): Vector2;
mul(other: number | Vector2): Vector2;
div(other: number | Vector2): Vector2;


/**
 * Enumerated value for the X axis.
 *
*/
static AXIS_X: any;

/**
 * Enumerated value for the Y axis.
 *
*/
static AXIS_Y: any;

/**
 * Zero vector, a vector with all components set to `0`.
 *
*/
static ZERO: Vector2;

/**
 * One vector, a vector with all components set to `1`.
 *
*/
static ONE: Vector2;

/**
 * Infinity vector, a vector with all components set to [constant @GDScript.INF].
 *
*/
static INF: Vector2;

/**
 * Left unit vector. Represents the direction of left.
 *
*/
static LEFT: Vector2;

/**
 * Right unit vector. Represents the direction of right.
 *
*/
static RIGHT: Vector2;

/**
 * Up unit vector. Y is down in 2D, so this vector points -Y.
 *
*/
static UP: Vector2;

/**
 * Down unit vector. Y is down in 2D, so this vector points +Y.
 *
*/
static DOWN: Vector2;



}

declare type Vector2 = Vector2Constructor;
declare var Vector2: typeof Vector2Constructor & {
  
  new(x: float, y: float): Vector2;

  (x: float, y: float): Vector2;

}
