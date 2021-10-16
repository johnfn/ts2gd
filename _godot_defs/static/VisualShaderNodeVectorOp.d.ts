
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



  // connect<T extends SignalsOf<VisualShaderNodeVectorOp>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisualShaderNodeVectorOpSignals>>(signal: T, method: SignalFunction<VisualShaderNodeVectorOpSignals[T]>): number;



/**
 * Adds two vectors.
 *
*/
static OP_ADD: any;

/**
 * Subtracts a vector from a vector.
 *
*/
static OP_SUB: any;

/**
 * Multiplies two vectors.
 *
*/
static OP_MUL: any;

/**
 * Divides vector by vector.
 *
*/
static OP_DIV: any;

/**
 * Returns the remainder of the two vectors.
 *
*/
static OP_MOD: any;

/**
 * Returns the value of the first parameter raised to the power of the second, for each component of the vectors.
 *
*/
static OP_POW: any;

/**
 * Returns the greater of two values, for each component of the vectors.
 *
*/
static OP_MAX: any;

/**
 * Returns the lesser of two values, for each component of the vectors.
 *
*/
static OP_MIN: any;

/**
 * Calculates the cross product of two vectors.
 *
*/
static OP_CROSS: any;

/**
 * Returns the arc-tangent of the parameters.
 *
*/
static OP_ATAN2: any;

/**
 * Returns the vector that points in the direction of reflection. `a` is incident vector and `b` is the normal vector.
 *
*/
static OP_REFLECT: any;

/**
 * Vector step operator. Returns `0.0` if `a` is smaller than `b` and `1.0` otherwise.
 *
*/
static OP_STEP: any;

}

declare class VisualShaderNodeVectorOpSignals extends VisualShaderNodeSignals {
  
}
