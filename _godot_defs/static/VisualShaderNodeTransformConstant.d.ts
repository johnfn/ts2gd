
/**
 * A constant [Transform], which can be used as an input node.
 *
*/
declare class VisualShaderNodeTransformConstant extends VisualShaderNode {

  
/**
 * A constant [Transform], which can be used as an input node.
 *
*/
  "new"(): VisualShaderNodeTransformConstant;
  static "new"(): VisualShaderNodeTransformConstant;



/** A [Transform] constant which represents the state of this node. */
constant: Transform;



  // connect<T extends SignalsOf<VisualShaderNodeTransformConstant>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisualShaderNodeTransformConstantSignals>>(signal: T, method: SignalFunction<VisualShaderNodeTransformConstantSignals[T]>): number;




}

declare class VisualShaderNodeTransformConstantSignals extends VisualShaderNodeSignals {
  
}
