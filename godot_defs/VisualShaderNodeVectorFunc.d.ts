
/**
 * A visual shader node able to perform different functions using vectors.
 *
*/
declare class VisualShaderNodeVectorFunc extends VisualShaderNode {

  
/**
 * A visual shader node able to perform different functions using vectors.
 *
*/
  "new"(): VisualShaderNodeVectorFunc;
  static "new"(): VisualShaderNodeVectorFunc;



/** The function to be performed. See [enum Function] for options. */
function: int;



  connect<T extends SignalsOf<VisualShaderNodeVectorFunc>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Normalizes the vector so that it has a length of `1` but points in the same direction.
 *
*/
static FUNC_NORMALIZE: 0;

/**
 * Clamps the value between `0.0` and `1.0`.
 *
*/
static FUNC_SATURATE: 1;

/**
 * Returns the opposite value of the parameter.
 *
*/
static FUNC_NEGATE: 2;

/**
 * Returns `1/vector`.
 *
*/
static FUNC_RECIPROCAL: 3;

/**
 * Converts RGB vector to HSV equivalent.
 *
*/
static FUNC_RGB2HSV: 4;

/**
 * Converts HSV vector to RGB equivalent.
 *
*/
static FUNC_HSV2RGB: 5;

/**
 * Returns the absolute value of the parameter.
 *
*/
static FUNC_ABS: 6;

/**
 * Returns the arc-cosine of the parameter.
 *
*/
static FUNC_ACOS: 7;

/**
 * Returns the inverse hyperbolic cosine of the parameter.
 *
*/
static FUNC_ACOSH: 8;

/**
 * Returns the arc-sine of the parameter.
 *
*/
static FUNC_ASIN: 9;

/**
 * Returns the inverse hyperbolic sine of the parameter.
 *
*/
static FUNC_ASINH: 10;

/**
 * Returns the arc-tangent of the parameter.
 *
*/
static FUNC_ATAN: 11;

/**
 * Returns the inverse hyperbolic tangent of the parameter.
 *
*/
static FUNC_ATANH: 12;

/**
 * Finds the nearest integer that is greater than or equal to the parameter.
 *
*/
static FUNC_CEIL: 13;

/**
 * Returns the cosine of the parameter.
 *
*/
static FUNC_COS: 14;

/**
 * Returns the hyperbolic cosine of the parameter.
 *
*/
static FUNC_COSH: 15;

/**
 * Converts a quantity in radians to degrees.
 *
*/
static FUNC_DEGREES: 16;

/**
 * Base-e Exponential.
 *
*/
static FUNC_EXP: 17;

/**
 * Base-2 Exponential.
 *
*/
static FUNC_EXP2: 18;

/**
 * Finds the nearest integer less than or equal to the parameter.
 *
*/
static FUNC_FLOOR: 19;

/**
 * Computes the fractional part of the argument.
 *
*/
static FUNC_FRAC: 20;

/**
 * Returns the inverse of the square root of the parameter.
 *
*/
static FUNC_INVERSE_SQRT: 21;

/**
 * Natural logarithm.
 *
*/
static FUNC_LOG: 22;

/**
 * Base-2 logarithm.
 *
*/
static FUNC_LOG2: 23;

/**
 * Converts a quantity in degrees to radians.
 *
*/
static FUNC_RADIANS: 24;

/**
 * Finds the nearest integer to the parameter.
 *
*/
static FUNC_ROUND: 25;

/**
 * Finds the nearest even integer to the parameter.
 *
*/
static FUNC_ROUNDEVEN: 26;

/**
 * Extracts the sign of the parameter, i.e. returns `-1` if the parameter is negative, `1` if it's positive and `0` otherwise.
 *
*/
static FUNC_SIGN: 27;

/**
 * Returns the sine of the parameter.
 *
*/
static FUNC_SIN: 28;

/**
 * Returns the hyperbolic sine of the parameter.
 *
*/
static FUNC_SINH: 29;

/**
 * Returns the square root of the parameter.
 *
*/
static FUNC_SQRT: 30;

/**
 * Returns the tangent of the parameter.
 *
*/
static FUNC_TAN: 31;

/**
 * Returns the hyperbolic tangent of the parameter.
 *
*/
static FUNC_TANH: 32;

/**
 * Returns a value equal to the nearest integer to the parameter whose absolute value is not larger than the absolute value of the parameter.
 *
*/
static FUNC_TRUNC: 33;

/**
 * Returns `1.0 - vector`.
 *
*/
static FUNC_ONEMINUS: 34;


  
}
