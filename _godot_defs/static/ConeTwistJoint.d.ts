
/**
 * The joint can rotate the bodies across an axis defined by the local x-axes of the [Joint].
 *
 * The twist axis is initiated as the X axis of the [Joint].
 *
 * Once the Bodies swing, the twist axis is calculated as the middle of the x-axes of the Joint in the local space of the two Bodies.
 *
*/
declare class ConeTwistJoint extends Joint {

  
/**
 * The joint can rotate the bodies across an axis defined by the local x-axes of the [Joint].
 *
 * The twist axis is initiated as the X axis of the [Joint].
 *
 * Once the Bodies swing, the twist axis is calculated as the middle of the x-axes of the Joint in the local space of the two Bodies.
 *
*/
  "new"(): ConeTwistJoint;
  static "new"(): ConeTwistJoint;



/**
 * The speed with which the swing or twist will take place.
 *
 * The higher, the faster.
 *
*/
bias: float;

/** Defines, how fast the swing- and twist-speed-difference on both sides gets synced. */
relaxation: float;

/** The ease with which the joint starts to twist. If it's too low, it takes more force to start twisting the joint. */
softness: float;

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
swing_span: float;

/**
 * Twist is the rotation around the twist axis, this value defined how far the joint can twist.
 *
 * Twist is locked if below 0.05.
 *
*/
twist_span: float;

/** No documentation provided. */
get_param(param: int): float;

/** No documentation provided. */
set_param(param: int, value: float): void;

  connect<T extends SignalsOf<ConeTwistJoint>, U extends Node>(signal: T, node: U, method: keyof U): number;



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
static PARAM_SWING_SPAN: 0;

/**
 * Twist is the rotation around the twist axis, this value defined how far the joint can twist.
 *
 * Twist is locked if below 0.05.
 *
*/
static PARAM_TWIST_SPAN: 1;

/**
 * The speed with which the swing or twist will take place.
 *
 * The higher, the faster.
 *
*/
static PARAM_BIAS: 2;

/**
 * The ease with which the joint starts to twist. If it's too low, it takes more force to start twisting the joint.
 *
*/
static PARAM_SOFTNESS: 3;

/**
 * Defines, how fast the swing- and twist-speed-difference on both sides gets synced.
 *
*/
static PARAM_RELAXATION: 4;

/**
 * Represents the size of the [enum Param] enum.
 *
*/
static PARAM_MAX: 5;


  
}
