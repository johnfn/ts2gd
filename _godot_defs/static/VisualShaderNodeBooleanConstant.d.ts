
/**
 * Has only one output port and no inputs.
 *
 * Translated to `bool` in the shader language.
 *
*/
declare class VisualShaderNodeBooleanConstant extends VisualShaderNode {

  
/**
 * Has only one output port and no inputs.
 *
 * Translated to `bool` in the shader language.
 *
*/
  "new"(): VisualShaderNodeBooleanConstant;
  static "new"(): VisualShaderNodeBooleanConstant;



/** A boolean constant which represents a state of this node. */
constant: boolean;



  // connect<T extends SignalsOf<VisualShaderNodeBooleanConstant>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisualShaderNodeBooleanConstantSignals>>(signal: T, method: SignalFunction<VisualShaderNodeBooleanConstantSignals[T]>): number;




}

declare class VisualShaderNodeBooleanConstantSignals extends VisualShaderNodeSignals {
  
}
