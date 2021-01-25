
/**
 * A HingeJoint3D normally uses the Z axis of body A as the hinge axis, another axis can be specified when adding it manually though.
 *
*/
declare class HingeJoint3D extends Joint3D {

  
/**
 * A HingeJoint3D normally uses the Z axis of body A as the hinge axis, another axis can be specified when adding it manually though.
 *
*/
  "new"(): this;
  static "new"(): this;



/** The speed with which the rotation across the axis perpendicular to the hinge gets corrected. */
"angular_limit/bias": float;

/** If [code]true[/code], the hinges maximum and minimum rotation, defined by [member angular_limit/lower] and [member angular_limit/upper] has effects. */
"angular_limit/enable": boolean;

/** The minimum rotation. Only active if [member angular_limit/enable] is [code]true[/code]. */
"angular_limit/lower": float;

/** The lower this value, the more the rotation gets slowed down. */
"angular_limit/relaxation": float;


/** The maximum rotation. Only active if [member angular_limit/enable] is [code]true[/code]. */
"angular_limit/upper": float;

/** When activated, a motor turns the hinge. */
"motor/enable": boolean;

/** Maximum acceleration for the motor. */
"motor/max_impulse": float;

/** Target speed for the motor. */
"motor/target_velocity": float;

/** The speed with which the two bodies get pulled together when they move in different directions. */
"params/bias": float;

/** Returns the value of the specified flag. */
get_flag(flag: int): boolean;

/** Returns the value of the specified parameter. */
get_param(param: int): float;

/** If [code]true[/code], enables the specified flag. */
set_flag(flag: int, enabled: boolean): void;

/** Sets the value of the specified parameter. */
set_param(param: int, value: float): void;

  connect<T extends SignalsOf<HingeJoint3D>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * The speed with which the two bodies get pulled together when they move in different directions.
 *
*/
static PARAM_BIAS: 0;

/**
 * The maximum rotation. Only active if [member angular_limit/enable] is `true`.
 *
*/
static PARAM_LIMIT_UPPER: 1;

/**
 * The minimum rotation. Only active if [member angular_limit/enable] is `true`.
 *
*/
static PARAM_LIMIT_LOWER: 2;

/**
 * The speed with which the rotation across the axis perpendicular to the hinge gets corrected.
 *
*/
static PARAM_LIMIT_BIAS: 3;

/** No documentation provided. */
static PARAM_LIMIT_SOFTNESS: 4;

/**
 * The lower this value, the more the rotation gets slowed down.
 *
*/
static PARAM_LIMIT_RELAXATION: 5;

/**
 * Target speed for the motor.
 *
*/
static PARAM_MOTOR_TARGET_VELOCITY: 6;

/**
 * Maximum acceleration for the motor.
 *
*/
static PARAM_MOTOR_MAX_IMPULSE: 7;

/**
 * Represents the size of the [enum Param] enum.
 *
*/
static PARAM_MAX: 8;

/**
 * If `true`, the hinges maximum and minimum rotation, defined by [member angular_limit/lower] and [member angular_limit/upper] has effects.
 *
*/
static FLAG_USE_LIMIT: 0;

/**
 * When activated, a motor turns the hinge.
 *
*/
static FLAG_ENABLE_MOTOR: 1;

/**
 * Represents the size of the [enum Flag] enum.
 *
*/
static FLAG_MAX: 2;


  
}


 
