
/**
*/
declare class VisualShaderNodeScalarUniform extends VisualShaderNodeUniform {

  
/**
*/
  "new"(): VisualShaderNodeScalarUniform;
  static "new"(): VisualShaderNodeScalarUniform;






  // connect<T extends SignalsOf<VisualShaderNodeScalarUniform>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisualShaderNodeScalarUniformSignals>>(signal: T, method: SignalFunction<VisualShaderNodeScalarUniformSignals[T]>): number;




}

declare class VisualShaderNodeScalarUniformSignals extends VisualShaderNodeUniformSignals {
  
}
