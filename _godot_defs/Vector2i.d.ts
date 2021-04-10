
/**
 * 2-element structure that can be used to represent positions in 2D space or any other pair of numeric values.
 *
 * It uses integer coordinates and is therefore preferable to [Vector2] when exact precision is required.
 *
 * **Note:** In a boolean context, a Vector2i will evaluate to `false` if it's equal to `Vector2i(0, 0)`. Otherwise, a Vector2i will always evaluate to `true`.
 *
*/
declare class Vector2i {

  
/**
 * 2-element structure that can be used to represent positions in 2D space or any other pair of numeric values.
 *
 * It uses integer coordinates and is therefore preferable to [Vector2] when exact precision is required.
 *
 * **Note:** In a boolean context, a Vector2i will evaluate to `false` if it's equal to `Vector2i(0, 0)`. Otherwise, a Vector2i will always evaluate to `true`.
 *
*/

  constructor(x: int, y: int);
  constructor(from: Vector2);
  static "new"(): this;



/** The vector's X component. Also accessible by using the index position [code][0][/code]. */
x: int;

/** The vector's Y component. Also accessible by using the index position [code][1][/code]. */
y: int;





/** Returns a new vector with all components in absolute values (i.e. positive). */
abs(): Vector2i;

/** Returns the ratio of [member x] to [member y]. */
aspect(): float;

/** Returns the vector with each component set to one or negative one, depending on the signs of the components. */
sign(): Vector2i;

  connect<T extends SignalsOf<Vector2i>, U extends Node>(signal: T, node: U, method: keyof U): number;


add(other: number | Vector2i): Vector2i;
sub(other: number | Vector2i): Vector2i;
mul(other: number | Vector2i): Vector2i;
div(other: number | Vector2i): Vector2i;


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


 
