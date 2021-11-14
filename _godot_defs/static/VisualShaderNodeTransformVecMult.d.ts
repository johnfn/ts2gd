
/**
 * A multiplication operation on a transform (4x4 matrix) and a vector, with support for different multiplication operators.
 *
*/
declare class VisualShaderNodeTransformVecMult extends VisualShaderNode  {

  
/**
 * A multiplication operation on a transform (4x4 matrix) and a vector, with support for different multiplication operators.
 *
*/
  new(): VisualShaderNodeTransformVecMult; 
  static "new"(): VisualShaderNodeTransformVecMult 


/** The multiplication type to be performed. See [enum Operator] for options. */
operator: int;



  connect<T extends SignalsOf<VisualShaderNodeTransformVecMult>>(signal: T, method: SignalFunction<VisualShaderNodeTransformVecMult[T]>): number;



/**
 * Multiplies transform `a` by the vector `b`.
 *
*/
static OP_AxB: any;

/**
 * Multiplies vector `b` by the transform `a`.
 *
*/
static OP_BxA: any;

/**
 * Multiplies transform `a` by the vector `b`, skipping the last row and column of the transform.
 *
*/
static OP_3x3_AxB: any;

/**
 * Multiplies vector `b` by the transform `a`, skipping the last row and column of the transform.
 *
*/
static OP_3x3_BxA: any;



}

