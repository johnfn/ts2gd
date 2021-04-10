
/**
*/
declare class VisualShaderNodeScalarFunc extends VisualShaderNode {

  
/**
*/
  "new"(): VisualShaderNodeScalarFunc;
  static "new"(): VisualShaderNodeScalarFunc;






  connect<T extends SignalsOf<VisualShaderNodeScalarFunc>, U extends Node>(signal: T, node: U, method: keyof U): number;



/** No documentation provided. */
static FUNC_SIN: 0;

/** No documentation provided. */
static FUNC_COS: 1;

/** No documentation provided. */
static FUNC_TAN: 2;

/** No documentation provided. */
static FUNC_ASIN: 3;

/** No documentation provided. */
static FUNC_ACOS: 4;

/** No documentation provided. */
static FUNC_ATAN: 5;

/** No documentation provided. */
static FUNC_SINH: 6;

/** No documentation provided. */
static FUNC_COSH: 7;

/** No documentation provided. */
static FUNC_TANH: 8;

/** No documentation provided. */
static FUNC_LOG: 9;

/** No documentation provided. */
static FUNC_EXP: 10;

/** No documentation provided. */
static FUNC_SQRT: 11;

/** No documentation provided. */
static FUNC_ABS: 12;

/** No documentation provided. */
static FUNC_SIGN: 13;

/** No documentation provided. */
static FUNC_FLOOR: 14;

/** No documentation provided. */
static FUNC_ROUND: 15;

/** No documentation provided. */
static FUNC_CEIL: 16;

/** No documentation provided. */
static FUNC_FRAC: 17;

/** No documentation provided. */
static FUNC_SATURATE: 18;

/** No documentation provided. */
static FUNC_NEGATE: 19;

/** No documentation provided. */
static FUNC_ACOSH: 20;

/** No documentation provided. */
static FUNC_ASINH: 21;

/** No documentation provided. */
static FUNC_ATANH: 22;

/** No documentation provided. */
static FUNC_DEGREES: 23;

/** No documentation provided. */
static FUNC_EXP2: 24;

/** No documentation provided. */
static FUNC_INVERSE_SQRT: 25;

/** No documentation provided. */
static FUNC_LOG2: 26;

/** No documentation provided. */
static FUNC_RADIANS: 27;

/** No documentation provided. */
static FUNC_RECIPROCAL: 28;

/** No documentation provided. */
static FUNC_ROUNDEVEN: 29;

/** No documentation provided. */
static FUNC_TRUNC: 30;

/** No documentation provided. */
static FUNC_ONEMINUS: 31;


  
}
