
/**
*/
declare class VisualShaderNodeResizableBase extends VisualShaderNode {

  
/**
*/
  "new"(): this;
  static "new"(): this;



/** The size of the node in the visual shader graph. */
size: Vector2;



  connect<T extends SignalsOf<VisualShaderNodeResizableBase>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
