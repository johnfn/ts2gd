
/**
 * Plugins are used by the editor to extend functionality. The most common types of plugins are those which edit a given node or resource type, import plugins and export plugins. See also [EditorScript] to add functions to the editor.
 *
*/
declare class EditorPlugin extends Node {

  
/**
 * Plugins are used by the editor to extend functionality. The most common types of plugins are those which edit a given node or resource type, import plugins and export plugins. See also [EditorScript] to add functions to the editor.
 *
*/
  "new"(): EditorPlugin;
  static "new"(): EditorPlugin;




/** Adds a script at [code]path[/code] to the Autoload list as [code]name[/code]. */
add_autoload_singleton(name: string, path: string): void;

/** Adds a control to the bottom panel (together with Output, Debug, Animation, etc). Returns a reference to the button added. It's up to you to hide/show the button when needed. When your plugin is deactivated, make sure to remove your custom control with [method remove_control_from_bottom_panel] and free it with [method Node.queue_free]. */
add_control_to_bottom_panel(control: Control, title: string): ToolButton;

/**
 * Adds a custom control to a container (see [enum CustomControlContainer]). There are many locations where custom controls can be added in the editor UI.
 *
 * Please remember that you have to manage the visibility of your custom controls yourself (and likely hide it after adding it).
 *
 * When your plugin is deactivated, make sure to remove your custom control with [method remove_control_from_container] and free it with [method Node.queue_free].
 *
*/
add_control_to_container(container: int, control: Control): void;

/**
 * Adds the control to a specific dock slot (see [enum DockSlot] for options).
 *
 * If the dock is repositioned and as long as the plugin is active, the editor will save the dock position on further sessions.
 *
 * When your plugin is deactivated, make sure to remove your custom control with [method remove_control_from_docks] and free it with [method Node.queue_free].
 *
*/
add_control_to_dock(slot: int, control: Control): void;

/**
 * Adds a custom type, which will appear in the list of nodes or resources. An icon can be optionally passed.
 *
 * When given node or resource is selected, the base type will be instanced (ie, "Spatial", "Control", "Resource"), then the script will be loaded and set to this object.
 *
 * You can use the virtual method [method handles] to check if your custom object is being edited by checking the script or using the `is` keyword.
 *
 * During run-time, this will be a simple object with a script so this function does not need to be called then.
 *
*/
add_custom_type(type: string, base: string, script: Script, icon: Texture): void;

/** No documentation provided. */
add_export_plugin(plugin: EditorExportPlugin): void;

/** No documentation provided. */
add_import_plugin(importer: EditorImportPlugin): void;

/** No documentation provided. */
add_inspector_plugin(plugin: EditorInspectorPlugin): void;

/** No documentation provided. */
add_scene_import_plugin(scene_importer: EditorSceneImporter): void;

/** No documentation provided. */
add_spatial_gizmo_plugin(plugin: EditorSpatialGizmoPlugin): void;

/** Adds a custom menu item to [b]Project > Tools[/b] as [code]name[/code] that calls [code]callback[/code] on an instance of [code]handler[/code] with a parameter [code]ud[/code] when user activates it. */
add_tool_menu_item(name: string, handler: Object, callback: string, ud?: any): void;

/** Adds a custom submenu under [b]Project > Tools >[/b] [code]name[/code]. [code]submenu[/code] should be an object of class [PopupMenu]. This submenu should be cleaned up using [code]remove_tool_menu_item(name)[/code]. */
add_tool_submenu_item(name: string, submenu: Object): void;

/**
 * This method is called when the editor is about to save the project, switch to another tab, etc. It asks the plugin to apply any pending state changes to ensure consistency.
 *
 * This is used, for example, in shader editors to let the plugin know that it must apply the shader code being written by the user to the object.
 *
*/
apply_changes(): void;

/** No documentation provided. */
build(): boolean;

/** Clear all the state and reset the object being edited to zero. This ensures your plugin does not keep editing a currently existing node, or a node from the wrong scene. */
clear(): void;

/** Called by the engine when the user disables the [EditorPlugin] in the Plugin tab of the project settings window. */
disable_plugin(): void;

/** This function is used for plugins that edit specific object types (nodes or resources). It requests the editor to edit the given object. */
edit(object: Object): void;

/** Called by the engine when the user enables the [EditorPlugin] in the Plugin tab of the project settings window. */
enable_plugin(): void;

/** No documentation provided. */
forward_canvas_draw_over_viewport(overlay: Control): void;

/** No documentation provided. */
forward_canvas_force_draw_over_viewport(overlay: Control): void;

/**
 * Called when there is a root node in the current edited scene, [method handles] is implemented and an [InputEvent] happens in the 2D viewport. Intercepts the [InputEvent], if `return true` [EditorPlugin] consumes the `event`, otherwise forwards `event` to other Editor classes. Example:
 *
 * @example 
 * 
 * # Prevents the InputEvent to reach other Editor classes
 * func forward_canvas_gui_input(event):
 *     var forward = true
 *     return forward
 * @summary 
 * 
 *
 * Must `return false` in order to forward the [InputEvent] to other Editor classes. Example:
 *
 * @example 
 * 
 * # Consumes InputEventMouseMotion and forwards other InputEvent types
 * func forward_canvas_gui_input(event):
 *     var forward = false
 *     if event is InputEventMouseMotion:
 *         forward = true
 *     return forward
 * @summary 
 * 
 *
*/
forward_canvas_gui_input(event: InputEvent): boolean;

/**
 * Called when there is a root node in the current edited scene, [method handles] is implemented and an [InputEvent] happens in the 3D viewport. Intercepts the [InputEvent], if `return true` [EditorPlugin] consumes the `event`, otherwise forwards `event` to other Editor classes. Example:
 *
 * @example 
 * 
 * # Prevents the InputEvent to reach other Editor classes
 * func forward_spatial_gui_input(camera, event):
 *     var forward = true
 *     return forward
 * @summary 
 * 
 *
 * Must `return false` in order to forward the [InputEvent] to other Editor classes. Example:
 *
 * @example 
 * 
 * # Consumes InputEventMouseMotion and forwards other InputEvent types
 * func forward_spatial_gui_input(camera, event):
 *     var forward = false
 *     if event is InputEventMouseMotion:
 *         forward = true
 *     return forward
 * @summary 
 * 
 *
*/
forward_spatial_gui_input(camera: Camera, event: InputEvent): boolean;

/** This is for editors that edit script-based objects. You can return a list of breakpoints in the format ([code]script:line[/code]), for example: [code]res://path_to_script.gd:25[/code]. */
get_breakpoints(): PoolStringArray;

/** Returns the [EditorInterface] object that gives you control over Godot editor's window and its functionalities. */
get_editor_interface(): EditorInterface;

/**
 * Override this method in your plugin to return a [Texture] in order to give it an icon.
 *
 * For main screen plugins, this appears at the top of the screen, to the right of the "2D", "3D", "Script", and "AssetLib" buttons.
 *
 * Ideally, the plugin icon should be white with a transparent background and 16x16 pixels in size.
 *
 * @example 
 * 
 * func get_plugin_icon():
 *     # You can use a custom icon:
 *     return preload("res://addons/my_plugin/my_plugin_icon.svg")
 *     # Or use a built-in icon:
 *     return get_editor_interface().get_base_control().get_icon("Node", "EditorIcons")
 * @summary 
 * 
 *
*/
get_plugin_icon(): Texture;

/**
 * Override this method in your plugin to provide the name of the plugin when displayed in the Godot editor.
 *
 * For main screen plugins, this appears at the top of the screen, to the right of the "2D", "3D", "Script", and "AssetLib" buttons.
 *
*/
get_plugin_name(): string;

/**
 * Gets the Editor's dialogue used for making scripts.
 *
 * **Note:** Users can configure it before use.
 *
*/
get_script_create_dialog(): ScriptCreateDialog;

/** Gets the state of your plugin editor. This is used when saving the scene (so state is kept when opening it again) and for switching tabs (so state can be restored when the tab returns). */
get_state(): Dictionary;

/** Gets the undo/redo object. Most actions in the editor can be undoable, so use this object to make sure this happens when it's worth it. */
get_undo_redo(): UndoRedo;

/** Gets the GUI layout of the plugin. This is used to save the project's editor layout when [method queue_save_layout] is called or the editor layout was changed(For example changing the position of a dock). */
get_window_layout(layout: ConfigFile): void;

/** Implement this function if your plugin edits a specific type of object (Resource or Node). If you return [code]true[/code], then you will get the functions [method edit] and [method make_visible] called when the editor requests them. If you have declared the methods [method forward_canvas_gui_input] and [method forward_spatial_gui_input] these will be called too. */
handles(object: Object): boolean;

/** Returns [code]true[/code] if this is a main screen editor plugin (it goes in the workspace selector together with [b]2D[/b], [b]3D[/b], [b]Script[/b] and [b]AssetLib[/b]). */
has_main_screen(): boolean;

/** No documentation provided. */
hide_bottom_panel(): void;

/** No documentation provided. */
make_bottom_panel_item_visible(item: Control): void;

/**
 * This function will be called when the editor is requested to become visible. It is used for plugins that edit a specific object type.
 *
 * Remember that you have to manage the visibility of all your editor controls manually.
 *
*/
make_visible(visible: boolean): void;

/** Queue save the project's editor layout. */
queue_save_layout(): void;

/** Removes an Autoload [code]name[/code] from the list. */
remove_autoload_singleton(name: string): void;

/** Removes the control from the bottom panel. You have to manually [method Node.queue_free] the control. */
remove_control_from_bottom_panel(control: Control): void;

/** Removes the control from the specified container. You have to manually [method Node.queue_free] the control. */
remove_control_from_container(container: int, control: Control): void;

/** Removes the control from the dock. You have to manually [method Node.queue_free] the control. */
remove_control_from_docks(control: Control): void;

/** Removes a custom type added by [method add_custom_type]. */
remove_custom_type(type: string): void;

/** No documentation provided. */
remove_export_plugin(plugin: EditorExportPlugin): void;

/** No documentation provided. */
remove_import_plugin(importer: EditorImportPlugin): void;

/** No documentation provided. */
remove_inspector_plugin(plugin: EditorInspectorPlugin): void;

/** No documentation provided. */
remove_scene_import_plugin(scene_importer: EditorSceneImporter): void;

/** No documentation provided. */
remove_spatial_gizmo_plugin(plugin: EditorSpatialGizmoPlugin): void;

/** Removes a menu [code]name[/code] from [b]Project > Tools[/b]. */
remove_tool_menu_item(name: string): void;

/** This method is called after the editor saves the project or when it's closed. It asks the plugin to save edited external scenes/resources. */
save_external_data(): void;

/** No documentation provided. */
set_force_draw_over_forwarding_enabled(): void;

/** Use this method if you always want to receive inputs from 3D view screen inside [method forward_spatial_gui_input]. It might be especially usable if your plugin will want to use raycast in the scene. */
set_input_event_forwarding_always_enabled(): void;

/** Restore the state saved by [method get_state]. */
set_state(state: Dictionary): void;

/** Restore the plugin GUI layout saved by [method get_window_layout]. */
set_window_layout(layout: ConfigFile): void;

/** Updates the overlays of the editor (2D/3D) viewport. */
update_overlays(): int;

