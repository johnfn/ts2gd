
/**
 * A resource to add to an [AnimationNodeBlendTree].
 *
 * This node allows you to blend linearly between three animations using a [Vector2] weight.
 *
 * You can add vertices to the blend space with [method add_blend_point] and automatically triangulate it by setting [member auto_triangles] to `true`. Otherwise, use [method add_triangle] and [method remove_triangle] to create up the blend space by hand.
 *
*/
declare class AnimationNodeBlendSpace2D extends AnimationRootNode {

  
/**
 * A resource to add to an [AnimationNodeBlendTree].
 *
 * This node allows you to blend linearly between three animations using a [Vector2] weight.
 *
 * You can add vertices to the blend space with [method add_blend_point] and automatically triangulate it by setting [member auto_triangles] to `true`. Otherwise, use [method add_triangle] and [method remove_triangle] to create up the blend space by hand.
 *
*/
  "new"(): AnimationNodeBlendSpace2D;
  static "new"(): AnimationNodeBlendSpace2D;



/** If [code]true[/code], the blend space is triangulated automatically. The mesh updates every time you add or remove points with [method add_blend_point] and [method remove_blend_point]. */
auto_triangles: boolean;

/** Controls the interpolation between animations. See [enum BlendMode] constants. */
blend_mode: int;

/** The blend space's X and Y axes' upper limit for the points' position. See [method add_blend_point]. */
max_space: Vector2;

/** The blend space's X and Y axes' lower limit for the points' position. See [method add_blend_point]. */
min_space: Vector2;

/** Position increment to snap to when moving a point. */
snap: Vector2;

/** Name of the blend space's X axis. */
x_label: string;

/** Name of the blend space's Y axis. */
y_label: string;

/** Adds a new point that represents a [code]node[/code] at the position set by [code]pos[/code]. You can insert it at a specific index using the [code]at_index[/code] argument. If you use the default value for [code]at_index[/code], the point is inserted at the end of the blend points array. */
add_blend_point(node: AnimationRootNode, pos: Vector2, at_index?: int): void;

/** Creates a new triangle using three points [code]x[/code], [code]y[/code], and [code]z[/code]. Triangles can overlap. You can insert the triangle at a specific index using the [code]at_index[/code] argument. If you use the default value for [code]at_index[/code], the point is inserted at the end of the blend points array. */
add_triangle(x: int, y: int, z: int, at_index?: int): void;

/** Returns the number of points in the blend space. */
get_blend_point_count(): int;

/** Returns the [AnimationRootNode] referenced by the point at index [code]point[/code]. */
get_blend_point_node(point: int): AnimationRootNode;

/** Returns the position of the point at index [code]point[/code]. */
get_blend_point_position(point: int): Vector2;

/** Returns the number of triangles in the blend space. */
get_triangle_count(): int;

/** Returns the position of the point at index [code]point[/code] in the triangle of index [code]triangle[/code]. */
get_triangle_point(triangle: int, point: int): int;

/** Removes the point at index [code]point[/code] from the blend space. */
remove_blend_point(point: int): void;

/** Removes the triangle at index [code]triangle[/code] from the blend space. */
remove_triangle(triangle: int): void;

/** Changes the [AnimationNode] referenced by the point at index [code]point[/code]. */
set_blend_point_node(point: int, node: AnimationRootNode): void;

/** Updates the position of the point at index [code]point[/code] on the blend axis. */
set_blend_point_position(point: int, pos: Vector2): void;

  connect<T extends SignalsOf<AnimationNodeBlendSpace2D>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * The interpolation between animations is linear.
 *
*/
static BLEND_MODE_INTERPOLATED: 0;

/**
 * The blend space plays the animation of the node the blending position is closest to. Useful for frame-by-frame 2D animations.
 *
*/
static BLEND_MODE_DISCRETE: 1;

/**
 * Similar to [constant BLEND_MODE_DISCRETE], but starts the new animation at the last animation's playback position.
 *
*/
static BLEND_MODE_DISCRETE_CARRY: 2;


  /**
 * Emitted every time the blend space's triangles are created, removed, or when one of their vertices changes position.
 *
*/
triangles_updated: Signal<() => void>

}
