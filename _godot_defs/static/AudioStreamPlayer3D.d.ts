
/**
 * Plays a sound effect with directed sound effects, dampens with distance if needed, generates effect of hearable position in space.
 *
 * By default, audio is heard from the camera position. This can be changed by adding a [Listener] node to the scene and enabling it by calling [method Listener.make_current] on it.
 *
*/
declare class AudioStreamPlayer3D extends Spatial {

  
/**
 * Plays a sound effect with directed sound effects, dampens with distance if needed, generates effect of hearable position in space.
 *
 * By default, audio is heard from the camera position. This can be changed by adding a [Listener] node to the scene and enabling it by calling [method Listener.make_current] on it.
 *
*/
  "new"(): AudioStreamPlayer3D;
  static "new"(): AudioStreamPlayer3D;



/** Areas in which this sound plays. */
area_mask: int;

/** Dampens audio above this frequency, in Hz. */
attenuation_filter_cutoff_hz: float;

/** Amount how much the filter affects the loudness, in dB. */
attenuation_filter_db: float;

/** Decides if audio should get quieter with distance linearly, quadratically, logarithmically, or not be affected by distance, effectively disabling attenuation. */
attenuation_model: int;

/** If [code]true[/code], audio plays when added to scene tree. */
autoplay: boolean;

/** Bus on which this audio is playing. */
bus: string;

/** Decides in which step the Doppler effect should be calculated. */
doppler_tracking: int;

/** The angle in which the audio reaches cameras undampened. */
emission_angle_degrees: float;

/** If [code]true[/code], the audio should be dampened according to the direction of the sound. */
emission_angle_enabled: boolean;

/** Dampens audio if camera is outside of [member emission_angle_degrees] and [member emission_angle_enabled] is set by this factor, in dB. */
emission_angle_filter_attenuation_db: float;

/** Sets the absolute maximum of the soundlevel, in dB. */
max_db: float;

/** Sets the distance from which the [member out_of_range_mode] takes effect. Has no effect if set to 0. */
max_distance: float;

/** Decides if audio should pause when source is outside of [member max_distance] range. */
out_of_range_mode: int;

/** The pitch and the tempo of the audio, as a multiplier of the audio sample's sample rate. */
pitch_scale: float;

/** If [code]true[/code], audio is playing. */
playing: boolean;

/** The [AudioStream] object to be played. */
stream: AudioStream;

/** If [code]true[/code], the playback is paused. You can resume it by setting [code]stream_paused[/code] to [code]false[/code]. */
stream_paused: boolean;

/** Base sound level unaffected by dampening, in dB. */
unit_db: float;

/** Factor for the attenuation effect. */
unit_size: float;

/** Returns the position in the [AudioStream]. */
get_playback_position(): float;

/** Returns the [AudioStreamPlayback] object associated with this [AudioStreamPlayer3D]. */
get_stream_playback(): AudioStreamPlayback;

/** Plays the audio from the given position [code]from_position[/code], in seconds. */
play(from_position?: float): void;

/** Sets the position from which audio will be played, in seconds. */
seek(to_position: float): void;

/** Stops the audio. */
stop(): void;

  connect<T extends SignalsOf<AudioStreamPlayer3D>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Linear dampening of loudness according to distance.
 *
*/
static ATTENUATION_INVERSE_DISTANCE: 0;

/**
 * Squared dampening of loudness according to distance.
 *
*/
static ATTENUATION_INVERSE_SQUARE_DISTANCE: 1;

/**
 * Logarithmic dampening of loudness according to distance.
 *
*/
static ATTENUATION_LOGARITHMIC: 2;

/**
 * No dampening of loudness according to distance.
 *
*/
static ATTENUATION_DISABLED: 3;

/**
 * Mix this audio in, even when it's out of range.
 *
*/
static OUT_OF_RANGE_MIX: 0;

/**
 * Pause this audio when it gets out of range.
 *
*/
static OUT_OF_RANGE_PAUSE: 1;

/**
 * Disables doppler tracking.
 *
*/
static DOPPLER_TRACKING_DISABLED: 0;

/**
 * Executes doppler tracking in idle step.
 *
*/
static DOPPLER_TRACKING_IDLE_STEP: 1;

/**
 * Executes doppler tracking in physics step.
 *
*/
static DOPPLER_TRACKING_PHYSICS_STEP: 2;


  /**
 * Emitted when the audio stops playing.
 *
*/
finished: Signal<() => void>

}
