
/**
 * Computes an inverse or transpose function on the provided [Transform].
 *
*/
declare class VisualShaderNodeTransformFunc extends VisualShaderNode  {

  
/**
 * Computes an inverse or transpose function on the provided [Transform].
 *
*/
  new(): VisualShaderNodeTransformFunc; 
  static "new"(): VisualShaderNodeTransformFunc 


/** The function to be computed. See [enum Function] for options. */
function: int;



  connect<T extends SignalsOf<VisualShaderNodeTransformFunc>>(signal: T, method: SignalFunction<VisualShaderNodeTransformFunc[T]>): number;



/**
 * Perform the inverse operation on the [Transform] matrix.
 *
*/
static FUNC_INVERSE: any;

/**
 * Perform the transpose operation on the [Transform] matrix.
 *
*/
static FUNC_TRANSPOSE: any;



}

