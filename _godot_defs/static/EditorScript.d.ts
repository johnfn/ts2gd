
/**
 * Scripts extending this class and implementing its [method _run] method can be executed from the Script Editor's **File > Run** menu option (or by pressing `Ctrl+Shift+X`) while the editor is running. This is useful for adding custom in-editor functionality to Godot. For more complex additions, consider using [EditorPlugin]s instead.
 *
 * **Note:** Extending scripts need to have `tool` mode enabled.
 *
 * **Example script:**
 *
 * @example 
 * 
 * tool
 * extends EditorScript
 * func _run():
 *     print("Hello from the Godot Editor!")
 * @summary 
 * 
 *
 * **Note:** The script is run in the Editor context, which means the output is visible in the console window started with the Editor (stdout) instead of the usual Godot **Output** dock.
 *
*/
declare class EditorScript extends Reference {

  
/**
 * Scripts extending this class and implementing its [method _run] method can be executed from the Script Editor's **File > Run** menu option (or by pressing `Ctrl+Shift+X`) while the editor is running. This is useful for adding custom in-editor functionality to Godot. For more complex additions, consider using [EditorPlugin]s instead.
 *
 * **Note:** Extending scripts need to have `tool` mode enabled.
 *
 * **Example script:**
 *
 * @example 
 * 
 * tool
 * extends EditorScript
 * func _run():
 *     print("Hello from the Godot Editor!")
 * @summary 
 * 
 *
 * **Note:** The script is run in the Editor context, which means the output is visible in the console window started with the Editor (stdout) instead of the usual Godot **Output** dock.
 *
*/
  "new"(): EditorScript;
  static "new"(): EditorScript;




/** This method is executed by the Editor when [b]File > Run[/b] is used. */
protected _run(): void;

/**
 * Adds `node` as a child of the root node in the editor context.
 *
 * **Warning:** The implementation of this method is currently disabled.
 *
*/
add_root_node(node: Node): void;

/** Returns the [EditorInterface] singleton instance. */
get_editor_interface(): EditorInterface;

/** Returns the Editor's currently active scene. */
get_scene(): Node;

  // connect<T extends SignalsOf<EditorScript>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<EditorScriptSignals>>(signal: T, method: SignalFunction<EditorScriptSignals[T]>): number;




}

declare class EditorScriptSignals extends ReferenceSignals {
  
}
