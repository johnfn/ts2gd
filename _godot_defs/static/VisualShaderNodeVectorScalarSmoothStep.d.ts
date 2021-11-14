
/**
 * Translates to `smoothstep(edge0, edge1, x)` in the shader language, where `x` is a scalar.
 *
 * Returns `0.0` if `x` is smaller than `edge0` and `1.0` if `x` is larger than `edge1`. Otherwise the return value is interpolated between `0.0` and `1.0` using Hermite polynomials.
 *
*/
declare class VisualShaderNodeVectorScalarSmoothStep extends VisualShaderNode  {

  
/**
 * Translates to `smoothstep(edge0, edge1, x)` in the shader language, where `x` is a scalar.
 *
 * Returns `0.0` if `x` is smaller than `edge0` and `1.0` if `x` is larger than `edge1`. Otherwise the return value is interpolated between `0.0` and `1.0` using Hermite polynomials.
 *
*/
  new(): VisualShaderNodeVectorScalarSmoothStep; 
  static "new"(): VisualShaderNodeVectorScalarSmoothStep 





  connect<T extends SignalsOf<VisualShaderNodeVectorScalarSmoothStep>>(signal: T, method: SignalFunction<VisualShaderNodeVectorScalarSmoothStep[T]>): number;






}

