
/**
 * A resource to add to an [AnimationNodeBlendTree]. Blends two animations together additively out of three based on a value in the `[-1.0, 1.0]` range.
 *
 * This node has three inputs:
 *
 * - The base animation to add to
 *
 * - A -add animation to blend with when the blend amount is in the `[-1.0, 0.0]` range.
 *
 * - A +add animation to blend with when the blend amount is in the `[0.0, 1.0]` range
 *
*/
declare class AnimationNodeAdd3 extends AnimationNode  {

  
/**
 * A resource to add to an [AnimationNodeBlendTree]. Blends two animations together additively out of three based on a value in the `[-1.0, 1.0]` range.
 *
 * This node has three inputs:
 *
 * - The base animation to add to
 *
 * - A -add animation to blend with when the blend amount is in the `[-1.0, 0.0]` range.
 *
 * - A +add animation to blend with when the blend amount is in the `[0.0, 1.0]` range
 *
*/
  new(): AnimationNodeAdd3; 
  static "new"(): AnimationNodeAdd3 


/** If [code]true[/code], sets the [code]optimization[/code] to [code]false[/code] when calling [method AnimationNode.blend_input], forcing the blended animations to update every frame. */
sync: boolean;



  connect<T extends SignalsOf<AnimationNodeAdd3>>(signal: T, method: SignalFunction<AnimationNodeAdd3[T]>): number;






}

