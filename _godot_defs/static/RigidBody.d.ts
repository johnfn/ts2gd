
/**
 * This is the node that implements full 3D physics. This means that you do not control a RigidBody directly. Instead, you can apply forces to it (gravity, impulses, etc.), and the physics simulation will calculate the resulting movement, collision, bouncing, rotating, etc.
 *
 * A RigidBody has 4 behavior [member mode]s: Rigid, Static, Character, and Kinematic.
 *
 * **Note:** Don't change a RigidBody's position every frame or very often. Sporadic changes work fine, but physics runs at a different granularity (fixed Hz) than usual rendering (process callback) and maybe even in a separate thread, so changing this from a process loop may result in strange behavior. If you need to directly affect the body's state, use [method _integrate_forces], which allows you to directly access the physics state.
 *
 * If you need to override the default physics behavior, you can write a custom force integration function. See [member custom_integrator].
 *
 * With Bullet physics (the default), the center of mass is the RigidBody3D center. With GodotPhysics, the center of mass is the average of the [CollisionShape] centers.
 *
*/
declare class RigidBody extends PhysicsBody {

  
/**
 * This is the node that implements full 3D physics. This means that you do not control a RigidBody directly. Instead, you can apply forces to it (gravity, impulses, etc.), and the physics simulation will calculate the resulting movement, collision, bouncing, rotating, etc.
 *
 * A RigidBody has 4 behavior [member mode]s: Rigid, Static, Character, and Kinematic.
 *
 * **Note:** Don't change a RigidBody's position every frame or very often. Sporadic changes work fine, but physics runs at a different granularity (fixed Hz) than usual rendering (process callback) and maybe even in a separate thread, so changing this from a process loop may result in strange behavior. If you need to directly affect the body's state, use [method _integrate_forces], which allows you to directly access the physics state.
 *
 * If you need to override the default physics behavior, you can write a custom force integration function. See [member custom_integrator].
 *
 * With Bullet physics (the default), the center of mass is the RigidBody3D center. With GodotPhysics, the center of mass is the average of the [CollisionShape] centers.
 *
*/
  "new"(): RigidBody;
  static "new"(): RigidBody;



/**
 * Damps RigidBody's rotational forces.
 *
 * See [member ProjectSettings.physics/3d/default_angular_damp] for more details about damping.
 *
*/
angular_damp: float;

/** RigidBody's rotational velocity. */
angular_velocity: Vector3;

/** Lock the body's rotation in the X axis. */
axis_lock_angular_x: boolean;

/** Lock the body's rotation in the Y axis. */
axis_lock_angular_y: boolean;

/** Lock the body's rotation in the Z axis. */
axis_lock_angular_z: boolean;

/** Lock the body's movement in the X axis. */
axis_lock_linear_x: boolean;

/** Lock the body's movement in the Y axis. */
axis_lock_linear_y: boolean;

/** Lock the body's movement in the Z axis. */
axis_lock_linear_z: boolean;

/**
 * The body's bounciness. Values range from `0` (no bounce) to `1` (full bounciness).
 *
 * Deprecated, use [member PhysicsMaterial.bounce] instead via [member physics_material_override].
 *
*/
bounce: float;

/**
 * If `true`, the body can enter sleep mode when there is no movement. See [member sleeping].
 *
 * **Note:** A RigidBody3D will never enter sleep mode automatically if its [member mode] is [constant MODE_CHARACTER]. It can still be put to sleep manually by setting its [member sleeping] property to `true`.
 *
*/
can_sleep: boolean;

/** If [code]true[/code], the RigidBody will emit signals when it collides with another RigidBody. See also [member contacts_reported]. */
contact_monitor: boolean;

/**
 * The maximum number of contacts that will be recorded. Requires [member contact_monitor] to be set to `true`.
 *
 * **Note:** The number of contacts is different from the number of collisions. Collisions between parallel edges will result in two contacts (one at each end), and collisions between parallel faces will result in four contacts (one at each corner).
 *
*/
contacts_reported: int;

/**
 * If `true`, continuous collision detection is used.
 *
 * Continuous collision detection tries to predict where a moving body will collide, instead of moving it and correcting its movement if it collided. Continuous collision detection is more precise, and misses fewer impacts by small, fast-moving objects. Not using continuous collision detection is faster to compute, but can miss small, fast-moving objects.
 *
*/
continuous_cd: boolean;

/** If [code]true[/code], internal force integration will be disabled (like gravity or air friction) for this body. Other than collision response, the body will only move as determined by the [method _integrate_forces] function, if defined. */
custom_integrator: boolean;

/**
 * The body's friction, from 0 (frictionless) to 1 (max friction).
 *
 * Deprecated, use [member PhysicsMaterial.friction] instead via [member physics_material_override].
 *
*/
friction: float;

/** This is multiplied by the global 3D gravity setting found in [b]Project > Project Settings > Physics > 3d[/b] to produce RigidBody's gravity. For example, a value of 1 will be normal gravity, 2 will apply double gravity, and 0.5 will apply half gravity to this object. */
gravity_scale: float;

/**
 * The body's linear damp. Cannot be less than -1.0. If this value is different from -1.0, any linear damp derived from the world or areas will be overridden.
 *
 * See [member ProjectSettings.physics/3d/default_linear_damp] for more details about damping.
 *
*/
linear_damp: float;

/** The body's linear velocity. Can be used sporadically, but [b]don't set this every frame[/b], because physics may run in another thread and runs at a different granularity. Use [method _integrate_forces] as your process loop for precise control of the body state. */
linear_velocity: Vector3;

/** The body's mass. */
mass: float;

/** The body mode. See [enum Mode] for possible values. */
mode: int;

/**
 * The physics material override for the body.
 *
 * If a material is assigned to this property, it will be used instead of any other physics material, such as an inherited one.
 *
*/
physics_material_override: PhysicsMaterial;

/** If [code]true[/code], the body will not move and will not calculate forces until woken up by another body through, for example, a collision, or by using the [method apply_impulse] or [method add_force] methods. */
sleeping: boolean;

/** The body's weight based on its mass and the global 3D gravity. Global values are set in [b]Project > Project Settings > Physics > 3d[/b]. */
weight: float;

/** Called during physics processing, allowing you to read and safely modify the simulation state for the object. By default, it works in addition to the usual physics behavior, but the [member custom_integrator] property allows you to disable the default behavior and do fully custom force integration for a body. */
protected _integrate_forces(state: PhysicsDirectBodyState): void;

/**
 * Adds a constant directional force (i.e. acceleration) without affecting rotation.
 *
 * This is equivalent to `add_force(force, Vector3(0,0,0))`.
 *
*/
add_central_force(force: Vector3): void;

/**
 * Adds a constant directional force (i.e. acceleration).
 *
 * The position uses the rotation of the global coordinate system, but is centered at the object's origin.
 *
*/
add_force(force: Vector3, position: Vector3): void;

/** Adds a constant rotational force (i.e. a motor) without affecting position. */
add_torque(torque: Vector3): void;

/**
 * Applies a directional impulse without affecting rotation.
 *
 * This is equivalent to `apply_impulse(Vector3(0,0,0), impulse)`.
 *
*/
apply_central_impulse(impulse: Vector3): void;

/** Applies a positioned impulse to the body. An impulse is time independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason it should only be used when simulating one-time impacts. The position uses the rotation of the global coordinate system, but is centered at the object's origin. */
apply_impulse(position: Vector3, impulse: Vector3): void;

/** Applies a torque impulse which will be affected by the body mass and shape. This will rotate the body around the [code]impulse[/code] vector passed. */
apply_torque_impulse(impulse: Vector3): void;

/** Returns [code]true[/code] if the specified linear or rotational axis is locked. */
get_axis_lock(axis: int): boolean;

/**
 * Returns a list of the bodies colliding with this one. Requires [member contact_monitor] to be set to `true` and [member contacts_reported] to be set high enough to detect all the collisions.
 *
 * **Note:** The result of this test is not immediate after moving objects. For performance, list of collisions is updated once per frame and before the physics step. Consider using signals instead.
 *
*/
get_colliding_bodies(): any[];

/** Returns the inverse inertia tensor basis. This is used to calculate the angular acceleration resulting from a torque applied to the RigidBody. */
get_inverse_inertia_tensor(): Basis;

/** Locks the specified linear or rotational axis. */
set_axis_lock(axis: int, lock: boolean): void;

/** Sets an axis velocity. The velocity in the given vector axis will be set as the given vector length. This is useful for jumping behavior. */
set_axis_velocity(axis_velocity: Vector3): void;

