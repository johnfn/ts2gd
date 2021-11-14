
/**
 * Contains collision data for [KinematicBody] collisions. When a [KinematicBody] is moved using [method KinematicBody.move_and_collide], it stops if it detects a collision with another body. If a collision is detected, a KinematicCollision object is returned.
 *
 * This object contains information about the collision, including the colliding object, the remaining motion, and the collision position. This information can be used to calculate a collision response.
 *
*/
declare class KinematicCollision extends Reference  {

  
/**
 * Contains collision data for [KinematicBody] collisions. When a [KinematicBody] is moved using [method KinematicBody.move_and_collide], it stops if it detects a collision with another body. If a collision is detected, a KinematicCollision object is returned.
 *
 * This object contains information about the collision, including the colliding object, the remaining motion, and the collision position. This information can be used to calculate a collision response.
 *
*/
  new(): KinematicCollision; 
  static "new"(): KinematicCollision 


/** The colliding body. */
collider: Object;

/** The colliding body's unique instance ID. See [method Object.get_instance_id]. */
collider_id: int;

/** The colliding body's metadata. See [Object]. */
collider_metadata: any;

/** The colliding body's [RID] used by the [PhysicsServer]. */
collider_rid: RID;

/** The colliding body's shape. */
collider_shape: Object;

/** The colliding shape's index. See [CollisionObject]. */
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

/** The collision angle according to [code]up_direction[/code], which is [code]Vector3.UP[/code] by default. This value is always positive. */
get_angle(up_direction?: Vector3): float;

  connect<T extends SignalsOf<KinematicCollision>>(signal: T, method: SignalFunction<KinematicCollision[T]>): number;






}

