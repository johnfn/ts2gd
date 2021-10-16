
/**
 * AudioEffectCapture is an AudioEffect which copies all audio frames from the attached audio effect bus into its internal ring buffer.
 *
 * Application code should consume these audio frames from this ring buffer using [method get_buffer] and process it as needed, for example to capture data from a microphone, implement application defined effects, or to transmit audio over the network.
 *
*/
declare class AudioEffectCapture extends AudioEffect {

  
/**
 * AudioEffectCapture is an AudioEffect which copies all audio frames from the attached audio effect bus into its internal ring buffer.
 *
 * Application code should consume these audio frames from this ring buffer using [method get_buffer] and process it as needed, for example to capture data from a microphone, implement application defined effects, or to transmit audio over the network.
 *
*/
  "new"(): AudioEffectCapture;
  static "new"(): AudioEffectCapture;



/** Length of the internal ring buffer, in seconds. Setting the buffer length will have no effect if already initialized. */
buffer_length: float;

/** Returns [code]true[/code] if at least [code]frames[/code] audio frames are available to read in the internal ring buffer. */
can_get_buffer(frames: int): boolean;

/** Clears the internal ring buffer. */
clear_buffer(): void;

/**
 * Gets the next `frames` audio samples from the internal ring buffer.
 *
 * Returns a [PoolVector2Array] containing exactly `frames` audio samples if available, or an empty [PoolVector2Array] if insufficient data was available.
 *
*/
get_buffer(frames: int): PoolVector2Array;

/** Returns the total size of the internal ring buffer in frames. */
get_buffer_length_frames(): int;

/** Returns the number of audio frames discarded from the audio bus due to full buffer. */
get_discarded_frames(): int;

/** Returns the number of frames available to read using [method get_buffer]. */
get_frames_available(): int;

/** Returns the number of audio frames inserted from the audio bus. */
get_pushed_frames(): int;

  // connect<T extends SignalsOf<AudioEffectCapture>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AudioEffectCaptureSignals>>(signal: T, method: SignalFunction<AudioEffectCaptureSignals[T]>): number;




}

declare class AudioEffectCaptureSignals extends AudioEffectSignals {
  
}
