
/**
 * The first 3 DOF axes are linear axes, which represent translation of Bodies, and the latter 3 DOF axes represent the angular motion. Each axis can be either locked, or limited.
 *
*/
declare class Generic6DOFJoint extends Joint  {

  
/**
 * The first 3 DOF axes are linear axes, which represent translation of Bodies, and the latter 3 DOF axes represent the angular motion. Each axis can be either locked, or limited.
 *
*/
  new(): Generic6DOFJoint; 
  static "new"(): Generic6DOFJoint 


/**
 * The amount of rotational damping across the X axis.
 *
 * The lower, the longer an impulse from one side takes to travel to the other side.
 *
*/
"angular_limit_x/damping": float;

/** If [code]true[/code], rotation across the X axis is limited. */
"angular_limit_x/enabled": boolean;

/** When rotating across the X axis, this error tolerance factor defines how much the correction gets slowed down. The lower, the slower. */
"angular_limit_x/erp": float;

/** The maximum amount of force that can occur, when rotating around the X axis. */
"angular_limit_x/force_limit": float;

/** The minimum rotation in negative direction to break loose and rotate around the X axis. */
"angular_limit_x/lower_angle": float;

/** The amount of rotational restitution across the X axis. The lower, the more restitution occurs. */
"angular_limit_x/restitution": float;

/** The speed of all rotations across the X axis. */
"angular_limit_x/softness": float;

/** The minimum rotation in positive direction to break loose and rotate around the X axis. */
"angular_limit_x/upper_angle": float;

/** The amount of rotational damping across the Y axis. The lower, the more dampening occurs. */
"angular_limit_y/damping": float;

/** If [code]true[/code], rotation across the Y axis is limited. */
"angular_limit_y/enabled": boolean;

/** When rotating across the Y axis, this error tolerance factor defines how much the correction gets slowed down. The lower, the slower. */
"angular_limit_y/erp": float;

/** The maximum amount of force that can occur, when rotating around the Y axis. */
"angular_limit_y/force_limit": float;

/** The minimum rotation in negative direction to break loose and rotate around the Y axis. */
"angular_limit_y/lower_angle": float;

/** The amount of rotational restitution across the Y axis. The lower, the more restitution occurs. */
"angular_limit_y/restitution": float;

/** The speed of all rotations across the Y axis. */
"angular_limit_y/softness": float;

/** The minimum rotation in positive direction to break loose and rotate around the Y axis. */
"angular_limit_y/upper_angle": float;

/** The amount of rotational damping across the Z axis. The lower, the more dampening occurs. */
"angular_limit_z/damping": float;

/** If [code]true[/code], rotation across the Z axis is limited. */
"angular_limit_z/enabled": boolean;

/** When rotating across the Z axis, this error tolerance factor defines how much the correction gets slowed down. The lower, the slower. */
"angular_limit_z/erp": float;

/** The maximum amount of force that can occur, when rotating around the Z axis. */
"angular_limit_z/force_limit": float;

/** The minimum rotation in negative direction to break loose and rotate around the Z axis. */
"angular_limit_z/lower_angle": float;

/** The amount of rotational restitution across the Z axis. The lower, the more restitution occurs. */
"angular_limit_z/restitution": float;

/** The speed of all rotations across the Z axis. */
"angular_limit_z/softness": float;

/** The minimum rotation in positive direction to break loose and rotate around the Z axis. */
"angular_limit_z/upper_angle": float;

/** If [code]true[/code], a rotating motor at the X axis is enabled. */
"angular_motor_x/enabled": boolean;

/** Maximum acceleration for the motor at the X axis. */
"angular_motor_x/force_limit": float;

/** Target speed for the motor at the X axis. */
"angular_motor_x/target_velocity": float;

/** If [code]true[/code], a rotating motor at the Y axis is enabled. */
"angular_motor_y/enabled": boolean;

/** Maximum acceleration for the motor at the Y axis. */
"angular_motor_y/force_limit": float;

/** Target speed for the motor at the Y axis. */
"angular_motor_y/target_velocity": float;

/** If [code]true[/code], a rotating motor at the Z axis is enabled. */
"angular_motor_z/enabled": boolean;

/** Maximum acceleration for the motor at the Z axis. */
"angular_motor_z/force_limit": float;

/** Target speed for the motor at the Z axis. */
"angular_motor_z/target_velocity": float;













/** The amount of damping that happens at the X motion. */
"linear_limit_x/damping": float;

/** If [code]true[/code], the linear motion across the X axis is limited. */
"linear_limit_x/enabled": boolean;

/** The minimum difference between the pivot points' X axis. */
"linear_limit_x/lower_distance": float;

/** The amount of restitution on the X axis movement. The lower, the more momentum gets lost. */
"linear_limit_x/restitution": float;

/** A factor applied to the movement across the X axis. The lower, the slower the movement. */
"linear_limit_x/softness": float;

/** The maximum difference between the pivot points' X axis. */
"linear_limit_x/upper_distance": float;

/** The amount of damping that happens at the Y motion. */
"linear_limit_y/damping": float;

/** If [code]true[/code], the linear motion across the Y axis is limited. */
"linear_limit_y/enabled": boolean;

/** The minimum difference between the pivot points' Y axis. */
"linear_limit_y/lower_distance": float;

/** The amount of restitution on the Y axis movement. The lower, the more momentum gets lost. */
"linear_limit_y/restitution": float;

/** A factor applied to the movement across the Y axis. The lower, the slower the movement. */
"linear_limit_y/softness": float;

/** The maximum difference between the pivot points' Y axis. */
"linear_limit_y/upper_distance": float;

/** The amount of damping that happens at the Z motion. */
"linear_limit_z/damping": float;

/** If [code]true[/code], the linear motion across the Z axis is limited. */
"linear_limit_z/enabled": boolean;

/** The minimum difference between the pivot points' Z axis. */
"linear_limit_z/lower_distance": float;

/** The amount of restitution on the Z axis movement. The lower, the more momentum gets lost. */
"linear_limit_z/restitution": float;

/** A factor applied to the movement across the Z axis. The lower, the slower the movement. */
"linear_limit_z/softness": float;

/** The maximum difference between the pivot points' Z axis. */
"linear_limit_z/upper_distance": float;

/** If [code]true[/code], then there is a linear motor on the X axis. It will attempt to reach the target velocity while staying within the force limits. */
"linear_motor_x/enabled": boolean;

/** The maximum force the linear motor can apply on the X axis while trying to reach the target velocity. */
"linear_motor_x/force_limit": float;

/** The speed that the linear motor will attempt to reach on the X axis. */
"linear_motor_x/target_velocity": float;

/** If [code]true[/code], then there is a linear motor on the Y axis. It will attempt to reach the target velocity while staying within the force limits. */
"linear_motor_y/enabled": boolean;

/** The maximum force the linear motor can apply on the Y axis while trying to reach the target velocity. */
"linear_motor_y/force_limit": float;

/** The speed that the linear motor will attempt to reach on the Y axis. */
"linear_motor_y/target_velocity": float;

/** If [code]true[/code], then there is a linear motor on the Z axis. It will attempt to reach the target velocity while staying within the force limits. */
"linear_motor_z/enabled": boolean;

/** The maximum force the linear motor can apply on the Z axis while trying to reach the target velocity. */
"linear_motor_z/force_limit": float;

/** The speed that the linear motor will attempt to reach on the Z axis. */
"linear_motor_z/target_velocity": float;













/** No documentation provided. */
get_flag_x(flag: int): boolean;

/** No documentation provided. */
get_flag_y(flag: int): boolean;

/** No documentation provided. */
get_flag_z(flag: int): boolean;

/** No documentation provided. */
get_param_x(param: int): float;

/** No documentation provided. */
get_param_y(param: int): float;

/** No documentation provided. */
get_param_z(param: int): float;

/** No documentation provided. */
set_flag_x(flag: int, value: boolean): void;

/** No documentation provided. */
set_flag_y(flag: int, value: boolean): void;

/** No documentation provided. */
set_flag_z(flag: int, value: boolean): void;

/** No documentation provided. */
set_param_x(param: int, value: float): void;

/** No documentation provided. */
set_param_y(param: int, value: float): void;

/** No documentation provided. */
set_param_z(param: int, value: float): void;

