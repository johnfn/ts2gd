
/**
*/
declare class AnimationNodeOutput extends AnimationNode {

  
/**
*/
  "new"(): AnimationNodeOutput;
  static "new"(): AnimationNodeOutput;






  connect<T extends SignalsOf<AnimationNodeOutput>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
