
/**
 * Nodes are Godot's building blocks. They can be assigned as the child of another node, resulting in a tree arrangement. A given node can contain any number of nodes as children with the requirement that all siblings (direct children of a node) should have unique names.
 *
 * A tree of nodes is called a **scene**. Scenes can be saved to the disk and then instanced into other scenes. This allows for very high flexibility in the architecture and data model of Godot projects.
 *
 * **Scene tree:** The [SceneTree] contains the active tree of nodes. When a node is added to the scene tree, it receives the [constant NOTIFICATION_ENTER_TREE] notification and its [method _enter_tree] callback is triggered. Child nodes are always added **after** their parent node, i.e. the [method _enter_tree] callback of a parent node will be triggered before its child's.
 *
 * Once all nodes have been added in the scene tree, they receive the [constant NOTIFICATION_READY] notification and their respective [method _ready] callbacks are triggered. For groups of nodes, the [method _ready] callback is called in reverse order, starting with the children and moving up to the parent nodes.
 *
 * This means that when adding a node to the scene tree, the following order will be used for the callbacks: [method _enter_tree] of the parent, [method _enter_tree] of the children, [method _ready] of the children and finally [method _ready] of the parent (recursively for the entire scene tree).
 *
 * **Processing:** Nodes can override the "process" state, so that they receive a callback on each frame requesting them to process (do something). Normal processing (callback [method _process], toggled with [method set_process]) happens as fast as possible and is dependent on the frame rate, so the processing time **delta** is passed as an argument. Physics processing (callback [method _physics_process], toggled with [method set_physics_process]) happens a fixed number of times per second (60 by default) and is useful for code related to the physics engine.
 *
 * Nodes can also process input events. When present, the [method _input] function will be called for each input that the program receives. In many cases, this can be overkill (unless used for simple projects), and the [method _unhandled_input] function might be preferred; it is called when the input event was not handled by anyone else (typically, GUI [Control] nodes), ensuring that the node only receives the events that were meant for it.
 *
 * To keep track of the scene hierarchy (especially when instancing scenes into other scenes), an "owner" can be set for the node with the [member owner] property. This keeps track of who instanced what. This is mostly useful when writing editors and tools, though.
 *
 * Finally, when a node is freed with [method Object.free] or [method queue_free], it will also free all its children.
 *
 * **Groups:** Nodes can be added to as many groups as you want to be easy to manage, you could create groups like "enemies" or "collectables" for example, depending on your game. See [method add_to_group], [method is_in_group] and [method remove_from_group]. You can then retrieve all nodes in these groups, iterate them and even call methods on groups via the methods on [SceneTree].
 *
 * **Networking with nodes:** After connecting to a server (or making one, see [NetworkedMultiplayerENet]), it is possible to use the built-in RPC (remote procedure call) system to communicate over the network. By calling [method rpc] with a method name, it will be called locally and in all connected peers (peers = clients and the server that accepts connections). To identify which node receives the RPC call, Godot will use its [NodePath] (make sure node names are the same on all peers). Also, take a look at the high-level networking tutorial and corresponding demos.
 *
*/
declare class Node extends Object {

  
/**
 * Nodes are Godot's building blocks. They can be assigned as the child of another node, resulting in a tree arrangement. A given node can contain any number of nodes as children with the requirement that all siblings (direct children of a node) should have unique names.
 *
 * A tree of nodes is called a **scene**. Scenes can be saved to the disk and then instanced into other scenes. This allows for very high flexibility in the architecture and data model of Godot projects.
 *
 * **Scene tree:** The [SceneTree] contains the active tree of nodes. When a node is added to the scene tree, it receives the [constant NOTIFICATION_ENTER_TREE] notification and its [method _enter_tree] callback is triggered. Child nodes are always added **after** their parent node, i.e. the [method _enter_tree] callback of a parent node will be triggered before its child's.
 *
 * Once all nodes have been added in the scene tree, they receive the [constant NOTIFICATION_READY] notification and their respective [method _ready] callbacks are triggered. For groups of nodes, the [method _ready] callback is called in reverse order, starting with the children and moving up to the parent nodes.
 *
 * This means that when adding a node to the scene tree, the following order will be used for the callbacks: [method _enter_tree] of the parent, [method _enter_tree] of the children, [method _ready] of the children and finally [method _ready] of the parent (recursively for the entire scene tree).
 *
 * **Processing:** Nodes can override the "process" state, so that they receive a callback on each frame requesting them to process (do something). Normal processing (callback [method _process], toggled with [method set_process]) happens as fast as possible and is dependent on the frame rate, so the processing time **delta** is passed as an argument. Physics processing (callback [method _physics_process], toggled with [method set_physics_process]) happens a fixed number of times per second (60 by default) and is useful for code related to the physics engine.
 *
 * Nodes can also process input events. When present, the [method _input] function will be called for each input that the program receives. In many cases, this can be overkill (unless used for simple projects), and the [method _unhandled_input] function might be preferred; it is called when the input event was not handled by anyone else (typically, GUI [Control] nodes), ensuring that the node only receives the events that were meant for it.
 *
 * To keep track of the scene hierarchy (especially when instancing scenes into other scenes), an "owner" can be set for the node with the [member owner] property. This keeps track of who instanced what. This is mostly useful when writing editors and tools, though.
 *
 * Finally, when a node is freed with [method Object.free] or [method queue_free], it will also free all its children.
 *
 * **Groups:** Nodes can be added to as many groups as you want to be easy to manage, you could create groups like "enemies" or "collectables" for example, depending on your game. See [method add_to_group], [method is_in_group] and [method remove_from_group]. You can then retrieve all nodes in these groups, iterate them and even call methods on groups via the methods on [SceneTree].
 *
 * **Networking with nodes:** After connecting to a server (or making one, see [NetworkedMultiplayerENet]), it is possible to use the built-in RPC (remote procedure call) system to communicate over the network. By calling [method rpc] with a method name, it will be called locally and in all connected peers (peers = clients and the server that accepts connections). To identify which node receives the RPC call, Godot will use its [NodePath] (make sure node names are the same on all peers). Also, take a look at the high-level networking tutorial and corresponding demos.
 *
*/
  "new"(): Node;
  static "new"(): Node;



/** The override to the default [MultiplayerAPI]. Set to [code]null[/code] to use the default [SceneTree] one. */
custom_multiplayer: MultiplayerAPI;

/** When a scene is instanced from a file, its topmost node contains the filename from which it was loaded. */
filename: string;

/** The [MultiplayerAPI] instance associated with this node. Either the [member custom_multiplayer], or the default SceneTree one (if inside tree). */
multiplayer: MultiplayerAPI;

/** The name of the node. This name is unique among the siblings (other child nodes from the same parent). When set to an existing name, the node will be automatically renamed. */
name: string;

/** The node owner. A node can have any other node as owner (as long as it is a valid parent, grandparent, etc. ascending in the tree). When saving a node (using [PackedScene]), all the nodes it owns will be saved with it. This allows for the creation of complex [SceneTree]s, with instancing and subinstancing. */
owner: Node;

/** Pause mode. How the node will behave if the [SceneTree] is paused. */
pause_mode: int;

/** The node's priority in the execution order of the enabled processing callbacks (i.e. [constant NOTIFICATION_PROCESS], [constant NOTIFICATION_PHYSICS_PROCESS] and their internal counterparts). Nodes whose process priority value is [i]lower[/i] will have their processing callbacks executed first. */
process_priority: int;

/**
 * Called when the node enters the [SceneTree] (e.g. upon instancing, scene changing, or after calling [method add_child] in a script). If the node has children, its [method _enter_tree] callback will be called first, and then that of the children.
 *
 * Corresponds to the [constant NOTIFICATION_ENTER_TREE] notification in [method Object._notification].
 *
*/
protected _enter_tree(): void;

/**
 * Called when the node is about to leave the [SceneTree] (e.g. upon freeing, scene changing, or after calling [method remove_child] in a script). If the node has children, its [method _exit_tree] callback will be called last, after all its children have left the tree.
 *
 * Corresponds to the [constant NOTIFICATION_EXIT_TREE] notification in [method Object._notification] and signal [signal tree_exiting]. To get notified when the node has already left the active tree, connect to the [signal tree_exited].
 *
*/
protected _exit_tree(): void;

/**
 * The string returned from this method is displayed as a warning in the Scene Dock if the script that overrides it is a `tool` script.
 *
 * Returning an empty string produces no warning.
 *
 * Call [method update_configuration_warning] when the warning needs to be updated for this node.
 *
*/
protected _get_configuration_warning(): string;

/**
 * Called when there is an input event. The input event propagates up through the node tree until a node consumes it.
 *
 * It is only called if input processing is enabled, which is done automatically if this method is overridden, and can be toggled with [method set_process_input].
 *
 * To consume the input event and stop it propagating further to other nodes, [method SceneTree.set_input_as_handled] can be called.
 *
 * For gameplay input, [method _unhandled_input] and [method _unhandled_key_input] are usually a better fit as they allow the GUI to intercept the events first.
 *
 * **Note:** This method is only called if the node is present in the scene tree (i.e. if it's not orphan).
 *
*/
protected _input(event: InputEvent): void;

/**
 * Called during the physics processing step of the main loop. Physics processing means that the frame rate is synced to the physics, i.e. the `delta` variable should be constant.
 *
 * It is only called if physics processing is enabled, which is done automatically if this method is overridden, and can be toggled with [method set_physics_process].
 *
 * Corresponds to the [constant NOTIFICATION_PHYSICS_PROCESS] notification in [method Object._notification].
 *
 * **Note:** This method is only called if the node is present in the scene tree (i.e. if it's not orphan).
 *
*/
protected _physics_process(delta: float): void;

/**
 * Called during the processing step of the main loop. Processing happens at every frame and as fast as possible, so the `delta` time since the previous frame is not constant.
 *
 * It is only called if processing is enabled, which is done automatically if this method is overridden, and can be toggled with [method set_process].
 *
 * Corresponds to the [constant NOTIFICATION_PROCESS] notification in [method Object._notification].
 *
 * **Note:** This method is only called if the node is present in the scene tree (i.e. if it's not orphan).
 *
*/
protected _process(delta: float): void;

/**
 * Called when the node is "ready", i.e. when both the node and its children have entered the scene tree. If the node has children, their [method _ready] callbacks get triggered first, and the parent node will receive the ready notification afterwards.
 *
 * Corresponds to the [constant NOTIFICATION_READY] notification in [method Object._notification]. See also the `onready` keyword for variables.
 *
 * Usually used for initialization. For even earlier initialization, [method Object._init] may be used. See also [method _enter_tree].
 *
 * **Note:** [method _ready] may be called only once for each node. After removing a node from the scene tree and adding again, `_ready` will not be called for the second time. This can be bypassed with requesting another call with [method request_ready], which may be called anywhere before adding the node again.
 *
*/
protected _ready(): void;

/**
 * Called when an [InputEvent] hasn't been consumed by [method _input] or any GUI. The input event propagates up through the node tree until a node consumes it.
 *
 * It is only called if unhandled input processing is enabled, which is done automatically if this method is overridden, and can be toggled with [method set_process_unhandled_input].
 *
 * To consume the input event and stop it propagating further to other nodes, [method SceneTree.set_input_as_handled] can be called.
 *
 * For gameplay input, this and [method _unhandled_key_input] are usually a better fit than [method _input] as they allow the GUI to intercept the events first.
 *
 * **Note:** This method is only called if the node is present in the scene tree (i.e. if it's not orphan).
 *
*/
protected _unhandled_input(event: InputEvent): void;

/**
 * Called when an [InputEventKey] hasn't been consumed by [method _input] or any GUI. The input event propagates up through the node tree until a node consumes it.
 *
 * It is only called if unhandled key input processing is enabled, which is done automatically if this method is overridden, and can be toggled with [method set_process_unhandled_key_input].
 *
 * To consume the input event and stop it propagating further to other nodes, [method SceneTree.set_input_as_handled] can be called.
 *
 * For gameplay input, this and [method _unhandled_input] are usually a better fit than [method _input] as they allow the GUI to intercept the events first.
 *
 * **Note:** This method is only called if the node is present in the scene tree (i.e. if it's not orphan).
 *
*/
protected _unhandled_key_input(event: InputEventKey): void;

/**
 * Adds a child node. Nodes can have any number of children, but every child must have a unique name. Child nodes are automatically deleted when the parent node is deleted, so an entire scene can be removed by deleting its topmost node.
 *
 * If `legible_unique_name` is `true`, the child node will have an human-readable name based on the name of the node being instanced instead of its type.
 *
 * **Note:** If the child node already has a parent, the function will fail. Use [method remove_child] first to remove the node from its current parent. For example:
 *
 * @example 
 * 
 * if child_node.get_parent():
 *     child_node.get_parent().remove_child(child_node)
 * add_child(child_node)
 * @summary 
 * 
 *
 * **Note:** If you want a child to be persisted to a [PackedScene], you must set [member owner] in addition to calling [method add_child]. This is typically relevant for [url=https://godot.readthedocs.io/en/latest/tutorials/misc/running_code_in_the_editor.html]tool scripts[/url] and [url=https://godot.readthedocs.io/en/latest/tutorials/plugins/editor/index.html]editor plugins[/url]. If [method add_child] is called without setting [member owner], the newly added [Node] will not be visible in the scene tree, though it will be visible in the 2D/3D view.
 *
*/
add_child(node: Node, legible_unique_name?: boolean): void;

/**
 * Adds `child_node` as a child. The child is placed below the given `node` in the list of children.
 *
 * If `legible_unique_name` is `true`, the child node will have an human-readable name based on the name of the node being instanced instead of its type.
 *
*/
add_child_below_node(node: Node, child_node: Node, legible_unique_name?: boolean): void;

/**
 * Adds the node to a group. Groups are helpers to name and organize a subset of nodes, for example "enemies" or "collectables". A node can be in any number of groups. Nodes can be assigned a group at any time, but will not be added until they are inside the scene tree (see [method is_inside_tree]). See notes in the description, and the group methods in [SceneTree].
 *
 * The `persistent` option is used when packing node to [PackedScene] and saving to file. Non-persistent groups aren't stored.
 *
*/
add_to_group(group: string, persistent?: boolean): void;

/** Returns [code]true[/code] if the node can process while the scene tree is paused (see [member pause_mode]). Always returns [code]true[/code] if the scene tree is not paused, and [code]false[/code] if the node is not in the tree. */
can_process(): boolean;

/**
 * Duplicates the node, returning a new node.
 *
 * You can fine-tune the behavior using the `flags` (see [enum DuplicateFlags]).
 *
 * **Note:** It will not work properly if the node contains a script with constructor arguments (i.e. needs to supply arguments to [method Object._init] method). In that case, the node will be duplicated without a script.
 *
*/
duplicate(flags?: int): Node;

/**
 * Finds a descendant of this node whose name matches `mask` as in [method String.match] (i.e. case-sensitive, but `"*"` matches zero or more characters and `"?"` matches any single character except `"."`).
 *
 * **Note:** It does not match against the full path, just against individual node names.
 *
 * If `owned` is `true`, this method only finds nodes whose owner is this node. This is especially important for scenes instantiated through a script, because those scenes don't have an owner.
 *
 * **Note:** As this method walks through all the descendants of the node, it is the slowest way to get a reference to another node. Whenever possible, consider using [method get_node] instead. To avoid using [method find_node] too often, consider caching the node reference into a variable.
 *
*/
find_node(mask: string, recursive?: boolean, owned?: boolean): Node;

/**
 * Finds the first parent of the current node whose name matches `mask` as in [method String.match] (i.e. case-sensitive, but `"*"` matches zero or more characters and `"?"` matches any single character except `"."`).
 *
 * **Note:** It does not match against the full path, just against individual node names.
 *
 * **Note:** As this method walks upwards in the scene tree, it can be slow in large, deeply nested scene trees. Whenever possible, consider using [method get_node] instead. To avoid using [method find_parent] too often, consider caching the node reference into a variable.
 *
*/
find_parent(mask: string): Node;

/**
 * Returns a child node by its index (see [method get_child_count]). This method is often used for iterating all children of a node.
 *
 * To access a child node via its name, use [method get_node].
 *
*/
get_child(idx: int): Node;

/** Returns the number of child nodes. */
get_child_count(): int;

/** Returns an array of references to node's children. */
get_children(): any[];

/** Returns an array listing the groups that the node is a member of. */
get_groups(): any[];

/** Returns the node's index, i.e. its position among the siblings of its parent. */
get_index(): int;

/** Returns the peer ID of the network master for this node. See [method set_network_master]. */
get_network_master(): int;

/**
 * Fetches a node. The [NodePath] can be either a relative path (from the current node) or an absolute path (in the scene tree) to a node. If the path does not exist, a `null instance` is returned and an error is logged. Attempts to access methods on the return value will result in an "Attempt to call <method> on a null instance." error.
 *
 * **Note:** Fetching absolute paths only works when the node is inside the scene tree (see [method is_inside_tree]).
 *
 * **Example:** Assume your current node is Character and the following tree:
 *
 * @example 
 * 
 * /root
 * /root/Character
 * /root/Character/Sword
 * /root/Character/Backpack/Dagger
 * /root/MyGame
 * /root/Swamp/Alligator
 * /root/Swamp/Mosquito
 * /root/Swamp/Goblin
 * @summary 
 * 
 *
 * Possible paths are:
 *
 * @example 
 * 
 * get_node("Sword")
 * get_node("Backpack/Dagger")
 * get_node("../Swamp/Alligator")
 * get_node("/root/MyGame")
 * @summary 
 * 
 *
*/
get_node(path: NodePathType): Node;

/**
 * Fetches a node and one of its resources as specified by the [NodePath]'s subname (e.g. `Area2D/CollisionShape2D:shape`). If several nested resources are specified in the [NodePath], the last one will be fetched.
 *
 * The return value is an array of size 3: the first index points to the [Node] (or `null` if not found), the second index points to the [Resource] (or `null` if not found), and the third index is the remaining [NodePath], if any.
 *
 * For example, assuming that `Area2D/CollisionShape2D` is a valid node and that its `shape` property has been assigned a [RectangleShape2D] resource, one could have this kind of output:
 *
 * @example 
 * 
 * print(get_node_and_resource("Area2D/CollisionShape2D")) # [[CollisionShape2D:1161], Null, ]
 * print(get_node_and_resource("Area2D/CollisionShape2D:shape")) # [[CollisionShape2D:1161], [RectangleShape2D:1156], ]
 * print(get_node_and_resource("Area2D/CollisionShape2D:shape:extents")) # [[CollisionShape2D:1161], [RectangleShape2D:1156], :extents]
 * @summary 
 * 
 *
*/
get_node_and_resource(path: NodePathType): any[];

/** Similar to [method get_node], but does not log an error if [code]path[/code] does not point to a valid [Node]. */
get_node_or_null(path: NodePathType): Node;

/** Returns the parent node of the current node, or a [code]null instance[/code] if the node lacks a parent. */
get_parent(): Node;

/** Returns the absolute path of the current node. This only works if the current node is inside the scene tree (see [method is_inside_tree]). */
get_path(): NodePathType;

/** Returns the relative [NodePath] from this node to the specified [code]node[/code]. Both nodes must be in the same scene or the function will fail. */
get_path_to(node: Node): NodePathType;

/** Returns the time elapsed since the last physics-bound frame (see [method _physics_process]). This is always a constant value in physics processing unless the frames per second is changed via [member Engine.iterations_per_second]. */
get_physics_process_delta_time(): float;

/** Returns the node's order in the scene tree branch. For example, if called on the first child node the position is [code]0[/code]. */
get_position_in_parent(): int;

/** Returns the time elapsed (in seconds) since the last process callback. This value may vary from frame to frame. */
get_process_delta_time(): float;

/** Returns [code]true[/code] if this is an instance load placeholder. See [InstancePlaceholder]. */
get_scene_instance_load_placeholder(): boolean;

/** Returns the [SceneTree] that contains this node. */
get_tree(): SceneTree;

/** Returns the node's [Viewport]. */
get_viewport(): Viewport;

/** Returns [code]true[/code] if the node that the [NodePath] points to exists. */
has_node(path: NodePathType): boolean;

/** Returns [code]true[/code] if the [NodePath] points to a valid node and its subname points to a valid resource, e.g. [code]Area2D/CollisionShape2D:shape[/code]. Properties with a non-[Resource] type (e.g. nodes or primitive math types) are not considered resources. */
has_node_and_resource(path: NodePathType): boolean;

/** Returns [code]true[/code] if the given node is a direct or indirect child of the current node. */
is_a_parent_of(node: Node): boolean;

/** Returns [code]true[/code] if the node is folded (collapsed) in the Scene dock. */
is_displayed_folded(): boolean;

/** Returns [code]true[/code] if the given node occurs later in the scene hierarchy than the current node. */
is_greater_than(node: Node): boolean;

/** Returns [code]true[/code] if this node is in the specified group. See notes in the description, and the group methods in [SceneTree]. */
is_in_group(group: string): boolean;

/** Returns [code]true[/code] if this node is currently inside a [SceneTree]. */
is_inside_tree(): boolean;

/** Returns [code]true[/code] if the local system is the master of this node. */
is_network_master(): boolean;

/** Returns [code]true[/code] if physics processing is enabled (see [method set_physics_process]). */
is_physics_processing(): boolean;

/** Returns [code]true[/code] if internal physics processing is enabled (see [method set_physics_process_internal]). */
is_physics_processing_internal(): boolean;

/** Returns [code]true[/code] if processing is enabled (see [method set_process]). */
is_processing(): boolean;

/** Returns [code]true[/code] if the node is processing input (see [method set_process_input]). */
is_processing_input(): boolean;

/** Returns [code]true[/code] if internal processing is enabled (see [method set_process_internal]). */
is_processing_internal(): boolean;

/** Returns [code]true[/code] if the node is processing unhandled input (see [method set_process_unhandled_input]). */
is_processing_unhandled_input(): boolean;

/** Returns [code]true[/code] if the node is processing unhandled key input (see [method set_process_unhandled_key_input]). */
is_processing_unhandled_key_input(): boolean;

/** Moves a child node to a different position (order) among the other children. Since calls, signals, etc are performed by tree order, changing the order of children nodes may be useful. */
move_child(child_node: Node, to_position: int): void;

/** Prints all stray nodes (nodes outside the [SceneTree]). Used for debugging. Works only in debug builds. */
print_stray_nodes(): void;

/**
 * Prints the tree to stdout. Used mainly for debugging purposes. This version displays the path relative to the current node, and is good for copy/pasting into the [method get_node] function.
 *
 * **Example output:**
 *
 * @example 
 * 
 * TheGame
 * TheGame/Menu
 * TheGame/Menu/Label
 * TheGame/Menu/Camera2D
 * TheGame/SplashScreen
 * TheGame/SplashScreen/Camera2D
 * @summary 
 * 
 *
*/
print_tree(): void;

/**
 * Similar to [method print_tree], this prints the tree to stdout. This version displays a more graphical representation similar to what is displayed in the scene inspector. It is useful for inspecting larger trees.
 *
 * **Example output:**
 *
 * @example 
 * 
 *  ┖╴TheGame
 *     ┠╴Menu
 *     ┃  ┠╴Label
 *     ┃  ┖╴Camera2D
 *     ┖╴SplashScreen
 *        ┖╴Camera2D
 * @summary 
 * 
 *
*/
print_tree_pretty(): void;

/** Calls the given method (if present) with the arguments given in [code]args[/code] on this node and recursively on all its children. If the [code]parent_first[/code] argument is [code]true[/code], the method will be called on the current node first, then on all its children. If [code]parent_first[/code] is [code]false[/code], the children will be called first. */
propagate_call(method: string, args?: any[], parent_first?: boolean): void;

/** Notifies the current node and all its children recursively by calling [method Object.notification] on all of them. */
propagate_notification(what: int): void;

/** Queues a node for deletion at the end of the current frame. When deleted, all of its child nodes will be deleted as well. This method ensures it's safe to delete the node, contrary to [method Object.free]. Use [method Object.is_queued_for_deletion] to check whether a node will be deleted at the end of the frame. */
queue_free(): void;

/** Moves this node to the bottom of parent node's children hierarchy. This is often useful in GUIs ([Control] nodes), because their order of drawing depends on their order in the tree, i.e. the further they are on the node list, the higher they are drawn. After using [code]raise[/code], a Control will be drawn on top of their siblings. */
raise(): void;

/** Removes a node and sets all its children as children of the parent node (if it exists). All event subscriptions that pass by the removed node will be unsubscribed. */
remove_and_skip(): void;

/** Removes a child node. The node is NOT deleted and must be deleted manually. */
remove_child(node: Node): void;

/** Removes a node from a group. See notes in the description, and the group methods in [SceneTree]. */
remove_from_group(group: string): void;

/** Replaces a node in a scene by the given one. Subscriptions that pass through this node will be lost. */
replace_by(node: Node, keep_data?: boolean): void;

/** Requests that [code]_ready[/code] be called again. Note that the method won't be called immediately, but is scheduled for when the node is added to the scene tree again (see [method _ready]). [code]_ready[/code] is called only for the node which requested it, which means that you need to request ready for each child if you want them to call [code]_ready[/code] too (in which case, [code]_ready[/code] will be called in the same order as it would normally). */
request_ready(): void;

/**
 * Sends a remote procedure call request for the given `method` to peers on the network (and locally), optionally sending all additional arguments as arguments to the method called by the RPC. The call request will only be received by nodes with the same [NodePath], including the exact same node name. Behaviour depends on the RPC configuration for the given method, see [method rpc_config]. Methods are not exposed to RPCs by default. See also [method rset] and [method rset_config] for properties. Returns an empty [Variant].
 *
 * **Note:** You can only safely use RPCs on clients after you received the `connected_to_server` signal from the [SceneTree]. You also need to keep track of the connection state, either by the [SceneTree] signals like `server_disconnected` or by checking `SceneTree.network_peer.get_connection_status() == CONNECTION_CONNECTED`.
 *
*/
rpc(...args: any[]): any;

/** Changes the RPC mode for the given [code]method[/code] to the given [code]mode[/code]. See [enum MultiplayerAPI.RPCMode]. An alternative is annotating methods and properties with the corresponding keywords ([code]remote[/code], [code]master[/code], [code]puppet[/code], [code]remotesync[/code], [code]mastersync[/code], [code]puppetsync[/code]). By default, methods are not exposed to networking (and RPCs). See also [method rset] and [method rset_config] for properties. */
rpc_config(method: string, mode: int): void;

/** Sends a [method rpc] to a specific peer identified by [code]peer_id[/code] (see [method NetworkedMultiplayerPeer.set_target_peer]). Returns an empty [Variant]. */
rpc_id(...args: any[]): any;

/** Sends a [method rpc] using an unreliable protocol. Returns an empty [Variant]. */
rpc_unreliable(...args: any[]): any;

/** Sends a [method rpc] to a specific peer identified by [code]peer_id[/code] using an unreliable protocol (see [method NetworkedMultiplayerPeer.set_target_peer]). Returns an empty [Variant]. */
rpc_unreliable_id(...args: any[]): any;

/** Remotely changes a property's value on other peers (and locally). Behaviour depends on the RPC configuration for the given property, see [method rset_config]. See also [method rpc] for RPCs for methods, most information applies to this method as well. */
rset(property: string, value: any): void;

/** Changes the RPC mode for the given [code]property[/code] to the given [code]mode[/code]. See [enum MultiplayerAPI.RPCMode]. An alternative is annotating methods and properties with the corresponding keywords ([code]remote[/code], [code]master[/code], [code]puppet[/code], [code]remotesync[/code], [code]mastersync[/code], [code]puppetsync[/code]). By default, properties are not exposed to networking (and RPCs). See also [method rpc] and [method rpc_config] for methods. */
rset_config(property: string, mode: int): void;

/** Remotely changes the property's value on a specific peer identified by [code]peer_id[/code] (see [method NetworkedMultiplayerPeer.set_target_peer]). */
rset_id(peer_id: int, property: string, value: any): void;

/** Remotely changes the property's value on other peers (and locally) using an unreliable protocol. */
rset_unreliable(property: string, value: any): void;

/** Remotely changes property's value on a specific peer identified by [code]peer_id[/code] using an unreliable protocol (see [method NetworkedMultiplayerPeer.set_target_peer]). */
rset_unreliable_id(peer_id: int, property: string, value: any): void;

/** Sets the folded state of the node in the Scene dock. */
set_display_folded(fold: boolean): void;

/** Sets the node's network master to the peer with the given peer ID. The network master is the peer that has authority over the node on the network. Useful in conjunction with the [code]master[/code] and [code]puppet[/code] keywords. Inherited from the parent node by default, which ultimately defaults to peer ID 1 (the server). If [code]recursive[/code], the given peer is recursively set as the master for all children of this node. */
set_network_master(id: int, recursive?: boolean): void;

/** Enables or disables physics (i.e. fixed framerate) processing. When a node is being processed, it will receive a [constant NOTIFICATION_PHYSICS_PROCESS] at a fixed (usually 60 FPS, see [member Engine.iterations_per_second] to change) interval (and the [method _physics_process] callback will be called if exists). Enabled automatically if [method _physics_process] is overridden. Any calls to this before [method _ready] will be ignored. */
set_physics_process(enable: boolean): void;

/** Enables or disables internal physics for this node. Internal physics processing happens in isolation from the normal [method _physics_process] calls and is used by some nodes internally to guarantee proper functioning even if the node is paused or physics processing is disabled for scripting ([method set_physics_process]). Only useful for advanced uses to manipulate built-in nodes' behaviour. */
set_physics_process_internal(enable: boolean): void;

/** Enables or disables processing. When a node is being processed, it will receive a [constant NOTIFICATION_PROCESS] on every drawn frame (and the [method _process] callback will be called if exists). Enabled automatically if [method _process] is overridden. Any calls to this before [method _ready] will be ignored. */
set_process(enable: boolean): void;

/** Enables or disables input processing. This is not required for GUI controls! Enabled automatically if [method _input] is overridden. Any calls to this before [method _ready] will be ignored. */
set_process_input(enable: boolean): void;

/** Enables or disabled internal processing for this node. Internal processing happens in isolation from the normal [method _process] calls and is used by some nodes internally to guarantee proper functioning even if the node is paused or processing is disabled for scripting ([method set_process]). Only useful for advanced uses to manipulate built-in nodes' behaviour. */
set_process_internal(enable: boolean): void;

/** Enables unhandled input processing. This is not required for GUI controls! It enables the node to receive all input that was not previously handled (usually by a [Control]). Enabled automatically if [method _unhandled_input] is overridden. Any calls to this before [method _ready] will be ignored. */
set_process_unhandled_input(enable: boolean): void;

/** Enables unhandled key input processing. Enabled automatically if [method _unhandled_key_input] is overridden. Any calls to this before [method _ready] will be ignored. */
set_process_unhandled_key_input(enable: boolean): void;

/** Sets whether this is an instance load placeholder. See [InstancePlaceholder]. */
set_scene_instance_load_placeholder(load_placeholder: boolean): void;

/**
 * Updates the warning displayed for this node in the Scene Dock.
 *
 * Use [method _get_configuration_warning] to setup the warning message to display.
 *
*/
update_configuration_warning(): void;

