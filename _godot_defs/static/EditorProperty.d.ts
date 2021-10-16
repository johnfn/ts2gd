
/**
 * This control allows property editing for one or multiple properties into [EditorInspector]. It is added via [EditorInspectorPlugin].
 *
*/
declare class EditorProperty extends Container {

  
/**
 * This control allows property editing for one or multiple properties into [EditorInspector]. It is added via [EditorInspectorPlugin].
 *
*/
  "new"(): EditorProperty;
  static "new"(): EditorProperty;



/** Used by the inspector, set to [code]true[/code] when the property is checkable. */
checkable: boolean;

/** Used by the inspector, set to [code]true[/code] when the property is checked. */
checked: boolean;

/** Used by the inspector, set to [code]true[/code] when the property is drawn with the editor theme's warning color. This is used for editable children's properties. */
draw_red: boolean;

/** Used by the inspector, set to [code]true[/code] when the property can add keys for animation. */
keying: boolean;

/** Set this property to change the label (if you want to show one). */
label: string;

/** Used by the inspector, set to [code]true[/code] when the property is read-only. */
read_only: boolean;

/** If any of the controls added can gain keyboard focus, add it here. This ensures that focus will be restored if the inspector is refreshed. */
add_focusable(control: Control): void;

/** If one or several properties have changed, this must be called. [code]field[/code] is used in case your editor can modify fields separately (as an example, Vector3.x). The [code]changing[/code] argument avoids the editor requesting this property to be refreshed (leave as [code]false[/code] if unsure). */
emit_changed(property: string, value: any, field?: string, changing?: boolean): void;

/** Gets the edited object. */
get_edited_object(): Object;

/** Gets the edited property. If your editor is for a single property (added via [method EditorInspectorPlugin.parse_property]), then this will return the property. */
get_edited_property(): string;

/** Must be implemented to provide a custom tooltip to the property editor. */
get_tooltip_text(): string;

/** Puts the [code]editor[/code] control below the property label. The control must be previously added using [method Node.add_child]. */
set_bottom_editor(editor: Control): void;

/** When this virtual function is called, you must update your editor. */
update_property(): void;

  // connect<T extends SignalsOf<EditorProperty>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<EditorPropertySignals>>(signal: T, method: SignalFunction<EditorPropertySignals[T]>): number;




}

declare class EditorPropertySignals extends ContainerSignals {
  /**
 * Emit it if you want multiple properties modified at the same time. Do not use if added via [method EditorInspectorPlugin.parse_property].
 *
*/
multiple_properties_changed: Signal<(properties: PoolStringArray, value: any[]) => void>

/**
 * Used by sub-inspectors. Emit it if what was selected was an Object ID.
 *
*/
object_id_selected: Signal<(property: string, id: int) => void>

/**
 * Do not emit this manually, use the [method emit_changed] method instead.
 *
*/
property_changed: Signal<(property: string, value: any) => void>

/**
 * Emitted when a property was checked. Used internally.
 *
*/
property_checked: Signal<(property: string, bool: string) => void>

/**
 * Emit it if you want to add this value as an animation key (check for keying being enabled first).
 *
*/
property_keyed: Signal<(property: string) => void>

/**
 * Emit it if you want to key a property with a single value.
 *
*/
property_keyed_with_value: Signal<(property: string, value: any) => void>

/**
 * If you want a sub-resource to be edited, emit this signal with the resource.
 *
*/
resource_selected: Signal<(path: string, resource: Resource) => void>

/**
 * Emitted when selected. Used internally.
 *
*/
selected: Signal<(path: string, focusable_idx: int) => void>

}
