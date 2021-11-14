
/**
 * As one of the most important classes, the [SceneTree] manages the hierarchy of nodes in a scene as well as scenes themselves. Nodes can be added, retrieved and removed. The whole scene tree (and thus the current scene) can be paused. Scenes can be loaded, switched and reloaded.
 *
 * You can also use the [SceneTree] to organize your nodes into groups: every node can be assigned as many groups as you want to create, e.g. an "enemy" group. You can then iterate these groups or even call methods and set properties on all the group's members at once.
 *
 * [SceneTree] is the default [MainLoop] implementation used by scenes, and is thus in charge of the game loop.
 *
*/
declare class SceneTree extends MainLoop  {

  
/**
 * As one of the most important classes, the [SceneTree] manages the hierarchy of nodes in a scene as well as scenes themselves. Nodes can be added, retrieved and removed. The whole scene tree (and thus the current scene) can be paused. Scenes can be loaded, switched and reloaded.
 *
 * You can also use the [SceneTree] to organize your nodes into groups: every node can be assigned as many groups as you want to create, e.g. an "enemy" group. You can then iterate these groups or even call methods and set properties on all the group's members at once.
 *
 * [SceneTree] is the default [MainLoop] implementation used by scenes, and is thus in charge of the game loop.
 *
*/
  new(): SceneTree; 
  static "new"(): SceneTree 


/** The current scene. */
current_scene: Node;

/** If [code]true[/code], collision shapes will be visible when running the game from the editor for debugging purposes. */
debug_collisions_hint: boolean;

/** If [code]true[/code], navigation polygons will be visible when running the game from the editor for debugging purposes. */
debug_navigation_hint: boolean;

/** The root of the edited scene. */
edited_scene_root: Node;

/** The default [MultiplayerAPI] instance for this [SceneTree]. */
multiplayer: MultiplayerAPI;

/**
 * If `true` (default value), enables automatic polling of the [MultiplayerAPI] for this SceneTree during [signal idle_frame].
 *
 * If `false`, you need to manually call [method MultiplayerAPI.poll] to process network packets and deliver RPCs/RSETs. This allows running RPCs/RSETs in a different loop (e.g. physics, thread, specific time step) and for manual [Mutex] protection when accessing the [MultiplayerAPI] from threads.
 *
*/
multiplayer_poll: boolean;

/** The peer object to handle the RPC system (effectively enabling networking when set). Depending on the peer itself, the [SceneTree] will become a network server (check with [method is_network_server]) and will set the root node's network mode to master, or it will become a regular peer with the root node set to puppet. All child nodes are set to inherit the network mode by default. Handling of networking-related events (connection, disconnection, new clients) is done by connecting to [SceneTree]'s signals. */
network_peer: NetworkedMultiplayerPeer;

/**
 * If `true`, the [SceneTree] is paused. Doing so will have the following behavior:
 *
 * - 2D and 3D physics will be stopped. This includes signals and collision detection.
 *
 * - [method Node._process], [method Node._physics_process] and [method Node._input] will not be called anymore in nodes.
 *
*/
paused: boolean;

/** If [code]true[/code], the [SceneTree]'s [member network_peer] refuses new incoming connections. */
refuse_new_network_connections: boolean;

/** The [SceneTree]'s root [Viewport]. */
root: Viewport;

/** If [code]true[/code], font oversampling is used. */
use_font_oversampling: boolean;

/**
 * Calls `method` on each member of the given group. You can pass arguments to `method` by specifying them at the end of the method call. This method is equivalent of calling [method call_group_flags] with [constant GROUP_CALL_DEFAULT] flag.
 *
 * **Note:** `method` may only have 5 arguments at most (7 arguments passed to this method in total).
 *
 * **Note:** Due to design limitations, [method call_group] will fail silently if one of the arguments is `null`.
 *
 * **Note:** [method call_group] will always call methods with an one-frame delay, in a way similar to [method Object.call_deferred]. To call methods immediately, use [method call_group_flags] with the [constant GROUP_CALL_REALTIME] flag.
 *
*/
call_group(...args: any[]): any;

/**
 * Calls `method` on each member of the given group, respecting the given [enum GroupCallFlags]. You can pass arguments to `method` by specifying them at the end of the method call.
 *
 * **Note:** `method` may only have 5 arguments at most (8 arguments passed to this method in total).
 *
 * **Note:** Due to design limitations, [method call_group_flags] will fail silently if one of the arguments is `null`.
 *
 * @example 
 * 
 * # Call the method immediately and in reverse order.
 * get_tree().call_group_flags(SceneTree.GROUP_CALL_REALTIME | SceneTree.GROUP_CALL_REVERSE, "bases", "destroy")
 * @summary 
 * 
 *
*/
call_group_flags(...args: any[]): any;

/**
 * Changes the running scene to the one at the given `path`, after loading it into a [PackedScene] and creating a new instance.
 *
 * Returns [constant OK] on success, [constant ERR_CANT_OPEN] if the `path` cannot be loaded into a [PackedScene], or [constant ERR_CANT_CREATE] if that scene cannot be instantiated.
 *
 * **Note:** The scene change is deferred, which means that the new scene node is added on the next idle frame. You won't be able to access it immediately after the [method change_scene] call.
 *
*/
change_scene(path: SceneName): int

/**
 * Changes the running scene to a new instance of the given [PackedScene].
 *
 * Returns [constant OK] on success or [constant ERR_CANT_CREATE] if the scene cannot be instantiated.
 *
 * **Note:** The scene change is deferred, which means that the new scene node is added on the next idle frame. You won't be able to access it immediately after the [method change_scene_to] call.
 *
*/
change_scene_to(packed_scene: PackedScene<any>): int;

/**
 * Returns a [SceneTreeTimer] which will [signal SceneTreeTimer.timeout] after the given time in seconds elapsed in this [SceneTree]. If `pause_mode_process` is set to `false`, pausing the [SceneTree] will also pause the timer.
 *
 * Commonly used to create a one-shot delay timer as in the following example:
 *
 * @example 
 * 
 * func some_function():
 *     print("start")
 *     yield(get_tree().create_timer(1.0), "timeout")
 *     print("end")
 * @summary 
 * 
 *
 * The timer will be automatically freed after its time elapses.
 *
*/
create_timer(time_sec: float, pause_mode_process?: boolean): SceneTreeTimer;

/** Returns the current frame number, i.e. the total frame count since the application started. */
get_frame(): int;

/** Returns the peer IDs of all connected peers of this [SceneTree]'s [member network_peer]. */
get_network_connected_peers(): PoolIntArray;

/** Returns the unique peer ID of this [SceneTree]'s [member network_peer]. */
get_network_unique_id(): int;

/** Returns the number of nodes in this [SceneTree]. */
get_node_count(): int;

/** Returns a list of all nodes assigned to the given group. */
get_nodes_in_group<T extends keyof Groups>(group: T): Groups[T][]

/** Returns the sender's peer ID for the most recently received RPC call. */
get_rpc_sender_id(): int;

/** Returns [code]true[/code] if the given group exists. */
has_group<T extends keyof Groups>(name: T): boolean

/** Returns [code]true[/code] if there is a [member network_peer] set. */
has_network_peer(): boolean;

/** Returns [code]true[/code] if the most recent [InputEvent] was marked as handled with [method set_input_as_handled]. */
is_input_handled(): boolean;

/** Returns [code]true[/code] if this [SceneTree]'s [member network_peer] is in server mode (listening for connections). */
is_network_server(): boolean;

/** Sends the given notification to all members of the [code]group[/code]. */
notify_group(group: string, notification: int): void;

/** Sends the given notification to all members of the [code]group[/code], respecting the given [enum GroupCallFlags]. */
notify_group_flags(call_flags: int, group: string, notification: int): void;

/** Queues the given object for deletion, delaying the call to [method Object.free] to after the current frame. */
queue_delete(obj: Object): void;

/**
 * Quits the application at the end of the current iteration. A process `exit_code` can optionally be passed as an argument. If this argument is `0` or greater, it will override the [member OS.exit_code] defined before quitting the application.
 *
 * **Note:** On iOS this method doesn't work. Instead, as recommended by the iOS Human Interface Guidelines, the user is expected to close apps via the Home button.
 *
*/
quit(exit_code?: int): void;

/**
 * Reloads the currently active scene.
 *
 * Returns [constant OK] on success, [constant ERR_UNCONFIGURED] if no [member current_scene] was defined yet, [constant ERR_CANT_OPEN] if [member current_scene] cannot be loaded into a [PackedScene], or [constant ERR_CANT_CREATE] if the scene cannot be instantiated.
 *
*/
reload_current_scene(): int;

/**
 * If `true`, the application automatically accepts quitting. Enabled by default.
 *
 * For mobile platforms, see [method set_quit_on_go_back].
 *
*/
set_auto_accept_quit(enabled: boolean): void;

/** Sets the given [code]property[/code] to [code]value[/code] on all members of the given group. */
set_group(group: string, property: string, value: any): void;

/** Sets the given [code]property[/code] to [code]value[/code] on all members of the given group, respecting the given [enum GroupCallFlags]. */
set_group_flags(call_flags: int, group: string, property: string, value: any): void;

/** Marks the most recent [InputEvent] as handled. */
set_input_as_handled(): void;

/**
 * If `true`, the application quits automatically on going back (e.g. on Android). Enabled by default.
 *
 * To handle 'Go Back' button when this option is disabled, use [constant MainLoop.NOTIFICATION_WM_GO_BACK_REQUEST].
 *
*/
set_quit_on_go_back(enabled: boolean): void;

/** Configures screen stretching to the given [enum StretchMode], [enum StretchAspect], minimum size and [code]scale[/code]. */
set_screen_stretch(mode: int, aspect: int, minsize: Vector2, scale?: float): void;

