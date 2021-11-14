
/**
 * This visual shader node is present in all shader graphs in form of "Output" block with multiple output value ports.
 *
*/
declare class VisualShaderNodeOutput extends VisualShaderNode  {

  
/**
 * This visual shader node is present in all shader graphs in form of "Output" block with multiple output value ports.
 *
*/
  new(): VisualShaderNodeOutput; 
  static "new"(): VisualShaderNodeOutput 





  connect<T extends SignalsOf<VisualShaderNodeOutput>>(signal: T, method: SignalFunction<VisualShaderNodeOutput[T]>): number;






}

