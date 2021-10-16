
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



  // connect<T extends SignalsOf<VisualShaderNodeVectorFunc>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisualShaderNodeVectorFuncSignals>>(signal: T, method: SignalFunction<VisualShaderNodeVectorFuncSignals[T]>): number;



/**
 * Normalizes the vector so that it has a length of `1` but points in the same direction.
 *
*/
static FUNC_NORMALIZE: any;

/**
 * Clamps the value between `0.0` and `1.0`.
 *
*/
static FUNC_SATURATE: any;

/**
 * Returns the opposite value of the parameter.
 *
*/
static FUNC_NEGATE: any;

/**
 * Returns `1/vector`.
 *
*/
static FUNC_RECIPROCAL: any;

/**
 * Converts RGB vector to HSV equivalent.
 *
*/
static FUNC_RGB2HSV: any;

/**
 * Converts HSV vector to RGB equivalent.
 *
*/
static FUNC_HSV2RGB: any;

/**
 * Returns the absolute value of the parameter.
 *
*/
static FUNC_ABS: any;

/**
 * Returns the arc-cosine of the parameter.
 *
*/
static FUNC_ACOS: any;

/**
 * Returns the inverse hyperbolic cosine of the parameter.
 *
*/
static FUNC_ACOSH: any;

/**
 * Returns the arc-sine of the parameter.
 *
*/
static FUNC_ASIN: any;

/**
 * Returns the inverse hyperbolic sine of the parameter.
 *
*/
static FUNC_ASINH: any;

/**
 * Returns the arc-tangent of the parameter.
 *
*/
static FUNC_ATAN: any;

/**
 * Returns the inverse hyperbolic tangent of the parameter.
 *
*/
static FUNC_ATANH: any;

/**
 * Finds the nearest integer that is greater than or equal to the parameter.
 *
*/
static FUNC_CEIL: any;

/**
 * Returns the cosine of the parameter.
 *
*/
static FUNC_COS: any;

/**
 * Returns the hyperbolic cosine of the parameter.
 *
*/
static FUNC_COSH: any;

/**
 * Converts a quantity in radians to degrees.
 *
*/
static FUNC_DEGREES: any;

/**
 * Base-e Exponential.
 *
*/
static FUNC_EXP: any;

/**
 * Base-2 Exponential.
 *
*/
static FUNC_EXP2: any;

/**
 * Finds the nearest integer less than or equal to the parameter.
 *
*/
static FUNC_FLOOR: any;

/**
 * Computes the fractional part of the argument.
 *
*/
static FUNC_FRAC: any;

/**
 * Returns the inverse of the square root of the parameter.
 *
*/
static FUNC_INVERSE_SQRT: any;

/**
 * Natural logarithm.
 *
*/
static FUNC_LOG: any;

/**
 * Base-2 logarithm.
 *
*/
static FUNC_LOG2: any;

/**
 * Converts a quantity in degrees to radians.
 *
*/
static FUNC_RADIANS: any;

/**
 * Finds the nearest integer to the parameter.
 *
*/
static FUNC_ROUND: any;

/**
 * Finds the nearest even integer to the parameter.
 *
*/
static FUNC_ROUNDEVEN: any;

/**
 * Extracts the sign of the parameter, i.e. returns `-1` if the parameter is negative, `1` if it's positive and `0` otherwise.
 *
*/
static FUNC_SIGN: any;

/**
 * Returns the sine of the parameter.
 *
*/
static FUNC_SIN: any;

/**
 * Returns the hyperbolic sine of the parameter.
 *
*/
static FUNC_SINH: any;

/**
 * Returns the square root of the parameter.
 *
*/
static FUNC_SQRT: any;

/**
 * Returns the tangent of the parameter.
 *
*/
static FUNC_TAN: any;

/**
 * Returns the hyperbolic tangent of the parameter.
 *
*/
static FUNC_TANH: any;

/**
 * Returns a value equal to the nearest integer to the parameter whose absolute value is not larger than the absolute value of the parameter.
 *
*/
static FUNC_TRUNC: any;

/**
 * Returns `1.0 - vector`.
 *
*/
static FUNC_ONEMINUS: any;

}

declare class VisualShaderNodeVectorFuncSignals extends VisualShaderNodeSignals {
  
}
