
/**
 * This is the CSG base class that provides CSG operation support to the various CSG nodes in Godot.
 *
*/
declare class CSGShape extends GeometryInstance {

  
/**
 * This is the CSG base class that provides CSG operation support to the various CSG nodes in Godot.
 *
*/
  "new"(): CSGShape;
  static "new"(): CSGShape;



/** Calculate tangents for the CSG shape which allows the use of normal maps. This is only applied on the root shape, this setting is ignored on any child. */
calculate_tangents: boolean;

/**
 * The physics layers this area is in.
 *
 * Collidable objects can exist in any of 32 different layers. These layers work like a tagging system, and are not visual. A collidable can use these layers to select with which objects it can collide, using the collision_mask property.
 *
 * A contact is detected if object A is in any of the layers that object B scans, or object B is in any layer scanned by object A. See [url=https://docs.godotengine.org/en/latest/tutorials/physics/physics_introduction.html#collision-layers-and-masks]Collision layers and masks[/url] in the documentation for more information.
 *
*/
collision_layer: int;

/** The physics layers this CSG shape scans for collisions. See [url=https://docs.godotengine.org/en/latest/tutorials/physics/physics_introduction.html#collision-layers-and-masks]Collision layers and masks[/url] in the documentation for more information. */
collision_mask: int;

/** The operation that is performed on this shape. This is ignored for the first CSG child node as the operation is between this node and the previous child of this nodes parent. */
operation: int;

/** Snap makes the mesh snap to a given distance so that the faces of two meshes can be perfectly aligned. A lower value results in greater precision but may be harder to adjust. */
snap: float;

/** Adds a collision shape to the physics engine for our CSG shape. This will always act like a static body. Note that the collision shape is still active even if the CSG shape itself is hidden. */
use_collision: boolean;

/** Returns an individual bit on the collision mask. */
get_collision_layer_bit(bit: int): boolean;

/** Returns an individual bit on the collision mask. */
get_collision_mask_bit(bit: int): boolean;

/** Returns an [Array] with two elements, the first is the [Transform] of this node and the second is the root [Mesh] of this node. Only works when this node is the root shape. */
get_meshes(): any[];

/** Returns [code]true[/code] if this is a root shape and is thus the object that is rendered. */
is_root_shape(): boolean;

/** Sets individual bits on the layer mask. Use this if you only need to change one layer's value. */
set_collision_layer_bit(bit: int, value: boolean): void;

/** Sets individual bits on the collision mask. Use this if you only need to change one layer's value. */
set_collision_mask_bit(bit: int, value: boolean): void;

  connect<T extends SignalsOf<CSGShape>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Geometry of both primitives is merged, intersecting geometry is removed.
 *
*/
static OPERATION_UNION: 0;

/**
 * Only intersecting geometry remains, the rest is removed.
 *
*/
static OPERATION_INTERSECTION: 1;

/**
 * The second shape is subtracted from the first, leaving a dent with its shape.
 *
*/
static OPERATION_SUBTRACTION: 2;


  
}
