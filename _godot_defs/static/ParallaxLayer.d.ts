
/**
 * A ParallaxLayer must be the child of a [ParallaxBackground] node. Each ParallaxLayer can be set to move at different speeds relative to the camera movement or the [member ParallaxBackground.scroll_offset] value.
 *
 * This node's children will be affected by its scroll offset.
 *
 * **Note:** Any changes to this node's position and scale made after it enters the scene will be ignored.
 *
*/
declare class ParallaxLayer extends Node2D  {

  
/**
 * A ParallaxLayer must be the child of a [ParallaxBackground] node. Each ParallaxLayer can be set to move at different speeds relative to the camera movement or the [member ParallaxBackground.scroll_offset] value.
 *
 * This node's children will be affected by its scroll offset.
 *
 * **Note:** Any changes to this node's position and scale made after it enters the scene will be ignored.
 *
*/
  new(): ParallaxLayer; 
  static "new"(): ParallaxLayer 


/** The ParallaxLayer's [Texture] mirroring. Useful for creating an infinite scrolling background. If an axis is set to [code]0[/code], the [Texture] will not be mirrored. */
motion_mirroring: Vector2;

/** The ParallaxLayer's offset relative to the parent ParallaxBackground's [member ParallaxBackground.scroll_offset]. */
motion_offset: Vector2;

/** Multiplies the ParallaxLayer's motion. If an axis is set to [code]0[/code], it will not scroll. */
motion_scale: Vector2;



  connect<T extends SignalsOf<ParallaxLayer>>(signal: T, method: SignalFunction<ParallaxLayer[T]>): number;






}

