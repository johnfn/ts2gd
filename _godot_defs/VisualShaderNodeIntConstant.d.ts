
/**
 * Translated to `int` in the shader language.
 *
*/
declare class VisualShaderNodeIntConstant extends VisualShaderNode {

  
/**
 * Translated to `int` in the shader language.
 *
*/
  "new"(): this;
  static "new"(): this;



/** An integer constant which represents a state of this node. */
constant: int;



  connect<T extends SignalsOf<VisualShaderNodeIntConstant>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
