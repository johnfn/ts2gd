
/**
 * 3-element structure that can be used to represent positions in 3D space or any other pair of numeric values.
 *
 * **Note:** In a boolean context, a Vector3 will evaluate to `false` if it's equal to `Vector3(0, 0, 0)`. Otherwise, a Vector3 will always evaluate to `true`.
 *
*/
declare class Vector3Constructor {

  
/**
 * 3-element structure that can be used to represent positions in 3D space or any other pair of numeric values.
 *
 * **Note:** In a boolean context, a Vector3 will evaluate to `false` if it's equal to `Vector3(0, 0, 0)`. Otherwise, a Vector3 will always evaluate to `true`.
 *
*/


/** The vector's X component. Also accessible by using the index position [code][0][/code]. */
x: float;

/** The vector's Y component. Also accessible by using the index position [code][1][/code]. */
y: float;

/** The vector's Z component. Also accessible by using the index position [code][2][/code]. */
z: float;



/** Returns a new vector with all components in absolute values (i.e. positive). */
abs(): Vector3;

/** Returns the unsigned minimum angle to the given vector, in radians. */
angle_to(to: Vector3): float;

/** Returns the vector "bounced off" from a plane defined by the given normal. */
bounce(n: Vector3): Vector3;

/** Returns a new vector with all components rounded up (towards positive infinity). */
ceil(): Vector3;

/** Returns the cross product of this vector and [code]b[/code]. */
cross(b: Vector3): Vector3;

/** Performs a cubic interpolation between vectors [code]pre_a[/code], [code]a[/code], [code]b[/code], [code]post_b[/code] ([code]a[/code] is current), by the given amount [code]weight[/code]. [code]weight[/code] is on the range of 0.0 to 1.0, representing the amount of interpolation. */
cubic_interpolate(b: Vector3, pre_a: Vector3, post_b: Vector3, weight: float): Vector3;

/** Returns the normalized vector pointing from this vector to [code]b[/code]. This is equivalent to using [code](b - a).normalized()[/code]. */
direction_to(b: Vector3): Vector3;

/**
 * Returns the squared distance between this vector and `b`.
 *
 * This method runs faster than [method distance_to], so prefer it if you need to compare vectors or need the squared distance for some formula.
 *
*/
distance_squared_to(b: Vector3): float;

/** Returns the distance between this vector and [code]b[/code]. */
distance_to(b: Vector3): float;

/**
 * Returns the dot product of this vector and `b`. This can be used to compare the angle between two vectors. For example, this can be used to determine whether an enemy is facing the player.
 *
 * The dot product will be `0` for a straight angle (90 degrees), greater than 0 for angles narrower than 90 degrees and lower than 0 for angles wider than 90 degrees.
 *
 * When using unit (normalized) vectors, the result will always be between `-1.0` (180 degree angle) when the vectors are facing opposite directions, and `1.0` (0 degree angle) when the vectors are aligned.
 *
 * **Note:** `a.dot(b)` is equivalent to `b.dot(a)`.
 *
*/
dot(b: Vector3): float;

/** Returns a new vector with all components rounded down (towards negative infinity). */
floor(): Vector3;

/** Returns the inverse of the vector. This is the same as [code]Vector3( 1.0 / v.x, 1.0 / v.y, 1.0 / v.z )[/code]. */
inverse(): Vector3;

/** Returns [code]true[/code] if this vector and [code]v[/code] are approximately equal, by running [method @GDScript.is_equal_approx] on each component. */
is_equal_approx(v: Vector3): boolean;

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

/** Returns the result of the linear interpolation between this vector and [code]to[/code] by amount [code]t[/code]. [code]weight[/code] is on the range of 0.0 to 1.0, representing the amount of interpolation. */
linear_interpolate(to: Vector3, weight: float): Vector3;

/** Returns the axis of the vector's largest value. See [code]AXIS_*[/code] constants. If all components are equal, this method returns [constant AXIS_X]. */
max_axis(): int;

/** Returns the axis of the vector's smallest value. See [code]AXIS_*[/code] constants. If all components are equal, this method returns [constant AXIS_Z]. */
min_axis(): int;

/** Moves this vector toward [code]to[/code] by the fixed [code]delta[/code] amount. */
move_toward(to: Vector3, delta: float): Vector3;

/** Returns the vector scaled to unit length. Equivalent to [code]v / v.length()[/code]. */
normalized(): Vector3;

/** Returns the outer product with [code]b[/code]. */
outer(b: Vector3): Basis;

/** Returns a vector composed of the [method @GDScript.fposmod] of this vector's components and [code]mod[/code]. */
posmod(mod: float): Vector3;

/** Returns a vector composed of the [method @GDScript.fposmod] of this vector's components and [code]modv[/code]'s components. */
posmodv(modv: Vector3): Vector3;

/** Returns this vector projected onto another vector [code]b[/code]. */
project(b: Vector3): Vector3;

/** Returns this vector reflected from a plane defined by the given normal. */
reflect(n: Vector3): Vector3;

/** Rotates this vector around a given axis by [code]phi[/code] radians. The axis must be a normalized vector. */
rotated(axis: Vector3, phi: float): Vector3;

/** Returns this vector with all components rounded to the nearest integer, with halfway cases rounded away from zero. */
round(): Vector3;

/** Returns a vector with each component set to one or negative one, depending on the signs of this vector's components. If a component is zero, it returns positive one. */
sign(): Vector3;

/** Returns the signed angle to the given vector, in radians. The sign of the angle is positive in a counter-clockwise direction and negative in a clockwise direction when viewed from the side specified by the [code]axis[/code]. */
signed_angle_to(to: Vector3, axis: Vector3): float;

/**
 * Returns the result of spherical linear interpolation between this vector and `to`, by amount `weight`. `weight` is on the range of 0.0 to 1.0, representing the amount of interpolation.
 *
 * **Note:** Both vectors must be normalized.
 *
*/
slerp(to: Vector3, weight: float): Vector3;

/** Returns this vector slid along a plane defined by the given normal. */
slide(n: Vector3): Vector3;

/** Returns this vector with each component snapped to the nearest multiple of [code]step[/code]. This can also be used to round to an arbitrary number of decimals. */
snapped(by: Vector3): Vector3;

/**
 * Returns a diagonal matrix with the vector as main diagonal.
 *
 * This is equivalent to a Basis with no rotation or shearing and this vector's components set as the scale.
 *
*/
to_diagonal_matrix(): Basis;

