
/**
 * Manages all [InputEventAction] which can be created/modified from the project settings menu **Project > Project Settings > Input Map** or in code with [method add_action] and [method action_add_event]. See [method Node._input].
 *
*/
declare class InputMapClass extends Object {

  
/**
 * Manages all [InputEventAction] which can be created/modified from the project settings menu **Project > Project Settings > Input Map** or in code with [method add_action] and [method action_add_event]. See [method Node._input].
 *
*/
  "new"(): InputMapClass;
  static "new"(): InputMapClass;




/** Adds an [InputEvent] to an action. This [InputEvent] will trigger the action. */
action_add_event(action: string, event: InputEvent): void;

/** Removes an [InputEvent] from an action. */
action_erase_event(action: string, event: InputEvent): void;

/** Removes all events from an action. */
action_erase_events(action: string): void;

/** Returns a deadzone value for the action. */
action_get_deadzone(action: string): float;

/** Returns [code]true[/code] if the action has the given [InputEvent] associated with it. */
action_has_event(action: string, event: InputEvent): boolean;

/** Sets a deadzone value for the action. */
action_set_deadzone(action: string, deadzone: float): void;

/**
 * Adds an empty action to the [InputMap] with a configurable `deadzone`.
 *
 * An [InputEvent] can then be added to this action with [method action_add_event].
 *
*/
add_action(action: string, deadzone?: float): void;

/** Removes an action from the [InputMap]. */
erase_action(action: string): void;

/**
 * Returns `true` if the given event is part of an existing action. This method ignores keyboard modifiers if the given [InputEvent] is not pressed (for proper release detection). See [method action_has_event] if you don't want this behavior.
 *
 * If `exact_match` is `false`, it ignores the input modifiers for [InputEventKey] and [InputEventMouseButton] events, and the direction for [InputEventJoypadMotion] events.
 *
*/
event_is_action(event: InputEvent, action: string, exact_match?: boolean): boolean;

/** Returns an array of [InputEvent]s associated with a given action. */
get_action_list(action: string): any[];

/** Returns an array of all actions in the [InputMap]. */
get_actions(): any[];

/** Returns [code]true[/code] if the [InputMap] has a registered action with the given name. */
has_action(action: string): boolean;

/** Clears all [InputEventAction] in the [InputMap] and load it anew from [ProjectSettings]. */
load_from_globals(): void;

  // connect<T extends SignalsOf<InputMapClass>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<InputMapClassSignals>>(signal: T, method: SignalFunction<InputMapClassSignals[T]>): number;




}

declare class InputMapClassSignals extends ObjectSignals {
  
}
