
/**
 * Base resource for [AnimationTree] nodes. In general, it's not used directly, but you can create custom ones with custom blending formulas.
 *
 * nherit this when creating nodes mainly for use in [AnimationNodeBlendTree], otherwise [AnimationRootNode] should be used instead.
 *
*/
declare class AnimationNode extends Resource {

  
/**
 * Base resource for [AnimationTree] nodes. In general, it's not used directly, but you can create custom ones with custom blending formulas.
 *
 * nherit this when creating nodes mainly for use in [AnimationNodeBlendTree], otherwise [AnimationRootNode] should be used instead.
 *
*/
  "new"(): AnimationNode;
  static "new"(): AnimationNode;



/** If [code]true[/code], filtering is enabled. */
filter_enabled: boolean;

/** Adds an input to the node. This is only useful for nodes created for use in an [AnimationNodeBlendTree]. */
add_input(name: string): void;

/** Blend an animation by [code]blend[/code] amount (name must be valid in the linked [AnimationPlayer]). A [code]time[/code] and [code]delta[/code] may be passed, as well as whether [code]seek[/code] happened. */
blend_animation(animation: string, time: float, delta: float, seeked: boolean, blend: float): void;

/** Blend an input. This is only useful for nodes created for an [AnimationNodeBlendTree]. The [code]time[/code] parameter is a relative delta, unless [code]seek[/code] is [code]true[/code], in which case it is absolute. A filter mode may be optionally passed (see [enum FilterAction] for options). */
blend_input(input_index: int, time: float, seek: boolean, blend: float, filter?: int, optimize?: boolean): float;

/** Blend another animation node (in case this node contains children animation nodes). This function is only useful if you inherit from [AnimationRootNode] instead, else editors will not display your node for addition. */
blend_node(name: string, node: AnimationNode, time: float, seek: boolean, blend: float, filter?: int, optimize?: boolean): float;

/** Gets the text caption for this node (used by some editors). */
get_caption(): string;

/** Gets a child node by index (used by editors inheriting from [AnimationRootNode]). */
get_child_by_name(name: string): Object;

/** Gets all children nodes in order as a [code]name: node[/code] dictionary. Only useful when inheriting [AnimationRootNode]. */
get_child_nodes(): Dictionary;

/** Amount of inputs in this node, only useful for nodes that go into [AnimationNodeBlendTree]. */
get_input_count(): int;

/** Gets the name of an input by index. */
get_input_name(input: int): string;

/** Gets the value of a parameter. Parameters are custom local memory used for your nodes, given a resource can be reused in multiple trees. */
get_parameter(name: string): any;

/** Gets the default value of a parameter. Parameters are custom local memory used for your nodes, given a resource can be reused in multiple trees. */
get_parameter_default_value(name: string): any;

/** Gets the property information for parameter. Parameters are custom local memory used for your nodes, given a resource can be reused in multiple trees. Format is similar to [method Object.get_property_list]. */
get_parameter_list(): any[];

/** Returns [code]true[/code] whether you want the blend tree editor to display filter editing on this node. */
has_filter(): string;

/** Returns [code]true[/code] whether a given path is filtered. */
is_path_filtered(path: NodePathType): boolean;

/**
 * User-defined callback called when a custom node is processed. The `time` parameter is a relative delta, unless `seek` is `true`, in which case it is absolute.
 *
 * Here, call the [method blend_input], [method blend_node] or [method blend_animation] functions. You can also use [method get_parameter] and [method set_parameter] to modify local memory.
 *
 * This function should return the time left for the current animation to finish (if unsure, pass the value from the main blend being called).
 *
*/
process(time: float, seek: boolean): void;

/** Removes an input, call this only when inactive. */
remove_input(index: int): void;

/** Adds or removes a path for the filter. */
set_filter_path(path: NodePathType, enable: boolean): void;

/** Sets a custom parameter. These are used as local storage, because resources can be reused across the tree or scenes. */
set_parameter(name: string, value: any): void;

  connect<T extends SignalsOf<AnimationNode>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Do not use filtering.
 *
*/
static FILTER_IGNORE: 0;

/**
 * Paths matching the filter will be allowed to pass.
 *
*/
static FILTER_PASS: 1;

/**
 * Paths matching the filter will be discarded.
 *
*/
static FILTER_STOP: 2;

/**
 * Paths matching the filter will be blended (by the blend value).
 *
*/
static FILTER_BLEND: 3;


  /**
 * Called when the node was removed from the graph.
 *
*/
removed_from_graph: Signal<() => void>

/**
 * Emitted by nodes that inherit from this class and that have an internal tree when one of their nodes changes. The nodes that emit this signal are [AnimationNodeBlendSpace1D], [AnimationNodeBlendSpace2D], [AnimationNodeStateMachine], and [AnimationNodeBlendTree].
 *
*/
tree_changed: Signal<() => void>

}
