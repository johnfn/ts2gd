
/**
 * PhysicsBody2D is an abstract base class for implementing a physics body. All *Body2D types inherit from it.
 *
*/
declare class PhysicsBody2D extends CollisionObject2D {

  
/**
 * PhysicsBody2D is an abstract base class for implementing a physics body. All *Body2D types inherit from it.
 *
*/
  "new"(): PhysicsBody2D;
  static "new"(): PhysicsBody2D;



/**
 * The physics layers this area is in.
 *
 * Collidable objects can exist in any of 32 different layers. These layers work like a tagging system, and are not visual. A collidable can use these layers to select with which objects it can collide, using the [member collision_mask] property.
 *
 * A contact is detected if object A is in any of the layers that object B scans, or object B is in any layer scanned by object A. See [url=https://docs.godotengine.org/en/latest/tutorials/physics/physics_introduction.html#collision-layers-and-masks]Collision layers and masks[/url] in the documentation for more information.
 *
*/
collision_layer: int;

/** The physics layers this area scans for collisions. See [url=https://docs.godotengine.org/en/latest/tutorials/physics/physics_introduction.html#collision-layers-and-masks]Collision layers and masks[/url] in the documentation for more information. */
collision_mask: int;


/** Both [member collision_layer] and [member collision_mask]. Returns [member collision_layer] when accessed. Updates [member collision_layer] and [member collision_mask] when modified. */
layers: int;

/** Adds a body to the list of bodies that this body can't collide with. */
add_collision_exception_with(body: Node): void;

/** Returns an array of nodes that were added as collision exceptions for this body. */
get_collision_exceptions(): any[];

/** Returns an individual bit on the [member collision_layer]. */
get_collision_layer_bit(bit: int): boolean;

/** Returns an individual bit on the [member collision_mask]. */
get_collision_mask_bit(bit: int): boolean;

/** Removes a body from the list of bodies that this body can't collide with. */
remove_collision_exception_with(body: Node): void;

/** Sets individual bits on the [member collision_layer] bitmask. Use this if you only need to change one layer's value. */
set_collision_layer_bit(bit: int, value: boolean): void;

/** Sets individual bits on the [member collision_mask] bitmask. Use this if you only need to change one layer's value. */
set_collision_mask_bit(bit: int, value: boolean): void;

  connect<T extends SignalsOf<PhysicsBody2D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
