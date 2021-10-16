
/**
 * Translated to `refract(I, N, eta)` in the shader language, where `I` is the incident vector, `N` is the normal vector and `eta` is the ratio of the indices of the refraction.
 *
*/
declare class VisualShaderNodeVectorRefract extends VisualShaderNode {

  
/**
 * Translated to `refract(I, N, eta)` in the shader language, where `I` is the incident vector, `N` is the normal vector and `eta` is the ratio of the indices of the refraction.
 *
*/
  "new"(): VisualShaderNodeVectorRefract;
  static "new"(): VisualShaderNodeVectorRefract;






  // connect<T extends SignalsOf<VisualShaderNodeVectorRefract>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisualShaderNodeVectorRefractSignals>>(signal: T, method: SignalFunction<VisualShaderNodeVectorRefractSignals[T]>): number;




}

declare class VisualShaderNodeVectorRefractSignals extends VisualShaderNodeSignals {
  
}
