
/**
 * Translates to `step(edge, x)` in the shader language.
 *
 * Returns `0.0` if `x` is smaller than `edge` and `1.0` otherwise.
 *
*/
declare class VisualShaderNodeVectorScalarStep extends VisualShaderNode  {

  
/**
 * Translates to `step(edge, x)` in the shader language.
 *
 * Returns `0.0` if `x` is smaller than `edge` and `1.0` otherwise.
 *
*/
  new(): VisualShaderNodeVectorScalarStep; 
  static "new"(): VisualShaderNodeVectorScalarStep 





  connect<T extends SignalsOf<VisualShaderNodeVectorScalarStep>>(signal: T, method: SignalFunction<VisualShaderNodeVectorScalarStep[T]>): number;






}

