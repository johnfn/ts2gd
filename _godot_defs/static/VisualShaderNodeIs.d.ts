
/**
 * Returns the boolean result of the comparison between `INF` or `NaN` and a scalar parameter.
 *
*/
declare class VisualShaderNodeIs extends VisualShaderNode  {

  
/**
 * Returns the boolean result of the comparison between `INF` or `NaN` and a scalar parameter.
 *
*/
  new(): VisualShaderNodeIs; 
  static "new"(): VisualShaderNodeIs 


/** The comparison function. See [enum Function] for options. */
function: int;



  connect<T extends SignalsOf<VisualShaderNodeIs>>(signal: T, method: SignalFunction<VisualShaderNodeIs[T]>): number;



/**
 * Comparison with `INF` (Infinity).
 *
*/
static FUNC_IS_INF: any;

/**
 * Comparison with `NaN` (Not a Number; denotes invalid numeric results, e.g. division by zero).
 *
*/
static FUNC_IS_NAN: any;



}

