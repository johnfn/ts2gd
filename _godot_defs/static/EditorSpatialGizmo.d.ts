
/**
 * Custom gizmo that is used for providing custom visualization and editing (handles) for 3D Spatial objects. See [EditorSpatialGizmoPlugin] for more information.
 *
*/
declare class EditorSpatialGizmo extends SpatialGizmo {

  
/**
 * Custom gizmo that is used for providing custom visualization and editing (handles) for 3D Spatial objects. See [EditorSpatialGizmoPlugin] for more information.
 *
*/
  "new"(): EditorSpatialGizmo;
  static "new"(): EditorSpatialGizmo;




/** Adds the specified [code]segments[/code] to the gizmo's collision shape for picking. Call this function during [method redraw]. */
add_collision_segments(segments: PoolVector3Array): void;

/** Adds collision triangles to the gizmo for picking. A [TriangleMesh] can be generated from a regular [Mesh] too. Call this function during [method redraw]. */
add_collision_triangles(triangles: TriangleMesh): void;

/**
 * Adds a list of handles (points) which can be used to deform the object being edited.
 *
 * There are virtual functions which will be called upon editing of these handles. Call this function during [method redraw].
 *
*/
add_handles(handles: PoolVector3Array, material: Material, billboard?: boolean, secondary?: boolean): void;

/** Adds lines to the gizmo (as sets of 2 points), with a given material. The lines are used for visualizing the gizmo. Call this function during [method redraw]. */
add_lines(lines: PoolVector3Array, material: Material, billboard?: boolean, modulate?: Color): void;

/** Adds a mesh to the gizmo with the specified [code]billboard[/code] state, [code]skeleton[/code] and [code]material[/code]. If [code]billboard[/code] is [code]true[/code], the mesh will rotate to always face the camera. Call this function during [method redraw]. */
add_mesh(mesh: ArrayMesh, billboard?: boolean, skeleton?: SkinReference, material?: Material): void;

/** Adds an unscaled billboard for visualization. Call this function during [method redraw]. */
add_unscaled_billboard(material: Material, default_scale?: float, modulate?: Color): void;

/** Removes everything in the gizmo including meshes, collisions and handles. */
clear(): void;

/**
 * Commit a handle being edited (handles must have been previously added by [method add_handles]).
 *
 * If the `cancel` parameter is `true`, an option to restore the edited value to the original is provided.
 *
*/
commit_handle(index: int, restore: any, cancel?: boolean): void;

/**
 * Gets the name of an edited handle (handles must have been previously added by [method add_handles]).
 *
 * Handles can be named for reference to the user when editing.
 *
*/
get_handle_name(index: int): string;

/** Gets actual value of a handle. This value can be anything and used for eventually undoing the motion when calling [method commit_handle]. */
get_handle_value(index: int): any;

/** Returns the [EditorSpatialGizmoPlugin] that owns this gizmo. It's useful to retrieve materials using [method EditorSpatialGizmoPlugin.get_material]. */
get_plugin(): EditorSpatialGizmoPlugin;

/** Returns the Spatial node associated with this gizmo. */
get_spatial_node(): Spatial;

/** Returns [code]true[/code] if the handle at index [code]index[/code] is highlighted by being hovered with the mouse. */
is_handle_highlighted(index: int): boolean;

/** This function is called when the [Spatial] this gizmo refers to changes (the [method Spatial.update_gizmo] is called). */
redraw(): void;

/**
 * This function is used when the user drags a gizmo handle (previously added with [method add_handles]) in screen coordinates.
 *
 * The [Camera] is also provided so screen coordinates can be converted to raycasts.
 *
*/
set_handle(index: int, camera: Camera, point: Vector2): void;

/** Sets the gizmo's hidden state. If [code]true[/code], the gizmo will be hidden. If [code]false[/code], it will be shown. */
set_hidden(hidden: boolean): void;

/** Sets the reference [Spatial] node for the gizmo. [code]node[/code] must inherit from [Spatial]. */
set_spatial_node(node: Node): void;

  // connect<T extends SignalsOf<EditorSpatialGizmo>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<EditorSpatialGizmoSignals>>(signal: T, method: SignalFunction<EditorSpatialGizmoSignals[T]>): number;




}

declare class EditorSpatialGizmoSignals extends SpatialGizmoSignals {
  
}
