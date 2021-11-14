
/**
 * Maintains a list of resources, nodes, exported, and overridden properties, and built-in scripts associated with a scene.
 *
 * This class cannot be instantiated directly, it is retrieved for a given scene as the result of [method PackedScene.get_state].
 *
*/
declare class SceneState extends Reference  {

  
/**
 * Maintains a list of resources, nodes, exported, and overridden properties, and built-in scripts associated with a scene.
 *
 * This class cannot be instantiated directly, it is retrieved for a given scene as the result of [method PackedScene.get_state].
 *
*/
  new(): SceneState; 
  static "new"(): SceneState 



/** Returns the list of bound parameters for the signal at [code]idx[/code]. */
get_connection_binds(idx: int): any[];

/**
 * Returns the number of signal connections in the scene.
 *
 * The `idx` argument used to query connection metadata in other `get_connection_*` methods in the interval `[0, get_connection_count() - 1]`.
 *
*/
get_connection_count(): int;

/** Returns the connection flags for the signal at [code]idx[/code]. See [enum Object.ConnectFlags] constants. */
get_connection_flags(idx: int): int;

/** Returns the method connected to the signal at [code]idx[/code]. */
get_connection_method(idx: int): string;

/** Returns the name of the signal at [code]idx[/code]. */
get_connection_signal(idx: int): string;

/** Returns the path to the node that owns the signal at [code]idx[/code], relative to the root node. */
get_connection_source(idx: int): NodePathType;

/** Returns the path to the node that owns the method connected to the signal at [code]idx[/code], relative to the root node. */
get_connection_target(idx: int): NodePathType;

/**
 * Returns the number of nodes in the scene.
 *
 * The `idx` argument used to query node data in other `get_node_*` methods in the interval `[0, get_node_count() - 1]`.
 *
*/
get_node_count(): int;

/** Returns the list of group names associated with the node at [code]idx[/code]. */
get_node_groups(idx: int): PoolStringArray;

/** Returns the node's index, which is its position relative to its siblings. This is only relevant and saved in scenes for cases where new nodes are added to an instanced or inherited scene among siblings from the base scene. Despite the name, this index is not related to the [code]idx[/code] argument used here and in other methods. */
get_node_index(idx: int): int;

/** Returns a [PackedScene] for the node at [code]idx[/code] (i.e. the whole branch starting at this node, with its child nodes and resources), or [code]null[/code] if the node is not an instance. */
get_node_instance(idx: int): PackedScene<any>;

/** Returns the path to the represented scene file if the node at [code]idx[/code] is an [InstancePlaceholder]. */
get_node_instance_placeholder(idx: int): string;

/** Returns the name of the node at [code]idx[/code]. */
get_node_name(idx: int): string;

/** Returns the path to the owner of the node at [code]idx[/code], relative to the root node. */
get_node_owner_path(idx: int): NodePathType;

/**
 * Returns the path to the node at `idx`.
 *
 * If `for_parent` is `true`, returns the path of the `idx` node's parent instead.
 *
*/
get_node_path(idx: int, for_parent?: boolean): NodePathType;

/**
 * Returns the number of exported or overridden properties for the node at `idx`.
 *
 * The `prop_idx` argument used to query node property data in other `get_node_property_*` methods in the interval `[0, get_node_property_count() - 1]`.
 *
*/
get_node_property_count(idx: int): int;

/** Returns the name of the property at [code]prop_idx[/code] for the node at [code]idx[/code]. */
get_node_property_name(idx: int, prop_idx: int): string;

/** Returns the value of the property at [code]prop_idx[/code] for the node at [code]idx[/code]. */
get_node_property_value(idx: int, prop_idx: int): any;

/** Returns the type of the node at [code]idx[/code]. */
get_node_type(idx: int): string;

/** Returns [code]true[/code] if the node at [code]idx[/code] is an [InstancePlaceholder]. */
is_node_instance_placeholder(idx: int): boolean;

  connect<T extends SignalsOf<SceneState>>(signal: T, method: SignalFunction<SceneState[T]>): number;



/**
 * If passed to [method PackedScene.instance], blocks edits to the scene state.
 *
*/
static GEN_EDIT_STATE_DISABLED: any;

/**
 * If passed to [method PackedScene.instance], provides inherited scene resources to the local scene.
 *
 * **Note:** Only available in editor builds.
 *
*/
static GEN_EDIT_STATE_INSTANCE: any;

/**
 * If passed to [method PackedScene.instance], provides local scene resources to the local scene. Only the main scene should receive the main edit state.
 *
 * **Note:** Only available in editor builds.
 *
*/
static GEN_EDIT_STATE_MAIN: any;



}

