
/**
*/
declare class AnimationRootNode extends AnimationNode  {

  
/**
*/
  new(): AnimationRootNode; 
  static "new"(): AnimationRootNode 





  connect<T extends SignalsOf<AnimationRootNode>>(signal: T, method: SignalFunction<AnimationRootNode[T]>): number;






}

