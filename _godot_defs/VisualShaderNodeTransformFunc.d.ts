
/**
 * Computes an inverse or transpose function on the provided [Transform].
 *
*/
declare class VisualShaderNodeTransformFunc extends VisualShaderNode {

  
/**
 * Computes an inverse or transpose function on the provided [Transform].
 *
*/
  "new"(): VisualShaderNodeTransformFunc;
  static "new"(): VisualShaderNodeTransformFunc;



/** The function to be computed. See [enum Function] for options. */
function: int;



  connect<T extends SignalsOf<VisualShaderNodeTransformFunc>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Perform the inverse operation on the [Transform] matrix.
 *
*/
static FUNC_INVERSE: 0;

/**
 * Perform the transpose operation on the [Transform] matrix.
 *
*/
static FUNC_TRANSPOSE: 1;


  
}
