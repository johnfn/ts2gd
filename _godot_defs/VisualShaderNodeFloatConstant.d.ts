
/**
 * Translated to `float` in the shader language.
 *
*/
declare class VisualShaderNodeFloatConstant extends VisualShaderNode {

  
/**
 * Translated to `float` in the shader language.
 *
*/
  "new"(): this;
  static "new"(): this;



/** A floating-point constant which represents a state of this node. */
constant: float;



  connect<T extends SignalsOf<VisualShaderNodeFloatConstant>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
