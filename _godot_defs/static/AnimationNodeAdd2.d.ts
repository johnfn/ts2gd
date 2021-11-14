
/**
 * A resource to add to an [AnimationNodeBlendTree]. Blends two animations additively based on an amount value in the `[0.0, 1.0]` range.
 *
*/
declare class AnimationNodeAdd2 extends AnimationNode  {

  
/**
 * A resource to add to an [AnimationNodeBlendTree]. Blends two animations additively based on an amount value in the `[0.0, 1.0]` range.
 *
*/
  new(): AnimationNodeAdd2; 
  static "new"(): AnimationNodeAdd2 


/** If [code]true[/code], sets the [code]optimization[/code] to [code]false[/code] when calling [method AnimationNode.blend_input], forcing the blended animations to update every frame. */
sync: boolean;



  connect<T extends SignalsOf<AnimationNodeAdd2>>(signal: T, method: SignalFunction<AnimationNodeAdd2[T]>): number;






}

