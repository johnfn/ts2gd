
/**
 * Translated to `uniform vec4` in the shader language.
 *
*/
declare class VisualShaderNodeColorUniform extends VisualShaderNodeUniform {

  
/**
 * Translated to `uniform vec4` in the shader language.
 *
*/
  "new"(): VisualShaderNodeColorUniform;
  static "new"(): VisualShaderNodeColorUniform;






  // connect<T extends SignalsOf<VisualShaderNodeColorUniform>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisualShaderNodeColorUniformSignals>>(signal: T, method: SignalFunction<VisualShaderNodeColorUniformSignals[T]>): number;




}

declare class VisualShaderNodeColorUniformSignals extends VisualShaderNodeUniformSignals {
  
}
