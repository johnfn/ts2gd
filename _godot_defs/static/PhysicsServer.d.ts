
/**
 * PhysicsServer is the server responsible for all 3D physics. It can create many kinds of physics objects, but does not insert them on the node tree.
 *
*/
declare class PhysicsServerClass extends Object  {

  
/**
 * PhysicsServer is the server responsible for all 3D physics. It can create many kinds of physics objects, but does not insert them on the node tree.
 *
*/
  new(): PhysicsServerClass; 
  static "new"(): PhysicsServerClass 



/** Adds a shape to the area, along with a transform matrix. Shapes are usually referenced by their index, so you should track which shape has a given index. */
area_add_shape(area: RID, shape: RID, transform?: Transform, disabled?: boolean): void;

/** Assigns the area to a descendant of [Object], so it can exist in the node tree. */
area_attach_object_instance_id(area: RID, id: int): void;

/** Removes all shapes from an area. It does not delete the shapes, so they can be reassigned later. */
area_clear_shapes(area: RID): void;

/** Creates an [Area]. */
area_create(): RID;

/** Gets the instance ID of the object the area is assigned to. */
area_get_object_instance_id(area: RID): int;

/** Returns an area parameter value. A list of available parameters is on the [enum AreaParameter] constants. */
area_get_param(area: RID, param: int): any;

/** Returns the [RID] of the nth shape of an area. */
area_get_shape(area: RID, shape_idx: int): RID;

/** Returns the number of shapes assigned to an area. */
area_get_shape_count(area: RID): int;

/** Returns the transform matrix of a shape within an area. */
area_get_shape_transform(area: RID, shape_idx: int): Transform;

/** Returns the space assigned to the area. */
area_get_space(area: RID): RID;

/** Returns the space override mode for the area. */
area_get_space_override_mode(area: RID): int;

/** Returns the transform matrix for an area. */
area_get_transform(area: RID): Transform;

/** If [code]true[/code], area collides with rays. */
area_is_ray_pickable(area: RID): boolean;

/** Removes a shape from an area. It does not delete the shape, so it can be reassigned later. */
area_remove_shape(area: RID, shape_idx: int): void;

/** No documentation provided. */
area_set_area_monitor_callback(area: RID, receiver: Object, method: string): void;

/** Assigns the area to one or many physics layers. */
area_set_collision_layer(area: RID, layer: int): void;

/** Sets which physics layers the area will monitor. */
area_set_collision_mask(area: RID, mask: int): void;

/**
 * Sets the function to call when any body/area enters or exits the area. This callback will be called for any object interacting with the area, and takes five parameters:
 *
 * 1: [constant AREA_BODY_ADDED] or [constant AREA_BODY_REMOVED], depending on whether the object entered or exited the area.
 *
 * 2: [RID] of the object that entered/exited the area.
 *
 * 3: Instance ID of the object that entered/exited the area.
 *
 * 4: The shape index of the object that entered/exited the area.
 *
 * 5: The shape index of the area where the object entered/exited.
 *
*/
area_set_monitor_callback(area: RID, receiver: Object, method: string): void;

/** No documentation provided. */
area_set_monitorable(area: RID, monitorable: boolean): void;

/** Sets the value for an area parameter. A list of available parameters is on the [enum AreaParameter] constants. */
area_set_param(area: RID, param: int, value: any): void;

/** Sets object pickable with rays. */
area_set_ray_pickable(area: RID, enable: boolean): void;

/** Substitutes a given area shape by another. The old shape is selected by its index, the new one by its [RID]. */
area_set_shape(area: RID, shape_idx: int, shape: RID): void;

/** No documentation provided. */
area_set_shape_disabled(area: RID, shape_idx: int, disabled: boolean): void;

/** Sets the transform matrix for an area shape. */
area_set_shape_transform(area: RID, shape_idx: int, transform: Transform): void;

/** Assigns a space to the area. */
area_set_space(area: RID, space: RID): void;

/** Sets the space override mode for the area. The modes are described in the [enum AreaSpaceOverrideMode] constants. */
area_set_space_override_mode(area: RID, mode: int): void;

/** Sets the transform matrix for an area. */
area_set_transform(area: RID, transform: Transform): void;

/** No documentation provided. */
body_add_central_force(body: RID, force: Vector3): void;

/** Adds a body to the list of bodies exempt from collisions. */
body_add_collision_exception(body: RID, excepted_body: RID): void;

/** No documentation provided. */
body_add_force(body: RID, force: Vector3, position: Vector3): void;

/** Adds a shape to the body, along with a transform matrix. Shapes are usually referenced by their index, so you should track which shape has a given index. */
body_add_shape(body: RID, shape: RID, transform?: Transform, disabled?: boolean): void;

/** No documentation provided. */
body_add_torque(body: RID, torque: Vector3): void;

/** No documentation provided. */
body_apply_central_impulse(body: RID, impulse: Vector3): void;

/** Gives the body a push at a [code]position[/code] in the direction of the [code]impulse[/code]. */
body_apply_impulse(body: RID, position: Vector3, impulse: Vector3): void;

/** Gives the body a push to rotate it. */
body_apply_torque_impulse(body: RID, impulse: Vector3): void;

/** Assigns the area to a descendant of [Object], so it can exist in the node tree. */
body_attach_object_instance_id(body: RID, id: int): void;

/** Removes all shapes from a body. */
body_clear_shapes(body: RID): void;

/** Creates a physics body. The first parameter can be any value from [enum BodyMode] constants, for the type of body created. Additionally, the body can be created in sleeping state to save processing time. */
body_create(mode?: int, init_sleeping?: boolean): RID;

/** Returns the physics layer or layers a body belongs to. */
body_get_collision_layer(body: RID): int;

/**
 * Returns the physics layer or layers a body can collide with.
 *
 * -
 *
*/
body_get_collision_mask(body: RID): int;

/** Returns the [PhysicsDirectBodyState] of the body. */
body_get_direct_state(body: RID): PhysicsDirectBodyState;

/** No documentation provided. */
body_get_kinematic_safe_margin(body: RID): float;

/** Returns the maximum contacts that can be reported. See [method body_set_max_contacts_reported]. */
body_get_max_contacts_reported(body: RID): int;

/** Returns the body mode. */
body_get_mode(body: RID): int;

/** Gets the instance ID of the object the area is assigned to. */
body_get_object_instance_id(body: RID): int;

/** Returns the value of a body parameter. A list of available parameters is on the [enum BodyParameter] constants. */
body_get_param(body: RID, param: int): float;

/** Returns the [RID] of the nth shape of a body. */
body_get_shape(body: RID, shape_idx: int): RID;

/** Returns the number of shapes assigned to a body. */
body_get_shape_count(body: RID): int;

/** Returns the transform matrix of a body shape. */
body_get_shape_transform(body: RID, shape_idx: int): Transform;

/** Returns the [RID] of the space assigned to a body. */
body_get_space(body: RID): RID;

/** Returns a body state. */
body_get_state(body: RID, state: int): any;

/** No documentation provided. */
body_is_axis_locked(body: RID, axis: int): boolean;

/** If [code]true[/code], the continuous collision detection mode is enabled. */
body_is_continuous_collision_detection_enabled(body: RID): boolean;

/** Returns whether a body uses a callback function to calculate its own physics (see [method body_set_force_integration_callback]). */
body_is_omitting_force_integration(body: RID): boolean;

/** If [code]true[/code], the body can be detected by rays. */
body_is_ray_pickable(body: RID): boolean;

/**
 * Removes a body from the list of bodies exempt from collisions.
 *
 * Continuous collision detection tries to predict where a moving body will collide, instead of moving it and correcting its movement if it collided.
 *
*/
body_remove_collision_exception(body: RID, excepted_body: RID): void;

/** Removes a shape from a body. The shape is not deleted, so it can be reused afterwards. */
body_remove_shape(body: RID, shape_idx: int): void;

/** No documentation provided. */
body_set_axis_lock(body: RID, axis: int, lock: boolean): void;

/** Sets an axis velocity. The velocity in the given vector axis will be set as the given vector length. This is useful for jumping behavior. */
body_set_axis_velocity(body: RID, axis_velocity: Vector3): void;

/** Sets the physics layer or layers a body belongs to. */
body_set_collision_layer(body: RID, layer: int): void;

/** Sets the physics layer or layers a body can collide with. */
body_set_collision_mask(body: RID, mask: int): void;

/**
 * If `true`, the continuous collision detection mode is enabled.
 *
 * Continuous collision detection tries to predict where a moving body will collide, instead of moving it and correcting its movement if it collided.
 *
*/
body_set_enable_continuous_collision_detection(body: RID, enable: boolean): void;

/** Sets the function used to calculate physics for an object, if that object allows it (see [method body_set_omit_force_integration]). */
body_set_force_integration_callback(body: RID, receiver: Object, method: string, userdata?: any): void;

/** No documentation provided. */
body_set_kinematic_safe_margin(body: RID, margin: float): void;

/** Sets the maximum contacts to report. Bodies can keep a log of the contacts with other bodies, this is enabled by setting the maximum amount of contacts reported to a number greater than 0. */
body_set_max_contacts_reported(body: RID, amount: int): void;

/** Sets the body mode, from one of the [enum BodyMode] constants. */
body_set_mode(body: RID, mode: int): void;

/** Sets whether a body uses a callback function to calculate its own physics (see [method body_set_force_integration_callback]). */
body_set_omit_force_integration(body: RID, enable: boolean): void;

/** Sets a body parameter. A list of available parameters is on the [enum BodyParameter] constants. */
body_set_param(body: RID, param: int, value: float): void;

/** Sets the body pickable with rays if [code]enabled[/code] is set. */
body_set_ray_pickable(body: RID, enable: boolean): void;

/** Substitutes a given body shape by another. The old shape is selected by its index, the new one by its [RID]. */
body_set_shape(body: RID, shape_idx: int, shape: RID): void;

/** No documentation provided. */
body_set_shape_disabled(body: RID, shape_idx: int, disabled: boolean): void;

/** Sets the transform matrix for a body shape. */
body_set_shape_transform(body: RID, shape_idx: int, transform: Transform): void;

/** Assigns a space to the body (see [method space_create]). */
body_set_space(body: RID, space: RID): void;

/** Sets a body state (see [enum BodyState] constants). */
body_set_state(body: RID, state: int, value: any): void;

/** Returns [code]true[/code] if a collision would result from moving in the given direction from a given point in space. [PhysicsTestMotionResult] can be passed to return additional information in. */
body_test_motion(body: RID, from: Transform, motion: Vector3, infinite_inertia: boolean, result?: PhysicsTestMotionResult, exclude_raycast_shapes?: boolean, exclude?: any[]): boolean;

/** Gets a cone_twist_joint parameter (see [enum ConeTwistJointParam] constants). */
cone_twist_joint_get_param(joint: RID, param: int): float;

/** Sets a cone_twist_joint parameter (see [enum ConeTwistJointParam] constants). */
cone_twist_joint_set_param(joint: RID, param: int, value: float): void;

/** Destroys any of the objects created by PhysicsServer. If the [RID] passed is not one of the objects that can be created by PhysicsServer, an error will be sent to the console. */
free_rid(rid: RID): void;

/** Gets a generic_6_DOF_joint flag (see [enum G6DOFJointAxisFlag] constants). */
generic_6dof_joint_get_flag(joint: RID, axis: int, flag: int): boolean;

/** Gets a generic_6_DOF_joint parameter (see [enum G6DOFJointAxisParam] constants). */
generic_6dof_joint_get_param(joint: RID, axis: int, param: int): float;

/** Sets a generic_6_DOF_joint flag (see [enum G6DOFJointAxisFlag] constants). */
generic_6dof_joint_set_flag(joint: RID, axis: int, flag: int, enable: boolean): void;

/** Sets a generic_6_DOF_joint parameter (see [enum G6DOFJointAxisParam] constants). */
generic_6dof_joint_set_param(joint: RID, axis: int, param: int, value: float): void;

/** Returns an Info defined by the [enum ProcessInfo] input given. */
get_process_info(process_info: int): int;

/** Gets a hinge_joint flag (see [enum HingeJointFlag] constants). */
hinge_joint_get_flag(joint: RID, flag: int): boolean;

/** Gets a hinge_joint parameter (see [enum HingeJointParam]). */
hinge_joint_get_param(joint: RID, param: int): float;

/** Sets a hinge_joint flag (see [enum HingeJointFlag] constants). */
hinge_joint_set_flag(joint: RID, flag: int, enabled: boolean): void;

/** Sets a hinge_joint parameter (see [enum HingeJointParam] constants). */
hinge_joint_set_param(joint: RID, param: int, value: float): void;

/** Creates a [ConeTwistJoint]. */
joint_create_cone_twist(body_A: RID, local_ref_A: Transform, body_B: RID, local_ref_B: Transform): RID;

/** Creates a [Generic6DOFJoint]. */
joint_create_generic_6dof(body_A: RID, local_ref_A: Transform, body_B: RID, local_ref_B: Transform): RID;

/** Creates a [HingeJoint]. */
joint_create_hinge(body_A: RID, hinge_A: Transform, body_B: RID, hinge_B: Transform): RID;

/** Creates a [PinJoint]. */
joint_create_pin(body_A: RID, local_A: Vector3, body_B: RID, local_B: Vector3): RID;

/** Creates a [SliderJoint]. */
joint_create_slider(body_A: RID, local_ref_A: Transform, body_B: RID, local_ref_B: Transform): RID;

/** Gets the priority value of the Joint. */
joint_get_solver_priority(joint: RID): int;

/** Returns the type of the Joint. */
joint_get_type(joint: RID): int;

/** Sets the priority value of the Joint. */
joint_set_solver_priority(joint: RID, priority: int): void;

/** Returns position of the joint in the local space of body a of the joint. */
pin_joint_get_local_a(joint: RID): Vector3;

/** Returns position of the joint in the local space of body b of the joint. */
pin_joint_get_local_b(joint: RID): Vector3;

/** Gets a pin_joint parameter (see [enum PinJointParam] constants). */
pin_joint_get_param(joint: RID, param: int): float;

/** Sets position of the joint in the local space of body a of the joint. */
pin_joint_set_local_a(joint: RID, local_A: Vector3): void;

/** Sets position of the joint in the local space of body b of the joint. */
pin_joint_set_local_b(joint: RID, local_B: Vector3): void;

/** Sets a pin_joint parameter (see [enum PinJointParam] constants). */
pin_joint_set_param(joint: RID, param: int, value: float): void;

/** Activates or deactivates the 3D physics engine. */
set_active(active: boolean): void;

/**
 * Sets the amount of iterations for calculating velocities of colliding bodies. The greater the amount of iterations, the more accurate the collisions will be. However, a greater amount of iterations requires more CPU power, which can decrease performance. The default value is `8`.
 *
 * **Note:** Only has an effect when using the GodotPhysics engine, not the default Bullet physics engine.
 *
*/
set_collision_iterations(iterations: int): void;

/** Creates a shape of a type from [enum ShapeType]. Does not assign it to a body or an area. To do so, you must use [method area_set_shape] or [method body_set_shape]. */
shape_create(type: int): RID;

/** Returns the shape data. */
shape_get_data(shape: RID): any;

/** Returns the type of shape (see [enum ShapeType] constants). */
shape_get_type(shape: RID): int;

/** Sets the shape data that defines its shape and size. The data to be passed depends on the kind of shape created [method shape_get_type]. */
shape_set_data(shape: RID, data: any): void;

/** Gets a slider_joint parameter (see [enum SliderJointParam] constants). */
slider_joint_get_param(joint: RID, param: int): float;

/** Gets a slider_joint parameter (see [enum SliderJointParam] constants). */
slider_joint_set_param(joint: RID, param: int, value: float): void;

/** Creates a space. A space is a collection of parameters for the physics engine that can be assigned to an area or a body. It can be assigned to an area with [method area_set_space], or to a body with [method body_set_space]. */
space_create(): RID;

/** Returns the state of a space, a [PhysicsDirectSpaceState]. This object can be used to make collision/intersection queries. */
space_get_direct_state(space: RID): PhysicsDirectSpaceState;

/** Returns the value of a space parameter. */
space_get_param(space: RID, param: int): float;

/** Returns whether the space is active. */
space_is_active(space: RID): boolean;

/** Marks a space as active. It will not have an effect, unless it is assigned to an area or body. */
space_set_active(space: RID, active: boolean): void;

/** Sets the value for a space parameter. A list of available parameters is on the [enum SpaceParameter] constants. */
space_set_param(space: RID, param: int, value: float): void;

