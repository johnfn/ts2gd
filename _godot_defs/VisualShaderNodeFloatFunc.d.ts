
/**
 * Accept a floating-point scalar (`x`) to the input port and transform it according to [member function].
 *
*/
declare class VisualShaderNodeFloatFunc extends VisualShaderNode {

  
/**
 * Accept a floating-point scalar (`x`) to the input port and transform it according to [member function].
 *
*/
  "new"(): this;
  static "new"(): this;



/** A function to be applied to the scalar. See [enum Function] for options. */
function: int;



  connect<T extends SignalsOf<VisualShaderNodeFloatFunc>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Returns the sine of the parameter. Translates to `sin(x)` in the Godot Shader Language.
 *
*/
static FUNC_SIN: 0;

/**
 * Returns the cosine of the parameter. Translates to `cos(x)` in the Godot Shader Language.
 *
*/
static FUNC_COS: 1;

/**
 * Returns the tangent of the parameter. Translates to `tan(x)` in the Godot Shader Language.
 *
*/
static FUNC_TAN: 2;

/**
 * Returns the arc-sine of the parameter. Translates to `asin(x)` in the Godot Shader Language.
 *
*/
static FUNC_ASIN: 3;

/**
 * Returns the arc-cosine of the parameter. Translates to `acos(x)` in the Godot Shader Language.
 *
*/
static FUNC_ACOS: 4;

/**
 * Returns the arc-tangent of the parameter. Translates to `atan(x)` in the Godot Shader Language.
 *
*/
static FUNC_ATAN: 5;

/**
 * Returns the hyperbolic sine of the parameter. Translates to `sinh(x)` in the Godot Shader Language.
 *
*/
static FUNC_SINH: 6;

/**
 * Returns the hyperbolic cosine of the parameter. Translates to `cosh(x)` in the Godot Shader Language.
 *
*/
static FUNC_COSH: 7;

/**
 * Returns the hyperbolic tangent of the parameter. Translates to `tanh(x)` in the Godot Shader Language.
 *
*/
static FUNC_TANH: 8;

/**
 * Returns the natural logarithm of the parameter. Translates to `log(x)` in the Godot Shader Language.
 *
*/
static FUNC_LOG: 9;

/**
 * Returns the natural exponentiation of the parameter. Translates to `exp(x)` in the Godot Shader Language.
 *
*/
static FUNC_EXP: 10;

/**
 * Returns the square root of the parameter. Translates to `sqrt(x)` in the Godot Shader Language.
 *
*/
static FUNC_SQRT: 11;

/**
 * Returns the absolute value of the parameter. Translates to `abs(x)` in the Godot Shader Language.
 *
*/
static FUNC_ABS: 12;

/**
 * Extracts the sign of the parameter. Translates to `sign(x)` in the Godot Shader Language.
 *
*/
static FUNC_SIGN: 13;

/**
 * Finds the nearest integer less than or equal to the parameter. Translates to `floor(x)` in the Godot Shader Language.
 *
*/
static FUNC_FLOOR: 14;

/**
 * Finds the nearest integer to the parameter. Translates to `round(x)` in the Godot Shader Language.
 *
*/
static FUNC_ROUND: 15;

/**
 * Finds the nearest integer that is greater than or equal to the parameter. Translates to `ceil(x)` in the Godot Shader Language.
 *
*/
static FUNC_CEIL: 16;

/**
 * Computes the fractional part of the argument. Translates to `fract(x)` in the Godot Shader Language.
 *
*/
static FUNC_FRAC: 17;

/**
 * Clamps the value between `0.0` and `1.0` using `min(max(x, 0.0), 1.0)`.
 *
*/
static FUNC_SATURATE: 18;

/**
 * Negates the `x` using `-(x)`.
 *
*/
static FUNC_NEGATE: 19;

/**
 * Returns the arc-hyperbolic-cosine of the parameter. Translates to `acosh(x)` in the Godot Shader Language.
 *
*/
static FUNC_ACOSH: 20;

/**
 * Returns the arc-hyperbolic-sine of the parameter. Translates to `asinh(x)` in the Godot Shader Language.
 *
*/
static FUNC_ASINH: 21;

/**
 * Returns the arc-hyperbolic-tangent of the parameter. Translates to `atanh(x)` in the Godot Shader Language.
 *
*/
static FUNC_ATANH: 22;

/**
 * Convert a quantity in radians to degrees. Translates to `degrees(x)` in the Godot Shader Language.
 *
*/
static FUNC_DEGREES: 23;

/**
 * Returns 2 raised by the power of the parameter. Translates to `exp2(x)` in the Godot Shader Language.
 *
*/
static FUNC_EXP2: 24;

/**
 * Returns the inverse of the square root of the parameter. Translates to `inversesqrt(x)` in the Godot Shader Language.
 *
*/
static FUNC_INVERSE_SQRT: 25;

/**
 * Returns the base 2 logarithm of the parameter. Translates to `log2(x)` in the Godot Shader Language.
 *
*/
static FUNC_LOG2: 26;

/**
 * Convert a quantity in degrees to radians. Translates to `radians(x)` in the Godot Shader Language.
 *
*/
static FUNC_RADIANS: 27;

/**
 * Finds reciprocal value of dividing 1 by `x` (i.e. `1 / x`).
 *
*/
static FUNC_RECIPROCAL: 28;

/**
 * Finds the nearest even integer to the parameter. Translates to `roundEven(x)` in the Godot Shader Language.
 *
*/
static FUNC_ROUNDEVEN: 29;

/**
 * Returns a value equal to the nearest integer to `x` whose absolute value is not larger than the absolute value of `x`. Translates to `trunc(x)` in the Godot Shader Language.
 *
*/
static FUNC_TRUNC: 30;

/**
 * Subtracts scalar `x` from 1 (i.e. `1 - x`).
 *
*/
static FUNC_ONEMINUS: 31;


  
}


 
