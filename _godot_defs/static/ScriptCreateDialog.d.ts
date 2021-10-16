
/**
 * The [ScriptCreateDialog] creates script files according to a given template for a given scripting language. The standard use is to configure its fields prior to calling one of the [method Popup.popup] methods.
 *
 * @example 
 * 
 * func _ready():
 *     dialog.config("Node", "res://new_node.gd") # For in-engine types
 *     dialog.config("\"res://base_node.gd\"", "res://derived_node.gd") # For script types
 *     dialog.popup_centered()
 * @summary 
 * 
 *
*/
declare class ScriptCreateDialog extends ConfirmationDialog {

  
/**
 * The [ScriptCreateDialog] creates script files according to a given template for a given scripting language. The standard use is to configure its fields prior to calling one of the [method Popup.popup] methods.
 *
 * @example 
 * 
 * func _ready():
 *     dialog.config("Node", "res://new_node.gd") # For in-engine types
 *     dialog.config("\"res://base_node.gd\"", "res://derived_node.gd") # For script types
 *     dialog.popup_centered()
 * @summary 
 * 
 *
*/
  "new"(): ScriptCreateDialog;
  static "new"(): ScriptCreateDialog;








/** Prefills required fields to configure the ScriptCreateDialog for use. */
config(inherits: string, path: string, built_in_enabled?: boolean, load_enabled?: boolean): void;

  // connect<T extends SignalsOf<ScriptCreateDialog>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<ScriptCreateDialogSignals>>(signal: T, method: SignalFunction<ScriptCreateDialogSignals[T]>): number;




}

declare class ScriptCreateDialogSignals extends ConfirmationDialogSignals {
  /**
 * Emitted when the user clicks the OK button.
 *
*/
script_created: Signal<(script: Script) => void>

}