  connect<T extends SignalsOf<PhysicsServerClass>>(signal: T, method: SignalFunction<PhysicsServerClass[T]>): number;



/**
 * The [Joint] is a [PinJoint].
 *
*/
static JOINT_PIN: any;

/**
 * The [Joint] is a [HingeJoint].
 *
*/
static JOINT_HINGE: any;

/**
 * The [Joint] is a [SliderJoint].
 *
*/
static JOINT_SLIDER: any;

/**
 * The [Joint] is a [ConeTwistJoint].
 *
*/
static JOINT_CONE_TWIST: any;

/**
 * The [Joint] is a [Generic6DOFJoint].
 *
*/
static JOINT_6DOF: any;

/**
 * The strength with which the pinned objects try to stay in positional relation to each other.
 *
 * The higher, the stronger.
 *
*/
static PIN_JOINT_BIAS: any;

/**
 * The strength with which the pinned objects try to stay in velocity relation to each other.
 *
 * The higher, the stronger.
 *
*/
static PIN_JOINT_DAMPING: any;

/**
 * If above 0, this value is the maximum value for an impulse that this Joint puts on its ends.
 *
*/
static PIN_JOINT_IMPULSE_CLAMP: any;

/**
 * The speed with which the two bodies get pulled together when they move in different directions.
 *
*/
static HINGE_JOINT_BIAS: any;

/**
 * The maximum rotation across the Hinge.
 *
*/
static HINGE_JOINT_LIMIT_UPPER: any;

/**
 * The minimum rotation across the Hinge.
 *
*/
static HINGE_JOINT_LIMIT_LOWER: any;

/**
 * The speed with which the rotation across the axis perpendicular to the hinge gets corrected.
 *
*/
static HINGE_JOINT_LIMIT_BIAS: any;

/** No documentation provided. */
static HINGE_JOINT_LIMIT_SOFTNESS: any;

/**
 * The lower this value, the more the rotation gets slowed down.
 *
*/
static HINGE_JOINT_LIMIT_RELAXATION: any;

/**
 * Target speed for the motor.
 *
*/
static HINGE_JOINT_MOTOR_TARGET_VELOCITY: any;

/**
 * Maximum acceleration for the motor.
 *
*/
static HINGE_JOINT_MOTOR_MAX_IMPULSE: any;

/**
 * If `true`, the Hinge has a maximum and a minimum rotation.
 *
*/
static HINGE_JOINT_FLAG_USE_LIMIT: any;

/**
 * If `true`, a motor turns the Hinge.
 *
*/
static HINGE_JOINT_FLAG_ENABLE_MOTOR: any;

/**
 * The maximum difference between the pivot points on their X axis before damping happens.
 *
*/
static SLIDER_JOINT_LINEAR_LIMIT_UPPER: any;

/**
 * The minimum difference between the pivot points on their X axis before damping happens.
 *
*/
static SLIDER_JOINT_LINEAR_LIMIT_LOWER: any;

/**
 * A factor applied to the movement across the slider axis once the limits get surpassed. The lower, the slower the movement.
 *
*/
static SLIDER_JOINT_LINEAR_LIMIT_SOFTNESS: any;

/**
 * The amount of restitution once the limits are surpassed. The lower, the more velocityenergy gets lost.
 *
*/
static SLIDER_JOINT_LINEAR_LIMIT_RESTITUTION: any;

/**
 * The amount of damping once the slider limits are surpassed.
 *
*/
static SLIDER_JOINT_LINEAR_LIMIT_DAMPING: any;

/**
 * A factor applied to the movement across the slider axis as long as the slider is in the limits. The lower, the slower the movement.
 *
*/
static SLIDER_JOINT_LINEAR_MOTION_SOFTNESS: any;

/**
 * The amount of restitution inside the slider limits.
 *
*/
static SLIDER_JOINT_LINEAR_MOTION_RESTITUTION: any;

/**
 * The amount of damping inside the slider limits.
 *
*/
static SLIDER_JOINT_LINEAR_MOTION_DAMPING: any;

/**
 * A factor applied to the movement across axes orthogonal to the slider.
 *
*/
static SLIDER_JOINT_LINEAR_ORTHOGONAL_SOFTNESS: any;

/**
 * The amount of restitution when movement is across axes orthogonal to the slider.
 *
*/
static SLIDER_JOINT_LINEAR_ORTHOGONAL_RESTITUTION: any;

/**
 * The amount of damping when movement is across axes orthogonal to the slider.
 *
*/
static SLIDER_JOINT_LINEAR_ORTHOGONAL_DAMPING: any;

/**
 * The upper limit of rotation in the slider.
 *
*/
static SLIDER_JOINT_ANGULAR_LIMIT_UPPER: any;

/**
 * The lower limit of rotation in the slider.
 *
*/
static SLIDER_JOINT_ANGULAR_LIMIT_LOWER: any;

/**
 * A factor applied to the all rotation once the limit is surpassed.
 *
*/
static SLIDER_JOINT_ANGULAR_LIMIT_SOFTNESS: any;

/**
 * The amount of restitution of the rotation when the limit is surpassed.
 *
*/
static SLIDER_JOINT_ANGULAR_LIMIT_RESTITUTION: any;

/**
 * The amount of damping of the rotation when the limit is surpassed.
 *
*/
static SLIDER_JOINT_ANGULAR_LIMIT_DAMPING: any;

/**
 * A factor that gets applied to the all rotation in the limits.
 *
*/
static SLIDER_JOINT_ANGULAR_MOTION_SOFTNESS: any;

/**
 * The amount of restitution of the rotation in the limits.
 *
*/
static SLIDER_JOINT_ANGULAR_MOTION_RESTITUTION: any;

/**
 * The amount of damping of the rotation in the limits.
 *
*/
static SLIDER_JOINT_ANGULAR_MOTION_DAMPING: any;

/**
 * A factor that gets applied to the all rotation across axes orthogonal to the slider.
 *
*/
static SLIDER_JOINT_ANGULAR_ORTHOGONAL_SOFTNESS: any;

/**
 * The amount of restitution of the rotation across axes orthogonal to the slider.
 *
*/
static SLIDER_JOINT_ANGULAR_ORTHOGONAL_RESTITUTION: any;

/**
 * The amount of damping of the rotation across axes orthogonal to the slider.
 *
*/
static SLIDER_JOINT_ANGULAR_ORTHOGONAL_DAMPING: any;

/**
 * Represents the size of the [enum SliderJointParam] enum.
 *
*/
static SLIDER_JOINT_MAX: any;

/**
 * Swing is rotation from side to side, around the axis perpendicular to the twist axis.
 *
 * The swing span defines, how much rotation will not get corrected along the swing axis.
 *
 * Could be defined as looseness in the [ConeTwistJoint].
 *
 * If below 0.05, this behavior is locked.
 *
*/
static CONE_TWIST_JOINT_SWING_SPAN: any;

/**
 * Twist is the rotation around the twist axis, this value defined how far the joint can twist.
 *
 * Twist is locked if below 0.05.
 *
*/
static CONE_TWIST_JOINT_TWIST_SPAN: any;

/**
 * The speed with which the swing or twist will take place.
 *
 * The higher, the faster.
 *
*/
static CONE_TWIST_JOINT_BIAS: any;

/**
 * The ease with which the Joint twists, if it's too low, it takes more force to twist the joint.
 *
*/
static CONE_TWIST_JOINT_SOFTNESS: any;

/**
 * Defines, how fast the swing- and twist-speed-difference on both sides gets synced.
 *
*/
static CONE_TWIST_JOINT_RELAXATION: any;

/**
 * The minimum difference between the pivot points' axes.
 *
*/
static G6DOF_JOINT_LINEAR_LOWER_LIMIT: any;

/**
 * The maximum difference between the pivot points' axes.
 *
*/
static G6DOF_JOINT_LINEAR_UPPER_LIMIT: any;

/**
 * A factor that gets applied to the movement across the axes. The lower, the slower the movement.
 *
*/
static G6DOF_JOINT_LINEAR_LIMIT_SOFTNESS: any;

/**
 * The amount of restitution on the axes movement. The lower, the more velocity-energy gets lost.
 *
*/
static G6DOF_JOINT_LINEAR_RESTITUTION: any;

/**
 * The amount of damping that happens at the linear motion across the axes.
 *
*/
static G6DOF_JOINT_LINEAR_DAMPING: any;

/**
 * The velocity that the joint's linear motor will attempt to reach.
 *
*/
static G6DOF_JOINT_LINEAR_MOTOR_TARGET_VELOCITY: any;

/**
 * The maximum force that the linear motor can apply while trying to reach the target velocity.
 *
*/
static G6DOF_JOINT_LINEAR_MOTOR_FORCE_LIMIT: any;

/**
 * The minimum rotation in negative direction to break loose and rotate around the axes.
 *
*/
static G6DOF_JOINT_ANGULAR_LOWER_LIMIT: any;

/**
 * The minimum rotation in positive direction to break loose and rotate around the axes.
 *
*/
static G6DOF_JOINT_ANGULAR_UPPER_LIMIT: any;

/**
 * A factor that gets multiplied onto all rotations across the axes.
 *
*/
static G6DOF_JOINT_ANGULAR_LIMIT_SOFTNESS: any;

/**
 * The amount of rotational damping across the axes. The lower, the more dampening occurs.
 *
*/
static G6DOF_JOINT_ANGULAR_DAMPING: any;

/**
 * The amount of rotational restitution across the axes. The lower, the more restitution occurs.
 *
*/
static G6DOF_JOINT_ANGULAR_RESTITUTION: any;

/**
 * The maximum amount of force that can occur, when rotating around the axes.
 *
*/
static G6DOF_JOINT_ANGULAR_FORCE_LIMIT: any;

/**
 * When correcting the crossing of limits in rotation across the axes, this error tolerance factor defines how much the correction gets slowed down. The lower, the slower.
 *
*/
static G6DOF_JOINT_ANGULAR_ERP: any;

/**
 * Target speed for the motor at the axes.
 *
*/
static G6DOF_JOINT_ANGULAR_MOTOR_TARGET_VELOCITY: any;

/**
 * Maximum acceleration for the motor at the axes.
 *
*/
static G6DOF_JOINT_ANGULAR_MOTOR_FORCE_LIMIT: any;

/**
 * If `set` there is linear motion possible within the given limits.
 *
*/
static G6DOF_JOINT_FLAG_ENABLE_LINEAR_LIMIT: any;

/**
 * If `set` there is rotational motion possible.
 *
*/
static G6DOF_JOINT_FLAG_ENABLE_ANGULAR_LIMIT: any;

/**
 * If `set` there is a rotational motor across these axes.
 *
*/
static G6DOF_JOINT_FLAG_ENABLE_MOTOR: any;

/**
 * If `set` there is a linear motor on this axis that targets a specific velocity.
 *
*/
static G6DOF_JOINT_FLAG_ENABLE_LINEAR_MOTOR: any;

/**
 * The [Shape] is a [PlaneShape].
 *
*/
static SHAPE_PLANE: any;

/**
 * The [Shape] is a [RayShape].
 *
*/
static SHAPE_RAY: any;

/**
 * The [Shape] is a [SphereShape].
 *
*/
static SHAPE_SPHERE: any;

/**
 * The [Shape] is a [BoxShape].
 *
*/
static SHAPE_BOX: any;

/**
 * The [Shape] is a [CapsuleShape].
 *
*/
static SHAPE_CAPSULE: any;

/**
 * The [Shape] is a [CylinderShape].
 *
*/
static SHAPE_CYLINDER: any;

/**
 * The [Shape] is a [ConvexPolygonShape].
 *
*/
static SHAPE_CONVEX_POLYGON: any;

/**
 * The [Shape] is a [ConcavePolygonShape].
 *
*/
static SHAPE_CONCAVE_POLYGON: any;

/**
 * The [Shape] is a [HeightMapShape].
 *
*/
static SHAPE_HEIGHTMAP: any;

/**
 * This constant is used internally by the engine. Any attempt to create this kind of shape results in an error.
 *
*/
static SHAPE_CUSTOM: any;

/**
 * Constant to set/get gravity strength in an area.
 *
*/
static AREA_PARAM_GRAVITY: any;

/**
 * Constant to set/get gravity vector/center in an area.
 *
*/
static AREA_PARAM_GRAVITY_VECTOR: any;

/**
 * Constant to set/get whether the gravity vector of an area is a direction, or a center point.
 *
*/
static AREA_PARAM_GRAVITY_IS_POINT: any;

/**
 * Constant to set/get the falloff factor for point gravity of an area. The greater this value is, the faster the strength of gravity decreases with the square of distance.
 *
*/
static AREA_PARAM_GRAVITY_DISTANCE_SCALE: any;

/**
 * This constant was used to set/get the falloff factor for point gravity. It has been superseded by [constant AREA_PARAM_GRAVITY_DISTANCE_SCALE].
 *
*/
static AREA_PARAM_GRAVITY_POINT_ATTENUATION: any;

/**
 * Constant to set/get the linear dampening factor of an area.
 *
*/
static AREA_PARAM_LINEAR_DAMP: any;

/**
 * Constant to set/get the angular dampening factor of an area.
 *
*/
static AREA_PARAM_ANGULAR_DAMP: any;

/**
 * Constant to set/get the priority (order of processing) of an area.
 *
*/
static AREA_PARAM_PRIORITY: any;

/**
 * This area does not affect gravity/damp. These are generally areas that exist only to detect collisions, and objects entering or exiting them.
 *
*/
static AREA_SPACE_OVERRIDE_DISABLED: any;

/**
 * This area adds its gravity/damp values to whatever has been calculated so far. This way, many overlapping areas can combine their physics to make interesting effects.
 *
*/
static AREA_SPACE_OVERRIDE_COMBINE: any;

/**
 * This area adds its gravity/damp values to whatever has been calculated so far. Then stops taking into account the rest of the areas, even the default one.
 *
*/
static AREA_SPACE_OVERRIDE_COMBINE_REPLACE: any;

/**
 * This area replaces any gravity/damp, even the default one, and stops taking into account the rest of the areas.
 *
*/
static AREA_SPACE_OVERRIDE_REPLACE: any;

/**
 * This area replaces any gravity/damp calculated so far, but keeps calculating the rest of the areas, down to the default one.
 *
*/
static AREA_SPACE_OVERRIDE_REPLACE_COMBINE: any;

/**
 * Constant for static bodies.
 *
*/
static BODY_MODE_STATIC: any;

/**
 * Constant for kinematic bodies.
 *
*/
static BODY_MODE_KINEMATIC: any;

/**
 * Constant for rigid bodies.
 *
*/
static BODY_MODE_RIGID: any;

/**
 * Constant for rigid bodies in character mode. In this mode, a body can not rotate, and only its linear velocity is affected by physics.
 *
*/
static BODY_MODE_CHARACTER: any;

/**
 * Constant to set/get a body's bounce factor.
 *
*/
static BODY_PARAM_BOUNCE: any;

/**
 * Constant to set/get a body's friction.
 *
*/
static BODY_PARAM_FRICTION: any;

/**
 * Constant to set/get a body's mass.
 *
*/
static BODY_PARAM_MASS: any;

/**
 * Constant to set/get a body's gravity multiplier.
 *
*/
static BODY_PARAM_GRAVITY_SCALE: any;

/**
 * Constant to set/get a body's linear dampening factor.
 *
*/
static BODY_PARAM_LINEAR_DAMP: any;

/**
 * Constant to set/get a body's angular dampening factor.
 *
*/
static BODY_PARAM_ANGULAR_DAMP: any;

/**
 * Represents the size of the [enum BodyParameter] enum.
 *
*/
static BODY_PARAM_MAX: any;

/**
 * Constant to set/get the current transform matrix of the body.
 *
*/
static BODY_STATE_TRANSFORM: any;

/**
 * Constant to set/get the current linear velocity of the body.
 *
*/
static BODY_STATE_LINEAR_VELOCITY: any;

/**
 * Constant to set/get the current angular velocity of the body.
 *
*/
static BODY_STATE_ANGULAR_VELOCITY: any;

/**
 * Constant to sleep/wake up a body, or to get whether it is sleeping.
 *
*/
static BODY_STATE_SLEEPING: any;

/**
 * Constant to set/get whether the body can sleep.
 *
*/
static BODY_STATE_CAN_SLEEP: any;

/**
 * The value of the first parameter and area callback function receives, when an object enters one of its shapes.
 *
*/
static AREA_BODY_ADDED: any;

/**
 * The value of the first parameter and area callback function receives, when an object exits one of its shapes.
 *
*/
static AREA_BODY_REMOVED: any;

/**
 * Constant to get the number of objects that are not sleeping.
 *
*/
static INFO_ACTIVE_OBJECTS: any;

/**
 * Constant to get the number of possible collisions.
 *
*/
static INFO_COLLISION_PAIRS: any;

/**
 * Constant to get the number of space regions where a collision could occur.
 *
*/
static INFO_ISLAND_COUNT: any;

/**
 * Constant to set/get the maximum distance a pair of bodies has to move before their collision status has to be recalculated.
 *
*/
static SPACE_PARAM_CONTACT_RECYCLE_RADIUS: any;

/**
 * Constant to set/get the maximum distance a shape can be from another before they are considered separated.
 *
*/
static SPACE_PARAM_CONTACT_MAX_SEPARATION: any;

/**
 * Constant to set/get the maximum distance a shape can penetrate another shape before it is considered a collision.
 *
*/
static SPACE_PARAM_BODY_MAX_ALLOWED_PENETRATION: any;

/**
 * Constant to set/get the threshold linear velocity of activity. A body marked as potentially inactive for both linear and angular velocity will be put to sleep after the time given.
 *
*/
static SPACE_PARAM_BODY_LINEAR_VELOCITY_SLEEP_THRESHOLD: any;

/**
 * Constant to set/get the threshold angular velocity of activity. A body marked as potentially inactive for both linear and angular velocity will be put to sleep after the time given.
 *
*/
static SPACE_PARAM_BODY_ANGULAR_VELOCITY_SLEEP_THRESHOLD: any;

/**
 * Constant to set/get the maximum time of activity. A body marked as potentially inactive for both linear and angular velocity will be put to sleep after this time.
 *
*/
static SPACE_PARAM_BODY_TIME_TO_SLEEP: any;

/** No documentation provided. */
static SPACE_PARAM_BODY_ANGULAR_VELOCITY_DAMP_RATIO: any;

/**
 * Constant to set/get the default solver bias for all physics constraints. A solver bias is a factor controlling how much two objects "rebound", after violating a constraint, to avoid leaving them in that state because of numerical imprecision.
 *
*/
static SPACE_PARAM_CONSTRAINT_DEFAULT_BIAS: any;

/** No documentation provided. */
static BODY_AXIS_LINEAR_X: any;

/** No documentation provided. */
static BODY_AXIS_LINEAR_Y: any;

/** No documentation provided. */
static BODY_AXIS_LINEAR_Z: any;

/** No documentation provided. */
static BODY_AXIS_ANGULAR_X: any;

/** No documentation provided. */
static BODY_AXIS_ANGULAR_Y: any;

/** No documentation provided. */
static BODY_AXIS_ANGULAR_Z: any;



}

