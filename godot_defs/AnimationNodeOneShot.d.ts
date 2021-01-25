
/**
 * A resource to add to an [AnimationNodeBlendTree]. This node will execute a sub-animation and return once it finishes. Blend times for fading in and out can be customized, as well as filters.
 *
*/
declare class AnimationNodeOneShot extends AnimationNode {

  
/**
 * A resource to add to an [AnimationNodeBlendTree]. This node will execute a sub-animation and return once it finishes. Blend times for fading in and out can be customized, as well as filters.
 *
*/
  "new"(): AnimationNodeOneShot;
  static "new"(): AnimationNodeOneShot;



/** If [code]true[/code], the sub-animation will restart automatically after finishing. */
autorestart: boolean;

/** The delay after which the automatic restart is triggered, in seconds. */
autorestart_delay: float;

/** If [member autorestart] is [code]true[/code], a random additional delay (in seconds) between 0 and this value will be added to [member autorestart_delay]. */
autorestart_random_delay: float;




/** No documentation provided. */
get_mix_mode(): int;

/** No documentation provided. */
set_mix_mode(mode: int): void;

  connect<T extends SignalsOf<AnimationNodeOneShot>, U extends Node>(signal: T, node: U, method: keyof U): number;



/** No documentation provided. */
static MIX_MODE_BLEND: 0;

/** No documentation provided. */
static MIX_MODE_ADD: 1;


  
}
