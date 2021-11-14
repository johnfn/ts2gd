
/**
 * Plays audio that dampens with distance from screen center.
 *
 * See also [AudioStreamPlayer] to play a sound non-positionally.
 *
 * **Note:** Hiding an [AudioStreamPlayer2D] node does not disable its audio output. To temporarily disable an [AudioStreamPlayer2D]'s audio output, set [member volume_db] to a very low value like `-100` (which isn't audible to human hearing).
 *
*/
declare class AudioStreamPlayer2D extends Node2D  {

  
/**
 * Plays audio that dampens with distance from screen center.
 *
 * See also [AudioStreamPlayer] to play a sound non-positionally.
 *
 * **Note:** Hiding an [AudioStreamPlayer2D] node does not disable its audio output. To temporarily disable an [AudioStreamPlayer2D]'s audio output, set [member volume_db] to a very low value like `-100` (which isn't audible to human hearing).
 *
*/
  new(): AudioStreamPlayer2D; 
  static "new"(): AudioStreamPlayer2D 


/** Areas in which this sound plays. */
area_mask: int;

/** Dampens audio over distance with this as an exponent. */
attenuation: float;

/** If [code]true[/code], audio plays when added to scene tree. */
autoplay: boolean;

/** Bus on which this audio is playing. */
bus: string;

/** Maximum distance from which audio is still hearable. */
max_distance: float;

/** The pitch and the tempo of the audio, as a multiplier of the audio sample's sample rate. */
pitch_scale: float;

/** If [code]true[/code], audio is playing. */
playing: boolean;

/** The [AudioStream] object to be played. */
stream: AudioStream;

/** If [code]true[/code], the playback is paused. You can resume it by setting [code]stream_paused[/code] to [code]false[/code]. */
stream_paused: boolean;

/** Base volume without dampening. */
volume_db: float;

/** Returns the position in the [AudioStream]. */
get_playback_position(): float;

/** Returns the [AudioStreamPlayback] object associated with this [AudioStreamPlayer2D]. */
get_stream_playback(): AudioStreamPlayback;

/** Plays the audio from the given position [code]from_position[/code], in seconds. */
play(from_position?: float): void;

/** Sets the position from which audio will be played, in seconds. */
seek(to_position: float): void;

/** Stops the audio. */
stop(): void;

  connect<T extends SignalsOf<AudioStreamPlayer2D>>(signal: T, method: SignalFunction<AudioStreamPlayer2D[T]>): number;





/**
 * Emitted when the audio stops playing.
 *
*/
$finished: Signal<() => void>

}

