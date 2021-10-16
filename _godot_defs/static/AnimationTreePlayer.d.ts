
/**
 * **Deprecated.** A node graph tool for blending multiple animations bound to an [AnimationPlayer]. Especially useful for animating characters or other skeleton-based rigs. It can combine several animations to form a desired pose.
 *
 * It takes [Animation]s from an [AnimationPlayer] node and mixes them depending on the graph.
 *
 * See [AnimationTree] for a more full-featured replacement of this node.
 *
*/
declare class AnimationTreePlayer extends Node {

  
/**
 * **Deprecated.** A node graph tool for blending multiple animations bound to an [AnimationPlayer]. Especially useful for animating characters or other skeleton-based rigs. It can combine several animations to form a desired pose.
 *
 * It takes [Animation]s from an [AnimationPlayer] node and mixes them depending on the graph.
 *
 * See [AnimationTree] for a more full-featured replacement of this node.
 *
*/
  "new"(): AnimationTreePlayer;
  static "new"(): AnimationTreePlayer;



/** If [code]true[/code], the [AnimationTreePlayer] is able to play animations. */
active: boolean;

/**
 * The node from which to relatively access other nodes.
 *
 * It accesses the bones, so it should point to the same node the [AnimationPlayer] would point its Root Node at.
 *
*/
base_path: NodePathType;

/**
 * The path to the [AnimationPlayer] from which this [AnimationTreePlayer] binds animations to animation nodes.
 *
 * Once set, [Animation] nodes can be added to the [AnimationTreePlayer].
 *
*/
master_player: NodePathType;

/** The thread in which to update animations. */
playback_process_mode: int;

/** Adds a [code]type[/code] node to the graph with name [code]id[/code]. */
add_node(type: int, id: string): void;

/** Shifts position in the animation timeline. [code]delta[/code] is the time in seconds to shift. Events between the current frame and [code]delta[/code] are handled. */
advance(delta: float): void;

/** Returns the [AnimationPlayer]'s [Animation] bound to the [AnimationTreePlayer]'s animation node with name [code]id[/code]. */
animation_node_get_animation(id: string): Animation;

/** Returns the name of the [member master_player]'s [Animation] bound to this animation node. */
animation_node_get_master_animation(id: string): string;

/** Returns the absolute playback timestamp of the animation node with name [code]id[/code]. */
animation_node_get_position(id: string): float;

/** Binds a new [Animation] from the [member master_player] to the [AnimationTreePlayer]'s animation node with name [code]id[/code]. */
animation_node_set_animation(id: string, animation: Animation): void;

/** If [code]enable[/code] is [code]true[/code], the animation node with ID [code]id[/code] turns off the track modifying the property at [code]path[/code]. The modified node's children continue to animate. */
animation_node_set_filter_path(id: string, path: NodePathType, enable: boolean): void;

/** Binds the [Animation] named [code]source[/code] from [member master_player] to the animation node [code]id[/code]. Recalculates caches. */
animation_node_set_master_animation(id: string, source: string): void;

/** Returns whether node [code]id[/code] and [code]dst_id[/code] are connected at the specified slot. */
are_nodes_connected(id: string, dst_id: string, dst_input_idx: int): boolean;

/** Returns the blend amount of a Blend2 node given its name. */
blend2_node_get_amount(id: string): float;

/**
 * Sets the blend amount of a Blend2 node given its name and value.
 *
 * A Blend2 node blends two animations (A and B) with the amount between 0 and 1.
 *
 * At 0, output is input A. Towards 1, the influence of A gets lessened, the influence of B gets raised. At 1, output is input B.
 *
*/
blend2_node_set_amount(id: string, blend: float): void;

/** If [code]enable[/code] is [code]true[/code], the Blend2 node with name [code]id[/code] turns off the track modifying the property at [code]path[/code]. The modified node's children continue to animate. */
blend2_node_set_filter_path(id: string, path: NodePathType, enable: boolean): void;

/** Returns the blend amount of a Blend3 node given its name. */
blend3_node_get_amount(id: string): float;

/**
 * Sets the blend amount of a Blend3 node given its name and value.
 *
 * A Blend3 Node blends three animations (A, B-, B+) with the amount between -1 and 1.
 *
 * At -1, output is input B-. From -1 to 0, the influence of B- gets lessened, the influence of A gets raised and the influence of B+ is 0. At 0, output is input A. From 0 to 1, the influence of A gets lessened, the influence of B+ gets raised and the influence of B+ is 0. At 1, output is input B+.
 *
*/
blend3_node_set_amount(id: string, blend: float): void;

/** Returns the blend amount of a Blend4 node given its name. */
blend4_node_get_amount(id: string): Vector2;

/**
 * Sets the blend amount of a Blend4 node given its name and value.
 *
 * A Blend4 Node blends two pairs of animations.
 *
 * The two pairs are blended like Blend2 and then added together.
 *
*/
blend4_node_set_amount(id: string, blend: Vector2): void;

/** Connects node [code]id[/code] to [code]dst_id[/code] at the specified input slot. */
connect_nodes(id: string, dst_id: string, dst_input_idx: int): int;

/** Disconnects nodes connected to [code]id[/code] at the specified input slot. */
disconnect_nodes(id: string, dst_input_idx: int): void;

/** Returns a [PoolStringArray] containing the name of all nodes. */
get_node_list(): PoolStringArray;

/** Returns the mix amount of a Mix node given its name. */
mix_node_get_amount(id: string): float;

/**
 * Sets the mix amount of a Mix node given its name and value.
 *
 * A Mix node adds input b to input a by the amount given by ratio.
 *
*/
mix_node_set_amount(id: string, ratio: float): void;

/** Check if a node exists (by name). */
node_exists(node: string): boolean;

/** Returns the input count for a given node. Different types of nodes have different amount of inputs. */
node_get_input_count(id: string): int;

/** Returns the input source for a given node input. */
node_get_input_source(id: string, idx: int): string;

/** Returns position of a node in the graph given its name. */
node_get_position(id: string): Vector2;

/** Gets the node type, will return from [enum NodeType] enum. */
node_get_type(id: string): int;

/** Renames a node in the graph. */
node_rename(node: string, new_name: string): int;

/** Sets the position of a node in the graph given its name and position. */
node_set_position(id: string, screen_position: Vector2): void;

/** Returns the autostart delay of a OneShot node given its name. */
oneshot_node_get_autorestart_delay(id: string): float;

/** Returns the autostart random delay of a OneShot node given its name. */
oneshot_node_get_autorestart_random_delay(id: string): float;

/** Returns the fade in time of a OneShot node given its name. */
oneshot_node_get_fadein_time(id: string): float;

/** Returns the fade out time of a OneShot node given its name. */
oneshot_node_get_fadeout_time(id: string): float;

/** Returns whether a OneShot node will auto restart given its name. */
oneshot_node_has_autorestart(id: string): boolean;

/** Returns whether a OneShot node is active given its name. */
oneshot_node_is_active(id: string): boolean;

/** Sets the autorestart property of a OneShot node given its name and value. */
oneshot_node_set_autorestart(id: string, enable: boolean): void;

/** Sets the autorestart delay of a OneShot node given its name and value in seconds. */
oneshot_node_set_autorestart_delay(id: string, delay_sec: float): void;

/** Sets the autorestart random delay of a OneShot node given its name and value in seconds. */
oneshot_node_set_autorestart_random_delay(id: string, rand_sec: float): void;

/** Sets the fade in time of a OneShot node given its name and value in seconds. */
oneshot_node_set_fadein_time(id: string, time_sec: float): void;

/** Sets the fade out time of a OneShot node given its name and value in seconds. */
oneshot_node_set_fadeout_time(id: string, time_sec: float): void;

/** If [code]enable[/code] is [code]true[/code], the OneShot node with ID [code]id[/code] turns off the track modifying the property at [code]path[/code]. The modified node's children continue to animate. */
oneshot_node_set_filter_path(id: string, path: NodePathType, enable: boolean): void;

/** Starts a OneShot node given its name. */
oneshot_node_start(id: string): void;

/** Stops the OneShot node with name [code]id[/code]. */
oneshot_node_stop(id: string): void;

/** Manually recalculates the cache of track information generated from animation nodes. Needed when external sources modify the animation nodes' state. */
recompute_caches(): void;

/** Removes the animation node with name [code]id[/code]. */
remove_node(id: string): void;

/** Resets this [AnimationTreePlayer]. */
reset(): void;

/** Returns the time scale value of the TimeScale node with name [code]id[/code]. */
timescale_node_get_scale(id: string): float;

/**
 * Sets the time scale of the TimeScale node with name `id` to `scale`.
 *
 * The TimeScale node is used to speed [Animation]s up if the scale is above 1 or slow them down if it is below 1.
 *
 * If applied after a blend or mix, affects all input animations to that blend or mix.
 *
*/
timescale_node_set_scale(id: string, scale: float): void;

/**
 * Sets the time seek value of the TimeSeek node with name `id` to `seconds`.
 *
 * This functions as a seek in the [Animation] or the blend or mix of [Animation]s input in it.
 *
*/
timeseek_node_seek(id: string, seconds: float): void;

/** Deletes the input at [code]input_idx[/code] for the transition node with name [code]id[/code]. */
transition_node_delete_input(id: string, input_idx: int): void;

/** Returns the index of the currently evaluated input for the transition node with name [code]id[/code]. */
transition_node_get_current(id: string): int;

/** Returns the number of inputs for the transition node with name [code]id[/code]. You can add inputs by right-clicking on the transition node. */
transition_node_get_input_count(id: string): int;

/** Returns the cross fade time for the transition node with name [code]id[/code]. */
transition_node_get_xfade_time(id: string): float;

/** Returns [code]true[/code] if the input at [code]input_idx[/code] on the transition node with name [code]id[/code] is set to automatically advance to the next input upon completion. */
transition_node_has_input_auto_advance(id: string, input_idx: int): boolean;

/** The transition node with name [code]id[/code] sets its current input at [code]input_idx[/code]. */
transition_node_set_current(id: string, input_idx: int): void;

/** The transition node with name [code]id[/code] advances to its next input automatically when the input at [code]input_idx[/code] completes. */
transition_node_set_input_auto_advance(id: string, input_idx: int, enable: boolean): void;

/** Resizes the number of inputs available for the transition node with name [code]id[/code]. */
transition_node_set_input_count(id: string, count: int): void;

/** The transition node with name [code]id[/code] sets its cross fade time to [code]time_sec[/code]. */
transition_node_set_xfade_time(id: string, time_sec: float): void;

