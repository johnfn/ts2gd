
/**
 * [MainLoop] is the abstract base class for a Godot project's game loop. It is inherited by [SceneTree], which is the default game loop implementation used in Godot projects, though it is also possible to write and use one's own [MainLoop] subclass instead of the scene tree.
 *
 * Upon the application start, a [MainLoop] implementation must be provided to the OS; otherwise, the application will exit. This happens automatically (and a [SceneTree] is created) unless a main [Script] is provided from the command line (with e.g. `godot -s my_loop.gd`, which should then be a [MainLoop] implementation.
 *
 * Here is an example script implementing a simple [MainLoop]:
 *
 * @example 
 * 
 * extends MainLoop
 * var time_elapsed = 0
 * var keys_typed = []
 * var quit = false
 * func _initialize():
 *     print("Initialized:")
 *     print("  Starting time: %s" % str(time_elapsed))
 * func _idle(delta):
 *     time_elapsed += delta
 *     # Return true to end the main loop.
 *     return quit
 * func _input_event(event):
 *     # Record keys.
 *     if event is InputEventKey and event.pressed and !event.echo:
 *         keys_typed.append(OS.get_scancode_string(event.scancode))
 *         # Quit on Escape press.
 *         if event.scancode == KEY_ESCAPE:
 *             quit = true
 *     # Quit on any mouse click.
 *     if event is InputEventMouseButton:
 *         quit = true
 * func _finalize():
 *     print("Finalized:")
 *     print("  End time: %s" % str(time_elapsed))
 *     print("  Keys typed: %s" % var2str(keys_typed))
 * @summary 
 * 
 *
*/
declare class MainLoop extends Object {

  
/**
 * [MainLoop] is the abstract base class for a Godot project's game loop. It is inherited by [SceneTree], which is the default game loop implementation used in Godot projects, though it is also possible to write and use one's own [MainLoop] subclass instead of the scene tree.
 *
 * Upon the application start, a [MainLoop] implementation must be provided to the OS; otherwise, the application will exit. This happens automatically (and a [SceneTree] is created) unless a main [Script] is provided from the command line (with e.g. `godot -s my_loop.gd`, which should then be a [MainLoop] implementation.
 *
 * Here is an example script implementing a simple [MainLoop]:
 *
 * @example 
 * 
 * extends MainLoop
 * var time_elapsed = 0
 * var keys_typed = []
 * var quit = false
 * func _initialize():
 *     print("Initialized:")
 *     print("  Starting time: %s" % str(time_elapsed))
 * func _idle(delta):
 *     time_elapsed += delta
 *     # Return true to end the main loop.
 *     return quit
 * func _input_event(event):
 *     # Record keys.
 *     if event is InputEventKey and event.pressed and !event.echo:
 *         keys_typed.append(OS.get_scancode_string(event.scancode))
 *         # Quit on Escape press.
 *         if event.scancode == KEY_ESCAPE:
 *             quit = true
 *     # Quit on any mouse click.
 *     if event is InputEventMouseButton:
 *         quit = true
 * func _finalize():
 *     print("Finalized:")
 *     print("  End time: %s" % str(time_elapsed))
 *     print("  Keys typed: %s" % var2str(keys_typed))
 * @summary 
 * 
 *
*/
  "new"(): MainLoop;
  static "new"(): MainLoop;




/** Called when files are dragged from the OS file manager and dropped in the game window. The arguments are a list of file paths and the identifier of the screen where the drag originated. */
protected _drop_files(files: PoolStringArray, from_screen: int): void;

/** Called before the program exits. */
protected _finalize(): void;

/** Called when the user performs an action in the system global menu (e.g. the Mac OS menu bar). */
protected _global_menu_action(id: any, meta: any): void;

/**
 * Called each idle frame with the time since the last idle frame as argument (in seconds). Equivalent to [method Node._process].
 *
 * If implemented, the method must return a boolean value. `true` ends the main loop, while `false` lets it proceed to the next frame.
 *
*/
protected _idle(delta: float): boolean;

/** Called once during initialization. */
protected _initialize(): void;

/** Called whenever an [InputEvent] is received by the main loop. */
protected _input_event(event: InputEvent): void;

/** Deprecated callback, does not do anything. Use [method _input_event] to parse text input. Will be removed in Godot 4.0. */
protected _input_text(text: string): void;

/**
 * Called each physics frame with the time since the last physics frame as argument (`delta`, in seconds). Equivalent to [method Node._physics_process].
 *
 * If implemented, the method must return a boolean value. `true` ends the main loop, while `false` lets it proceed to the next frame.
 *
*/
protected _iteration(delta: float): boolean;

/** Should not be called manually, override [method _finalize] instead. Will be removed in Godot 4.0. */
finish(): void;

/** Should not be called manually, override [method _idle] instead. Will be removed in Godot 4.0. */
idle(delta: float): boolean;

/** Should not be called manually, override [method _initialize] instead. Will be removed in Godot 4.0. */
init(): void;

/** Should not be called manually, override [method _input_event] instead. Will be removed in Godot 4.0. */
input_event(event: InputEvent): void;

/** Should not be called manually, override [method _input_text] instead. Will be removed in Godot 4.0. */
input_text(text: string): void;

/** Should not be called manually, override [method _iteration] instead. Will be removed in Godot 4.0. */
iteration(delta: float): boolean;

