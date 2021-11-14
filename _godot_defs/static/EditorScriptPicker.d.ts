
/**
 * Similar to [EditorResourcePicker] this [Control] node is used in the editor's Inspector dock, but only to edit the `script` property of a [Node]. Default options for creating new resources of all possible subtypes are replaced with dedicated buttons that open the "Attach Node Script" dialog. Can be used with [EditorInspectorPlugin] to recreate the same behavior.
 *
 * **Note:** You must set the [member script_owner] for the custom context menu items to work.
 *
*/
declare class EditorScriptPicker extends EditorResourcePicker  {

  
/**
 * Similar to [EditorResourcePicker] this [Control] node is used in the editor's Inspector dock, but only to edit the `script` property of a [Node]. Default options for creating new resources of all possible subtypes are replaced with dedicated buttons that open the "Attach Node Script" dialog. Can be used with [EditorInspectorPlugin] to recreate the same behavior.
 *
 * **Note:** You must set the [member script_owner] for the custom context menu items to work.
 *
*/
  new(): EditorScriptPicker; 
  static "new"(): EditorScriptPicker 


/** The owner [Node] of the script property that holds the edited resource. */
script_owner: Node;



  connect<T extends SignalsOf<EditorScriptPicker>>(signal: T, method: SignalFunction<EditorScriptPicker[T]>): number;






}

