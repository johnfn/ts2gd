
/**
 * GraphEdit manages the showing of GraphNodes it contains, as well as connections and disconnections between them. Signals are sent for each of these two events. Disconnection between GraphNode slots is disabled by default.
 *
 * It is greatly advised to enable low-processor usage mode (see [member OS.low_processor_usage_mode]) when using GraphEdits.
 *
*/
declare class GraphEdit extends Control {

  
/**
 * GraphEdit manages the showing of GraphNodes it contains, as well as connections and disconnections between them. Signals are sent for each of these two events. Disconnection between GraphNode slots is disabled by default.
 *
 * It is greatly advised to enable low-processor usage mode (see [member OS.low_processor_usage_mode]) when using GraphEdits.
 *
*/
  "new"(): GraphEdit;
  static "new"(): GraphEdit;




/** If [code]true[/code], the minimap is visible. */
minimap_enabled: boolean;

/** The opacity of the minimap rectangle. */
minimap_opacity: float;

/** The size of the minimap rectangle. The map itself is based on the size of the grid area and is scaled to fit this rectangle. */
minimap_size: Vector2;


/** If [code]true[/code], enables disconnection of existing connections in the GraphEdit by dragging the right end. */
right_disconnects: boolean;

/** The scroll offset. */
scroll_offset: Vector2;

/** If [code]true[/code], makes a label with the current zoom level visible. The zoom value is displayed in percents. */
show_zoom_label: boolean;

/** The snapping distance in pixels. */
snap_distance: int;

/** If [code]true[/code], enables snapping. */
use_snap: boolean;

/** The current zoom value. */
zoom: float;

/** The upper zoom limit. */
zoom_max: float;

/** The lower zoom limit. */
zoom_min: float;

/** The step of each zoom level. */
zoom_step: float;

/** Makes possible the connection between two different slot types. The type is defined with the [method GraphNode.set_slot] method. */
add_valid_connection_type(from_type: int, to_type: int): void;

/** Makes possible to disconnect nodes when dragging from the slot at the left if it has the specified type. */
add_valid_left_disconnect_type(type: int): void;

/** Makes possible to disconnect nodes when dragging from the slot at the right if it has the specified type. */
add_valid_right_disconnect_type(type: int): void;

/** Removes all connections between nodes. */
clear_connections(): void;

/** Create a connection between the [code]from_port[/code] slot of the [code]from[/code] GraphNode and the [code]to_port[/code] slot of the [code]to[/code] GraphNode. If the connection already exists, no connection is created. */
connect_node(from: string, from_port: int, to: string, to_port: int): int;

/** Removes the connection between the [code]from_port[/code] slot of the [code]from[/code] GraphNode and the [code]to_port[/code] slot of the [code]to[/code] GraphNode. If the connection does not exist, no connection is removed. */
disconnect_node(from: string, from_port: int, to: string, to_port: int): void;

/** Returns an Array containing the list of connections. A connection consists in a structure of the form [code]{ from_port: 0, from: "GraphNode name 0", to_port: 1, to: "GraphNode name 1" }[/code]. */
get_connection_list(): any[];

/**
 * Gets the [HBoxContainer] that contains the zooming and grid snap controls in the top left of the graph.
 *
 * Warning: The intended usage of this function is to allow you to reposition or add your own custom controls to the container. This is an internal control and as such should not be freed. If you wish to hide this or any of its children, use their [member CanvasItem.visible] property instead.
 *
*/
get_zoom_hbox(): HBoxContainer;

/** Returns [code]true[/code] if the [code]from_port[/code] slot of the [code]from[/code] GraphNode is connected to the [code]to_port[/code] slot of the [code]to[/code] GraphNode. */
is_node_connected(from: string, from_port: int, to: string, to_port: int): boolean;

/** Returns whether it's possible to connect slots of the specified types. */
is_valid_connection_type(from_type: int, to_type: int): boolean;

/** Makes it not possible to connect between two different slot types. The type is defined with the [method GraphNode.set_slot] method. */
remove_valid_connection_type(from_type: int, to_type: int): void;

/** Removes the possibility to disconnect nodes when dragging from the slot at the left if it has the specified type. */
remove_valid_left_disconnect_type(type: int): void;

/** Removes the possibility to disconnect nodes when dragging from the slot at the right if it has the specified type. */
remove_valid_right_disconnect_type(type: int): void;

/** Sets the coloration of the connection between [code]from[/code]'s [code]from_port[/code] and [code]to[/code]'s [code]to_port[/code] with the color provided in the [code]activity[/code] theme property. */
set_connection_activity(from: string, from_port: int, to: string, to_port: int, amount: float): void;

/** Sets the specified [code]node[/code] as the one selected. */
set_selected(node: Node): void;

  // connect<T extends SignalsOf<GraphEdit>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<GraphEditSignals>>(signal: T, method: SignalFunction<GraphEditSignals[T]>): number;




}

declare class GraphEditSignals extends ControlSignals {
  /**
 * Emitted at the beginning of a GraphNode movement.
 *
*/
_begin_node_move: Signal<() => void>

/**
 * Emitted at the end of a GraphNode movement.
 *
*/
_end_node_move: Signal<() => void>

/**
 * Emitted when user dragging connection from input port into empty space of the graph.
 *
*/
connection_from_empty: Signal<(to: string, to_slot: int, release_position: Vector2) => void>

/**
 * Emitted to the GraphEdit when the connection between the `from_slot` slot of the `from` GraphNode and the `to_slot` slot of the `to` GraphNode is attempted to be created.
 *
*/
connection_request: Signal<(from: string, from_slot: int, to: string, to_slot: int) => void>

/**
 * Emitted when user dragging connection from output port into empty space of the graph.
 *
*/
connection_to_empty: Signal<(from: string, from_slot: int, release_position: Vector2) => void>

/**
 * Emitted when the user presses `Ctrl + C`.
 *
*/
copy_nodes_request: Signal<() => void>

/**
 * Emitted when a GraphNode is attempted to be removed from the GraphEdit.
 *
*/
delete_nodes_request: Signal<() => void>

/**
 * Emitted to the GraphEdit when the connection between `from_slot` slot of `from` GraphNode and `to_slot` slot of `to` GraphNode is attempted to be removed.
 *
*/
disconnection_request: Signal<(from: string, from_slot: int, to: string, to_slot: int) => void>

/**
 * Emitted when a GraphNode is attempted to be duplicated in the GraphEdit.
 *
*/
duplicate_nodes_request: Signal<() => void>

/**
 * Emitted when a GraphNode is selected.
 *
*/
node_selected: Signal<(node: Node) => void>

/**
*/
node_unselected: Signal<(node: Node) => void>

/**
 * Emitted when the user presses `Ctrl + V`.
 *
*/
paste_nodes_request: Signal<() => void>

/**
 * Emitted when a popup is requested. Happens on right-clicking in the GraphEdit. `position` is the position of the mouse pointer when the signal is sent.
 *
*/
popup_request: Signal<(position: Vector2) => void>

/**
 * Emitted when the scroll offset is changed by the user. It will not be emitted when changed in code.
 *
*/
scroll_offset_changed: Signal<(ofs: Vector2) => void>

}
