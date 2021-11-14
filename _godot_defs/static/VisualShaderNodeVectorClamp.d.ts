
/**
 * Constrains a value to lie between `min` and `max` values. The operation is performed on each component of the vector individually.
 *
*/
declare class VisualShaderNodeVectorClamp extends VisualShaderNode  {

  
/**
 * Constrains a value to lie between `min` and `max` values. The operation is performed on each component of the vector individually.
 *
*/
  new(): VisualShaderNodeVectorClamp; 
  static "new"(): VisualShaderNodeVectorClamp 





  connect<T extends SignalsOf<VisualShaderNodeVectorClamp>>(signal: T, method: SignalFunction<VisualShaderNodeVectorClamp[T]>): number;






}

