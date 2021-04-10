
/**
 * A 2D game object, with a transform (position, rotation, and scale). All 2D nodes, including physics objects and sprites, inherit from Node2D. Use Node2D as a parent node to move, scale and rotate children in a 2D project. Also gives control of the node's render order.
 *
*/
declare class Node2D extends CanvasItem {

  
/**
 * A 2D game object, with a transform (position, rotation, and scale). All 2D nodes, including physics objects and sprites, inherit from Node2D. Use Node2D as a parent node to move, scale and rotate children in a 2D project. Also gives control of the node's render order.
 *
*/
  "new"(): Node2D;
  static "new"(): Node2D;



/** Global position. */
global_position: Vector2;

/** Global rotation in radians. */
global_rotation: float;

/** Global rotation in degrees. */
global_rotation_degrees: float;

/** Global scale. */
global_scale: Vector2;

/** Global [Transform2D]. */
global_transform: Transform2D;

/** Position, relative to the node's parent. */
position: Vector2;

/** Rotation in radians, relative to the node's parent. */
rotation: float;

/** Rotation in degrees, relative to the node's parent. */
rotation_degrees: float;

/** The node's scale. Unscaled value: [code](1, 1)[/code]. */
scale: Vector2;

/** Local [Transform2D]. */
transform: Transform2D;

/** If [code]true[/code], the node's Z index is relative to its parent's Z index. If this node's Z index is 2 and its parent's effective Z index is 3, then this node's effective Z index will be 2 + 3 = 5. */
z_as_relative: boolean;

/** Z index. Controls the order in which the nodes render. A node with a higher Z index will display in front of others. */
z_index: int;

/** Multiplies the current scale by the [code]ratio[/code] vector. */
apply_scale(ratio: Vector2): void;

/** Returns the angle between the node and the [code]point[/code] in radians. */
get_angle_to(point: Vector2): float;

/** Returns the [Transform2D] relative to this node's parent. */
get_relative_transform_to_parent(parent: Node): Transform2D;

/** Adds the [code]offset[/code] vector to the node's global position. */
global_translate(offset: Vector2): void;

/** Rotates the node so it points towards the [code]point[/code], which is expected to use global coordinates. */
look_at(point: Vector2): void;

/** Applies a local translation on the node's X axis based on the [method Node._process]'s [code]delta[/code]. If [code]scaled[/code] is [code]false[/code], normalizes the movement. */
move_local_x(delta: float, scaled?: boolean): void;

/** Applies a local translation on the node's Y axis based on the [method Node._process]'s [code]delta[/code]. If [code]scaled[/code] is [code]false[/code], normalizes the movement. */
move_local_y(delta: float, scaled?: boolean): void;

/** Applies a rotation to the node, in radians, starting from its current rotation. */
rotate(radians: float): void;

/** Transforms the provided local position into a position in global coordinate space. The input is expected to be local relative to the [Node2D] it is called on. e.g. Applying this method to the positions of child nodes will correctly transform their positions into the global coordinate space, but applying it to a node's own position will give an incorrect result, as it will incorporate the node's own transformation into its global position. */
to_global(local_point: Vector2): Vector2;

/** Transforms the provided global position into a position in local coordinate space. The output will be local relative to the [Node2D] it is called on. e.g. It is appropriate for determining the positions of child nodes, but it is not appropriate for determining its own position relative to its parent. */
to_local(global_point: Vector2): Vector2;

/** Translates the node by the given [code]offset[/code] in local coordinates. */
translate(offset: Vector2): void;

  connect<T extends SignalsOf<Node2D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
