
/**
 * These plugins allow adding custom property editors to [EditorInspector].
 *
 * Plugins are registered via [method EditorPlugin.add_inspector_plugin].
 *
 * When an object is edited, the [method can_handle] function is called and must return `true` if the object type is supported.
 *
 * If supported, the function [method parse_begin] will be called, allowing to place custom controls at the beginning of the class.
 *
 * Subsequently, the [method parse_category] and [method parse_property] are called for every category and property. They offer the ability to add custom controls to the inspector too.
 *
 * Finally, [method parse_end] will be called.
 *
 * On each of these calls, the "add" functions can be called.
 *
*/
declare class EditorInspectorPlugin extends Reference {

  
/**
 * These plugins allow adding custom property editors to [EditorInspector].
 *
 * Plugins are registered via [method EditorPlugin.add_inspector_plugin].
 *
 * When an object is edited, the [method can_handle] function is called and must return `true` if the object type is supported.
 *
 * If supported, the function [method parse_begin] will be called, allowing to place custom controls at the beginning of the class.
 *
 * Subsequently, the [method parse_category] and [method parse_property] are called for every category and property. They offer the ability to add custom controls to the inspector too.
 *
 * Finally, [method parse_end] will be called.
 *
 * On each of these calls, the "add" functions can be called.
 *
*/
  "new"(): EditorInspectorPlugin;
  static "new"(): EditorInspectorPlugin;




/** Adds a custom control, which is not necessarily a property editor. */
add_custom_control(control: Control): void;

/** Adds a property editor for an individual property. The [code]editor[/code] control must extend [EditorProperty]. */
add_property_editor(property: string, editor: Control): void;

/** Adds an editor that allows modifying multiple properties. The [code]editor[/code] control must extend [EditorProperty]. */
add_property_editor_for_multiple_properties(label: string, properties: PoolStringArray, editor: Control): void;

/** Returns [code]true[/code] if this object can be handled by this plugin. */
can_handle(object: Object): boolean;

/** Called to allow adding controls at the beginning of the list. */
parse_begin(object: Object): void;

/** Called to allow adding controls at the beginning of the category. */
parse_category(object: Object, category: string): void;

/** Called to allow adding controls at the end of the list. */
parse_end(): void;

/** Called to allow adding property specific editors to the inspector. Usually these inherit [EditorProperty]. Returning [code]true[/code] removes the built-in editor for this property, otherwise allows to insert a custom editor before the built-in one. */
parse_property(object: Object, type: int, path: string, hint: int, hint_text: string, usage: int): boolean;

  // connect<T extends SignalsOf<EditorInspectorPlugin>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<EditorInspectorPluginSignals>>(signal: T, method: SignalFunction<EditorInspectorPluginSignals[T]>): number;




}

declare class EditorInspectorPluginSignals extends ReferenceSignals {
  
}
