
/**
 * Provides direct access to a physics body in the [PhysicsServer2D], allowing safe changes to physics properties. This object is passed via the direct state callback of rigid/character bodies, and is intended for changing the direct state of that body. See [method RigidBody2D._integrate_forces].
 *
*/
declare class PhysicsDirectBodyState2D extends Object {

  
/**
 * Provides direct access to a physics body in the [PhysicsServer2D], allowing safe changes to physics properties. This object is passed via the direct state callback of rigid/character bodies, and is intended for changing the direct state of that body. See [method RigidBody2D._integrate_forces].
 *
*/
  "new"(): this;
  static "new"(): this;



/** The body's rotational velocity. */
angular_velocity: float;

/** The inverse of the inertia of the body. */
inverse_inertia: float;

/** The inverse of the mass of the body. */
inverse_mass: float;

/** The body's linear velocity. */
linear_velocity: Vector2;

/** If [code]true[/code], this body is currently sleeping (not active). */
sleeping: boolean;

/** The timestep (delta) used for the simulation. */
step: float;

/** The rate at which the body stops rotating, if there are not any other forces moving it. */
total_angular_damp: float;

/** The total gravity vector being currently applied to this body. */
total_gravity: Vector2;

/** The rate at which the body stops moving, if there are not any other forces moving it. */
total_linear_damp: float;

/** The body's transformation matrix. */
transform: Transform2D;

/** Adds a constant directional force without affecting rotation. */
add_central_force(force: Vector2): void;

/** Adds a positioned force to the body. Both the force and the offset from the body origin are in global coordinates. */
add_force(force: Vector2, position?: Vector2): void;

/** Adds a constant rotational force. */
add_torque(torque: float): void;

/** Applies a directional impulse without affecting rotation. */
apply_central_impulse(impulse: Vector2): void;

/** Applies a positioned impulse to the body. An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_force" functions otherwise). The offset uses the rotation of the global coordinate system, but is centered at the object's origin. */
apply_impulse(impulse: Vector2, position?: Vector2): void;

/** Applies a rotational impulse to the body. */
apply_torque_impulse(impulse: float): void;

/** Returns the collider's [RID]. */
get_contact_collider(contact_idx: int): RID;

/** Returns the collider's object id. */
get_contact_collider_id(contact_idx: int): int;

/** Returns the collider object. This depends on how it was created (will return a scene node if such was used to create it). */
get_contact_collider_object(contact_idx: int): Object;

/** Returns the contact position in the collider. */
get_contact_collider_position(contact_idx: int): Vector2;

/** Returns the collider's shape index. */
get_contact_collider_shape(contact_idx: int): int;

/** Returns the collided shape's metadata. This metadata is different from [method Object.get_meta], and is set with [method PhysicsServer2D.shape_set_data]. */
get_contact_collider_shape_metadata(contact_idx: int): any;

/** Returns the linear velocity vector at the collider's contact point. */
get_contact_collider_velocity_at_position(contact_idx: int): Vector2;

/**
 * Returns the number of contacts this body has with other bodies.
 *
 * **Note:** By default, this returns 0 unless bodies are configured to monitor contacts. See [member RigidBody2D.contact_monitor].
 *
*/
get_contact_count(): int;

/** Returns the local normal at the contact point. */
get_contact_local_normal(contact_idx: int): Vector2;

/** Returns the local position of the contact point. */
get_contact_local_position(contact_idx: int): Vector2;

/** Returns the local shape index of the collision. */
get_contact_local_shape(contact_idx: int): int;

/** Returns the current state of the space, useful for queries. */
get_space_state(): PhysicsDirectSpaceState2D;

/** Calls the built-in force integration code. */
integrate_forces(): void;

  connect<T extends SignalsOf<PhysicsDirectBodyState2D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
