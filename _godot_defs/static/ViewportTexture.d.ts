
/**
 * Displays the content of a [Viewport] node as a dynamic [Texture]. This can be used to mix controls, 2D, and 3D elements in the same scene.
 *
 * To create a ViewportTexture in code, use the [method Viewport.get_texture] method on the target viewport.
 *
*/
declare class ViewportTexture extends Texture  {

  
/**
 * Displays the content of a [Viewport] node as a dynamic [Texture]. This can be used to mix controls, 2D, and 3D elements in the same scene.
 *
 * To create a ViewportTexture in code, use the [method Viewport.get_texture] method on the target viewport.
 *
*/
  new(): ViewportTexture; 
  static "new"(): ViewportTexture 




/** The path to the [Viewport] node to display. This is relative to the scene root, not to the node which uses the texture. */
viewport_path: NodePathType;



  connect<T extends SignalsOf<ViewportTexture>>(signal: T, method: SignalFunction<ViewportTexture[T]>): number;






}

