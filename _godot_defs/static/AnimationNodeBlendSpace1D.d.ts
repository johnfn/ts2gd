
/**
 * A resource to add to an [AnimationNodeBlendTree].
 *
 * This is a virtual axis on which you can add any type of [AnimationNode] using [method add_blend_point].
 *
 * Outputs the linear blend of the two [AnimationNode]s closest to the node's current value.
 *
 * You can set the extents of the axis using the [member min_space] and [member max_space].
 *
*/
declare class AnimationNodeBlendSpace1D extends AnimationRootNode  {

  
/**
 * A resource to add to an [AnimationNodeBlendTree].
 *
 * This is a virtual axis on which you can add any type of [AnimationNode] using [method add_blend_point].
 *
 * Outputs the linear blend of the two [AnimationNode]s closest to the node's current value.
 *
 * You can set the extents of the axis using the [member min_space] and [member max_space].
 *
*/
  new(): AnimationNodeBlendSpace1D; 
  static "new"(): AnimationNodeBlendSpace1D 


/** The blend space's axis's upper limit for the points' position. See [method add_blend_point]. */
max_space: float;

/** The blend space's axis's lower limit for the points' position. See [method add_blend_point]. */
min_space: float;

/** Position increment to snap to when moving a point on the axis. */
snap: float;

/** Label of the virtual axis of the blend space. */
value_label: string;

/** Adds a new point that represents a [code]node[/code] on the virtual axis at a given position set by [code]pos[/code]. You can insert it at a specific index using the [code]at_index[/code] argument. If you use the default value for [code]at_index[/code], the point is inserted at the end of the blend points array. */
add_blend_point(node: AnimationRootNode, pos: float, at_index?: int): void;

/** Returns the number of points on the blend axis. */
get_blend_point_count(): int;

/** Returns the [AnimationNode] referenced by the point at index [code]point[/code]. */
get_blend_point_node(point: int): AnimationRootNode;

/** Returns the position of the point at index [code]point[/code]. */
get_blend_point_position(point: int): float;

/** Removes the point at index [code]point[/code] from the blend axis. */
remove_blend_point(point: int): void;

/** Changes the [AnimationNode] referenced by the point at index [code]point[/code]. */
set_blend_point_node(point: int, node: AnimationRootNode): void;

/** Updates the position of the point at index [code]point[/code] on the blend axis. */
set_blend_point_position(point: int, pos: float): void;

  connect<T extends SignalsOf<AnimationNodeBlendSpace1D>>(signal: T, method: SignalFunction<AnimationNodeBlendSpace1D[T]>): number;






}