  connect<T extends SignalsOf<Generic6DOFJoint>>(signal: T, method: SignalFunction<Generic6DOFJoint[T]>): number;



/**
 * The minimum difference between the pivot points' axes.
 *
*/
static PARAM_LINEAR_LOWER_LIMIT: any;

/**
 * The maximum difference between the pivot points' axes.
 *
*/
static PARAM_LINEAR_UPPER_LIMIT: any;

/**
 * A factor applied to the movement across the axes. The lower, the slower the movement.
 *
*/
static PARAM_LINEAR_LIMIT_SOFTNESS: any;

/**
 * The amount of restitution on the axes' movement. The lower, the more momentum gets lost.
 *
*/
static PARAM_LINEAR_RESTITUTION: any;

/**
 * The amount of damping that happens at the linear motion across the axes.
 *
*/
static PARAM_LINEAR_DAMPING: any;

/**
 * The velocity the linear motor will try to reach.
 *
*/
static PARAM_LINEAR_MOTOR_TARGET_VELOCITY: any;

/**
 * The maximum force the linear motor will apply while trying to reach the velocity target.
 *
*/
static PARAM_LINEAR_MOTOR_FORCE_LIMIT: any;

/** No documentation provided. */
static PARAM_LINEAR_SPRING_STIFFNESS: any;

/** No documentation provided. */
static PARAM_LINEAR_SPRING_DAMPING: any;

/** No documentation provided. */
static PARAM_LINEAR_SPRING_EQUILIBRIUM_POINT: any;

/**
 * The minimum rotation in negative direction to break loose and rotate around the axes.
 *
*/
static PARAM_ANGULAR_LOWER_LIMIT: any;

/**
 * The minimum rotation in positive direction to break loose and rotate around the axes.
 *
*/
static PARAM_ANGULAR_UPPER_LIMIT: any;

/**
 * The speed of all rotations across the axes.
 *
*/
static PARAM_ANGULAR_LIMIT_SOFTNESS: any;

/**
 * The amount of rotational damping across the axes. The lower, the more dampening occurs.
 *
*/
static PARAM_ANGULAR_DAMPING: any;

/**
 * The amount of rotational restitution across the axes. The lower, the more restitution occurs.
 *
*/
static PARAM_ANGULAR_RESTITUTION: any;

/**
 * The maximum amount of force that can occur, when rotating around the axes.
 *
*/
static PARAM_ANGULAR_FORCE_LIMIT: any;

/**
 * When rotating across the axes, this error tolerance factor defines how much the correction gets slowed down. The lower, the slower.
 *
*/
static PARAM_ANGULAR_ERP: any;

/**
 * Target speed for the motor at the axes.
 *
*/
static PARAM_ANGULAR_MOTOR_TARGET_VELOCITY: any;

/**
 * Maximum acceleration for the motor at the axes.
 *
*/
static PARAM_ANGULAR_MOTOR_FORCE_LIMIT: any;

/** No documentation provided. */
static PARAM_ANGULAR_SPRING_STIFFNESS: any;

/** No documentation provided. */
static PARAM_ANGULAR_SPRING_DAMPING: any;

/** No documentation provided. */
static PARAM_ANGULAR_SPRING_EQUILIBRIUM_POINT: any;

/**
 * Represents the size of the [enum Param] enum.
 *
*/
static PARAM_MAX: any;

/**
 * If enabled, linear motion is possible within the given limits.
 *
*/
static FLAG_ENABLE_LINEAR_LIMIT: any;

/**
 * If enabled, rotational motion is possible within the given limits.
 *
*/
static FLAG_ENABLE_ANGULAR_LIMIT: any;

/** No documentation provided. */
static FLAG_ENABLE_LINEAR_SPRING: any;

/** No documentation provided. */
static FLAG_ENABLE_ANGULAR_SPRING: any;

/**
 * If enabled, there is a rotational motor across these axes.
 *
*/
static FLAG_ENABLE_MOTOR: any;

/**
 * If enabled, there is a linear motor across these axes.
 *
*/
static FLAG_ENABLE_LINEAR_MOTOR: any;

/**
 * Represents the size of the [enum Flag] enum.
 *
*/
static FLAG_MAX: any;



}

