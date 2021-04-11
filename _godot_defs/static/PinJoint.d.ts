
/**
 * Pin joint for 3D rigid bodies. It pins 2 bodies (rigid or static) together.
 *
*/
declare class PinJoint extends Joint {

  
/**
 * Pin joint for 3D rigid bodies. It pins 2 bodies (rigid or static) together.
 *
*/
  "new"(): PinJoint;
  static "new"(): PinJoint;



/** The force with which the pinned objects stay in positional relation to each other. The higher, the stronger. */
"params/bias": float;

/** The force with which the pinned objects stay in velocity relation to each other. The higher, the stronger. */
"params/damping": float;

/** If above 0, this value is the maximum value for an impulse that this Joint produces. */
"params/impulse_clamp": float;

/** Returns the value of the specified parameter. */
get_param(param: int): float;

/** Sets the value of the specified parameter. */
set_param(param: int, value: float): void;

  connect<T extends SignalsOf<PinJoint>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * The force with which the pinned objects stay in positional relation to each other. The higher, the stronger.
 *
*/
static PARAM_BIAS: 0;

/**
 * The force with which the pinned objects stay in velocity relation to each other. The higher, the stronger.
 *
*/
static PARAM_DAMPING: 1;

/**
 * If above 0, this value is the maximum value for an impulse that this Joint produces.
 *
*/
static PARAM_IMPULSE_CLAMP: 2;


  
}