  connect<T extends SignalsOf<SceneTree>>(signal: T, method: SignalFunction<SceneTree[T]>): number;



/**
 * Call a group with no flags (default).
 *
*/
static GROUP_CALL_DEFAULT: any;

/**
 * Call a group in reverse scene order.
 *
*/
static GROUP_CALL_REVERSE: any;

/**
 * Call a group immediately (calls are normally made on idle).
 *
*/
static GROUP_CALL_REALTIME: any;

/**
 * Call a group only once even if the call is executed many times.
 *
*/
static GROUP_CALL_UNIQUE: any;

/**
 * No stretching.
 *
*/
static STRETCH_MODE_DISABLED: any;

/**
 * Render stretching in higher resolution (interpolated).
 *
*/
static STRETCH_MODE_2D: any;

/**
 * Keep the specified display resolution. No interpolation. Content may appear pixelated.
 *
*/
static STRETCH_MODE_VIEWPORT: any;

/**
 * Fill the window with the content stretched to cover excessive space. Content may appear stretched.
 *
*/
static STRETCH_ASPECT_IGNORE: any;

/**
 * Retain the same aspect ratio by padding with black bars on either axis. This prevents distortion.
 *
*/
static STRETCH_ASPECT_KEEP: any;

/**
 * Expand vertically. Left/right black bars may appear if the window is too wide.
 *
*/
static STRETCH_ASPECT_KEEP_WIDTH: any;

/**
 * Expand horizontally. Top/bottom black bars may appear if the window is too tall.
 *
*/
static STRETCH_ASPECT_KEEP_HEIGHT: any;

/**
 * Expand in both directions, retaining the same aspect ratio. This prevents distortion while avoiding black bars.
 *
*/
static STRETCH_ASPECT_EXPAND: any;


/**
 * Emitted whenever this [SceneTree]'s [member network_peer] successfully connected to a server. Only emitted on clients.
 *
*/
$connected_to_server: Signal<() => void>

/**
 * Emitted whenever this [SceneTree]'s [member network_peer] fails to establish a connection to a server. Only emitted on clients.
 *
*/
$connection_failed: Signal<() => void>

/**
 * Emitted when files are dragged from the OS file manager and dropped in the game window. The arguments are a list of file paths and the identifier of the screen where the drag originated.
 *
*/
$files_dropped: Signal<(files: PoolStringArray, screen: int) => void>

/**
 * Emitted whenever global menu item is clicked.
 *
*/
$global_menu_action: Signal<(id: any, meta: any) => void>

/**
 * Emitted immediately before [method Node._process] is called on every node in the [SceneTree].
 *
*/
$idle_frame: Signal<() => void>

/**
 * Emitted whenever this [SceneTree]'s [member network_peer] connects with a new peer. ID is the peer ID of the new peer. Clients get notified when other clients connect to the same server. Upon connecting to a server, a client also receives this signal for the server (with ID being 1).
 *
*/
$network_peer_connected: Signal<(id: int) => void>

/**
 * Emitted whenever this [SceneTree]'s [member network_peer] disconnects from a peer. Clients get notified when other clients disconnect from the same server.
 *
*/
$network_peer_disconnected: Signal<(id: int) => void>

/**
 * Emitted whenever a node is added to the [SceneTree].
 *
*/
$node_added: Signal<(node: Node) => void>

/**
 * Emitted when a node's configuration changed. Only emitted in `tool` mode.
 *
*/
$node_configuration_warning_changed: Signal<(node: Node) => void>

/**
 * Emitted whenever a node is removed from the [SceneTree].
 *
*/
$node_removed: Signal<(node: Node) => void>

/**
 * Emitted whenever a node is renamed.
 *
*/
$node_renamed: Signal<(node: Node) => void>

/**
 * Emitted immediately before [method Node._physics_process] is called on every node in the [SceneTree].
 *
*/
$physics_frame: Signal<() => void>

/**
 * Emitted when the screen resolution (fullscreen) or window size (windowed) changes.
 *
*/
$screen_resized: Signal<() => void>

/**
 * Emitted whenever this [SceneTree]'s [member network_peer] disconnected from server. Only emitted on clients.
 *
*/
$server_disconnected: Signal<() => void>

/**
 * Emitted whenever the [SceneTree] hierarchy changed (children being moved or renamed, etc.).
 *
*/
$tree_changed: Signal<() => void>

}