  // connect<T extends SignalsOf<MainLoop>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<MainLoopSignals>>(signal: T, method: SignalFunction<MainLoopSignals[T]>): number;



/**
 * Notification received from the OS when the mouse enters the game window.
 *
 * Implemented on desktop and web platforms.
 *
*/
static NOTIFICATION_WM_MOUSE_ENTER: any;

/**
 * Notification received from the OS when the mouse leaves the game window.
 *
 * Implemented on desktop and web platforms.
 *
*/
static NOTIFICATION_WM_MOUSE_EXIT: any;

/**
 * Notification received from the OS when the game window is focused.
 *
 * Implemented on all platforms.
 *
*/
static NOTIFICATION_WM_FOCUS_IN: any;

/**
 * Notification received from the OS when the game window is unfocused.
 *
 * Implemented on all platforms.
 *
*/
static NOTIFICATION_WM_FOCUS_OUT: any;

/**
 * Notification received from the OS when a quit request is sent (e.g. closing the window with a "Close" button or Alt+F4).
 *
 * Implemented on desktop platforms.
 *
*/
static NOTIFICATION_WM_QUIT_REQUEST: any;

/**
 * Notification received from the OS when a go back request is sent (e.g. pressing the "Back" button on Android).
 *
 * Specific to the Android platform.
 *
*/
static NOTIFICATION_WM_GO_BACK_REQUEST: any;

/**
 * Notification received from the OS when an unfocus request is sent (e.g. another OS window wants to take the focus).
 *
 * No supported platforms currently send this notification.
 *
*/
static NOTIFICATION_WM_UNFOCUS_REQUEST: any;

/**
 * Notification received from the OS when the application is exceeding its allocated memory.
 *
 * Specific to the iOS platform.
 *
*/
static NOTIFICATION_OS_MEMORY_WARNING: any;

/**
 * Notification received when translations may have changed. Can be triggered by the user changing the locale. Can be used to respond to language changes, for example to change the UI strings on the fly. Useful when working with the built-in translation support, like [method Object.tr].
 *
*/
static NOTIFICATION_TRANSLATION_CHANGED: any;

/**
 * Notification received from the OS when a request for "About" information is sent.
 *
 * Specific to the macOS platform.
 *
*/
static NOTIFICATION_WM_ABOUT: any;

/**
 * Notification received from Godot's crash handler when the engine is about to crash.
 *
 * Implemented on desktop platforms if the crash handler is enabled.
 *
*/
static NOTIFICATION_CRASH: any;

/**
 * Notification received from the OS when an update of the Input Method Engine occurs (e.g. change of IME cursor position or composition string).
 *
 * Specific to the macOS platform.
 *
*/
static NOTIFICATION_OS_IME_UPDATE: any;

/**
 * Notification received from the OS when the app is resumed.
 *
 * Specific to the Android platform.
 *
*/
static NOTIFICATION_APP_RESUMED: any;

/**
 * Notification received from the OS when the app is paused.
 *
 * Specific to the Android platform.
 *
*/
static NOTIFICATION_APP_PAUSED: any;

}

declare class MainLoopSignals extends ObjectSignals {
  /**
 * Emitted when a user responds to a permission request.
 *
*/
on_request_permissions_result: Signal<(permission: string, granted: boolean) => void>

}
