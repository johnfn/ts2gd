
/**
 * Returns an associated scalar if the provided boolean value is `true` or `false`.
 *
*/
declare class VisualShaderNodeScalarSwitch extends VisualShaderNodeSwitch {

  
/**
 * Returns an associated scalar if the provided boolean value is `true` or `false`.
 *
*/
  "new"(): VisualShaderNodeScalarSwitch;
  static "new"(): VisualShaderNodeScalarSwitch;






  // connect<T extends SignalsOf<VisualShaderNodeScalarSwitch>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisualShaderNodeScalarSwitchSignals>>(signal: T, method: SignalFunction<VisualShaderNodeScalarSwitchSignals[T]>): number;




}

declare class VisualShaderNodeScalarSwitchSignals extends VisualShaderNodeSwitchSignals {
  
}
