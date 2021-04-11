
/**
 * Has two output ports representing RGB and alpha channels of [Color].
 *
 * Translated to `vec3 rgb` and `float alpha` in the shader language.
 *
*/
declare class VisualShaderNodeColorConstant extends VisualShaderNode {

  
/**
 * Has two output ports representing RGB and alpha channels of [Color].
 *
 * Translated to `vec3 rgb` and `float alpha` in the shader language.
 *
*/
  "new"(): VisualShaderNodeColorConstant;
  static "new"(): VisualShaderNodeColorConstant;



/** A [Color] constant which represents a state of this node. */
constant: Color;



  connect<T extends SignalsOf<VisualShaderNodeColorConstant>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