  connect<T extends SignalsOf<Node>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Notification received when the node enters a [SceneTree].
 *
*/
static NOTIFICATION_ENTER_TREE: 10;

/**
 * Notification received when the node is about to exit a [SceneTree].
 *
*/
static NOTIFICATION_EXIT_TREE: 11;

/**
 * Notification received when the node is moved in the parent.
 *
*/
static NOTIFICATION_MOVED_IN_PARENT: 12;

/**
 * Notification received when the node is ready. See [method _ready].
 *
*/
static NOTIFICATION_READY: 13;

/**
 * Notification received when the node is paused.
 *
*/
static NOTIFICATION_PAUSED: 14;

/**
 * Notification received when the node is unpaused.
 *
*/
static NOTIFICATION_UNPAUSED: 15;

/**
 * Notification received every frame when the physics process flag is set (see [method set_physics_process]).
 *
*/
static NOTIFICATION_PHYSICS_PROCESS: 16;

/**
 * Notification received every frame when the process flag is set (see [method set_process]).
 *
*/
static NOTIFICATION_PROCESS: 17;

/**
 * Notification received when a node is set as a child of another node.
 *
 * **Note:** This doesn't mean that a node entered the [SceneTree].
 *
*/
static NOTIFICATION_PARENTED: 18;

/**
 * Notification received when a node is unparented (parent removed it from the list of children).
 *
*/
static NOTIFICATION_UNPARENTED: 19;

/**
 * Notification received when the node is instanced.
 *
*/
static NOTIFICATION_INSTANCED: 20;

/**
 * Notification received when a drag begins.
 *
*/
static NOTIFICATION_DRAG_BEGIN: 21;

/**
 * Notification received when a drag ends.
 *
*/
static NOTIFICATION_DRAG_END: 22;

/**
 * Notification received when the node's [NodePath] changed.
 *
*/
static NOTIFICATION_PATH_CHANGED: 23;

/**
 * Notification received every frame when the internal process flag is set (see [method set_process_internal]).
 *
*/
static NOTIFICATION_INTERNAL_PROCESS: 25;

/**
 * Notification received every frame when the internal physics process flag is set (see [method set_physics_process_internal]).
 *
*/
static NOTIFICATION_INTERNAL_PHYSICS_PROCESS: 26;

/**
 * Notification received when the node is ready, just before [constant NOTIFICATION_READY] is received. Unlike the latter, it's sent every time the node enters tree, instead of only once.
 *
*/
static NOTIFICATION_POST_ENTER_TREE: 27;

/**
 * Notification received from the OS when the mouse enters the game window.
 *
 * Implemented on desktop and web platforms.
 *
*/
static NOTIFICATION_WM_MOUSE_ENTER: 1002;

/**
 * Notification received from the OS when the mouse leaves the game window.
 *
 * Implemented on desktop and web platforms.
 *
*/
static NOTIFICATION_WM_MOUSE_EXIT: 1003;

/**
 * Notification received from the OS when the game window is focused.
 *
 * Implemented on all platforms.
 *
*/
static NOTIFICATION_WM_FOCUS_IN: 1004;

/**
 * Notification received from the OS when the game window is unfocused.
 *
 * Implemented on all platforms.
 *
*/
static NOTIFICATION_WM_FOCUS_OUT: 1005;

/**
 * Notification received from the OS when a quit request is sent (e.g. closing the window with a "Close" button or Alt+F4).
 *
 * Implemented on desktop platforms.
 *
*/
static NOTIFICATION_WM_QUIT_REQUEST: 1006;

/**
 * Notification received from the OS when a go back request is sent (e.g. pressing the "Back" button on Android).
 *
 * Specific to the Android platform.
 *
*/
static NOTIFICATION_WM_GO_BACK_REQUEST: 1007;

/**
 * Notification received from the OS when an unfocus request is sent (e.g. another OS window wants to take the focus).
 *
 * No supported platforms currently send this notification.
 *
*/
static NOTIFICATION_WM_UNFOCUS_REQUEST: 1008;

/**
 * Notification received from the OS when the application is exceeding its allocated memory.
 *
 * Specific to the iOS platform.
 *
*/
static NOTIFICATION_OS_MEMORY_WARNING: 1009;

/**
 * Notification received when translations may have changed. Can be triggered by the user changing the locale. Can be used to respond to language changes, for example to change the UI strings on the fly. Useful when working with the built-in translation support, like [method Object.tr].
 *
*/
static NOTIFICATION_TRANSLATION_CHANGED: 1010;

/**
 * Notification received from the OS when a request for "About" information is sent.
 *
 * Specific to the macOS platform.
 *
*/
static NOTIFICATION_WM_ABOUT: 1011;

/**
 * Notification received from Godot's crash handler when the engine is about to crash.
 *
 * Implemented on desktop platforms if the crash handler is enabled.
 *
*/
static NOTIFICATION_CRASH: 1012;

/**
 * Notification received from the OS when an update of the Input Method Engine occurs (e.g. change of IME cursor position or composition string).
 *
 * Specific to the macOS platform.
 *
*/
static NOTIFICATION_OS_IME_UPDATE: 1013;

/**
 * Notification received from the OS when the app is resumed.
 *
 * Specific to the Android platform.
 *
*/
static NOTIFICATION_APP_RESUMED: 1014;

/**
 * Notification received from the OS when the app is paused.
 *
 * Specific to the Android platform.
 *
*/
static NOTIFICATION_APP_PAUSED: 1015;

/**
 * Inherits pause mode from the node's parent. For the root node, it is equivalent to [constant PAUSE_MODE_STOP]. Default.
 *
*/
static PAUSE_MODE_INHERIT: 0;

/**
 * Stops processing when the [SceneTree] is paused.
 *
*/
static PAUSE_MODE_STOP: 1;

/**
 * Continue to process regardless of the [SceneTree] pause state.
 *
*/
static PAUSE_MODE_PROCESS: 2;

/**
 * Duplicate the node's signals.
 *
*/
static DUPLICATE_SIGNALS: 1;

/**
 * Duplicate the node's groups.
 *
*/
static DUPLICATE_GROUPS: 2;

/**
 * Duplicate the node's scripts.
 *
*/
static DUPLICATE_SCRIPTS: 4;

/**
 * Duplicate using instancing.
 *
 * An instance stays linked to the original so when the original changes, the instance changes too.
 *
*/
static DUPLICATE_USE_INSTANCING: 8;


  /**
 * Emitted when the node is ready.
 *
*/
ready: Signal<() => void>

/**
 * Emitted when the node is renamed.
 *
*/
renamed: Signal<() => void>

/**
 * Emitted when the node enters the tree.
 *
*/
tree_entered: Signal<() => void>

/**
 * Emitted after the node exits the tree and is no longer active.
 *
*/
tree_exited: Signal<() => void>

/**
 * Emitted when the node is still active but about to exit the tree. This is the right place for de-initialization (or a "destructor", if you will).
 *
*/
tree_exiting: Signal<() => void>

}
