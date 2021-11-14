
/**
*/
declare class AnimationNodeOutput extends AnimationNode  {

  
/**
*/
  new(): AnimationNodeOutput; 
  static "new"(): AnimationNodeOutput 





  connect<T extends SignalsOf<AnimationNodeOutput>>(signal: T, method: SignalFunction<AnimationNodeOutput[T]>): number;






}

