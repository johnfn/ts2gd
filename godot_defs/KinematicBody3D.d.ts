
/**
 * Kinematic bodies are special types of bodies that are meant to be user-controlled. They are not affected by physics at all; to other types of bodies, such as a character or a rigid body, these are the same as a static body. However, they have two main uses:
 *
 * **Simulated motion:** When these bodies are moved manually, either from code or from an [AnimationPlayer] (with [member AnimationPlayer.playback_process_mode] set to "physics"), the physics will automatically compute an estimate of their linear and angular velocity. This makes them very useful for moving platforms or other AnimationPlayer-controlled objects (like a door, a bridge that opens, etc).
 *
 * **Kinematic characters:** KinematicBody3D also has an API for moving objects (the [method move_and_collide] and [method move_and_slide] methods) while performing collision tests. This makes them really useful to implement characters that collide against a world, but don't require advanced physics.
 *
*/
declare class KinematicBody3D extends PhysicsBody3D {

  
/**
 * Kinematic bodies are special types of bodies that are meant to be user-controlled. They are not affected by physics at all; to other types of bodies, such as a character or a rigid body, these are the same as a static body. However, they have two main uses:
 *
 * **Simulated motion:** When these bodies are moved manually, either from code or from an [AnimationPlayer] (with [member AnimationPlayer.playback_process_mode] set to "physics"), the physics will automatically compute an estimate of their linear and angular velocity. This makes them very useful for moving platforms or other AnimationPlayer-controlled objects (like a door, a bridge that opens, etc).
 *
 * **Kinematic characters:** KinematicBody3D also has an API for moving objects (the [method move_and_collide] and [method move_and_slide] methods) while performing collision tests. This makes them really useful to implement characters that collide against a world, but don't require advanced physics.
 *
*/
  "new"(): this;
  static "new"(): this;



/** Lock the body's X axis movement. */
axis_lock_motion_x: boolean;

/** Lock the body's Y axis movement. */
axis_lock_motion_y: boolean;

/** Lock the body's Z axis movement. */
axis_lock_motion_z: boolean;

/** If the body is at least this close to another body, this body will consider them to be colliding. */
"collision/safe_margin": float;

/** Returns [code]true[/code] if the specified [code]axis[/code] is locked. See also [member axis_lock_motion_x], [member axis_lock_motion_y] and [member axis_lock_motion_z]. */
get_axis_lock(axis: int): boolean;

/** Returns the surface normal of the floor at the last collision point. Only valid after calling [method move_and_slide] or [method move_and_slide_with_snap] and when [method is_on_floor] returns [code]true[/code]. */
get_floor_normal(): Vector3;

/** Returns the linear velocity of the floor at the last collision point. Only valid after calling [method move_and_slide] or [method move_and_slide_with_snap] and when [method is_on_floor] returns [code]true[/code]. */
get_floor_velocity(): Vector3;

/** Returns a [KinematicCollision3D], which contains information about a collision that occurred during the last call to [method move_and_slide] or [method move_and_slide_with_snap]. Since the body can collide several times in a single call to [method move_and_slide], you must specify the index of the collision in the range 0 to ([method get_slide_count] - 1). */
get_slide_collision(slide_idx: int): KinematicCollision3D;

/** Returns the number of times the body collided and changed direction during the last call to [method move_and_slide] or [method move_and_slide_with_snap]. */
get_slide_count(): int;

/** Returns [code]true[/code] if the body collided with the ceiling on the last call of [method move_and_slide] or [method move_and_slide_with_snap]. Otherwise, returns [code]false[/code]. */
is_on_ceiling(): boolean;

/** Returns [code]true[/code] if the body collided with the floor on the last call of [method move_and_slide] or [method move_and_slide_with_snap]. Otherwise, returns [code]false[/code]. */
is_on_floor(): boolean;

/** Returns [code]true[/code] if the body collided with a wall on the last call of [method move_and_slide] or [method move_and_slide_with_snap]. Otherwise, returns [code]false[/code]. */
is_on_wall(): boolean;

/**
 * Moves the body along the vector `rel_vec`. The body will stop if it collides. Returns a [KinematicCollision3D], which contains information about the collision.
 *
 * If `test_only` is `true`, the body does not move but the would-be collision information is given.
 *
*/
move_and_collide(rel_vec: Vector3, infinite_inertia?: boolean, exclude_raycast_shapes?: boolean, test_only?: boolean): KinematicCollision3D;

/**
 * Moves the body along a vector. If the body collides with another, it will slide along the other body rather than stop immediately. If the other body is a [KinematicBody3D] or [RigidBody3D], it will also be affected by the motion of the other body. You can use this to make moving and rotating platforms, or to make nodes push other nodes.
 *
 * This method should be used in [method Node._physics_process] (or in a method called by [method Node._physics_process]), as it uses the physics step's `delta` value automatically in calculations. Otherwise, the simulation will run at an incorrect speed.
 *
 * `linear_velocity` is the velocity vector (typically meters per second). Unlike in [method move_and_collide], you should **not** multiply it by `delta` — the physics engine handles applying the velocity.
 *
 * `up_direction` is the up direction, used to determine what is a wall and what is a floor or a ceiling. If set to the default value of `Vector3(0, 0, 0)`, everything is considered a wall.
 *
 * If `stop_on_slope` is `true`, body will not slide on slopes when you include gravity in `linear_velocity` and the body is standing still.
 *
 * If the body collides, it will change direction a maximum of `max_slides` times before it stops.
 *
 * `floor_max_angle` is the maximum angle (in radians) where a slope is still considered a floor (or a ceiling), rather than a wall. The default value equals 45 degrees.
 *
 * If `infinite_inertia` is `true`, body will be able to push [RigidBody3D] nodes, but it won't also detect any collisions with them. If `false`, it will interact with [RigidBody3D] nodes like with [StaticBody3D].
 *
 * Returns the `linear_velocity` vector, rotated and/or scaled if a slide collision occurred. To get detailed information about collisions that occurred, use [method get_slide_collision].
 *
*/
move_and_slide(linear_velocity: Vector3, up_direction?: Vector3, stop_on_slope?: boolean, max_slides?: int, floor_max_angle?: float, infinite_inertia?: boolean): Vector3;

/**
 * Moves the body while keeping it attached to slopes. Similar to [method move_and_slide].
 *
 * As long as the `snap` vector is in contact with the ground, the body will remain attached to the surface. This means you must disable snap in order to jump, for example. You can do this by setting `snap` to `(0, 0, 0)` or by using [method move_and_slide] instead.
 *
*/
move_and_slide_with_snap(linear_velocity: Vector3, snap: Vector3, up_direction?: Vector3, stop_on_slope?: boolean, max_slides?: int, floor_max_angle?: float, infinite_inertia?: boolean): Vector3;

/** Locks or unlocks the specified [code]axis[/code] depending on the value of [code]lock[/code]. See also [member axis_lock_motion_x], [member axis_lock_motion_y] and [member axis_lock_motion_z]. */
set_axis_lock(axis: int, lock: boolean): void;

/** Checks for collisions without moving the body. Virtually sets the node's position, scale and rotation to that of the given [Transform], then tries to move the body along the vector [code]rel_vec[/code]. Returns [code]true[/code] if a collision would occur. */
test_move(from: Transform, rel_vec: Vector3, infinite_inertia?: boolean): boolean;

  connect<T extends SignalsOf<KinematicBody3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
