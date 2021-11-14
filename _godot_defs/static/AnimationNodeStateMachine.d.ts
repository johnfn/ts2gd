
/**
 * Contains multiple nodes representing animation states, connected in a graph. Node transitions can be configured to happen automatically or via code, using a shortest-path algorithm. Retrieve the [AnimationNodeStateMachinePlayback] object from the [AnimationTree] node to control it programmatically.
 *
 * **Example:**
 *
 * @example 
 * 
 * var state_machine = $AnimationTree.get("parameters/playback")
 * state_machine.travel("some_state")
 * @summary 
 * 
 *
*/
declare class AnimationNodeStateMachine extends AnimationRootNode  {

  
/**
 * Contains multiple nodes representing animation states, connected in a graph. Node transitions can be configured to happen automatically or via code, using a shortest-path algorithm. Retrieve the [AnimationNodeStateMachinePlayback] object from the [AnimationTree] node to control it programmatically.
 *
 * **Example:**
 *
 * @example 
 * 
 * var state_machine = $AnimationTree.get("parameters/playback")
 * state_machine.travel("some_state")
 * @summary 
 * 
 *
*/
  new(): AnimationNodeStateMachine; 
  static "new"(): AnimationNodeStateMachine 



/** Adds a new node to the graph. The [code]position[/code] is used for display in the editor. */
add_node(name: string, node: AnimationNode, position?: Vector2): void;

/** Adds a transition between the given nodes. */
add_transition(from: string, to: string, transition: AnimationNodeStateMachineTransition): void;

/** Returns the graph's end node. */
get_end_node(): string;

/** Returns the draw offset of the graph. Used for display in the editor. */
get_graph_offset(): Vector2;

/** Returns the animation node with the given name. */
get_node(path: NodePathType): Node;

/** Returns the animation node with the given name. */
get_node_unsafe<T extends Node>(path: NodePathType): T;


/** Returns the given animation node's name. */
get_node_name(node: AnimationNode): string;

/** Returns the given node's coordinates. Used for display in the editor. */
get_node_position(name: string): Vector2;

/** Returns the graph's end node. */
get_start_node(): string;

/** Returns the given transition. */
get_transition(idx: int): AnimationNodeStateMachineTransition;

/** Returns the number of connections in the graph. */
get_transition_count(): int;

/** Returns the given transition's start node. */
get_transition_from(idx: int): string;

/** Returns the given transition's end node. */
get_transition_to(idx: int): string;

/** Returns [code]true[/code] if the graph contains the given node. */
has_node(name: string): boolean;

/** Returns [code]true[/code] if there is a transition between the given nodes. */
has_transition(from: string, to: string): boolean;

/** Deletes the given node from the graph. */
remove_node(name: string): void;

/** Deletes the transition between the two specified nodes. */
remove_transition(from: string, to: string): void;

/** Deletes the given transition by index. */
remove_transition_by_index(idx: int): void;

/** Renames the given node. */
rename_node(name: string, new_name: string): void;

/** Replaces the node and keeps its transitions unchanged. */
replace_node(name: string, node: AnimationNode): void;

/** Sets the given node as the graph end point. */
set_end_node(name: string): void;

/** Sets the draw offset of the graph. Used for display in the editor. */
set_graph_offset(offset: Vector2): void;

/** Sets the node's coordinates. Used for display in the editor. */
set_node_position(name: string, position: Vector2): void;

/** Sets the given node as the graph start point. */
set_start_node(name: string): void;

  connect<T extends SignalsOf<AnimationNodeStateMachine>>(signal: T, method: SignalFunction<AnimationNodeStateMachine[T]>): number;






}

