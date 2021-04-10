
/**
 * [MultiMeshInstance2D] is a specialized node to instance a [MultiMesh] resource in 2D.
 *
 * Usage is the same as [MultiMeshInstance].
 *
*/
declare class MultiMeshInstance2D extends Node2D {

  
/**
 * [MultiMeshInstance2D] is a specialized node to instance a [MultiMesh] resource in 2D.
 *
 * Usage is the same as [MultiMeshInstance].
 *
*/
  "new"(): MultiMeshInstance2D;
  static "new"(): MultiMeshInstance2D;



/** The [MultiMesh] that will be drawn by the [MultiMeshInstance2D]. */
multimesh: MultiMesh;

/**
 * The normal map that will be used if using the default [CanvasItemMaterial].
 *
 * **Note:** Godot expects the normal map to use X+, Y-, and Z+ coordinates. See [url=http://wiki.polycount.com/wiki/Normal_Map_Technical_Details#Common_Swizzle_Coordinates]this page[/url] for a comparison of normal map coordinates expected by popular engines.
 *
*/
normal_map: Texture;

/** The [Texture] that will be used if using the default [CanvasItemMaterial]. Can be accessed as [code]TEXTURE[/code] in CanvasItem shader. */
texture: Texture;



  connect<T extends SignalsOf<MultiMeshInstance2D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  /**
 * Emitted when the [member texture] is changed.
 *
*/
texture_changed: Signal<() => void>

}
