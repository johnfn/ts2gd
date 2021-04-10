
/**
 * Applies [member operator] to two floating-point inputs: `a` and `b`.
 *
*/
declare class VisualShaderNodeFloatOp extends VisualShaderNode {

  
/**
 * Applies [member operator] to two floating-point inputs: `a` and `b`.
 *
*/
  "new"(): this;
  static "new"(): this;



/** An operator to be applied to the inputs. See [enum Operator] for options. */
operator: int;



  connect<T extends SignalsOf<VisualShaderNodeFloatOp>, U extends Node>(signal: T, node: U, method: keyof U): number;



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
 * Calculates the remainder of two numbers. Translates to `mod(a, b)` in the Godot Shader Language.
 *
*/
static OP_MOD: 4;

/**
 * Raises the `a` to the power of `b`. Translates to `pow(a, b)` in the Godot Shader Language.
 *
*/
static OP_POW: 5;

/**
 * Returns the greater of two numbers. Translates to `max(a, b)` in the Godot Shader Language.
 *
*/
static OP_MAX: 6;

/**
 * Returns the lesser of two numbers. Translates to `min(a, b)` in the Godot Shader Language.
 *
*/
static OP_MIN: 7;

/**
 * Returns the arc-tangent of the parameters. Translates to `atan(a, b)` in the Godot Shader Language.
 *
*/
static OP_ATAN2: 8;

/**
 * Generates a step function by comparing `b`(x) to `a`(edge). Returns 0.0 if `x` is smaller than `edge` and otherwise 1.0. Translates to `step(a, b)` in the Godot Shader Language.
 *
*/
static OP_STEP: 9;


  
}


 
