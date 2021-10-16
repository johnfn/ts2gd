
/**
 * Translates to `smoothstep(edge0, edge1, x)` in the shader language.
 *
 * Returns `0.0` if `x` is smaller than `edge0` and `1.0` if `x` is larger than `edge1`. Otherwise the return value is interpolated between `0.0` and `1.0` using Hermite polynomials.
 *
*/
declare class VisualShaderNodeScalarSmoothStep extends VisualShaderNode {

  
/**
 * Translates to `smoothstep(edge0, edge1, x)` in the shader language.
 *
 * Returns `0.0` if `x` is smaller than `edge0` and `1.0` if `x` is larger than `edge1`. Otherwise the return value is interpolated between `0.0` and `1.0` using Hermite polynomials.
 *
*/
  "new"(): VisualShaderNodeScalarSmoothStep;
  static "new"(): VisualShaderNodeScalarSmoothStep;






  // connect<T extends SignalsOf<VisualShaderNodeScalarSmoothStep>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisualShaderNodeScalarSmoothStepSignals>>(signal: T, method: SignalFunction<VisualShaderNodeScalarSmoothStepSignals[T]>): number;




}

declare class VisualShaderNodeScalarSmoothStepSignals extends VisualShaderNodeSignals {
  
}
