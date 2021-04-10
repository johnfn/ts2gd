
/**
 * This node implements simulated 2D physics. You do not control a RigidBody2D directly. Instead you apply forces to it (gravity, impulses, etc.) and the physics simulation calculates the resulting movement based on its mass, friction, and other physical properties.
 *
 * A RigidBody2D has 4 behavior [member mode]s: Rigid, Static, Character, and Kinematic.
 *
 * **Note:** You should not change a RigidBody2D's `position` or `linear_velocity` every frame or even very often. If you need to directly affect the body's state, use [method _integrate_forces], which allows you to directly access the physics state.
 *
 * Please also keep in mind that physics bodies manage their own transform which overwrites the ones you set. So any direct or indirect transformation (including scaling of the node or its parent) will be visible in the editor only, and immediately reset at runtime.
 *
 * If you need to override the default physics behavior or add a transformation at runtime, you can write a custom force integration. See [member custom_integrator].
 *
 * The center of mass is always located at the node's origin without taking into account the [CollisionShape2D] centroid offsets.
 *
*/
declare class RigidBody2D extends PhysicsBody2D {

  
/**
 * This node implements simulated 2D physics. You do not control a RigidBody2D directly. Instead you apply forces to it (gravity, impulses, etc.) and the physics simulation calculates the resulting movement based on its mass, friction, and other physical properties.
 *
 * A RigidBody2D has 4 behavior [member mode]s: Rigid, Static, Character, and Kinematic.
 *
 * **Note:** You should not change a RigidBody2D's `position` or `linear_velocity` every frame or even very often. If you need to directly affect the body's state, use [method _integrate_forces], which allows you to directly access the physics state.
 *
 * Please also keep in mind that physics bodies manage their own transform which overwrites the ones you set. So any direct or indirect transformation (including scaling of the node or its parent) will be visible in the editor only, and immediately reset at runtime.
 *
 * If you need to override the default physics behavior or add a transformation at runtime, you can write a custom force integration. See [member custom_integrator].
 *
 * The center of mass is always located at the node's origin without taking into account the [CollisionShape2D] centroid offsets.
 *
*/
  "new"(): RigidBody2D;
  static "new"(): RigidBody2D;



/** Damps the body's [member angular_velocity]. If [code]-1[/code], the body will use the [b]Default Angular Damp[/b] defined in [b]Project > Project Settings > Physics > 2d[/b]. */
angular_damp: float;

/** The body's rotational velocity. */
angular_velocity: float;

/** The body's total applied force. */
applied_force: Vector2;

/** The body's total applied torque. */
applied_torque: float;

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
 * **Note:** A RigidBody2D will never enter sleep mode automatically if its [member mode] is [constant MODE_CHARACTER]. It can still be put to sleep manually by setting its [member sleeping] property to `true`.
 *
*/
can_sleep: boolean;

/** If [code]true[/code], the body will emit signals when it collides with another RigidBody2D. See also [member contacts_reported]. */
contact_monitor: boolean;

/**
 * The maximum number of contacts that will be recorded. Requires [member contact_monitor] to be set to `true`.
 *
 * **Note:** The number of contacts is different from the number of collisions. Collisions between parallel edges will result in two contacts (one at each end), and collisions between parallel faces will result in four contacts (one at each corner).
 *
*/
contacts_reported: int;

/**
 * Continuous collision detection mode.
 *
 * Continuous collision detection tries to predict where a moving body will collide instead of moving it and correcting its movement after collision. Continuous collision detection is slower, but more precise and misses fewer collisions with small, fast-moving objects. Raycasting and shapecasting methods are available. See [enum CCDMode] for details.
 *
*/
continuous_cd: int;

/** If [code]true[/code], internal force integration is disabled for this body. Aside from collision response, the body will only move as determined by the [method _integrate_forces] function. */
custom_integrator: boolean;

/**
 * The body's friction. Values range from `0` (frictionless) to `1` (maximum friction).
 *
 * Deprecated, use [member PhysicsMaterial.friction] instead via [member physics_material_override].
 *
*/
friction: float;

/** Multiplies the gravity applied to the body. The body's gravity is calculated from the [b]Default Gravity[/b] value in [b]Project > Project Settings > Physics > 2d[/b] and/or any additional gravity vector applied by [Area2D]s. */
gravity_scale: float;

/** The body's moment of inertia. This is like mass, but for rotation: it determines how much torque it takes to rotate the body. The moment of inertia is usually computed automatically from the mass and the shapes, but this function allows you to set a custom value. Set 0 inertia to return to automatically computing it. */
inertia: float;

/** Damps the body's [member linear_velocity]. If [code]-1[/code], the body will use the [b]Default Linear Damp[/b] in [b]Project > Project Settings > Physics > 2d[/b]. */
linear_damp: float;

/** The body's linear velocity. */
linear_velocity: Vector2;

/** The body's mass. */
mass: float;

/** The body's mode. See [enum Mode] for possible values. */
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

/** The body's weight based on its mass and the [b]Default Gravity[/b] value in [b]Project > Project Settings > Physics > 2d[/b]. */
weight: float;

/** Allows you to read and safely modify the simulation state for the object. Use this instead of [method Node._physics_process] if you need to directly change the body's [code]position[/code] or other physics properties. By default, it works in addition to the usual physics behavior, but [member custom_integrator] allows you to disable the default behavior and write custom force integration for a body. */
protected _integrate_forces(state: Physics2DDirectBodyState): void;

/** Adds a constant directional force without affecting rotation. */
add_central_force(force: Vector2): void;

/** Adds a positioned force to the body. Both the force and the offset from the body origin are in global coordinates. */
add_force(offset: Vector2, force: Vector2): void;

/** Adds a constant rotational force. */
add_torque(torque: float): void;

/** Applies a directional impulse without affecting rotation. */
apply_central_impulse(impulse: Vector2): void;

/** Applies a positioned impulse to the body. An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason it should only be used when simulating one-time impacts (use the "_force" functions otherwise). The position uses the rotation of the global coordinate system, but is centered at the object's origin. */
apply_impulse(offset: Vector2, impulse: Vector2): void;

/** Applies a rotational impulse to the body. */
apply_torque_impulse(torque: float): void;

/**
 * Returns a list of the bodies colliding with this one. Requires [member contact_monitor] to be set to `true` and [member contacts_reported] to be set high enough to detect all the collisions.
 *
 * **Note:** The result of this test is not immediate after moving objects. For performance, list of collisions is updated once per frame and before the physics step. Consider using signals instead.
 *
*/
get_colliding_bodies(): any[];

/** Sets the body's velocity on the given axis. The velocity in the given vector axis will be set as the given vector length. This is useful for jumping behavior. */
set_axis_velocity(axis_velocity: Vector2): void;

/** Returns [code]true[/code] if a collision would result from moving in the given vector. [code]margin[/code] increases the size of the shapes involved in the collision detection, and [code]result[/code] is an object of type [Physics2DTestMotionResult], which contains additional information about the collision (should there be one). */
test_motion(motion: Vector2, infinite_inertia?: boolean, margin?: float, result?: Physics2DTestMotionResult): boolean;

