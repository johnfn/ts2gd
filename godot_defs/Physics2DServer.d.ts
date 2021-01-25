
/**
 * Physics2DServer is the server responsible for all 2D physics. It can create many kinds of physics objects, but does not insert them on the node tree.
 *
*/
declare class Physics2DServerClass extends Object {

  
/**
 * Physics2DServer is the server responsible for all 2D physics. It can create many kinds of physics objects, but does not insert them on the node tree.
 *
*/
  "new"(): Physics2DServerClass;
  static "new"(): Physics2DServerClass;




/** Adds a shape to the area, along with a transform matrix. Shapes are usually referenced by their index, so you should track which shape has a given index. */
area_add_shape(area: RID, shape: RID, transform?: Transform2D, disabled?: boolean): void;

/** No documentation provided. */
area_attach_canvas_instance_id(area: RID, id: int): void;

/** Assigns the area to a descendant of [Object], so it can exist in the node tree. */
area_attach_object_instance_id(area: RID, id: int): void;

/** Removes all shapes from an area. It does not delete the shapes, so they can be reassigned later. */
area_clear_shapes(area: RID): void;

/** Creates an [Area2D]. */
area_create(): RID;

/** No documentation provided. */
area_get_canvas_instance_id(area: RID): int;

/** Gets the instance ID of the object the area is assigned to. */
area_get_object_instance_id(area: RID): int;

/** Returns an area parameter value. See [enum AreaParameter] for a list of available parameters. */
area_get_param(area: RID, param: int): any;

/** Returns the [RID] of the nth shape of an area. */
area_get_shape(area: RID, shape_idx: int): RID;

/** Returns the number of shapes assigned to an area. */
area_get_shape_count(area: RID): int;

/** Returns the transform matrix of a shape within an area. */
area_get_shape_transform(area: RID, shape_idx: int): Transform2D;

/** Returns the space assigned to the area. */
area_get_space(area: RID): RID;

/** Returns the space override mode for the area. */
area_get_space_override_mode(area: RID): int;

/** Returns the transform matrix for an area. */
area_get_transform(area: RID): Transform2D;

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

/** Sets the value for an area parameter. See [enum AreaParameter] for a list of available parameters. */
area_set_param(area: RID, param: int, value: any): void;

/** Substitutes a given area shape by another. The old shape is selected by its index, the new one by its [RID]. */
area_set_shape(area: RID, shape_idx: int, shape: RID): void;

/** Disables a given shape in an area. */
area_set_shape_disabled(area: RID, shape_idx: int, disabled: boolean): void;

/** Sets the transform matrix for an area shape. */
area_set_shape_transform(area: RID, shape_idx: int, transform: Transform2D): void;

/** Assigns a space to the area. */
area_set_space(area: RID, space: RID): void;

/** Sets the space override mode for the area. See [enum AreaSpaceOverrideMode] for a list of available modes. */
area_set_space_override_mode(area: RID, mode: int): void;

/** Sets the transform matrix for an area. */
area_set_transform(area: RID, transform: Transform2D): void;

/** No documentation provided. */
body_add_central_force(body: RID, force: Vector2): void;

/** Adds a body to the list of bodies exempt from collisions. */
body_add_collision_exception(body: RID, excepted_body: RID): void;

/** Adds a positioned force to the applied force and torque. As with [method body_apply_impulse], both the force and the offset from the body origin are in global coordinates. A force differs from an impulse in that, while the two are forces, the impulse clears itself after being applied. */
body_add_force(body: RID, offset: Vector2, force: Vector2): void;

/** Adds a shape to the body, along with a transform matrix. Shapes are usually referenced by their index, so you should track which shape has a given index. */
body_add_shape(body: RID, shape: RID, transform?: Transform2D, disabled?: boolean): void;

/** No documentation provided. */
body_add_torque(body: RID, torque: float): void;

/** No documentation provided. */
body_apply_central_impulse(body: RID, impulse: Vector2): void;

/** Adds a positioned impulse to the applied force and torque. Both the force and the offset from the body origin are in global coordinates. */
body_apply_impulse(body: RID, position: Vector2, impulse: Vector2): void;

/** No documentation provided. */
body_apply_torque_impulse(body: RID, impulse: float): void;

/** No documentation provided. */
body_attach_canvas_instance_id(body: RID, id: int): void;

/** Assigns the area to a descendant of [Object], so it can exist in the node tree. */
body_attach_object_instance_id(body: RID, id: int): void;

/** Removes all shapes from a body. */
body_clear_shapes(body: RID): void;

/** Creates a physics body. */
body_create(): RID;

/** No documentation provided. */
body_get_canvas_instance_id(body: RID): int;

/** Returns the physics layer or layers a body belongs to. */
body_get_collision_layer(body: RID): int;

/** Returns the physics layer or layers a body can collide with. */
body_get_collision_mask(body: RID): int;

/** Returns the continuous collision detection mode. */
body_get_continuous_collision_detection_mode(body: RID): int;

/** Returns the [Physics2DDirectBodyState] of the body. */
body_get_direct_state(body: RID): Physics2DDirectBodyState;

/** Returns the maximum contacts that can be reported. See [method body_set_max_contacts_reported]. */
body_get_max_contacts_reported(body: RID): int;

/** Returns the body mode. */
body_get_mode(body: RID): int;

/** Gets the instance ID of the object the area is assigned to. */
body_get_object_instance_id(body: RID): int;

/** Returns the value of a body parameter. See [enum BodyParameter] for a list of available parameters. */
body_get_param(body: RID, param: int): float;

/** Returns the [RID] of the nth shape of a body. */
body_get_shape(body: RID, shape_idx: int): RID;

/** Returns the number of shapes assigned to a body. */
body_get_shape_count(body: RID): int;

/** Returns the metadata of a shape of a body. */
body_get_shape_metadata(body: RID, shape_idx: int): any;

/** Returns the transform matrix of a body shape. */
body_get_shape_transform(body: RID, shape_idx: int): Transform2D;

/** Returns the [RID] of the space assigned to a body. */
body_get_space(body: RID): RID;

/** Returns a body state. */
body_get_state(body: RID, state: int): any;

/** Returns whether a body uses a callback function to calculate its own physics (see [method body_set_force_integration_callback]). */
body_is_omitting_force_integration(body: RID): boolean;

/** Removes a body from the list of bodies exempt from collisions. */
body_remove_collision_exception(body: RID, excepted_body: RID): void;

/** Removes a shape from a body. The shape is not deleted, so it can be reused afterwards. */
body_remove_shape(body: RID, shape_idx: int): void;

/** Sets an axis velocity. The velocity in the given vector axis will be set as the given vector length. This is useful for jumping behavior. */
body_set_axis_velocity(body: RID, axis_velocity: Vector2): void;

/** Sets the physics layer or layers a body belongs to. */
body_set_collision_layer(body: RID, layer: int): void;

/** Sets the physics layer or layers a body can collide with. */
body_set_collision_mask(body: RID, mask: int): void;

/**
 * Sets the continuous collision detection mode using one of the [enum CCDMode] constants.
 *
 * Continuous collision detection tries to predict where a moving body will collide, instead of moving it and correcting its movement if it collided.
 *
*/
body_set_continuous_collision_detection_mode(body: RID, mode: int): void;

/** Sets the function used to calculate physics for an object, if that object allows it (see [method body_set_omit_force_integration]). */
body_set_force_integration_callback(body: RID, receiver: Object, method: string, userdata?: any): void;

/** Sets the maximum contacts to report. Bodies can keep a log of the contacts with other bodies, this is enabled by setting the maximum amount of contacts reported to a number greater than 0. */
body_set_max_contacts_reported(body: RID, amount: int): void;

/** Sets the body mode using one of the [enum BodyMode] constants. */
body_set_mode(body: RID, mode: int): void;

/** Sets whether a body uses a callback function to calculate its own physics (see [method body_set_force_integration_callback]). */
body_set_omit_force_integration(body: RID, enable: boolean): void;

/** Sets a body parameter. See [enum BodyParameter] for a list of available parameters. */
body_set_param(body: RID, param: int, value: float): void;

/** Substitutes a given body shape by another. The old shape is selected by its index, the new one by its [RID]. */
body_set_shape(body: RID, shape_idx: int, shape: RID): void;

/** Enables one way collision on body if [code]enable[/code] is [code]true[/code]. */
body_set_shape_as_one_way_collision(body: RID, shape_idx: int, enable: boolean, margin: float): void;

/** Disables shape in body if [code]disable[/code] is [code]true[/code]. */
body_set_shape_disabled(body: RID, shape_idx: int, disabled: boolean): void;

/** Sets metadata of a shape within a body. This metadata is different from [method Object.set_meta], and can be retrieved on shape queries. */
body_set_shape_metadata(body: RID, shape_idx: int, metadata: any): void;

/** Sets the transform matrix for a body shape. */
body_set_shape_transform(body: RID, shape_idx: int, transform: Transform2D): void;

/** Assigns a space to the body (see [method space_create]). */
body_set_space(body: RID, space: RID): void;

/**
 * Sets a body state using one of the [enum BodyState] constants.
 *
 * Note that the method doesn't take effect immediately. The state will change on the next physics frame.
 *
*/
body_set_state(body: RID, state: int, value: any): void;

/** Returns [code]true[/code] if a collision would result from moving in the given direction from a given point in space. Margin increases the size of the shapes involved in the collision detection. [Physics2DTestMotionResult] can be passed to return additional information in. */
body_test_motion(body: RID, from: Transform2D, motion: Vector2, infinite_inertia: boolean, margin?: float, result?: Physics2DTestMotionResult): boolean;

/** No documentation provided. */
capsule_shape_create(): RID;

/** No documentation provided. */
circle_shape_create(): RID;

/** No documentation provided. */
concave_polygon_shape_create(): RID;

/** No documentation provided. */
convex_polygon_shape_create(): RID;

/** Creates a damped spring joint between two bodies. If not specified, the second body is assumed to be the joint itself. */
damped_spring_joint_create(anchor_a: Vector2, anchor_b: Vector2, body_a: RID, body_b: RID): RID;

/** Returns the value of a damped spring joint parameter. */
damped_string_joint_get_param(joint: RID, param: int): float;

/** Sets a damped spring joint parameter. See [enum DampedStringParam] for a list of available parameters. */
damped_string_joint_set_param(joint: RID, param: int, value: float): void;

/** Destroys any of the objects created by Physics2DServer. If the [RID] passed is not one of the objects that can be created by Physics2DServer, an error will be sent to the console. */
free_rid(rid: RID): void;

/** Returns information about the current state of the 2D physics engine. See [enum ProcessInfo] for a list of available states. */
get_process_info(process_info: int): int;

/** Creates a groove joint between two bodies. If not specified, the bodies are assumed to be the joint itself. */
groove_joint_create(groove1_a: Vector2, groove2_a: Vector2, anchor_b: Vector2, body_a: RID, body_b: RID): RID;

/** Returns the value of a joint parameter. */
joint_get_param(joint: RID, param: int): float;

/** Returns a joint's type (see [enum JointType]). */
joint_get_type(joint: RID): int;

/** Sets a joint parameter. See [enum JointParam] for a list of available parameters. */
joint_set_param(joint: RID, param: int, value: float): void;

/** No documentation provided. */
line_shape_create(): RID;

/** Creates a pin joint between two bodies. If not specified, the second body is assumed to be the joint itself. */
pin_joint_create(anchor: Vector2, body_a: RID, body_b: RID): RID;

/** No documentation provided. */
ray_shape_create(): RID;

/** No documentation provided. */
rectangle_shape_create(): RID;

/** No documentation provided. */
segment_shape_create(): RID;

/** Activates or deactivates the 2D physics engine. */
set_active(active: boolean): void;

/** Returns the shape data. */
shape_get_data(shape: RID): any;

/** Returns a shape's type (see [enum ShapeType]). */
shape_get_type(shape: RID): int;

/** Sets the shape data that defines its shape and size. The data to be passed depends on the kind of shape created [method shape_get_type]. */
shape_set_data(shape: RID, data: any): void;

/** Creates a space. A space is a collection of parameters for the physics engine that can be assigned to an area or a body. It can be assigned to an area with [method area_set_space], or to a body with [method body_set_space]. */
space_create(): RID;

/** Returns the state of a space, a [Physics2DDirectSpaceState]. This object can be used to make collision/intersection queries. */
space_get_direct_state(space: RID): Physics2DDirectSpaceState;

/** Returns the value of a space parameter. */
space_get_param(space: RID, param: int): float;

/** Returns whether the space is active. */
space_is_active(space: RID): boolean;

/** Marks a space as active. It will not have an effect, unless it is assigned to an area or body. */
space_set_active(space: RID, active: boolean): void;

/** Sets the value for a space parameter. See [enum SpaceParameter] for a list of available parameters. */
space_set_param(space: RID, param: int, value: float): void;

