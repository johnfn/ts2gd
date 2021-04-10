
/**
 * A [Container] node that holds a [Viewport], automatically setting its size.
 *
 * **Note:** Changing a ViewportContainer's [member Control.rect_scale] will cause its contents to appear distorted. To change its visual size without causing distortion, adjust the node's margins instead (if it's not already in a container).
 *
*/
declare class ViewportContainer extends Container {

  
/**
 * A [Container] node that holds a [Viewport], automatically setting its size.
 *
 * **Note:** Changing a ViewportContainer's [member Control.rect_scale] will cause its contents to appear distorted. To change its visual size without causing distortion, adjust the node's margins instead (if it's not already in a container).
 *
*/
  "new"(): ViewportContainer;
  static "new"(): ViewportContainer;



/** If [code]true[/code], the viewport will be scaled to the control's size. */
stretch: boolean;

/**
 * Divides the viewport's effective resolution by this value while preserving its scale. This can be used to speed up rendering.
 *
 * For example, a 1280×720 viewport with [member stretch_shrink] set to `2` will be rendered at 640×360 while occupying the same size in the container.
 *
 * **Note:** [member stretch] must be `true` for this property to work.
 *
*/
stretch_shrink: int;



  connect<T extends SignalsOf<ViewportContainer>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
