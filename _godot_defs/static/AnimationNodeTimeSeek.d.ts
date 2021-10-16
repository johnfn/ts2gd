
/**
 * This node can be used to cause a seek command to happen to any sub-children of the animation graph. Use this node type to play an [Animation] from the start or a certain playback position inside the [AnimationNodeBlendTree]. After setting the time and changing the animation playback, the seek node automatically goes into sleep mode on the next process frame by setting its `seek_position` value to `-1.0`.
 *
 * @example 
 * 
 * # Play child animation from the start.
 * animation_tree.set("parameters/Seek/seek_position", 0.0)
 * # Alternative syntax (same result as above).
 * animation_tree["parameters/Seek/seek_position"] = 0.0
 * # Play child animation from 12 second timestamp.
 * animation_tree.set("parameters/Seek/seek_position", 12.0)
 * # Alternative syntax (same result as above).
 * animation_tree["parameters/Seek/seek_position"] = 12.0
 * @summary 
 * 
 *
*/
declare class AnimationNodeTimeSeek extends AnimationNode {

  
/**
 * This node can be used to cause a seek command to happen to any sub-children of the animation graph. Use this node type to play an [Animation] from the start or a certain playback position inside the [AnimationNodeBlendTree]. After setting the time and changing the animation playback, the seek node automatically goes into sleep mode on the next process frame by setting its `seek_position` value to `-1.0`.
 *
 * @example 
 * 
 * # Play child animation from the start.
 * animation_tree.set("parameters/Seek/seek_position", 0.0)
 * # Alternative syntax (same result as above).
 * animation_tree["parameters/Seek/seek_position"] = 0.0
 * # Play child animation from 12 second timestamp.
 * animation_tree.set("parameters/Seek/seek_position", 12.0)
 * # Alternative syntax (same result as above).
 * animation_tree["parameters/Seek/seek_position"] = 12.0
 * @summary 
 * 
 *
*/
  "new"(): AnimationNodeTimeSeek;
  static "new"(): AnimationNodeTimeSeek;






  // connect<T extends SignalsOf<AnimationNodeTimeSeek>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AnimationNodeTimeSeekSignals>>(signal: T, method: SignalFunction<AnimationNodeTimeSeekSignals[T]>): number;




}

declare class AnimationNodeTimeSeekSignals extends AnimationNodeSignals {
  
}
