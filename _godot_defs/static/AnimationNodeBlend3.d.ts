
/**
 * A resource to add to an [AnimationNodeBlendTree]. Blends two animations together linearly out of three based on a value in the `[-1.0, 1.0]` range.
 *
 * This node has three inputs:
 *
 * - The base animation
 *
 * - A -blend animation to blend with when the blend amount is in the `[-1.0, 0.0]` range.
 *
 * - A +blend animation to blend with when the blend amount is in the `[0.0, 1.0]` range
 *
*/
declare class AnimationNodeBlend3 extends AnimationNode {

  
/**
 * A resource to add to an [AnimationNodeBlendTree]. Blends two animations together linearly out of three based on a value in the `[-1.0, 1.0]` range.
 *
 * This node has three inputs:
 *
 * - The base animation
 *
 * - A -blend animation to blend with when the blend amount is in the `[-1.0, 0.0]` range.
 *
 * - A +blend animation to blend with when the blend amount is in the `[0.0, 1.0]` range
 *
*/
  "new"(): AnimationNodeBlend3;
  static "new"(): AnimationNodeBlend3;



/** If [code]true[/code], sets the [code]optimization[/code] to [code]false[/code] when calling [method AnimationNode.blend_input], forcing the blended animations to update every frame. */
sync: boolean;



  // connect<T extends SignalsOf<AnimationNodeBlend3>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AnimationNodeBlend3Signals>>(signal: T, method: SignalFunction<AnimationNodeBlend3Signals[T]>): number;




}

declare class AnimationNodeBlend3Signals extends AnimationNodeSignals {
  
}
