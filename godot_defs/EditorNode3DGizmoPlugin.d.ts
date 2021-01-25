
/**
 * EditorNode3DGizmoPlugin allows you to define a new type of Gizmo. There are two main ways to do so: extending [EditorNode3DGizmoPlugin] for the simpler gizmos, or creating a new [EditorNode3DGizmo] type. See the tutorial in the documentation for more info.
 *
*/
declare class EditorNode3DGizmoPlugin extends Resource {

  
/**
 * EditorNode3DGizmoPlugin allows you to define a new type of Gizmo. There are two main ways to do so: extending [EditorNode3DGizmoPlugin] for the simpler gizmos, or creating a new [EditorNode3DGizmo] type. See the tutorial in the documentation for more info.
 *
*/
  "new"(): this;
  static "new"(): this;




/** Adds a new material to the internal material list for the plugin. It can then be accessed with [method get_material]. Should not be overridden. */
add_material(name: String, material: StandardMaterial3D): void;

/** Override this method to define whether the gizmo can be hidden or not. Returns [code]true[/code] if not overridden. */
can_be_hidden(): boolean;

/** Override this method to commit gizmo handles. Called for this plugin's active gizmos. */
commit_handle(gizmo: EditorNode3DGizmo, index: int, restore: any, cancel?: boolean): void;

/** Override this method to return a custom [EditorNode3DGizmo] for the spatial nodes of your choice, return [code]null[/code] for the rest of nodes. See also [method has_gizmo]. */
create_gizmo(spatial: Node3D): EditorNode3DGizmo;

/** Creates a handle material with its variants (selected and/or editable) and adds them to the internal material list. They can then be accessed with [method get_material] and used in [method EditorNode3DGizmo.add_handles]. Should not be overridden. */
create_handle_material(name: String, billboard?: boolean): void;

/** Creates an icon material with its variants (selected and/or editable) and adds them to the internal material list. They can then be accessed with [method get_material] and used in [method EditorNode3DGizmo.add_unscaled_billboard]. Should not be overridden. */
create_icon_material(name: String, texture: Texture2D, on_top?: boolean, color?: Color): void;

/** Creates an unshaded material with its variants (selected and/or editable) and adds them to the internal material list. They can then be accessed with [method get_material] and used in [method EditorNode3DGizmo.add_mesh] and [method EditorNode3DGizmo.add_lines]. Should not be overridden. */
create_material(name: String, color: Color, billboard?: boolean, on_top?: boolean, use_vertex_color?: boolean): void;

/** Override this method to provide gizmo's handle names. Called for this plugin's active gizmos. */
get_handle_name(gizmo: EditorNode3DGizmo, index: int): String;

/** Gets actual value of a handle from gizmo. Called for this plugin's active gizmos. */
get_handle_value(gizmo: EditorNode3DGizmo, index: int): any;

/** Gets material from the internal list of materials. If an [EditorNode3DGizmo] is provided, it will try to get the corresponding variant (selected and/or editable). */
get_material(name: String, gizmo: EditorNode3DGizmo): StandardMaterial3D;

/** Override this method to provide the name that will appear in the gizmo visibility menu. */
get_name(): String;

/**
 * Override this method to set the gizmo's priority. Higher values correspond to higher priority. If a gizmo with higher priority conflicts with another gizmo, only the gizmo with higher priority will be used.
 *
 * All built-in editor gizmos return a priority of `-1`. If not overridden, this method will return `0`, which means custom gizmos will automatically override built-in gizmos.
 *
*/
get_priority(): int;

/** Override this method to define which Node3D nodes have a gizmo from this plugin. Whenever a [Node3D] node is added to a scene this method is called, if it returns [code]true[/code] the node gets a generic [EditorNode3DGizmo] assigned and is added to this plugin's list of active gizmos. */
has_gizmo(spatial: Node3D): boolean;

/** Gets whether a handle is highlighted or not. Called for this plugin's active gizmos. */
is_handle_highlighted(gizmo: EditorNode3DGizmo, index: int): boolean;

/** Override this method to define whether Node3D with this gizmo should be selecteble even when the gizmo is hidden. */
is_selectable_when_hidden(): boolean;

/** Callback to redraw the provided gizmo. Called for this plugin's active gizmos. */
redraw(gizmo: EditorNode3DGizmo): void;

/** Update the value of a handle after it has been updated. Called for this plugin's active gizmos. */
set_handle(gizmo: EditorNode3DGizmo, index: int, camera: Camera3D, point: Vector2): void;

  connect<T extends SignalsOf<EditorNode3DGizmoPlugin>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
