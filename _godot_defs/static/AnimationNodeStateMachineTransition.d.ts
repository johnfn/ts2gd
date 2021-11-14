
/**
*/
declare class AnimationNodeStateMachineTransition extends Resource  {

  
/**
*/
  new(): AnimationNodeStateMachineTransition; 
  static "new"(): AnimationNodeStateMachineTransition 


/**
 * Turn on auto advance when this condition is set. The provided name will become a boolean parameter on the [AnimationTree] that can be controlled from code (see [url=https://docs.godotengine.org/en/3.4/tutorials/animation/animation_tree.html#controlling-from-code][/url]). For example, if [member AnimationTree.tree_root] is an [AnimationNodeStateMachine] and [member advance_condition] is set to `"idle"`:
 *
 * @example 
 * 
 * $animation_tree["parameters/conditions/idle"] = is_on_floor and (linear_velocity.x == 0)
 * @summary 
 * 
 *
*/
advance_condition: string;

/** Turn on the transition automatically when this state is reached. This works best with [constant SWITCH_MODE_AT_END]. */
auto_advance: boolean;

/** Don't use this transition during [method AnimationNodeStateMachinePlayback.travel] or [member auto_advance]. */
disabled: boolean;

/** Lower priority transitions are preferred when travelling through the tree via [method AnimationNodeStateMachinePlayback.travel] or [member auto_advance]. */
priority: int;

/** The transition type. */
switch_mode: int;

/** The time to cross-fade between this state and the next. */
xfade_time: float;



  connect<T extends SignalsOf<AnimationNodeStateMachineTransition>>(signal: T, method: SignalFunction<AnimationNodeStateMachineTransition[T]>): number;



/**
 * Switch to the next state immediately. The current state will end and blend into the beginning of the new one.
 *
*/
static SWITCH_MODE_IMMEDIATE: any;

/**
 * Switch to the next state immediately, but will seek the new state to the playback position of the old state.
 *
*/
static SWITCH_MODE_SYNC: any;

/**
 * Wait for the current state playback to end, then switch to the beginning of the next state animation.
 *
*/
static SWITCH_MODE_AT_END: any;


/**
 * Emitted when [member advance_condition] is changed.
 *
*/
$advance_condition_changed: Signal<() => void>

}

