
/**
 * Translated to `uniform mat4` in the shader language.
 *
*/
declare class VisualShaderNodeTransformUniform extends VisualShaderNodeUniform {

  
/**
 * Translated to `uniform mat4` in the shader language.
 *
*/
  "new"(): VisualShaderNodeTransformUniform;
  static "new"(): VisualShaderNodeTransformUniform;






  // connect<T extends SignalsOf<VisualShaderNodeTransformUniform>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisualShaderNodeTransformUniformSignals>>(signal: T, method: SignalFunction<VisualShaderNodeTransformUniformSignals[T]>): number;




}

declare class VisualShaderNodeTransformUniformSignals extends VisualShaderNodeUniformSignals {
  
}
