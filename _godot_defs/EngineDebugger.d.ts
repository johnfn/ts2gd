
/**
 * [EngineDebugger] handles the communication between the editor and the running game. It is active in the running game. Messages can be sent/received through it. It also manages the profilers.
 *
*/
declare class EngineDebuggerClass extends Object {

  
/**
 * [EngineDebugger] handles the communication between the editor and the running game. It is active in the running game. Messages can be sent/received through it. It also manages the profilers.
 *
*/
  "new"(): this;
  static "new"(): this;




/** Returns [code]true[/code] if a capture with the given name is present otherwise [code]false[/code]. */
has_capture(name: StringName): boolean;

/** Returns [code]true[/code] if a profiler with the given name is present otherwise [code]false[/code]. */
has_profiler(name: StringName): boolean;

/** Returns [code]true[/code] if the debugger is active otherwise [code]false[/code]. */
is_active(): boolean;

/** Returns [code]true[/code] if a profiler with the given name is present and active otherwise [code]false[/code]. */
is_profiling(name: StringName): boolean;

/** Calls the [code]add[/code] callable of the profiler with given [code]name[/code] and [code]data[/code]. */
profiler_add_frame_data(name: StringName, data: any[]): void;

/** Calls the [code]toggle[/code] callable of the profiler with given [code]name[/code] and [code]arguments[/code]. Enables/Disables the same profiler depending on [code]enable[/code] argument. */
profiler_enable(name: StringName, enable: boolean, arguments?: any[]): void;

/**
 * Registers a message capture with given `name`. If `name` is "my_message" then messages starting with "my_message:" will be called with the given callable.
 *
 * Callable must accept a message string and a data array as argument. If the message and data are valid then callable must return `true` otherwise `false`.
 *
*/
register_message_capture(name: StringName, callable: Callable): void;

/**
 * Registers a profiler with the given `name`.
 *
 * `toggle` callable is called when the profiler is enabled/disabled. It must take an argument array as an argument.
 *
 * `add` callable is called when data is added to profiler using [method EngineDebugger.profiler_add_frame_data]. It must take a data array as argument.
 *
 * `tick` callable is called at every active profiler iteration. It must take frame time, idle time, physics time, and physics idle time as arguments.
 *
*/
register_profiler(name: StringName, toggle: Callable, add: Callable, tick: Callable): void;

/** Sends a message with given [code]message[/code] and [code]data[/code] array. */
send_message(message: String, data: any[]): void;

/** Unregisters the message capture with given [code]name[/code]. */
unregister_message_capture(name: StringName): void;

/** Unregisters a profiler with given [code]name[/code]. */
unregister_profiler(name: StringName): void;

  connect<T extends SignalsOf<EngineDebuggerClass>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
