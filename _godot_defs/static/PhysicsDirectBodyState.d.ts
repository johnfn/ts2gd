
/**
 * Provides direct access to a physics body in the [PhysicsServer], allowing safe changes to physics properties. This object is passed via the direct state callback of rigid/character bodies, and is intended for changing the direct state of that body. See [method RigidBody._integrate_forces].
 *
*/
declare class PhysicsDirectBodyState extends Object {

  
/**
 * Provides direct access to a physics body in the [PhysicsServer], allowing safe changes to physics properties. This object is passed via the direct state callback of rigid/character bodies, and is intended for changing the direct state of that body. See [method RigidBody._integrate_forces].
 *
*/
  "new"(): PhysicsDirectBodyState;
  static "new"(): PhysicsDirectBodyState;



/** The body's rotational velocity. */
angular_velocity: Vector3;


/** The inverse of the inertia of the body. */
inverse_inertia: Vector3;

/** The inverse of the mass of the body. */
inverse_mass: float;

/** The body's linear velocity. */
linear_velocity: Vector3;


/** If [code]true[/code], this body is currently sleeping (not active). */
sleeping: boolean;

/** The timestep (delta) used for the simulation. */
step: float;

/** The rate at which the body stops rotating, if there are not any other forces moving it. */
total_angular_damp: float;

/** The total gravity vector being currently applied to this body. */
total_gravity: Vector3;

/** The rate at which the body stops moving, if there are not any other forces moving it. */
total_linear_damp: float;

/** The body's transformation matrix. */
transform: Transform;

/**
 * Adds a constant directional force without affecting rotation.
 *
 * This is equivalent to `add_force(force, Vector3(0,0,0))`.
 *
*/
add_central_force(force: Vector3): void;

/** Adds a positioned force to the body. Both the force and the offset from the body origin are in global coordinates. */
add_force(force: Vector3, position: Vector3): void;

/** Adds a constant rotational force without affecting position. */
add_torque(torque: Vector3): void;

/**
 * Applies a single directional impulse without affecting rotation.
 *
 * This is equivalent to `apply_impulse(Vector3(0, 0, 0), impulse)`.
 *
*/
apply_central_impulse(j: Vector3): void;

/** Applies a positioned impulse to the body. An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason it should only be used when simulating one-time impacts. The position uses the rotation of the global coordinate system, but is centered at the object's origin. */
apply_impulse(position: Vector3, j: Vector3): void;

/** Apply a torque impulse (which will be affected by the body mass and shape). This will rotate the body around the vector [code]j[/code] passed as parameter. */
apply_torque_impulse(j: Vector3): void;

/** Returns the collider's [RID]. */
get_contact_collider(contact_idx: int): RID;

/** Returns the collider's object id. */
get_contact_collider_id(contact_idx: int): int;

/** Returns the collider object. */
get_contact_collider_object(contact_idx: int): Object;

/** Returns the contact position in the collider. */
get_contact_collider_position(contact_idx: int): Vector3;

/** Returns the collider's shape index. */
get_contact_collider_shape(contact_idx: int): int;

/** Returns the linear velocity vector at the collider's contact point. */
get_contact_collider_velocity_at_position(contact_idx: int): Vector3;

/**
 * Returns the number of contacts this body has with other bodies.
 *
 * **Note:** By default, this returns 0 unless bodies are configured to monitor contacts. See [member RigidBody.contact_monitor].
 *
*/
get_contact_count(): int;

/** Impulse created by the contact. Only implemented for Bullet physics. */
get_contact_impulse(contact_idx: int): float;

/** Returns the local normal at the contact point. */
get_contact_local_normal(contact_idx: int): Vector3;

/** Returns the local position of the contact point. */
get_contact_local_position(contact_idx: int): Vector3;

/** Returns the local shape index of the collision. */
get_contact_local_shape(contact_idx: int): int;

/** Returns the current state of the space, useful for queries. */
get_space_state(): PhysicsDirectSpaceState;

/** Calls the built-in force integration code. */
integrate_forces(): void;

  connect<T extends SignalsOf<PhysicsDirectBodyState>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
