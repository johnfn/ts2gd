
/**
 * The SpringArm node is a node that casts a ray (or collision shape) along its z axis and moves all its direct children to the collision point, minus a margin.
 *
 * The most common use case for this is to make a 3rd person camera that reacts to collisions in the environment.
 *
 * The SpringArm will either cast a ray, or if a shape is given, it will cast the shape in the direction of its z axis.
 *
 * If you use the SpringArm as a camera controller for your player, you might need to exclude the player's collider from the SpringArm's collision check.
 *
*/
declare class SpringArm extends Spatial {

  
/**
 * The SpringArm node is a node that casts a ray (or collision shape) along its z axis and moves all its direct children to the collision point, minus a margin.
 *
 * The most common use case for this is to make a 3rd person camera that reacts to collisions in the environment.
 *
 * The SpringArm will either cast a ray, or if a shape is given, it will cast the shape in the direction of its z axis.
 *
 * If you use the SpringArm as a camera controller for your player, you might need to exclude the player's collider from the SpringArm's collision check.
 *
*/
  "new"(): SpringArm;
  static "new"(): SpringArm;



/** The layers against which the collision check shall be done. See [url=https://docs.godotengine.org/en/3.4/tutorials/physics/physics_introduction.html#collision-layers-and-masks]Collision layers and masks[/url] in the documentation for more information. */
collision_mask: int;

/**
 * When the collision check is made, a candidate length for the SpringArm is given.
 *
 * The margin is then subtracted to this length and the translation is applied to the child objects of the SpringArm.
 *
 * This margin is useful for when the SpringArm has a [Camera] as a child node: without the margin, the [Camera] would be placed on the exact point of collision, while with the margin the [Camera] would be placed close to the point of collision.
 *
*/
margin: float;

/**
 * The [Shape] to use for the SpringArm.
 *
 * When the shape is set, the SpringArm will cast the [Shape] on its z axis instead of performing a ray cast.
 *
*/
shape: Shape;

/**
 * The maximum extent of the SpringArm. This is used as a length for both the ray and the shape cast used internally to calculate the desired position of the SpringArm's child nodes.
 *
 * To know more about how to perform a shape cast or a ray cast, please consult the [PhysicsDirectSpaceState] documentation.
 *
*/
spring_length: float;

/** Adds the [PhysicsBody] object with the given [RID] to the list of [PhysicsBody] objects excluded from the collision check. */
add_excluded_object(RID: RID): void;

/** Clears the list of [PhysicsBody] objects excluded from the collision check. */
clear_excluded_objects(): void;

/** Returns the spring arm's current length. */
get_hit_length(): float;

/** Removes the given [RID] from the list of [PhysicsBody] objects excluded from the collision check. */
remove_excluded_object(RID: RID): boolean;

  // connect<T extends SignalsOf<SpringArm>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<SpringArmSignals>>(signal: T, method: SignalFunction<SpringArmSignals[T]>): number;




}

declare class SpringArmSignals extends SpatialSignals {
  
}
