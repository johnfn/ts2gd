
/**
 * Returns falloff based on the dot product of surface normal and view direction of camera (pass associated inputs to it).
 *
*/
declare class VisualShaderNodeFresnel extends VisualShaderNode {

  
/**
 * Returns falloff based on the dot product of surface normal and view direction of camera (pass associated inputs to it).
 *
*/
  "new"(): VisualShaderNodeFresnel;
  static "new"(): VisualShaderNodeFresnel;






  // connect<T extends SignalsOf<VisualShaderNodeFresnel>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisualShaderNodeFresnelSignals>>(signal: T, method: SignalFunction<VisualShaderNodeFresnelSignals[T]>): number;




}

declare class VisualShaderNodeFresnelSignals extends VisualShaderNodeSignals {
  
}
