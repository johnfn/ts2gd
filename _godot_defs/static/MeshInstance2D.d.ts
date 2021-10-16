
/**
 * Node used for displaying a [Mesh] in 2D. Can be constructed from an existing [Sprite] via a tool in the editor toolbar. Select "Sprite" then "Convert to Mesh2D", select settings in popup and press "Create Mesh2D".
 *
*/
declare class MeshInstance2D extends Node2D {

  
/**
 * Node used for displaying a [Mesh] in 2D. Can be constructed from an existing [Sprite] via a tool in the editor toolbar. Select "Sprite" then "Convert to Mesh2D", select settings in popup and press "Create Mesh2D".
 *
*/
  "new"(): MeshInstance2D;
  static "new"(): MeshInstance2D;



/** The [Mesh] that will be drawn by the [MeshInstance2D]. */
mesh: Mesh;

/**
 * The normal map that will be used if using the default [CanvasItemMaterial].
 *
 * **Note:** Godot expects the normal map to use X+, Y-, and Z+ coordinates. See [url=http://wiki.polycount.com/wiki/Normal_Map_Technical_Details#Common_Swizzle_Coordinates]this page[/url] for a comparison of normal map coordinates expected by popular engines.
 *
*/
normal_map: Texture;

/** The [Texture] that will be used if using the default [CanvasItemMaterial]. Can be accessed as [code]TEXTURE[/code] in CanvasItem shader. */
texture: Texture;



  // connect<T extends SignalsOf<MeshInstance2D>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<MeshInstance2DSignals>>(signal: T, method: SignalFunction<MeshInstance2DSignals[T]>): number;




}

declare class MeshInstance2DSignals extends Node2DSignals {
  /**
 * Emitted when the [member texture] is changed.
 *
*/
texture_changed: Signal<() => void>

}
