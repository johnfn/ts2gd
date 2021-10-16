
/**
 * EditorInterface gives you control over Godot editor's window. It allows customizing the window, saving and (re-)loading scenes, rendering mesh previews, inspecting and editing resources and objects, and provides access to [EditorSettings], [EditorFileSystem], [EditorResourcePreview], [ScriptEditor], the editor viewport, and information about scenes.
 *
 * **Note:** This class shouldn't be instantiated directly. Instead, access the singleton using [method EditorPlugin.get_editor_interface].
 *
*/
declare class EditorInterface extends Node {

  
/**
 * EditorInterface gives you control over Godot editor's window. It allows customizing the window, saving and (re-)loading scenes, rendering mesh previews, inspecting and editing resources and objects, and provides access to [EditorSettings], [EditorFileSystem], [EditorResourcePreview], [ScriptEditor], the editor viewport, and information about scenes.
 *
 * **Note:** This class shouldn't be instantiated directly. Instead, access the singleton using [method EditorPlugin.get_editor_interface].
 *
*/
  "new"(): EditorInterface;
  static "new"(): EditorInterface;



/** If [code]true[/code], enables distraction-free mode which hides side docks to increase the space available for the main view. */
distraction_free_mode: boolean;

/** Edits the given [Node]. The node will be also selected if it's inside the scene tree. */
edit_node(node: Node): void;

/** Edits the given [Resource]. */
edit_resource(resource: Resource): void;

/** Returns the main container of Godot editor's window. For example, you can use it to retrieve the size of the container and place your controls accordingly. */
get_base_control(): Control;

/** Returns the current path being viewed in the [FileSystemDock]. */
get_current_path(): string;

/** Returns the edited (current) scene's root [Node]. */
get_edited_scene_root(): Node;

/**
 * Returns the actual scale of the editor UI (`1.0` being 100% scale). This can be used to adjust position and dimensions of the UI added by plugins.
 *
 * **Note:** This value is set via the `interface/editor/display_scale` and `interface/editor/custom_display_scale` editor settings. Editor must be restarted for changes to be properly applied.
 *
*/
get_editor_scale(): float;

/** Returns the editor's [EditorSettings] instance. */
get_editor_settings(): EditorSettings;

/**
 * Returns the main editor control. Use this as a parent for main screens.
 *
 * **Note:** This returns the main editor control containing the whole editor, not the 2D or 3D viewports specifically.
 *
*/
get_editor_viewport(): Control;

/** Returns the editor's [FileSystemDock] instance. */
get_file_system_dock(): FileSystemDock;

/** Returns the editor's [EditorInspector] instance. */
get_inspector(): EditorInspector;

/** Returns an [Array] with the file paths of the currently opened scenes. */
get_open_scenes(): any[];

/** Returns the name of the scene that is being played. If no scene is currently being played, returns an empty string. */
get_playing_scene(): string;

/** Returns the editor's [EditorFileSystem] instance. */
get_resource_filesystem(): EditorFileSystem;

/** Returns the editor's [EditorResourcePreview] instance. */
get_resource_previewer(): EditorResourcePreview;

/** Returns the editor's [ScriptEditor] instance. */
get_script_editor(): ScriptEditor;

/** Returns the path of the directory currently selected in the [FileSystemDock]. If a file is selected, its base directory will be returned using [method String.get_base_dir] instead. */
get_selected_path(): string;

/** Returns the editor's [EditorSelection] instance. */
get_selection(): EditorSelection;

/** Shows the given property on the given [code]object[/code] in the editor's Inspector dock. If [code]inspector_only[/code] is [code]true[/code], plugins will not attempt to edit [code]object[/code]. */
inspect_object(object: Object, for_property?: string, inspector_only?: boolean): void;

/** Returns [code]true[/code] if a scene is currently being played, [code]false[/code] otherwise. Paused scenes are considered as being played. */
is_playing_scene(): boolean;

/** Returns [code]true[/code] if the specified [code]plugin[/code] is enabled. The plugin name is the same as its directory name. */
is_plugin_enabled(plugin: string): boolean;

/** Returns mesh previews rendered at the given size as an [Array] of [Texture]s. */
make_mesh_previews(meshes: any[], preview_size: int): any[];

/** Opens the scene at the given path. */
open_scene_from_path(scene_filepath: string): void;

/** Plays the currently active scene. */
play_current_scene(): void;

/** Plays the scene specified by its filepath. */
play_custom_scene(scene_filepath: string): void;

/** Plays the main scene. */
play_main_scene(): void;

/** Reloads the scene at the given path. */
reload_scene_from_path(scene_filepath: string): void;

/** Saves the scene. Returns either [code]OK[/code] or [code]ERR_CANT_CREATE[/code] (see [@GlobalScope] constants). */
save_scene(): int;

/** Saves the scene as a file at [code]path[/code]. */
save_scene_as(path: string, with_preview?: boolean): void;

/** Selects the file, with the path provided by [code]file[/code], in the FileSystem dock. */
select_file(file: string): void;

/** Sets the editor's current main screen to the one specified in [code]name[/code]. [code]name[/code] must match the text of the tab in question exactly ([code]2D[/code], [code]3D[/code], [code]Script[/code], [code]AssetLib[/code]). */
set_main_screen_editor(name: string): void;

/** Sets the enabled status of a plugin. The plugin name is the same as its directory name. */
set_plugin_enabled(plugin: string, enabled: boolean): void;

/** Stops the scene that is currently playing. */
stop_playing_scene(): void;

  // connect<T extends SignalsOf<EditorInterface>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<EditorInterfaceSignals>>(signal: T, method: SignalFunction<EditorInterfaceSignals[T]>): number;




}

declare class EditorInterfaceSignals extends NodeSignals {
  
}
