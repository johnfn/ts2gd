
/**
 * Uses three operands to compute `(a * b + c)` expression.
 *
*/
declare class VisualShaderNodeMultiplyAdd extends VisualShaderNode {

  
/**
 * Uses three operands to compute `(a * b + c)` expression.
 *
*/
  "new"(): this;
  static "new"(): this;



/** A type of operands and returned value. */
op_type: int;



  connect<T extends SignalsOf<VisualShaderNodeMultiplyAdd>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * A scalar type.
 *
*/
static OP_TYPE_SCALAR: 0;

/**
 * A vector type.
 *
*/
static OP_TYPE_VECTOR: 1;

/**
 * Represents the size of the [enum OpType] enum.
 *
*/
static OP_TYPE_MAX: 2;


  
}


 
