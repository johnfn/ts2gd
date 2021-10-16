
/**
*/
declare class VisualShaderNodeIf extends VisualShaderNode {

  
/**
*/
  "new"(): VisualShaderNodeIf;
  static "new"(): VisualShaderNodeIf;






  // connect<T extends SignalsOf<VisualShaderNodeIf>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisualShaderNodeIfSignals>>(signal: T, method: SignalFunction<VisualShaderNodeIfSignals[T]>): number;




}

declare class VisualShaderNodeIfSignals extends VisualShaderNodeSignals {
  
}
