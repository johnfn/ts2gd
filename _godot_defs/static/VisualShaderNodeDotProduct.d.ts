
/**
 * Translates to `dot(a, b)` in the shader language.
 *
*/
declare class VisualShaderNodeDotProduct extends VisualShaderNode {

  
/**
 * Translates to `dot(a, b)` in the shader language.
 *
*/
  "new"(): VisualShaderNodeDotProduct;
  static "new"(): VisualShaderNodeDotProduct;






  // connect<T extends SignalsOf<VisualShaderNodeDotProduct>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisualShaderNodeDotProductSignals>>(signal: T, method: SignalFunction<VisualShaderNodeDotProductSignals[T]>): number;




}

declare class VisualShaderNodeDotProductSignals extends VisualShaderNodeSignals {
  
}
