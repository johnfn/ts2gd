
/**
 * A resource to add to an [AnimationNodeBlendTree]. Blends two animations linearly based on an amount value in the `[0.0, 1.0]` range.
 *
*/
declare class AnimationNodeBlend2 extends AnimationNode {

  
/**
 * A resource to add to an [AnimationNodeBlendTree]. Blends two animations linearly based on an amount value in the `[0.0, 1.0]` range.
 *
*/
  "new"(): AnimationNodeBlend2;
  static "new"(): AnimationNodeBlend2;



/** If [code]true[/code], sets the [code]optimization[/code] to [code]false[/code] when calling [method AnimationNode.blend_input], forcing the blended animations to update every frame. */
sync: boolean;



  // connect<T extends SignalsOf<AnimationNodeBlend2>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AnimationNodeBlend2Signals>>(signal: T, method: SignalFunction<AnimationNodeBlend2Signals[T]>): number;




}

declare class AnimationNodeBlend2Signals extends AnimationNodeSignals {
  
}
