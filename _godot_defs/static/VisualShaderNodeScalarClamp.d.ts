
/**
 * Constrains a value to lie between `min` and `max` values.
 *
*/
declare class VisualShaderNodeScalarClamp extends VisualShaderNode {

  
/**
 * Constrains a value to lie between `min` and `max` values.
 *
*/
  "new"(): VisualShaderNodeScalarClamp;
  static "new"(): VisualShaderNodeScalarClamp;






  // connect<T extends SignalsOf<VisualShaderNodeScalarClamp>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisualShaderNodeScalarClampSignals>>(signal: T, method: SignalFunction<VisualShaderNodeScalarClampSignals[T]>): number;




}

declare class VisualShaderNodeScalarClampSignals extends VisualShaderNodeSignals {
  
}
