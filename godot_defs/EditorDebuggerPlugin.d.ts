
/**
 * All debugger plugin scripts must extend [EditorDebuggerPlugin]. It provides functions related to editor side of debugger.
 *
 * You don't need to instantiate this class. That is handled by the debugger itself. [Control] nodes can be added as child nodes to provide a GUI front-end for the plugin.
 *
 * Do not queue_free/reparent it's instance otherwise the instance becomes unusable.
 *
*/
declare class EditorDebuggerPlugin extends Control {

  
/**
 * All debugger plugin scripts must extend [EditorDebuggerPlugin]. It provides functions related to editor side of debugger.
 *
 * You don't need to instantiate this class. That is handled by the debugger itself. [Control] nodes can be added as child nodes to provide a GUI front-end for the plugin.
 *
 * Do not queue_free/reparent it's instance otherwise the instance becomes unusable.
 *
*/
  "new"(): this;
  static "new"(): this;




/** Returns [code]true[/code] if a message capture with given name is present otherwise [code]false[/code]. */
has_capture(name: StringName): boolean;

/** Returns [code]true[/code] if the game is in break state otherwise [code]false[/code]. */
is_breaked(): boolean;

/** Returns [code]true[/code] if the game can be debugged otherwise [code]false[/code]. */
is_debuggable(): boolean;

/** Returns [code]true[/code] if there is an instance of  the game running with the attached debugger otherwise [code]false[/code]. */
is_session_active(): boolean;

/**
 * Registers a message capture with given `name`. If `name` is "my_message" then messages starting with "my_message:" will be called with the given callable.
 *
 * Callable must accept a message string and a data array as argument. If the message and data are valid then callable must return `true` otherwise `false`.
 *
*/
register_message_capture(name: StringName, callable: Callable): void;

/** Sends a message with given [code]message[/code] and [code]data[/code] array. */
send_message(message: String, data: any[]): void;

/** Unregisters the message capture with given name. */
unregister_message_capture(name: StringName): void;

  connect<T extends SignalsOf<EditorDebuggerPlugin>, U extends Node>(signal: T, node: U, method: keyof U): number;





  /**
 * Emitted when the game enters a break state.
 *
*/
breaked: Signal<(can_debug: boolean) => void>

/**
 * Emitted when the game exists a break state.
 *
*/
continued: Signal<() => void>

/**
 * Emitted when the debugging starts.
 *
*/
started: Signal<() => void>

/**
 * Emitted when the debugging stops.
 *
*/
stopped: Signal<() => void>

}


 
