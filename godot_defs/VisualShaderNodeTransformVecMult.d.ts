
/**
 * A multiplication operation on a transform (4x4 matrix) and a vector, with support for different multiplication operators.
 *
*/
declare class VisualShaderNodeTransformVecMult extends VisualShaderNode {

  
/**
 * A multiplication operation on a transform (4x4 matrix) and a vector, with support for different multiplication operators.
 *
*/
  "new"(): VisualShaderNodeTransformVecMult;
  static "new"(): VisualShaderNodeTransformVecMult;



/** The multiplication type to be performed. See [enum Operator] for options. */
operator: int;



  connect<T extends SignalsOf<VisualShaderNodeTransformVecMult>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Multiplies transform `a` by the vector `b`.
 *
*/
static OP_AxB: 0;

/**
 * Multiplies vector `b` by the transform `a`.
 *
*/
static OP_BxA: 1;

/**
 * Multiplies transform `a` by the vector `b`, skipping the last row and column of the transform.
 *
*/
static OP_3x3_AxB: 2;

/**
 * Multiplies vector `b` by the transform `a`, skipping the last row and column of the transform.
 *
*/
static OP_3x3_BxA: 3;


  
}
