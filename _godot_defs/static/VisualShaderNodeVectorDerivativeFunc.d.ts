
/**
 * This node is only available in `Fragment` and `Light` visual shaders.
 *
*/
declare class VisualShaderNodeVectorDerivativeFunc extends VisualShaderNode {

  
/**
 * This node is only available in `Fragment` and `Light` visual shaders.
 *
*/
  "new"(): VisualShaderNodeVectorDerivativeFunc;
  static "new"(): VisualShaderNodeVectorDerivativeFunc;



/** A derivative type. See [enum Function] for options. */
function: int;



  // connect<T extends SignalsOf<VisualShaderNodeVectorDerivativeFunc>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisualShaderNodeVectorDerivativeFuncSignals>>(signal: T, method: SignalFunction<VisualShaderNodeVectorDerivativeFuncSignals[T]>): number;



/**
 * Sum of absolute derivative in `x` and `y`.
 *
*/
static FUNC_SUM: any;

/**
 * Derivative in `x` using local differencing.
 *
*/
static FUNC_X: any;

/**
 * Derivative in `y` using local differencing.
 *
*/
static FUNC_Y: any;

}

declare class VisualShaderNodeVectorDerivativeFuncSignals extends VisualShaderNodeSignals {
  
}