  // connect<T extends SignalsOf<AnimationTreePlayer>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AnimationTreePlayerSignals>>(signal: T, method: SignalFunction<AnimationTreePlayerSignals[T]>): number;



/**
 * Output node.
 *
*/
static NODE_OUTPUT: any;

/**
 * Animation node.
 *
*/
static NODE_ANIMATION: any;

/**
 * OneShot node.
 *
*/
static NODE_ONESHOT: any;

/**
 * Mix node.
 *
*/
static NODE_MIX: any;

/**
 * Blend2 node.
 *
*/
static NODE_BLEND2: any;

/**
 * Blend3 node.
 *
*/
static NODE_BLEND3: any;

/**
 * Blend4 node.
 *
*/
static NODE_BLEND4: any;

/**
 * TimeScale node.
 *
*/
static NODE_TIMESCALE: any;

/**
 * TimeSeek node.
 *
*/
static NODE_TIMESEEK: any;

/**
 * Transition node.
 *
*/
static NODE_TRANSITION: any;

/**
 * Process animation during the physics process. This is especially useful when animating physics bodies.
 *
*/
static ANIMATION_PROCESS_PHYSICS: any;

/**
 * Process animation during the idle process.
 *
*/
static ANIMATION_PROCESS_IDLE: any;

}

declare class AnimationTreePlayerSignals extends NodeSignals {
  
}
