
/**
 * The editor inspector is by default located on the right-hand side of the editor. It's used to edit the properties of the selected node. For example, you can select a node such as [Sprite] then edit its transform through the inspector tool. The editor inspector is an essential tool in the game development workflow.
 *
 * **Note:** This class shouldn't be instantiated directly. Instead, access the singleton using [method EditorInterface.get_inspector].
 *
*/
declare class EditorInspector extends ScrollContainer {

  
/**
 * The editor inspector is by default located on the right-hand side of the editor. It's used to edit the properties of the selected node. For example, you can select a node such as [Sprite] then edit its transform through the inspector tool. The editor inspector is an essential tool in the game development workflow.
 *
 * **Note:** This class shouldn't be instantiated directly. Instead, access the singleton using [method EditorInterface.get_inspector].
 *
*/
  "new"(): EditorInspector;
  static "new"(): EditorInspector;




/**
 * Refreshes the inspector.
 *
 * **Note:** To save on CPU resources, calling this method will do nothing if the time specified in `docks/property_editor/auto_refresh_interval` editor setting hasn't passed yet since this method was last called. (By default, this interval is set to 0.3 seconds.)
 *
*/
refresh(): void;

  connect<T extends SignalsOf<EditorInspector>, U extends Node>(signal: T, node: U, method: keyof U): number;





  /**
 * Emitted when the Edit button of an [Object] has been pressed in the inspector. This is mainly used in the remote scene tree inspector.
 *
*/
object_id_selected: Signal<(id: int) => void>

/**
 * Emitted when a property is edited in the inspector.
 *
*/
property_edited: Signal<(property: string) => void>

/**
 * Emitted when a property is keyed in the inspector. Properties can be keyed by clicking the "key" icon next to a property when the Animation panel is toggled.
 *
*/
property_keyed: Signal<(property: string) => void>

/**
 * Emitted when a property is selected in the inspector.
 *
*/
property_selected: Signal<(property: string) => void>

/**
 * Emitted when a boolean property is toggled in the inspector.
 *
 * **Note:** This signal is never emitted if the internal `autoclear` property enabled. Since this property is always enabled in the editor inspector, this signal is never emitted by the editor itself.
 *
*/
property_toggled: Signal<(property: string, checked: boolean) => void>

/**
 * Emitted when a resource is selected in the inspector.
 *
*/
resource_selected: Signal<(res: Object, prop: string) => void>

/**
 * Emitted when a property that requires a restart to be applied is edited in the inspector. This is only used in the Project Settings and Editor Settings.
 *
*/
restart_requested: Signal<() => void>

}
