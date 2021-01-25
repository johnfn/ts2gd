
/**
 * Base class for audio streams. Audio streams are used for sound effects and music playback, and support WAV (via [AudioStreamSample]) and OGG (via [AudioStreamOGGVorbis]) file formats.
 *
*/
declare class AudioStream extends Resource {

  
/**
 * Base class for audio streams. Audio streams are used for sound effects and music playback, and support WAV (via [AudioStreamSample]) and OGG (via [AudioStreamOGGVorbis]) file formats.
 *
*/
  "new"(): AudioStream;
  static "new"(): AudioStream;




/** Returns the length of the audio stream in seconds. */
get_length(): float;

  connect<T extends SignalsOf<AudioStream>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
