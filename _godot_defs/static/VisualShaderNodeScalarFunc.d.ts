
/**
*/
declare class VisualShaderNodeScalarFunc extends VisualShaderNode {

  
/**
*/
  "new"(): VisualShaderNodeScalarFunc;
  static "new"(): VisualShaderNodeScalarFunc;






  // connect<T extends SignalsOf<VisualShaderNodeScalarFunc>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisualShaderNodeScalarFuncSignals>>(signal: T, method: SignalFunction<VisualShaderNodeScalarFuncSignals[T]>): number;



/** No documentation provided. */
static FUNC_SIN: any;

/** No documentation provided. */
static FUNC_COS: any;

/** No documentation provided. */
static FUNC_TAN: any;

/** No documentation provided. */
static FUNC_ASIN: any;

/** No documentation provided. */
static FUNC_ACOS: any;

/** No documentation provided. */
static FUNC_ATAN: any;

/** No documentation provided. */
static FUNC_SINH: any;

/** No documentation provided. */
static FUNC_COSH: any;

/** No documentation provided. */
static FUNC_TANH: any;

/** No documentation provided. */
static FUNC_LOG: any;

/** No documentation provided. */
static FUNC_EXP: any;

/** No documentation provided. */
static FUNC_SQRT: any;

/** No documentation provided. */
static FUNC_ABS: any;

/** No documentation provided. */
static FUNC_SIGN: any;

/** No documentation provided. */
static FUNC_FLOOR: any;

/** No documentation provided. */
static FUNC_ROUND: any;

/** No documentation provided. */
static FUNC_CEIL: any;

/** No documentation provided. */
static FUNC_FRAC: any;

/** No documentation provided. */
static FUNC_SATURATE: any;

/** No documentation provided. */
static FUNC_NEGATE: any;

/** No documentation provided. */
static FUNC_ACOSH: any;

/** No documentation provided. */
static FUNC_ASINH: any;

/** No documentation provided. */
static FUNC_ATANH: any;

/** No documentation provided. */
static FUNC_DEGREES: any;

/** No documentation provided. */
static FUNC_EXP2: any;

/** No documentation provided. */
static FUNC_INVERSE_SQRT: any;

/** No documentation provided. */
static FUNC_LOG2: any;

/** No documentation provided. */
static FUNC_RADIANS: any;

/** No documentation provided. */
static FUNC_RECIPROCAL: any;

/** No documentation provided. */
static FUNC_ROUNDEVEN: any;

/** No documentation provided. */
static FUNC_TRUNC: any;

/** No documentation provided. */
static FUNC_ONEMINUS: any;

}

declare class VisualShaderNodeScalarFuncSignals extends VisualShaderNodeSignals {
  
}
