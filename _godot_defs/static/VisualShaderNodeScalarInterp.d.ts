
/**
 * Translates to `mix(a, b, weight)` in the shader language.
 *
*/
declare class VisualShaderNodeScalarInterp extends VisualShaderNode {

  
/**
 * Translates to `mix(a, b, weight)` in the shader language.
 *
*/
  "new"(): VisualShaderNodeScalarInterp;
  static "new"(): VisualShaderNodeScalarInterp;






  // connect<T extends SignalsOf<VisualShaderNodeScalarInterp>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisualShaderNodeScalarInterpSignals>>(signal: T, method: SignalFunction<VisualShaderNodeScalarInterpSignals[T]>): number;




}

declare class VisualShaderNodeScalarInterpSignals extends VisualShaderNodeSignals {
  
}
