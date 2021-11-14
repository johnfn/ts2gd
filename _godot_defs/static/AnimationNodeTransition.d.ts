
/**
 * Simple state machine for cases which don't require a more advanced [AnimationNodeStateMachine]. Animations can be connected to the inputs and transition times can be specified.
 *
*/
declare class AnimationNodeTransition extends AnimationNode  {

  
/**
 * Simple state machine for cases which don't require a more advanced [AnimationNodeStateMachine]. Animations can be connected to the inputs and transition times can be specified.
 *
*/
  new(): AnimationNodeTransition; 
  static "new"(): AnimationNodeTransition 


/** The number of available input ports for this node. */
input_count: int;

/** Cross-fading time (in seconds) between each animation connected to the inputs. */
xfade_time: float;

/** No documentation provided. */
get_input_caption(input: int): string;

/** No documentation provided. */
is_input_set_as_auto_advance(input: int): boolean;

/** No documentation provided. */
set_input_as_auto_advance(input: int, enable: boolean): void;

/** No documentation provided. */
set_input_caption(input: int, caption: string): void;

  connect<T extends SignalsOf<AnimationNodeTransition>>(signal: T, method: SignalFunction<AnimationNodeTransition[T]>): number;






}