  connect<T extends SignalsOf<EditorPlugin>, U extends Node>(signal: T, node: U, method: keyof U): number;



/** No documentation provided. */
static CONTAINER_TOOLBAR: 0;

/** No documentation provided. */
static CONTAINER_SPATIAL_EDITOR_MENU: 1;

/** No documentation provided. */
static CONTAINER_SPATIAL_EDITOR_SIDE_LEFT: 2;

/** No documentation provided. */
static CONTAINER_SPATIAL_EDITOR_SIDE_RIGHT: 3;

/** No documentation provided. */
static CONTAINER_SPATIAL_EDITOR_BOTTOM: 4;

/** No documentation provided. */
static CONTAINER_CANVAS_EDITOR_MENU: 5;

/** No documentation provided. */
static CONTAINER_CANVAS_EDITOR_SIDE_LEFT: 6;

/** No documentation provided. */
static CONTAINER_CANVAS_EDITOR_SIDE_RIGHT: 7;

/** No documentation provided. */
static CONTAINER_CANVAS_EDITOR_BOTTOM: 8;

/** No documentation provided. */
static CONTAINER_PROPERTY_EDITOR_BOTTOM: 9;

/** No documentation provided. */
static CONTAINER_PROJECT_SETTING_TAB_LEFT: 10;

/** No documentation provided. */
static CONTAINER_PROJECT_SETTING_TAB_RIGHT: 11;

/** No documentation provided. */
static DOCK_SLOT_LEFT_UL: 0;

/** No documentation provided. */
static DOCK_SLOT_LEFT_BL: 1;

/** No documentation provided. */
static DOCK_SLOT_LEFT_UR: 2;

/** No documentation provided. */
static DOCK_SLOT_LEFT_BR: 3;

/** No documentation provided. */
static DOCK_SLOT_RIGHT_UL: 4;

/** No documentation provided. */
static DOCK_SLOT_RIGHT_BL: 5;

/** No documentation provided. */
static DOCK_SLOT_RIGHT_UR: 6;

/** No documentation provided. */
static DOCK_SLOT_RIGHT_BR: 7;

/**
 * Represents the size of the [enum DockSlot] enum.
 *
*/
static DOCK_SLOT_MAX: 8;


  /**
 * Emitted when user changes the workspace (**2D**, **3D**, **Script**, **AssetLib**). Also works with custom screens defined by plugins.
 *
*/
main_screen_changed: Signal<(screen_name: string) => void>

/**
*/
resource_saved: Signal<(resource: Resource) => void>

/**
 * Emitted when the scene is changed in the editor. The argument will return the root node of the scene that has just become active. If this scene is new and empty, the argument will be `null`.
 *
*/
scene_changed: Signal<(scene_root: Node) => void>

/**
 * Emitted when user closes a scene. The argument is file path to a closed scene.
 *
*/
scene_closed: Signal<(filepath: string) => void>

}
