
/**
 * Slides across the X axis of the pivot object.
 *
*/
declare class SliderJoint3D extends Joint3D {

  
/**
 * Slides across the X axis of the pivot object.
 *
*/
  "new"(): this;
  static "new"(): this;



/**
 * The amount of damping of the rotation when the limit is surpassed.
 *
 * A lower damping value allows a rotation initiated by body A to travel to body B slower.
 *
*/
"angular_limit/damping": float;

/** The lower limit of rotation in the slider. */
"angular_limit/lower_angle": float;

/**
 * The amount of restitution of the rotation when the limit is surpassed.
 *
 * Does not affect damping.
 *
*/
"angular_limit/restitution": float;

/**
 * A factor applied to the all rotation once the limit is surpassed.
 *
 * Makes all rotation slower when between 0 and 1.
 *
*/
"angular_limit/softness": float;

/** The upper limit of rotation in the slider. */
"angular_limit/upper_angle": float;

/** The amount of damping of the rotation in the limits. */
"angular_motion/damping": float;

/** The amount of restitution of the rotation in the limits. */
"angular_motion/restitution": float;

/** A factor applied to the all rotation in the limits. */
"angular_motion/softness": float;

/** The amount of damping of the rotation across axes orthogonal to the slider. */
"angular_ortho/damping": float;

/** The amount of restitution of the rotation across axes orthogonal to the slider. */
"angular_ortho/restitution": float;

/** A factor applied to the all rotation across axes orthogonal to the slider. */
"angular_ortho/softness": float;

/** The amount of damping that happens once the limit defined by [member linear_limit/lower_distance] and [member linear_limit/upper_distance] is surpassed. */
"linear_limit/damping": float;

/** The minimum difference between the pivot points on their X axis before damping happens. */
"linear_limit/lower_distance": float;

/** The amount of restitution once the limits are surpassed. The lower, the more velocity-energy gets lost. */
"linear_limit/restitution": float;

/** A factor applied to the movement across the slider axis once the limits get surpassed. The lower, the slower the movement. */
"linear_limit/softness": float;

/** The maximum difference between the pivot points on their X axis before damping happens. */
"linear_limit/upper_distance": float;

/** The amount of damping inside the slider limits. */
"linear_motion/damping": float;

/** The amount of restitution inside the slider limits. */
"linear_motion/restitution": float;

/** A factor applied to the movement across the slider axis as long as the slider is in the limits. The lower, the slower the movement. */
"linear_motion/softness": float;

/** The amount of damping when movement is across axes orthogonal to the slider. */
"linear_ortho/damping": float;

/** The amount of restitution when movement is across axes orthogonal to the slider. */
"linear_ortho/restitution": float;

/** A factor applied to the movement across axes orthogonal to the slider. */
"linear_ortho/softness": float;

/** No documentation provided. */
get_param(param: int): float;

/** No documentation provided. */
set_param(param: int, value: float): void;

  connect<T extends SignalsOf<SliderJoint3D>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * The maximum difference between the pivot points on their X axis before damping happens.
 *
*/
static PARAM_LINEAR_LIMIT_UPPER: 0;

/**
 * The minimum difference between the pivot points on their X axis before damping happens.
 *
*/
static PARAM_LINEAR_LIMIT_LOWER: 1;

/**
 * A factor applied to the movement across the slider axis once the limits get surpassed. The lower, the slower the movement.
 *
*/
static PARAM_LINEAR_LIMIT_SOFTNESS: 2;

/**
 * The amount of restitution once the limits are surpassed. The lower, the more velocityenergy gets lost.
 *
*/
static PARAM_LINEAR_LIMIT_RESTITUTION: 3;

/**
 * The amount of damping once the slider limits are surpassed.
 *
*/
static PARAM_LINEAR_LIMIT_DAMPING: 4;

/**
 * A factor applied to the movement across the slider axis as long as the slider is in the limits. The lower, the slower the movement.
 *
*/
static PARAM_LINEAR_MOTION_SOFTNESS: 5;

/**
 * The amount of restitution inside the slider limits.
 *
*/
static PARAM_LINEAR_MOTION_RESTITUTION: 6;

/**
 * The amount of damping inside the slider limits.
 *
*/
static PARAM_LINEAR_MOTION_DAMPING: 7;

/**
 * A factor applied to the movement across axes orthogonal to the slider.
 *
*/
static PARAM_LINEAR_ORTHOGONAL_SOFTNESS: 8;

/**
 * The amount of restitution when movement is across axes orthogonal to the slider.
 *
*/
static PARAM_LINEAR_ORTHOGONAL_RESTITUTION: 9;

/**
 * The amount of damping when movement is across axes orthogonal to the slider.
 *
*/
static PARAM_LINEAR_ORTHOGONAL_DAMPING: 10;

/**
 * The upper limit of rotation in the slider.
 *
*/
static PARAM_ANGULAR_LIMIT_UPPER: 11;

/**
 * The lower limit of rotation in the slider.
 *
*/
static PARAM_ANGULAR_LIMIT_LOWER: 12;

/**
 * A factor applied to the all rotation once the limit is surpassed.
 *
*/
static PARAM_ANGULAR_LIMIT_SOFTNESS: 13;

/**
 * The amount of restitution of the rotation when the limit is surpassed.
 *
*/
static PARAM_ANGULAR_LIMIT_RESTITUTION: 14;

/**
 * The amount of damping of the rotation when the limit is surpassed.
 *
*/
static PARAM_ANGULAR_LIMIT_DAMPING: 15;

/**
 * A factor applied to the all rotation in the limits.
 *
*/
static PARAM_ANGULAR_MOTION_SOFTNESS: 16;

/**
 * The amount of restitution of the rotation in the limits.
 *
*/
static PARAM_ANGULAR_MOTION_RESTITUTION: 17;

/**
 * The amount of damping of the rotation in the limits.
 *
*/
static PARAM_ANGULAR_MOTION_DAMPING: 18;

/**
 * A factor applied to the all rotation across axes orthogonal to the slider.
 *
*/
static PARAM_ANGULAR_ORTHOGONAL_SOFTNESS: 19;

/**
 * The amount of restitution of the rotation across axes orthogonal to the slider.
 *
*/
static PARAM_ANGULAR_ORTHOGONAL_RESTITUTION: 20;

/**
 * The amount of damping of the rotation across axes orthogonal to the slider.
 *
*/
static PARAM_ANGULAR_ORTHOGONAL_DAMPING: 21;

/**
 * Represents the size of the [enum Param] enum.
 *
*/
static PARAM_MAX: 22;


  
}


 
