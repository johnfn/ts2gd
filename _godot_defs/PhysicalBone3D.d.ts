
/**
*/
declare class PhysicalBone3D extends PhysicsBody3D {

  
/**
*/
  "new"(): this;
  static "new"(): this;



/** Damps the body's rotation if greater than [code]0[/code]. */
angular_damp: float;

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

/** Sets the body's transform. */
body_offset: Transform;

/** The body's bounciness. Values range from [code]0[/code] (no bounce) to [code]1[/code] (full bounciness). */
bounce: float;

/** If [code]true[/code], the body is deactivated when there is no movement, so it will not take part in the simulation until it is awaken by an external force. */
can_sleep: boolean;

/** The body's friction, from [code]0[/code] (frictionless) to [code]1[/code] (max friction). */
friction: float;

/** This is multiplied by the global 3D gravity setting found in [b]Project > Project Settings > Physics > 3d[/b] to produce the body's gravity. For example, a value of 1 will be normal gravity, 2 will apply double gravity, and 0.5 will apply half gravity to this object. */
gravity_scale: float;

/** Sets the joint's transform. */
joint_offset: Transform;

/** Sets the joint's rotation in radians. */
joint_rotation: Vector3;

/** Sets the joint's rotation in degrees. */
joint_rotation_degrees: Vector3;

/** Sets the joint type. See [enum JointType] for possible values. */
joint_type: int;

/** Damps the body's movement if greater than [code]0[/code]. */
linear_damp: float;

/** The body's mass. */
mass: float;

/** The body's weight based on its mass and the global 3D gravity. Global values are set in [b]Project > Project Settings > Physics > 3d[/b]. */
weight: float;

/** No documentation provided. */
apply_central_impulse(impulse: Vector3): void;

/** No documentation provided. */
apply_impulse(impulse: Vector3, position?: Vector3): void;

/** No documentation provided. */
get_axis_lock(axis: int): boolean;

/** No documentation provided. */
get_bone_id(): int;

/** No documentation provided. */
get_simulate_physics(): boolean;

/** No documentation provided. */
is_simulating_physics(): boolean;

/** No documentation provided. */
set_axis_lock(axis: int, lock: boolean): void;

  connect<T extends SignalsOf<PhysicalBone3D>, U extends Node>(signal: T, node: U, method: keyof U): number;



/** No documentation provided. */
static JOINT_TYPE_NONE: 0;

/** No documentation provided. */
static JOINT_TYPE_PIN: 1;

/** No documentation provided. */
static JOINT_TYPE_CONE: 2;

/** No documentation provided. */
static JOINT_TYPE_HINGE: 3;

/** No documentation provided. */
static JOINT_TYPE_SLIDER: 4;

/** No documentation provided. */
static JOINT_TYPE_6DOF: 5;


  
}


 
