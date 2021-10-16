
/**
*/
declare class AnimationRootNode extends AnimationNode {

  
/**
*/
  "new"(): AnimationRootNode;
  static "new"(): AnimationRootNode;






  // connect<T extends SignalsOf<AnimationRootNode>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AnimationRootNodeSignals>>(signal: T, method: SignalFunction<AnimationRootNodeSignals[T]>): number;




}

declare class AnimationRootNodeSignals extends AnimationNodeSignals {
  
}
