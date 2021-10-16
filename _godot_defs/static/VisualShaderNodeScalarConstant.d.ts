
/**
*/
declare class VisualShaderNodeScalarConstant extends VisualShaderNode {

  
/**
*/
  "new"(): VisualShaderNodeScalarConstant;
  static "new"(): VisualShaderNodeScalarConstant;






  // connect<T extends SignalsOf<VisualShaderNodeScalarConstant>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisualShaderNodeScalarConstantSignals>>(signal: T, method: SignalFunction<VisualShaderNodeScalarConstantSignals[T]>): number;




}

declare class VisualShaderNodeScalarConstantSignals extends VisualShaderNodeSignals {
  
}
