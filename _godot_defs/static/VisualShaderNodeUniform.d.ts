
/**
 * A uniform represents a variable in the shader which is set externally, i.e. from the [ShaderMaterial]. Uniforms are exposed as properties in the [ShaderMaterial] and can be assigned from the inspector or from a script.
 *
*/
declare class VisualShaderNodeUniform extends VisualShaderNode {

  
/**
 * A uniform represents a variable in the shader which is set externally, i.e. from the [ShaderMaterial]. Uniforms are exposed as properties in the [ShaderMaterial] and can be assigned from the inspector or from a script.
 *
*/
  "new"(): VisualShaderNodeUniform;
  static "new"(): VisualShaderNodeUniform;



/** Name of the uniform, by which it can be accessed through the [ShaderMaterial] properties. */
uniform_name: string;



  // connect<T extends SignalsOf<VisualShaderNodeUniform>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisualShaderNodeUniformSignals>>(signal: T, method: SignalFunction<VisualShaderNodeUniformSignals[T]>): number;




}

declare class VisualShaderNodeUniformSignals extends VisualShaderNodeSignals {
  
}
