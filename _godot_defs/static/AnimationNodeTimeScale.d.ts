
/**
 * Allows scaling the speed of the animation (or reversing it) in any children nodes. Setting it to 0 will pause the animation.
 *
*/
declare class AnimationNodeTimeScale extends AnimationNode {

  
/**
 * Allows scaling the speed of the animation (or reversing it) in any children nodes. Setting it to 0 will pause the animation.
 *
*/
  "new"(): AnimationNodeTimeScale;
  static "new"(): AnimationNodeTimeScale;






  // connect<T extends SignalsOf<AnimationNodeTimeScale>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AnimationNodeTimeScaleSignals>>(signal: T, method: SignalFunction<AnimationNodeTimeScaleSignals[T]>): number;




}

declare class AnimationNodeTimeScaleSignals extends AnimationNodeSignals {
  
}
