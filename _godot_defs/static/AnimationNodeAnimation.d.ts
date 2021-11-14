
/**
 * A resource to add to an [AnimationNodeBlendTree]. Only features one output set using the [member animation] property. Use it as an input for [AnimationNode] that blend animations together.
 *
*/
declare class AnimationNodeAnimation extends AnimationRootNode  {

  
/**
 * A resource to add to an [AnimationNodeBlendTree]. Only features one output set using the [member animation] property. Use it as an input for [AnimationNode] that blend animations together.
 *
*/
  new(): AnimationNodeAnimation; 
  static "new"(): AnimationNodeAnimation 


/** Animation to use as an output. It is one of the animations provided by [member AnimationTree.anim_player]. */
animation: string;



  connect<T extends SignalsOf<AnimationNodeAnimation>>(signal: T, method: SignalFunction<AnimationNodeAnimation[T]>): number;






}