  // connect<T extends SignalsOf<RigidBody>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<RigidBodySignals>>(signal: T, method: SignalFunction<RigidBodySignals[T]>): number;



/**
 * Rigid body mode. This is the "natural" state of a rigid body. It is affected by forces, and can move, rotate, and be affected by user code.
 *
*/
static MODE_RIGID: any;

/**
 * Static mode. The body behaves like a [StaticBody], and can only move by user code.
 *
*/
static MODE_STATIC: any;

/**
 * Character body mode. This behaves like a rigid body, but can not rotate.
 *
*/
static MODE_CHARACTER: any;

/**
 * Kinematic body mode. The body behaves like a [KinematicBody], and can only move by user code.
 *
*/
static MODE_KINEMATIC: any;

}

declare class RigidBodySignals extends PhysicsBodySignals {
  /**
 * Emitted when a collision with another [PhysicsBody] or [GridMap] occurs. Requires [member contact_monitor] to be set to `true` and [member contacts_reported] to be set high enough to detect all the collisions. [GridMap]s are detected if the [MeshLibrary] has Collision [Shape]s.
 *
 * `body` the [Node], if it exists in the tree, of the other [PhysicsBody] or [GridMap].
 *
*/
body_entered: Signal<(body: Node) => void>

/**
 * Emitted when the collision with another [PhysicsBody] or [GridMap] ends. Requires [member contact_monitor] to be set to `true` and [member contacts_reported] to be set high enough to detect all the collisions. [GridMap]s are detected if the [MeshLibrary] has Collision [Shape]s.
 *
 * `body` the [Node], if it exists in the tree, of the other [PhysicsBody] or [GridMap].
 *
*/
body_exited: Signal<(body: Node) => void>

/**
 * Emitted when one of this RigidBody's [Shape]s collides with another [PhysicsBody] or [GridMap]'s [Shape]s. Requires [member contact_monitor] to be set to `true` and [member contacts_reported] to be set high enough to detect all the collisions. [GridMap]s are detected if the [MeshLibrary] has Collision [Shape]s.
 *
 * `body_id` the [RID] of the other [PhysicsBody] or [MeshLibrary]'s [CollisionObject] used by the [PhysicsServer].
 *
 * `body` the [Node], if it exists in the tree, of the other [PhysicsBody] or [GridMap].
 *
 * `body_shape` the index of the [Shape] of the other [PhysicsBody] or [GridMap] used by the [PhysicsServer].
 *
 * `local_shape` the index of the [Shape] of this RigidBody used by the [PhysicsServer].
 *
 * **Note:** Bullet physics cannot identify the shape index when using a [ConcavePolygonShape]. Don't use multiple [CollisionShape]s when using a [ConcavePolygonShape] with Bullet physics if you need shape indices.
 *
*/
body_shape_entered: Signal<(body_rid: RID, body: Node, body_shape: int, local_shape: int) => void>

/**
 * Emitted when the collision between one of this RigidBody's [Shape]s and another [PhysicsBody] or [GridMap]'s [Shape]s ends. Requires [member contact_monitor] to be set to `true` and [member contacts_reported] to be set high enough to detect all the collisions. [GridMap]s are detected if the [MeshLibrary] has Collision [Shape]s.
 *
 * `body_id` the [RID] of the other [PhysicsBody] or [MeshLibrary]'s [CollisionObject] used by the [PhysicsServer]. [GridMap]s are detected if the Meshes have [Shape]s.
 *
 * `body` the [Node], if it exists in the tree, of the other [PhysicsBody] or [GridMap].
 *
 * `body_shape` the index of the [Shape] of the other [PhysicsBody] or [GridMap] used by the [PhysicsServer].
 *
 * `local_shape` the index of the [Shape] of this RigidBody used by the [PhysicsServer].
 *
 * **Note:** Bullet physics cannot identify the shape index when using a [ConcavePolygonShape]. Don't use multiple [CollisionShape]s when using a [ConcavePolygonShape] with Bullet physics if you need shape indices.
 *
*/
body_shape_exited: Signal<(body_rid: RID, body: Node, body_shape: int, local_shape: int) => void>

/**
 * Emitted when the physics engine changes the body's sleeping state.
 *
 * **Note:** Changing the value [member sleeping] will not trigger this signal. It is only emitted if the sleeping state is changed by the physics engine or `emit_signal("sleeping_state_changed")` is used.
 *
*/
sleeping_state_changed: Signal<() => void>

}