  connect<T extends SignalsOf<RigidBody2D>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Rigid mode. The body behaves as a physical object. It collides with other bodies and responds to forces applied to it. This is the default mode.
 *
*/
static MODE_RIGID: 0;

/**
 * Static mode. The body behaves like a [StaticBody2D] and does not move.
 *
*/
static MODE_STATIC: 1;

/**
 * Character mode. Similar to [constant MODE_RIGID], but the body can not rotate.
 *
*/
static MODE_CHARACTER: 2;

/**
 * Kinematic mode. The body behaves like a [KinematicBody2D], and must be moved by code.
 *
*/
static MODE_KINEMATIC: 3;

/**
 * Continuous collision detection disabled. This is the fastest way to detect body collisions, but can miss small, fast-moving objects.
 *
*/
static CCD_MODE_DISABLED: 0;

/**
 * Continuous collision detection enabled using raycasting. This is faster than shapecasting but less precise.
 *
*/
static CCD_MODE_CAST_RAY: 1;

/**
 * Continuous collision detection enabled using shapecasting. This is the slowest CCD method and the most precise.
 *
*/
static CCD_MODE_CAST_SHAPE: 2;


  /**
 * Emitted when a body enters into contact with this one. Requires [member contact_monitor] to be set to `true` and [member contacts_reported] to be set high enough to detect all the collisions.
 *
*/
body_entered: Signal<(body: Node) => void>

/**
 * Emitted when a body exits contact with this one. Requires [member contact_monitor] to be set to `true` and [member contacts_reported] to be set high enough to detect all the collisions.
 *
*/
body_exited: Signal<(body: Node) => void>

/**
 * Emitted when a body enters into contact with this one. Reports colliding shape information. See [CollisionObject2D] for shape index information. Requires [member contact_monitor] to be set to `true` and [member contacts_reported] to be set high enough to detect all the collisions.
 *
*/
body_shape_entered: Signal<(body_id: int, body: Node, body_shape: int, local_shape: int) => void>

/**
 * Emitted when a body shape exits contact with this one. Reports colliding shape information. See [CollisionObject2D] for shape index information. Requires [member contact_monitor] to be set to `true` and [member contacts_reported] to be set high enough to detect all the collisions.
 *
*/
body_shape_exited: Signal<(body_id: int, body: Node, body_shape: int, local_shape: int) => void>

/**
 * Emitted when the physics engine changes the body's sleeping state.
 *
 * **Note:** Changing the value [member sleeping] will not trigger this signal. It is only emitted if the sleeping state is changed by the physics engine or `emit_signal("sleeping_state_changed")` is used.
 *
*/
sleeping_state_changed: Signal<() => void>

}
