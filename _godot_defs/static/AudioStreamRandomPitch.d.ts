
/**
 * Randomly varies pitch on each start.
 *
*/
declare class AudioStreamRandomPitch extends AudioStream {

  
/**
 * Randomly varies pitch on each start.
 *
*/
  "new"(): AudioStreamRandomPitch;
  static "new"(): AudioStreamRandomPitch;



/** The current [AudioStream]. */
audio_stream: AudioStream;

/** The intensity of random pitch variation. */
random_pitch: float;



  connect<T extends SignalsOf<AudioStreamRandomPitch>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
