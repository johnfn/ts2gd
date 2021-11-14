
/**
 * This node is only available in `Fragment` and `Light` visual shaders.
 *
*/
declare class VisualShaderNodeVectorDerivativeFunc extends VisualShaderNode  {

  
/**
 * This node is only available in `Fragment` and `Light` visual shaders.
 *
*/
  new(): VisualShaderNodeVectorDerivativeFunc; 
  static "new"(): VisualShaderNodeVectorDerivativeFunc 


/** A derivative type. See [enum Function] for options. */
function: int;



  connect<T extends SignalsOf<VisualShaderNodeVectorDerivativeFunc>>(signal: T, method: SignalFunction<VisualShaderNodeVectorDerivativeFunc[T]>): number;



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

