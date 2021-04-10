
/**
 * A virtual class, use the descendants instead.
 *
*/
declare class VisualShaderNodeSample3D extends VisualShaderNode {

  
/**
 * A virtual class, use the descendants instead.
 *
*/
  "new"(): this;
  static "new"(): this;



/** An input source type. */
source: int;



  connect<T extends SignalsOf<VisualShaderNodeSample3D>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Creates internal uniform and provides a way to assign it within node.
 *
*/
static SOURCE_TEXTURE: 0;

/**
 * Use the uniform texture from sampler port.
 *
*/
static SOURCE_PORT: 1;


  
}


 
