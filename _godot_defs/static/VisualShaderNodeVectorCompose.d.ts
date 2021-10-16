
/**
 * Creates a `vec3` using three scalar values that can be provided from separate inputs.
 *
*/
declare class VisualShaderNodeVectorCompose extends VisualShaderNode {

  
/**
 * Creates a `vec3` using three scalar values that can be provided from separate inputs.
 *
*/
  "new"(): VisualShaderNodeVectorCompose;
  static "new"(): VisualShaderNodeVectorCompose;






  // connect<T extends SignalsOf<VisualShaderNodeVectorCompose>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisualShaderNodeVectorComposeSignals>>(signal: T, method: SignalFunction<VisualShaderNodeVectorComposeSignals[T]>): number;




}

declare class VisualShaderNodeVectorComposeSignals extends VisualShaderNodeSignals {
  
}
