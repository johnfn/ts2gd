
/**
 * This object manages the SceneTree selection in the editor.
 *
 * **Note:** This class shouldn't be instantiated directly. Instead, access the singleton using [method EditorInterface.get_selection].
 *
*/
declare class EditorSelection extends Object {

  
/**
 * This object manages the SceneTree selection in the editor.
 *
 * **Note:** This class shouldn't be instantiated directly. Instead, access the singleton using [method EditorInterface.get_selection].
 *
*/
  "new"(): EditorSelection;
  static "new"(): EditorSelection;




/** Adds a node to the selection. */
add_node(node: Node): void;

/** Clear the selection. */
clear(): void;

/** Gets the list of selected nodes. */
get_selected_nodes(): any[];

/** Gets the list of selected nodes, optimized for transform operations (i.e. moving them, rotating, etc). This list avoids situations where a node is selected and also child/grandchild. */
get_transformable_selected_nodes(): any[];

/** Removes a node from the selection. */
remove_node(node: Node): void;

  connect<T extends SignalsOf<EditorSelection>, U extends Node>(signal: T, node: U, method: keyof U): number;





  /**
 * Emitted when the selection changes.
 *
*/
selection_changed: Signal<() => void>

}
