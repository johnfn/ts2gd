
/**
 * The SpringArm3D node is a node that casts a ray (or collision shape) along its z axis and moves all its direct children to the collision point, minus a margin.
 *
 * The most common use case for this is to make a 3rd person camera that reacts to collisions in the environment.
 *
 * The SpringArm3D will either cast a ray, or if a shape is given, it will cast the shape in the direction of its z axis.
 *
 * If you use the SpringArm3D as a camera controller for your player, you might need to exclude the player's collider from the SpringArm3D's collision check.
 *
*/
declare class SpringArm3D extends Node3D {

  
/**
 * The SpringArm3D node is a node that casts a ray (or collision shape) along its z axis and moves all its direct children to the collision point, minus a margin.
 *
 * The most common use case for this is to make a 3rd person camera that reacts to collisions in the environment.
 *
 * The SpringArm3D will either cast a ray, or if a shape is given, it will cast the shape in the direction of its z axis.
 *
 * If you use the SpringArm3D as a camera controller for your player, you might need to exclude the player's collider from the SpringArm3D's collision check.
 *
*/
  "new"(): this;
  static "new"(): this;



/** The layers against which the collision check shall be done. See [url=https://docs.godotengine.org/en/latest/tutorials/physics/physics_introduction.html#collision-layers-and-masks]Collision layers and masks[/url] in the documentation for more information. */
collision_mask: int;

/**
 * When the collision check is made, a candidate length for the SpringArm3D is given.
 *
 * The margin is then subtracted to this length and the translation is applied to the child objects of the SpringArm3D.
 *
 * This margin is useful for when the SpringArm3D has a [Camera3D] as a child node: without the margin, the [Camera3D] would be placed on the exact point of collision, while with the margin the [Camera3D] would be placed close to the point of collision.
 *
*/
margin: float;

/**
 * The [Shape3D] to use for the SpringArm3D.
 *
 * When the shape is set, the SpringArm3D will cast the [Shape3D] on its z axis instead of performing a ray cast.
 *
*/
shape: Shape3D;

/**
 * The maximum extent of the SpringArm3D. This is used as a length for both the ray and the shape cast used internally to calculate the desired position of the SpringArm3D's child nodes.
 *
 * To know more about how to perform a shape cast or a ray cast, please consult the [PhysicsDirectSpaceState3D] documentation.
 *
*/
spring_length: float;

/** Adds the [PhysicsBody3D] object with the given [RID] to the list of [PhysicsBody3D] objects excluded from the collision check. */
add_excluded_object(RID: RID): void;

/** Clears the list of [PhysicsBody3D] objects excluded from the collision check. */
clear_excluded_objects(): void;

/** Returns the spring arm's current length. */
get_hit_length(): float;

/** Removes the given [RID] from the list of [PhysicsBody3D] objects excluded from the collision check. */
remove_excluded_object(RID: RID): boolean;

  connect<T extends SignalsOf<SpringArm3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
