
/**
 * 3-element structure that can be used to represent positions in 3D space or any other pair of numeric values.
 *
 * It uses integer coordinates and is therefore preferable to [Vector3] when exact precision is required.
 *
 * **Note:** In a boolean context, a Vector3i will evaluate to `false` if it's equal to `Vector3i(0, 0, 0)`. Otherwise, a Vector3i will always evaluate to `true`.
 *
*/
declare class Vector3i {

  
/**
 * 3-element structure that can be used to represent positions in 3D space or any other pair of numeric values.
 *
 * It uses integer coordinates and is therefore preferable to [Vector3] when exact precision is required.
 *
 * **Note:** In a boolean context, a Vector3i will evaluate to `false` if it's equal to `Vector3i(0, 0, 0)`. Otherwise, a Vector3i will always evaluate to `true`.
 *
*/

  constructor(x: int, y: int, z: int);
  constructor(from: Vector3);
  static "new"(): this;



/** The vector's X component. Also accessible by using the index position [code][0][/code]. */
x: int;

/** The vector's Y component. Also accessible by using the index position [code][1][/code]. */
y: int;

/** The vector's Z component. Also accessible by using the index position [code][2][/code]. */
z: int;





/** Returns the axis of the vector's largest value. See [code]AXIS_*[/code] constants. If all components are equal, this method returns [constant AXIS_X]. */
max_axis(): int;

/** Returns the axis of the vector's smallest value. See [code]AXIS_*[/code] constants. If all components are equal, this method returns [constant AXIS_Z]. */
min_axis(): int;

/** Returns the vector with each component set to one or negative one, depending on the signs of the components. */
sign(): Vector3i;

  connect<T extends SignalsOf<Vector3i>, U extends Node>(signal: T, node: U, method: keyof U): number;


add(other: number | Vector3i): Vector3i;
sub(other: number | Vector3i): Vector3i;
mul(other: number | Vector3i): Vector3i;
div(other: number | Vector3i): Vector3i;


/**
 * Enumerated value for the X axis.
 *
*/
static AXIS_X: 0;

/**
 * Enumerated value for the Y axis.
 *
*/
static AXIS_Y: 1;

/**
 * Enumerated value for the Z axis.
 *
*/
static AXIS_Z: 2;

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


 
