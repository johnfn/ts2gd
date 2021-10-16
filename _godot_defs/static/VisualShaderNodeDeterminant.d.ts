
/**
 * Translates to `determinant(x)` in the shader language.
 *
*/
declare class VisualShaderNodeDeterminant extends VisualShaderNode {

  
/**
 * Translates to `determinant(x)` in the shader language.
 *
*/
  "new"(): VisualShaderNodeDeterminant;
  static "new"(): VisualShaderNodeDeterminant;






  // connect<T extends SignalsOf<VisualShaderNodeDeterminant>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisualShaderNodeDeterminantSignals>>(signal: T, method: SignalFunction<VisualShaderNodeDeterminantSignals[T]>): number;




}

declare class VisualShaderNodeDeterminantSignals extends VisualShaderNodeSignals {
  
}
