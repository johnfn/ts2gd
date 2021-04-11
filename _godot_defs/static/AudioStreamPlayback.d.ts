
/**
 * Can play, loop, pause a scroll through audio. See [AudioStream] and [AudioStreamOGGVorbis] for usage.
 *
*/
declare class AudioStreamPlayback extends Reference {

  
/**
 * Can play, loop, pause a scroll through audio. See [AudioStream] and [AudioStreamOGGVorbis] for usage.
 *
*/
  "new"(): AudioStreamPlayback;
  static "new"(): AudioStreamPlayback;






  connect<T extends SignalsOf<AudioStreamPlayback>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