  connect<T extends SignalsOf<Physics2DServerClass>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Constant to set/get the maximum distance a pair of bodies has to move before their collision status has to be recalculated.
 *
*/
static SPACE_PARAM_CONTACT_RECYCLE_RADIUS: 0;

/**
 * Constant to set/get the maximum distance a shape can be from another before they are considered separated.
 *
*/
static SPACE_PARAM_CONTACT_MAX_SEPARATION: 1;

/**
 * Constant to set/get the maximum distance a shape can penetrate another shape before it is considered a collision.
 *
*/
static SPACE_PARAM_BODY_MAX_ALLOWED_PENETRATION: 2;

/**
 * Constant to set/get the threshold linear velocity of activity. A body marked as potentially inactive for both linear and angular velocity will be put to sleep after the time given.
 *
*/
static SPACE_PARAM_BODY_LINEAR_VELOCITY_SLEEP_THRESHOLD: 3;

/**
 * Constant to set/get the threshold angular velocity of activity. A body marked as potentially inactive for both linear and angular velocity will be put to sleep after the time given.
 *
*/
static SPACE_PARAM_BODY_ANGULAR_VELOCITY_SLEEP_THRESHOLD: 4;

/**
 * Constant to set/get the maximum time of activity. A body marked as potentially inactive for both linear and angular velocity will be put to sleep after this time.
 *
*/
static SPACE_PARAM_BODY_TIME_TO_SLEEP: 5;

/**
 * Constant to set/get the default solver bias for all physics constraints. A solver bias is a factor controlling how much two objects "rebound", after violating a constraint, to avoid leaving them in that state because of numerical imprecision.
 *
*/
static SPACE_PARAM_CONSTRAINT_DEFAULT_BIAS: 6;

/** No documentation provided. */
static SPACE_PARAM_TEST_MOTION_MIN_CONTACT_DEPTH: 7;

/**
 * This is the constant for creating line shapes. A line shape is an infinite line with an origin point, and a normal. Thus, it can be used for front/behind checks.
 *
*/
static SHAPE_LINE: 0;

/** No documentation provided. */
static SHAPE_RAY: 1;

/**
 * This is the constant for creating segment shapes. A segment shape is a line from a point A to a point B. It can be checked for intersections.
 *
*/
static SHAPE_SEGMENT: 2;

/**
 * This is the constant for creating circle shapes. A circle shape only has a radius. It can be used for intersections and inside/outside checks.
 *
*/
static SHAPE_CIRCLE: 3;

/**
 * This is the constant for creating rectangle shapes. A rectangle shape is defined by a width and a height. It can be used for intersections and inside/outside checks.
 *
*/
static SHAPE_RECTANGLE: 4;

/**
 * This is the constant for creating capsule shapes. A capsule shape is defined by a radius and a length. It can be used for intersections and inside/outside checks.
 *
*/
static SHAPE_CAPSULE: 5;

/**
 * This is the constant for creating convex polygon shapes. A polygon is defined by a list of points. It can be used for intersections and inside/outside checks. Unlike the [member CollisionPolygon2D.polygon] property, polygons modified with [method shape_set_data] do not verify that the points supplied form is a convex polygon.
 *
*/
static SHAPE_CONVEX_POLYGON: 6;

/**
 * This is the constant for creating concave polygon shapes. A polygon is defined by a list of points. It can be used for intersections checks, but not for inside/outside checks.
 *
*/
static SHAPE_CONCAVE_POLYGON: 7;

/**
 * This constant is used internally by the engine. Any attempt to create this kind of shape results in an error.
 *
*/
static SHAPE_CUSTOM: 8;

/**
 * Constant to set/get gravity strength in an area.
 *
*/
static AREA_PARAM_GRAVITY: 0;

/**
 * Constant to set/get gravity vector/center in an area.
 *
*/
static AREA_PARAM_GRAVITY_VECTOR: 1;

/**
 * Constant to set/get whether the gravity vector of an area is a direction, or a center point.
 *
*/
static AREA_PARAM_GRAVITY_IS_POINT: 2;

/**
 * Constant to set/get the falloff factor for point gravity of an area. The greater this value is, the faster the strength of gravity decreases with the square of distance.
 *
*/
static AREA_PARAM_GRAVITY_DISTANCE_SCALE: 3;

/**
 * This constant was used to set/get the falloff factor for point gravity. It has been superseded by [constant AREA_PARAM_GRAVITY_DISTANCE_SCALE].
 *
*/
static AREA_PARAM_GRAVITY_POINT_ATTENUATION: 4;

/**
 * Constant to set/get the linear dampening factor of an area.
 *
*/
static AREA_PARAM_LINEAR_DAMP: 5;

/**
 * Constant to set/get the angular dampening factor of an area.
 *
*/
static AREA_PARAM_ANGULAR_DAMP: 6;

/**
 * Constant to set/get the priority (order of processing) of an area.
 *
*/
static AREA_PARAM_PRIORITY: 7;

/**
 * This area does not affect gravity/damp. These are generally areas that exist only to detect collisions, and objects entering or exiting them.
 *
*/
static AREA_SPACE_OVERRIDE_DISABLED: 0;

/**
 * This area adds its gravity/damp values to whatever has been calculated so far. This way, many overlapping areas can combine their physics to make interesting effects.
 *
*/
static AREA_SPACE_OVERRIDE_COMBINE: 1;

/**
 * This area adds its gravity/damp values to whatever has been calculated so far. Then stops taking into account the rest of the areas, even the default one.
 *
*/
static AREA_SPACE_OVERRIDE_COMBINE_REPLACE: 2;

/**
 * This area replaces any gravity/damp, even the default one, and stops taking into account the rest of the areas.
 *
*/
static AREA_SPACE_OVERRIDE_REPLACE: 3;

/**
 * This area replaces any gravity/damp calculated so far, but keeps calculating the rest of the areas, down to the default one.
 *
*/
static AREA_SPACE_OVERRIDE_REPLACE_COMBINE: 4;

/**
 * Constant for static bodies.
 *
*/
static BODY_MODE_STATIC: 0;

/**
 * Constant for kinematic bodies.
 *
*/
static BODY_MODE_KINEMATIC: 1;

/**
 * Constant for rigid bodies.
 *
*/
static BODY_MODE_RIGID: 2;

/**
 * Constant for rigid bodies in character mode. In this mode, a body can not rotate, and only its linear velocity is affected by physics.
 *
*/
static BODY_MODE_CHARACTER: 3;

/**
 * Constant to set/get a body's bounce factor.
 *
*/
static BODY_PARAM_BOUNCE: 0;

/**
 * Constant to set/get a body's friction.
 *
*/
static BODY_PARAM_FRICTION: 1;

/**
 * Constant to set/get a body's mass.
 *
*/
static BODY_PARAM_MASS: 2;

/**
 * Constant to set/get a body's inertia.
 *
*/
static BODY_PARAM_INERTIA: 3;

/**
 * Constant to set/get a body's gravity multiplier.
 *
*/
static BODY_PARAM_GRAVITY_SCALE: 4;

/**
 * Constant to set/get a body's linear dampening factor.
 *
*/
static BODY_PARAM_LINEAR_DAMP: 5;

/**
 * Constant to set/get a body's angular dampening factor.
 *
*/
static BODY_PARAM_ANGULAR_DAMP: 6;

/**
 * Represents the size of the [enum BodyParameter] enum.
 *
*/
static BODY_PARAM_MAX: 7;

/**
 * Constant to set/get the current transform matrix of the body.
 *
*/
static BODY_STATE_TRANSFORM: 0;

/**
 * Constant to set/get the current linear velocity of the body.
 *
*/
static BODY_STATE_LINEAR_VELOCITY: 1;

/**
 * Constant to set/get the current angular velocity of the body.
 *
*/
static BODY_STATE_ANGULAR_VELOCITY: 2;

/**
 * Constant to sleep/wake up a body, or to get whether it is sleeping.
 *
*/
static BODY_STATE_SLEEPING: 3;

/**
 * Constant to set/get whether the body can sleep.
 *
*/
static BODY_STATE_CAN_SLEEP: 4;

/**
 * Constant to create pin joints.
 *
*/
static JOINT_PIN: 0;

/**
 * Constant to create groove joints.
 *
*/
static JOINT_GROOVE: 1;

/**
 * Constant to create damped spring joints.
 *
*/
static JOINT_DAMPED_SPRING: 2;

/** No documentation provided. */
static JOINT_PARAM_BIAS: 0;

/** No documentation provided. */
static JOINT_PARAM_MAX_BIAS: 1;

/** No documentation provided. */
static JOINT_PARAM_MAX_FORCE: 2;

/**
 * Sets the resting length of the spring joint. The joint will always try to go to back this length when pulled apart.
 *
*/
static DAMPED_STRING_REST_LENGTH: 0;

/**
 * Sets the stiffness of the spring joint. The joint applies a force equal to the stiffness times the distance from its resting length.
 *
*/
static DAMPED_STRING_STIFFNESS: 1;

/**
 * Sets the damping ratio of the spring joint. A value of 0 indicates an undamped spring, while 1 causes the system to reach equilibrium as fast as possible (critical damping).
 *
*/
static DAMPED_STRING_DAMPING: 2;

/**
 * Disables continuous collision detection. This is the fastest way to detect body collisions, but can miss small, fast-moving objects.
 *
*/
static CCD_MODE_DISABLED: 0;

/**
 * Enables continuous collision detection by raycasting. It is faster than shapecasting, but less precise.
 *
*/
static CCD_MODE_CAST_RAY: 1;

/**
 * Enables continuous collision detection by shapecasting. It is the slowest CCD method, and the most precise.
 *
*/
static CCD_MODE_CAST_SHAPE: 2;

/**
 * The value of the first parameter and area callback function receives, when an object enters one of its shapes.
 *
*/
static AREA_BODY_ADDED: 0;

/**
 * The value of the first parameter and area callback function receives, when an object exits one of its shapes.
 *
*/
static AREA_BODY_REMOVED: 1;

/**
 * Constant to get the number of objects that are not sleeping.
 *
*/
static INFO_ACTIVE_OBJECTS: 0;

/**
 * Constant to get the number of possible collisions.
 *
*/
static INFO_COLLISION_PAIRS: 1;

/**
 * Constant to get the number of space regions where a collision could occur.
 *
*/
static INFO_ISLAND_COUNT: 2;


  
}
