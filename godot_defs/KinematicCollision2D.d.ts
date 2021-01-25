
/**
 * Contains collision data for [KinematicBody2D] collisions. When a [KinematicBody2D] is moved using [method KinematicBody2D.move_and_collide], it stops if it detects a collision with another body. If a collision is detected, a KinematicCollision2D object is returned.
 *
 * This object contains information about the collision, including the colliding object, the remaining motion, and the collision position. This information can be used to calculate a collision response.
 *
*/
declare class KinematicCollision2D extends Reference {

  
/**
 * Contains collision data for [KinematicBody2D] collisions. When a [KinematicBody2D] is moved using [method KinematicBody2D.move_and_collide], it stops if it detects a collision with another body. If a collision is detected, a KinematicCollision2D object is returned.
 *
 * This object contains information about the collision, including the colliding object, the remaining motion, and the collision position. This information can be used to calculate a collision response.
 *
*/
  "new"(): KinematicCollision2D;
  static "new"(): KinematicCollision2D;



/** The colliding body. */
collider: Object;

/** The colliding body's unique instance ID. See [method Object.get_instance_id]. */
collider_id: int;

/** The colliding body's metadata. See [Object]. */
collider_metadata: any;

/** The colliding body's shape. */
collider_shape: Object;

/** The colliding shape's index. See [CollisionObject2D]. */
collider_shape_index: int;

/** The colliding object's velocity. */
collider_velocity: Vector2;

/** The moving object's colliding shape. */
local_shape: Object;

/** The colliding body's shape's normal at the point of collision. */
normal: Vector2;

/** The point of collision, in global coordinates. */
position: Vector2;

/** The moving object's remaining movement vector. */
remainder: Vector2;

/** The distance the moving object traveled before collision. */
travel: Vector2;



  connect<T extends SignalsOf<KinematicCollision2D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
