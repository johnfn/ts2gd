
/**
 * Plays an audio stream non-positionally.
 *
 * To play audio positionally, use [AudioStreamPlayer2D] or [AudioStreamPlayer3D] instead of [AudioStreamPlayer].
 *
*/
declare class AudioStreamPlayer extends Node {

  
/**
 * Plays an audio stream non-positionally.
 *
 * To play audio positionally, use [AudioStreamPlayer2D] or [AudioStreamPlayer3D] instead of [AudioStreamPlayer].
 *
*/
  "new"(): AudioStreamPlayer;
  static "new"(): AudioStreamPlayer;



/** If [code]true[/code], audio plays when added to scene tree. */
autoplay: boolean;

/** Bus on which this audio is playing. */
bus: string;

/** If the audio configuration has more than two speakers, this sets the target channels. See [enum MixTarget] constants. */
mix_target: int;

/** The pitch and the tempo of the audio, as a multiplier of the audio sample's sample rate. */
pitch_scale: float;

/** If [code]true[/code], audio is playing. */
playing: boolean;

/** The [AudioStream] object to be played. */
stream: AudioStream;

/** If [code]true[/code], the playback is paused. You can resume it by setting [code]stream_paused[/code] to [code]false[/code]. */
stream_paused: boolean;

/** Volume of sound, in dB. */
volume_db: float;

/** Returns the position in the [AudioStream] in seconds. */
get_playback_position(): float;

/** Returns the [AudioStreamPlayback] object associated with this [AudioStreamPlayer]. */
get_stream_playback(): AudioStreamPlayback;

/** Plays the audio from the given [code]from_position[/code], in seconds. */
play(from_position?: float): void;

/** Sets the position from which audio will be played, in seconds. */
seek(to_position: float): void;

/** Stops the audio. */
stop(): void;

  // connect<T extends SignalsOf<AudioStreamPlayer>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AudioStreamPlayerSignals>>(signal: T, method: SignalFunction<AudioStreamPlayerSignals[T]>): number;



/**
 * The audio will be played only on the first channel.
 *
*/
static MIX_TARGET_STEREO: any;

/**
 * The audio will be played on all surround channels.
 *
*/
static MIX_TARGET_SURROUND: any;

/**
 * The audio will be played on the second channel, which is usually the center.
 *
*/
static MIX_TARGET_CENTER: any;

}

declare class AudioStreamPlayerSignals extends NodeSignals {
  /**
 * Emitted when the audio stops playing.
 *
*/
finished: Signal<() => void>

}
