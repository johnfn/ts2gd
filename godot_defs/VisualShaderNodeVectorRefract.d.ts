
/**
 * Translated to `refract(I, N, eta)` in the shader language, where `I` is the incident vector, `N` is the normal vector and `eta` is the ratio of the indicies of the refraction.
 *
*/
declare class VisualShaderNodeVectorRefract extends VisualShaderNode {

  
/**
 * Translated to `refract(I, N, eta)` in the shader language, where `I` is the incident vector, `N` is the normal vector and `eta` is the ratio of the indicies of the refraction.
 *
*/
  "new"(): VisualShaderNodeVectorRefract;
  static "new"(): VisualShaderNodeVectorRefract;






  connect<T extends SignalsOf<VisualShaderNodeVectorRefract>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
