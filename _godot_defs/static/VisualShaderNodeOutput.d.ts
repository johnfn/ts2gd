
/**
 * This visual shader node is present in all shader graphs in form of "Output" block with multiple output value ports.
 *
*/
declare class VisualShaderNodeOutput extends VisualShaderNode {

  
/**
 * This visual shader node is present in all shader graphs in form of "Output" block with multiple output value ports.
 *
*/
  "new"(): VisualShaderNodeOutput;
  static "new"(): VisualShaderNodeOutput;






  // connect<T extends SignalsOf<VisualShaderNodeOutput>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisualShaderNodeOutputSignals>>(signal: T, method: SignalFunction<VisualShaderNodeOutputSignals[T]>): number;




}

declare class VisualShaderNodeOutputSignals extends VisualShaderNodeSignals {
  
}
