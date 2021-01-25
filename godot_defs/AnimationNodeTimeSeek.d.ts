
/**
 * This node can be used to cause a seek command to happen to any sub-children of the graph. After setting the time, this value returns to -1.
 *
*/
declare class AnimationNodeTimeSeek extends AnimationNode {

  
/**
 * This node can be used to cause a seek command to happen to any sub-children of the graph. After setting the time, this value returns to -1.
 *
*/
  "new"(): AnimationNodeTimeSeek;
  static "new"(): AnimationNodeTimeSeek;






  connect<T extends SignalsOf<AnimationNodeTimeSeek>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
