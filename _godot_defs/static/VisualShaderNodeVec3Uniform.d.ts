
/**
 * Translated to `uniform vec3` in the shader language.
 *
*/
declare class VisualShaderNodeVec3Uniform extends VisualShaderNodeUniform {

  
/**
 * Translated to `uniform vec3` in the shader language.
 *
*/
  "new"(): VisualShaderNodeVec3Uniform;
  static "new"(): VisualShaderNodeVec3Uniform;






  // connect<T extends SignalsOf<VisualShaderNodeVec3Uniform>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisualShaderNodeVec3UniformSignals>>(signal: T, method: SignalFunction<VisualShaderNodeVec3UniformSignals[T]>): number;




}

declare class VisualShaderNodeVec3UniformSignals extends VisualShaderNodeUniformSignals {
  
}
