
/**
 * Constrains a value to lie between `min` and `max` values. The operation is performed on each component of the vector individually.
 *
*/
declare class VisualShaderNodeVectorClamp extends VisualShaderNode {

  
/**
 * Constrains a value to lie between `min` and `max` values. The operation is performed on each component of the vector individually.
 *
*/
  "new"(): VisualShaderNodeVectorClamp;
  static "new"(): VisualShaderNodeVectorClamp;






  connect<T extends SignalsOf<VisualShaderNodeVectorClamp>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
