
/**
 * Translated to `uniform bool` in the shader language.
 *
*/
declare class VisualShaderNodeBooleanUniform extends VisualShaderNodeUniform {

  
/**
 * Translated to `uniform bool` in the shader language.
 *
*/
  "new"(): VisualShaderNodeBooleanUniform;
  static "new"(): VisualShaderNodeBooleanUniform;






  // connect<T extends SignalsOf<VisualShaderNodeBooleanUniform>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisualShaderNodeBooleanUniformSignals>>(signal: T, method: SignalFunction<VisualShaderNodeBooleanUniformSignals[T]>): number;




}

declare class VisualShaderNodeBooleanUniformSignals extends VisualShaderNodeUniformSignals {
  
}
