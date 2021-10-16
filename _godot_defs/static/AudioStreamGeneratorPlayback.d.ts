
/**
 * This class is meant to be used with [AudioStreamGenerator] to play back the generated audio in real-time.
 *
*/
declare class AudioStreamGeneratorPlayback extends AudioStreamPlaybackResampled {

  
/**
 * This class is meant to be used with [AudioStreamGenerator] to play back the generated audio in real-time.
 *
*/
  "new"(): AudioStreamGeneratorPlayback;
  static "new"(): AudioStreamGeneratorPlayback;




/** Returns [code]true[/code] if a buffer of the size [code]amount[/code] can be pushed to the audio sample data buffer without overflowing it, [code]false[/code] otherwise. */
can_push_buffer(amount: int): boolean;

/** Clears the audio sample data buffer. */
clear_buffer(): void;

/** Returns the number of audio data frames left to play. If this returned number reaches [code]0[/code], the audio will stop playing until frames are added again. Therefore, make sure your script can always generate and push new audio frames fast enough to avoid audio cracking. */
get_frames_available(): int;

/** No documentation provided. */
get_skips(): int;

/** Pushes several audio data frames to the buffer. This is usually more efficient than [method push_frame] in C# and compiled languages via GDNative, but [method push_buffer] may be [i]less[/i] efficient in GDScript. */
push_buffer(frames: PoolVector2Array): boolean;

/** Pushes a single audio data frame to the buffer. This is usually less efficient than [method push_buffer] in C# and compiled languages via GDNative, but [method push_frame] may be [i]more[/i] efficient in GDScript. */
push_frame(frame: Vector2): boolean;

  // connect<T extends SignalsOf<AudioStreamGeneratorPlayback>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AudioStreamGeneratorPlaybackSignals>>(signal: T, method: SignalFunction<AudioStreamGeneratorPlaybackSignals[T]>): number;




}

declare class AudioStreamGeneratorPlaybackSignals extends AudioStreamPlaybackResampledSignals {
  
}
