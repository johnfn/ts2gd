
/**
 * A [Container] node that holds a [SubViewport], automatically setting its size.
 *
 * **Note:** Changing a SubViewportContainer's [member Control.rect_scale] will cause its contents to appear distorted. To change its visual size without causing distortion, adjust the node's margins instead (if it's not already in a container).
 *
*/
declare class SubViewportContainer extends Container {

  
/**
 * A [Container] node that holds a [SubViewport], automatically setting its size.
 *
 * **Note:** Changing a SubViewportContainer's [member Control.rect_scale] will cause its contents to appear distorted. To change its visual size without causing distortion, adjust the node's margins instead (if it's not already in a container).
 *
*/
  "new"(): this;
  static "new"(): this;



/** If [code]true[/code], the sub-viewport will be scaled to the control's size. */
stretch: boolean;

/**
 * Divides the sub-viewport's effective resolution by this value while preserving its scale. This can be used to speed up rendering.
 *
 * For example, a 1280×720 sub-viewport with [member stretch_shrink] set to `2` will be rendered at 640×360 while occupying the same size in the container.
 *
 * **Note:** [member stretch] must be `true` for this property to work.
 *
*/
stretch_shrink: int;



  connect<T extends SignalsOf<SubViewportContainer>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