  connect<T extends SignalsOf<Vector3>>(signal: T, method: SignalFunction<Vector3[T]>): number;


add(other: number | Vector3): Vector3;
sub(other: number | Vector3): Vector3;
mul(other: number | Vector3): Vector3;
div(other: number | Vector3): Vector3;


/**
 * Enumerated value for the X axis. Returned by [method max_axis] and [method min_axis].
 *
*/
static AXIS_X: any;

/**
 * Enumerated value for the Y axis. Returned by [method max_axis] and [method min_axis].
 *
*/
static AXIS_Y: any;

/**
 * Enumerated value for the Z axis. Returned by [method max_axis] and [method min_axis].
 *
*/
static AXIS_Z: any;

/**
 * Zero vector, a vector with all components set to `0`.
 *
*/
static ZERO: Vector3;

/**
 * One vector, a vector with all components set to `1`.
 *
*/
static ONE: Vector3;

/**
 * Infinity vector, a vector with all components set to [constant @GDScript.INF].
 *
*/
static INF: Vector3;

/**
 * Left unit vector. Represents the local direction of left, and the global direction of west.
 *
*/
static LEFT: Vector3;

/**
 * Right unit vector. Represents the local direction of right, and the global direction of east.
 *
*/
static RIGHT: Vector3;

/**
 * Up unit vector.
 *
*/
static UP: Vector3;

/**
 * Down unit vector.
 *
*/
static DOWN: Vector3;

/**
 * Forward unit vector. Represents the local direction of forward, and the global direction of north.
 *
*/
static FORWARD: Vector3;

/**
 * Back unit vector. Represents the local direction of back, and the global direction of south.
 *
*/
static BACK: Vector3;



}

declare type Vector3 = Vector3Constructor;
declare var Vector3: typeof Vector3Constructor & {
  
  new(x: float, y: float, z: float): Vector3;

  (x: float, y: float, z: float): Vector3;

}
