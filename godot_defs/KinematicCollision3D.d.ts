
/**
 * Contains collision data for [KinematicBody3D] collisions. When a [KinematicBody3D] is moved using [method KinematicBody3D.move_and_collide], it stops if it detects a collision with another body. If a collision is detected, a KinematicCollision3D object is returned.
 *
 * This object contains information about the collision, including the colliding object, the remaining motion, and the collision position. This information can be used to calculate a collision response.
 *
*/
declare class KinematicCollision3D extends Reference {

  
/**
 * Contains collision data for [KinematicBody3D] collisions. When a [KinematicBody3D] is moved using [method KinematicBody3D.move_and_collide], it stops if it detects a collision with another body. If a collision is detected, a KinematicCollision3D object is returned.
 *
 * This object contains information about the collision, including the colliding object, the remaining motion, and the collision position. This information can be used to calculate a collision response.
 *
*/
  "new"(): this;
  static "new"(): this;



/** The colliding body. */
collider: Object;

/** The colliding body's unique instance ID. See [method Object.get_instance_id]. */
collider_id: int;

/** The colliding body's metadata. See [Object]. */
collider_metadata: any;

/** The colliding body's shape. */
collider_shape: Object;

/** The colliding shape's index. See [CollisionObject3D]. */
collider_shape_index: int;

/** The colliding object's velocity. */
collider_velocity: Vector3;

/** The moving object's colliding shape. */
local_shape: Object;

/** The colliding body's shape's normal at the point of collision. */
normal: Vector3;

/** The point of collision, in global coordinates. */
position: Vector3;

/** The moving object's remaining movement vector. */
remainder: Vector3;

/** The distance the moving object traveled before collision. */
travel: Vector3;



  connect<T extends SignalsOf<KinematicCollision3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
