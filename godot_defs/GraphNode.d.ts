
/**
 * A GraphNode is a container. Each GraphNode can have several input and output slots, sometimes referred to as ports, allowing connections between GraphNodes. To add a slot to GraphNode, add any [Control]-derived child node to it.
 *
 * After adding at least one child to GraphNode new sections will be automatically created in the Inspector called 'Slot'. When 'Slot' is expanded you will see list with index number for each slot. You can click on each of them to expand further.
 *
 * In the Inspector you can enable (show) or disable (hide) slots. By default all slots are disabled so you may not see any slots on your GraphNode initially. You can assign a type to each slot. Only slots of the same type will be able to connect to each other. You can also assign colors to slots. A tuple of input and output slots is defined for each GUI element included in the GraphNode. Input connections are on the left and output connections are on the right side of GraphNode. Only enabled slots are counted as connections.
 *
*/
declare class GraphNode extends Container {

  
/**
 * A GraphNode is a container. Each GraphNode can have several input and output slots, sometimes referred to as ports, allowing connections between GraphNodes. To add a slot to GraphNode, add any [Control]-derived child node to it.
 *
 * After adding at least one child to GraphNode new sections will be automatically created in the Inspector called 'Slot'. When 'Slot' is expanded you will see list with index number for each slot. You can click on each of them to expand further.
 *
 * In the Inspector you can enable (show) or disable (hide) slots. By default all slots are disabled so you may not see any slots on your GraphNode initially. You can assign a type to each slot. Only slots of the same type will be able to connect to each other. You can also assign colors to slots. A tuple of input and output slots is defined for each GUI element included in the GraphNode. Input connections are on the left and output connections are on the right side of GraphNode. Only enabled slots are counted as connections.
 *
*/
  "new"(): GraphNode;
  static "new"(): GraphNode;



/** If [code]true[/code], the GraphNode is a comment node. */
comment: boolean;

/**
 * The offset of the GraphNode, relative to the scroll offset of the [GraphEdit].
 *
 * **Note:** You cannot use position directly, as [GraphEdit] is a [Container].
 *
*/
offset: Vector2;

/** Sets the overlay shown above the GraphNode. See [enum Overlay]. */
overlay: int;

/**
 * If `true`, the user can resize the GraphNode.
 *
 * **Note:** Dragging the handle will only emit the [signal resize_request] signal, the GraphNode needs to be resized manually.
 *
*/
resizable: boolean;

/** If [code]true[/code], the GraphNode is selected. */
selected: boolean;

/**
 * If `true`, the close button will be visible.
 *
 * **Note:** Pressing it will only emit the [signal close_request] signal, the GraphNode needs to be removed manually.
 *
*/
show_close: boolean;

/** The text displayed in the GraphNode's title bar. */
title: string;

/** Disables all input and output slots of the GraphNode. */
clear_all_slots(): void;

/** Disables input and output slot whose index is [code]idx[/code]. */
clear_slot(idx: int): void;

/** Returns the color of the input connection [code]idx[/code]. */
get_connection_input_color(idx: int): Color;

/** Returns the number of enabled input slots (connections) to the GraphNode. */
get_connection_input_count(): int;

/** Returns the position of the input connection [code]idx[/code]. */
get_connection_input_position(idx: int): Vector2;

/** Returns the type of the input connection [code]idx[/code]. */
get_connection_input_type(idx: int): int;

/** Returns the color of the output connection [code]idx[/code]. */
get_connection_output_color(idx: int): Color;

/** Returns the number of enabled output slots (connections) of the GraphNode. */
get_connection_output_count(): int;

/** Returns the position of the output connection [code]idx[/code]. */
get_connection_output_position(idx: int): Vector2;

/** Returns the type of the output connection [code]idx[/code]. */
get_connection_output_type(idx: int): int;

/** Returns the color set to [code]idx[/code] left (input) slot. */
get_slot_color_left(idx: int): Color;

/** Returns the color set to [code]idx[/code] right (output) slot. */
get_slot_color_right(idx: int): Color;

/** Returns the (integer) type of left (input) [code]idx[/code] slot. */
get_slot_type_left(idx: int): int;

/** Returns the (integer) type of right (output) [code]idx[/code] slot. */
get_slot_type_right(idx: int): int;

/** Returns [code]true[/code] if left (input) slot [code]idx[/code] is enabled, [code]false[/code] otherwise. */
is_slot_enabled_left(idx: int): boolean;

/** Returns [code]true[/code] if right (output) slot [code]idx[/code] is enabled, [code]false[/code] otherwise. */
is_slot_enabled_right(idx: int): boolean;

/**
 * Sets properties of the slot with ID `idx`.
 *
 * If `enable_left`/`right`, a port will appear and the slot will be able to be connected from this side.
 *
 * `type_left`/`right` is an arbitrary type of the port. Only ports with the same type values can be connected.
 *
 * `color_left`/`right` is the tint of the port's icon on this side.
 *
 * `custom_left`/`right` is a custom texture for this side's port.
 *
 * **Note:** This method only sets properties of the slot. To create the slot, add a [Control]-derived child to the GraphNode.
 *
*/
set_slot(idx: int, enable_left: boolean, type_left: int, color_left: Color, enable_right: boolean, type_right: int, color_right: Color, custom_left?: Texture, custom_right?: Texture): void;

  connect<T extends SignalsOf<GraphNode>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * No overlay is shown.
 *
*/
static OVERLAY_DISABLED: 0;

/**
 * Show overlay set in the `breakpoint` theme property.
 *
*/
static OVERLAY_BREAKPOINT: 1;

/**
 * Show overlay set in the `position` theme property.
 *
*/
static OVERLAY_POSITION: 2;


  /**
 * Emitted when the GraphNode is requested to be closed. Happens on clicking the close button (see [member show_close]).
 *
*/
close_request: Signal<() => void>

/**
 * Emitted when the GraphNode is dragged.
 *
*/
dragged: Signal<(from: Vector2, to: Vector2) => void>

/**
 * Emitted when the GraphNode is moved.
 *
*/
offset_changed: Signal<() => void>

/**
 * Emitted when the GraphNode is requested to be displayed over other ones. Happens on focusing (clicking into) the GraphNode.
 *
*/
raise_request: Signal<() => void>

/**
 * Emitted when the GraphNode is requested to be resized. Happens on dragging the resizer handle (see [member resizable]).
 *
*/
resize_request: Signal<(new_minsize: Vector2) => void>

}
