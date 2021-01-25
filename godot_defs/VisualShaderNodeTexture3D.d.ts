
/**
 * Performs a lookup operation on the provided texture, with support for multiple texture sources to choose from.
 *
*/
declare class VisualShaderNodeTexture3D extends VisualShaderNodeSample3D {

  
/**
 * Performs a lookup operation on the provided texture, with support for multiple texture sources to choose from.
 *
*/
  "new"(): this;
  static "new"(): this;



/** A source texture. Used if [member VisualShaderNodeSample3D.source] is set to [constant VisualShaderNodeSample3D.SOURCE_TEXTURE]. */
texture: Texture3D;



  connect<T extends SignalsOf<VisualShaderNodeTexture3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
