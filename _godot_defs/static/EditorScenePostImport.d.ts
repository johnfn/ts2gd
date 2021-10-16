
/**
 * Imported scenes can be automatically modified right after import by setting their **Custom Script** Import property to a `tool` script that inherits from this class.
 *
 * The [method post_import] callback receives the imported scene's root node and returns the modified version of the scene. Usage example:
 *
 * @example 
 * 
 * tool # Needed so it runs in editor
 * extends EditorScenePostImport
 * # This sample changes all node names
 * # Called right after the scene is imported and gets the root node
 * func post_import(scene):
 *     # Change all node names to "modified_[oldnodename]"
 *     iterate(scene)
 *     return scene # Remember to return the imported scene
 * func iterate(node):
 *     if node != null:
 *         node.name = "modified_" + node.name
 *         for child in node.get_children():
 *             iterate(child)
 * @summary 
 * 
 *
*/
declare class EditorScenePostImport extends Reference {

  
/**
 * Imported scenes can be automatically modified right after import by setting their **Custom Script** Import property to a `tool` script that inherits from this class.
 *
 * The [method post_import] callback receives the imported scene's root node and returns the modified version of the scene. Usage example:
 *
 * @example 
 * 
 * tool # Needed so it runs in editor
 * extends EditorScenePostImport
 * # This sample changes all node names
 * # Called right after the scene is imported and gets the root node
 * func post_import(scene):
 *     # Change all node names to "modified_[oldnodename]"
 *     iterate(scene)
 *     return scene # Remember to return the imported scene
 * func iterate(node):
 *     if node != null:
 *         node.name = "modified_" + node.name
 *         for child in node.get_children():
 *             iterate(child)
 * @summary 
 * 
 *
*/
  "new"(): EditorScenePostImport;
  static "new"(): EditorScenePostImport;




/** Returns the source file path which got imported (e.g. [code]res://scene.dae[/code]). */
get_source_file(): string;

/** Returns the resource folder the imported scene file is located in. */
get_source_folder(): string;

/** Called after the scene was imported. This method must return the modified version of the scene. */
post_import(scene: Object): Object;

  // connect<T extends SignalsOf<EditorScenePostImport>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<EditorScenePostImportSignals>>(signal: T, method: SignalFunction<EditorScenePostImportSignals[T]>): number;




}

declare class EditorScenePostImportSignals extends ReferenceSignals {
  
}
