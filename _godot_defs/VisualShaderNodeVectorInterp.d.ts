
/**
 * Translates to `mix(a, b, weight)` in the shader language, where `weight` is a [Vector3] with weights for each component.
 *
*/
declare class VisualShaderNodeVectorInterp extends VisualShaderNode {

  
/**
 * Translates to `mix(a, b, weight)` in the shader language, where `weight` is a [Vector3] with weights for each component.
 *
*/
  "new"(): VisualShaderNodeVectorInterp;
  static "new"(): VisualShaderNodeVectorInterp;






  connect<T extends SignalsOf<VisualShaderNodeVectorInterp>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
