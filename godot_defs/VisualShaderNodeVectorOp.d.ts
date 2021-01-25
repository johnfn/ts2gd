
/**
 * A visual shader node for use of vector operators. Operates on vector `a` and vector `b`.
 *
*/
declare class VisualShaderNodeVectorOp extends VisualShaderNode {

  
/**
 * A visual shader node for use of vector operators. Operates on vector `a` and vector `b`.
 *
*/
  "new"(): VisualShaderNodeVectorOp;
  static "new"(): VisualShaderNodeVectorOp;



/** The operator to be used. See [enum Operator] for options. */
operator: int;



  connect<T extends SignalsOf<VisualShaderNodeVectorOp>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Adds two vectors.
 *
*/
static OP_ADD: 0;

/**
 * Subtracts a vector from a vector.
 *
*/
static OP_SUB: 1;

/**
 * Multiplies two vectors.
 *
*/
static OP_MUL: 2;

/**
 * Divides vector by vector.
 *
*/
static OP_DIV: 3;

/**
 * Returns the remainder of the two vectors.
 *
*/
static OP_MOD: 4;

/**
 * Returns the value of the first parameter raised to the power of the second, for each component of the vectors.
 *
*/
static OP_POW: 5;

/**
 * Returns the greater of two values, for each component of the vectors.
 *
*/
static OP_MAX: 6;

/**
 * Returns the lesser of two values, for each component of the vectors.
 *
*/
static OP_MIN: 7;

/**
 * Calculates the cross product of two vectors.
 *
*/
static OP_CROSS: 8;

/**
 * Returns the arc-tangent of the parameters.
 *
*/
static OP_ATAN2: 9;

/**
 * Returns the vector that points in the direction of reflection. `a` is incident vector and `b` is the normal vector.
 *
*/
static OP_REFLECT: 10;

/**
 * Vector step operator. Returns `0.0` if `a` is smaller than `b` and `1.0` otherwise.
 *
*/
static OP_STEP: 11;


  
}
