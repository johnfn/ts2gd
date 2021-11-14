
/**
 * Translates to `smoothstep(edge0, edge1, x)` in the shader language, where `x` is a vector.
 *
 * Returns `0.0` if `x` is smaller than `edge0` and `1.0` if `x` is larger than `edge1`. Otherwise the return value is interpolated between `0.0` and `1.0` using Hermite polynomials.
 *
*/
declare class VisualShaderNodeVectorSmoothStep extends VisualShaderNode  {

  
/**
 * Translates to `smoothstep(edge0, edge1, x)` in the shader language, where `x` is a vector.
 *
 * Returns `0.0` if `x` is smaller than `edge0` and `1.0` if `x` is larger than `edge1`. Otherwise the return value is interpolated between `0.0` and `1.0` using Hermite polynomials.
 *
*/
  new(): VisualShaderNodeVectorSmoothStep; 
  static "new"(): VisualShaderNodeVectorSmoothStep 





  connect<T extends SignalsOf<VisualShaderNodeVectorSmoothStep>>(signal: T, method: SignalFunction<VisualShaderNodeVectorSmoothStep[T]>): number;






}

