
/**
 * Helper to manage undo/redo operations in the editor or custom tools. It works by registering methods and property changes inside "actions".
 *
 * Common behavior is to create an action, then add do/undo calls to functions or property changes, then committing the action.
 *
 * Here's an example on how to add an action to the Godot editor's own [UndoRedo], from a plugin:
 *
 * @example 
 * 
 * var undo_redo = get_undo_redo() # Method of EditorPlugin.
 * func do_something():
 *     pass # Put your code here.
 * func undo_something():
 *     pass # Put here the code that reverts what's done by "do_something()".
 * func _on_MyButton_pressed():
 *     var node = get_node("MyNode2D")
 *     undo_redo.create_action("Move the node")
 *     undo_redo.add_do_method(self, "do_something")
 *     undo_redo.add_undo_method(self, "undo_something")
 *     undo_redo.add_do_property(node, "position", Vector2(100,100))
 *     undo_redo.add_undo_property(node, "position", node.position)
 *     undo_redo.commit_action()
 * @summary 
 * 
 *
 * [method create_action], [method add_do_method], [method add_undo_method], [method add_do_property], [method add_undo_property], and [method commit_action] should be called one after the other, like in the example. Not doing so could lead to crashes.
 *
 * If you don't need to register a method, you can leave [method add_do_method] and [method add_undo_method] out; the same goes for properties. You can also register more than one method/property.
 *
*/
declare class UndoRedo extends Object {

  
/**
 * Helper to manage undo/redo operations in the editor or custom tools. It works by registering methods and property changes inside "actions".
 *
 * Common behavior is to create an action, then add do/undo calls to functions or property changes, then committing the action.
 *
 * Here's an example on how to add an action to the Godot editor's own [UndoRedo], from a plugin:
 *
 * @example 
 * 
 * var undo_redo = get_undo_redo() # Method of EditorPlugin.
 * func do_something():
 *     pass # Put your code here.
 * func undo_something():
 *     pass # Put here the code that reverts what's done by "do_something()".
 * func _on_MyButton_pressed():
 *     var node = get_node("MyNode2D")
 *     undo_redo.create_action("Move the node")
 *     undo_redo.add_do_method(self, "do_something")
 *     undo_redo.add_undo_method(self, "undo_something")
 *     undo_redo.add_do_property(node, "position", Vector2(100,100))
 *     undo_redo.add_undo_property(node, "position", node.position)
 *     undo_redo.commit_action()
 * @summary 
 * 
 *
 * [method create_action], [method add_do_method], [method add_undo_method], [method add_do_property], [method add_undo_property], and [method commit_action] should be called one after the other, like in the example. Not doing so could lead to crashes.
 *
 * If you don't need to register a method, you can leave [method add_do_method] and [method add_undo_method] out; the same goes for properties. You can also register more than one method/property.
 *
*/
  "new"(): UndoRedo;
  static "new"(): UndoRedo;




/** Register a method that will be called when the action is committed. */
add_do_method(...args: any[]): void;

/** Register a property value change for "do". */
add_do_property(object: Object, property: string, value: any): void;

/** Register a reference for "do" that will be erased if the "do" history is lost. This is useful mostly for new nodes created for the "do" call. Do not use for resources. */
add_do_reference(object: Object): void;

/** Register a method that will be called when the action is undone. */
add_undo_method(...args: any[]): void;

/** Register a property value change for "undo". */
add_undo_property(object: Object, property: string, value: any): void;

/** Register a reference for "undo" that will be erased if the "undo" history is lost. This is useful mostly for nodes removed with the "do" call (not the "undo" call!). */
add_undo_reference(object: Object): void;

/**
 * Clear the undo/redo history and associated references.
 *
 * Passing `false` to `increase_version` will prevent the version number to be increased from this.
 *
*/
clear_history(increase_version?: boolean): void;

/** Commit the action. All "do" methods/properties are called/set when this function is called. */
commit_action(): void;

/**
 * Create a new action. After this is called, do all your calls to [method add_do_method], [method add_undo_method], [method add_do_property], and [method add_undo_property], then commit the action with [method commit_action].
 *
 * The way actions are merged is dictated by the `merge_mode` argument. See [enum MergeMode] for details.
 *
*/
create_action(name: string, merge_mode?: int): void;

/** Gets the name of the current action. */
get_current_action_name(): string;

/**
 * Gets the version. Every time a new action is committed, the [UndoRedo]'s version number is increased automatically.
 *
 * This is useful mostly to check if something changed from a saved version.
 *
*/
get_version(): int;

/** Returns [code]true[/code] if a "redo" action is available. */
has_redo(): boolean;

/** Returns [code]true[/code] if an "undo" action is available. */
has_undo(): boolean;

/** Returns [code]true[/code] if the [UndoRedo] is currently committing the action, i.e. running its "do" method or property change (see [method commit_action]). */
is_commiting_action(): boolean;

/** Redo the last action. */
redo(): boolean;

/** Undo the last action. */
undo(): boolean;

  // connect<T extends SignalsOf<UndoRedo>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<UndoRedoSignals>>(signal: T, method: SignalFunction<UndoRedoSignals[T]>): number;



/**
 * Makes "do"/"undo" operations stay in separate actions.
 *
*/
static MERGE_DISABLE: any;

/**
 * Makes so that the action's "do" operation is from the first action created and the "undo" operation is from the last subsequent action with the same name.
 *
*/
static MERGE_ENDS: any;

/**
 * Makes subsequent actions with the same name be merged into one.
 *
*/
static MERGE_ALL: any;

}

declare class UndoRedoSignals extends ObjectSignals {
  /**
 * Called when [method undo] or [method redo] was called.
 *
*/
version_changed: Signal<() => void>

}
