
/**
 * Base class of all sort of input event. See [method Node._input].
 *
*/
declare class InputEvent extends Resource {

  
/**
 * Base class of all sort of input event. See [method Node._input].
 *
*/
  "new"(): InputEvent;
  static "new"(): InputEvent;



/**
 * The event's device ID.
 *
 * **Note:** This device ID will always be `-1` for emulated mouse input from a touchscreen. This can be used to distinguish emulated mouse input from physical mouse input.
 *
*/
device: int;

/**
 * Returns `true` if the given input event and this input event can be added together (only for events of type [InputEventMouseMotion]).
 *
 * The given input event's position, global position and speed will be copied. The resulting `relative` is a sum of both events. Both events' modifiers have to be identical.
 *
*/
accumulate(with_event: InputEvent): boolean;

/** Returns a [String] representation of the event. */
as_text(): string;

/** Returns a value between 0.0 and 1.0 depending on the given actions' state. Useful for getting the value of events of type [InputEventJoypadMotion]. */
get_action_strength(action: string): float;

/** Returns [code]true[/code] if this input event matches a pre-defined action of any type. */
is_action(action: string): boolean;

/** Returns [code]true[/code] if the given action is being pressed (and is not an echo event for [InputEventKey] events, unless [code]allow_echo[/code] is [code]true[/code]). Not relevant for events of type [InputEventMouseMotion] or [InputEventScreenDrag]. */
is_action_pressed(action: string, allow_echo?: boolean): boolean;

/** Returns [code]true[/code] if the given action is released (i.e. not pressed). Not relevant for events of type [InputEventMouseMotion] or [InputEventScreenDrag]. */
is_action_released(action: string): boolean;

/** Returns [code]true[/code] if this input event's type is one that can be assigned to an input action. */
is_action_type(): boolean;

/** Returns [code]true[/code] if this input event is an echo event (only for events of type [InputEventKey]). */
is_echo(): boolean;

/** Returns [code]true[/code] if this input event is pressed. Not relevant for events of type [InputEventMouseMotion] or [InputEventScreenDrag]. */
is_pressed(): boolean;

/** Returns [code]true[/code] if the given input event is checking for the same key ([InputEventKey]), button ([InputEventJoypadButton]) or action ([InputEventAction]). */
shortcut_match(event: InputEvent): boolean;

/** Returns a copy of the given input event which has been offset by [code]local_ofs[/code] and transformed by [code]xform[/code]. Relevant for events of type [InputEventMouseButton], [InputEventMouseMotion], [InputEventScreenTouch], [InputEventScreenDrag], [InputEventMagnifyGesture] and [InputEventPanGesture]. */
xformed_by(xform: Transform2D, local_ofs?: Vector2): InputEvent;

  connect<T extends SignalsOf<InputEvent>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
