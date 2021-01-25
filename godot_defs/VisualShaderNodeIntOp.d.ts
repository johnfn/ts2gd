
/**
 * Applies [member operator] to two integer inputs: `a` and `b`.
 *
*/
declare class VisualShaderNodeIntOp extends VisualShaderNode {

  
/**
 * Applies [member operator] to two integer inputs: `a` and `b`.
 *
*/
  "new"(): this;
  static "new"(): this;



/** An operator to be applied to the inputs. See [enum Operator] for options. */
operator: int;



  connect<T extends SignalsOf<VisualShaderNodeIntOp>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Sums two numbers using `a + b`.
 *
*/
static OP_ADD: 0;

/**
 * Subtracts two numbers using `a - b`.
 *
*/
static OP_SUB: 1;

/**
 * Multiplies two numbers using `a * b`.
 *
*/
static OP_MUL: 2;

/**
 * Divides two numbers using `a / b`.
 *
*/
static OP_DIV: 3;

/**
 * Calculates the remainder of two numbers using `a % b`.
 *
*/
static OP_MOD: 4;

/**
 * Returns the greater of two numbers. Translates to `max(a, b)` in the Godot Shader Language.
 *
*/
static OP_MAX: 5;

/**
 * Returns the lesser of two numbers. Translates to `max(a, b)` in the Godot Shader Language.
 *
*/
static OP_MIN: 6;


  
}


 
