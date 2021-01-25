
/**
 * Canvas drawing layer. [CanvasItem] nodes that are direct or indirect children of a [CanvasLayer] will be drawn in that layer. The layer is a numeric index that defines the draw order. The default 2D scene renders with index 0, so a [CanvasLayer] with index -1 will be drawn below, and one with index 1 will be drawn above. This is very useful for HUDs (in layer 1+ or above), or backgrounds (in layer -1 or below).
 *
*/
declare class CanvasLayer extends Node {

  
/**
 * Canvas drawing layer. [CanvasItem] nodes that are direct or indirect children of a [CanvasLayer] will be drawn in that layer. The layer is a numeric index that defines the draw order. The default 2D scene renders with index 0, so a [CanvasLayer] with index -1 will be drawn below, and one with index 1 will be drawn above. This is very useful for HUDs (in layer 1+ or above), or backgrounds (in layer -1 or below).
 *
*/
  "new"(): CanvasLayer;
  static "new"(): CanvasLayer;



/** The custom [Viewport] node assigned to the [CanvasLayer]. If [code]null[/code], uses the default viewport instead. */
custom_viewport: Node;

/** Sets the layer to follow the viewport in order to simulate a pseudo 3D effect. */
follow_viewport_enable: boolean;

/** Scales the layer when using [member follow_viewport_enable]. Layers moving into the foreground should have increasing scales, while layers moving into the background should have decreasing scales. */
follow_viewport_scale: float;

/** Layer index for draw order. Lower values are drawn first. */
layer: int;

/** The layer's base offset. */
offset: Vector2;

/** The layer's rotation in radians. */
rotation: float;

/** The layer's rotation in degrees. */
rotation_degrees: float;

/** The layer's scale. */
scale: Vector2;

/** The layer's transform. */
transform: Transform2D;

/** Returns the RID of the canvas used by this layer. */
get_canvas(): RID;

  connect<T extends SignalsOf<CanvasLayer>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
