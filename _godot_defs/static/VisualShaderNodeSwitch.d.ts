
/**
 * Returns an associated vector if the provided boolean value is `true` or `false`.
 *
*/
declare class VisualShaderNodeSwitch extends VisualShaderNode {

  
/**
 * Returns an associated vector if the provided boolean value is `true` or `false`.
 *
*/
  "new"(): VisualShaderNodeSwitch;
  static "new"(): VisualShaderNodeSwitch;






  // connect<T extends SignalsOf<VisualShaderNodeSwitch>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisualShaderNodeSwitchSignals>>(signal: T, method: SignalFunction<VisualShaderNodeSwitchSignals[T]>): number;




}

declare class VisualShaderNodeSwitchSignals extends VisualShaderNodeSignals {
  
}
