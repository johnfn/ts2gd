
/**
 * Plays a sound effect with directed sound effects, dampens with distance if needed, generates effect of hearable position in space. For greater realism, a low-pass filter is automatically applied to distant sounds. This can be disabled by setting [member attenuation_filter_cutoff_hz] to `20500`.
 *
 * By default, audio is heard from the camera position. This can be changed by adding a [Listener] node to the scene and enabling it by calling [method Listener.make_current] on it.
 *
 * See also [AudioStreamPlayer] to play a sound non-positionally.
 *
 * **Note:** Hiding an [AudioStreamPlayer3D] node does not disable its audio output. To temporarily disable an [AudioStreamPlayer3D]'s audio output, set [member unit_db] to a very low value like `-100` (which isn't audible to human hearing).
 *
*/
declare class AudioStreamPlayer3D extends Spatial  {

  
/**
 * Plays a sound effect with directed sound effects, dampens with distance if needed, generates effect of hearable position in space. For greater realism, a low-pass filter is automatically applied to distant sounds. This can be disabled by setting [member attenuation_filter_cutoff_hz] to `20500`.
 *
 * By default, audio is heard from the camera position. This can be changed by adding a [Listener] node to the scene and enabling it by calling [method Listener.make_current] on it.
 *
 * See also [AudioStreamPlayer] to play a sound non-positionally.
 *
 * **Note:** Hiding an [AudioStreamPlayer3D] node does not disable its audio output. To temporarily disable an [AudioStreamPlayer3D]'s audio output, set [member unit_db] to a very low value like `-100` (which isn't audible to human hearing).
 *
*/
  new(): AudioStreamPlayer3D; 
  static "new"(): AudioStreamPlayer3D 


/** Areas in which this sound plays. */
area_mask: int;

/** Dampens audio using a low-pass filter above this frequency, in Hz. To disable the dampening effect entirely, set this to [code]20500[/code] as this frequency is above the human hearing limit. */
attenuation_filter_cutoff_hz: float;

/** Amount how much the filter affects the loudness, in decibels. */
attenuation_filter_db: float;

/** Decides if audio should get quieter with distance linearly, quadratically, logarithmically, or not be affected by distance, effectively disabling attenuation. */
attenuation_model: int;

/** If [code]true[/code], audio plays when the AudioStreamPlayer3D node is added to scene tree. */
autoplay: boolean;

/** The bus on which this audio is playing. */
bus: string;

/**
 * Decides in which step the [url=https://en.wikipedia.org/wiki/Doppler_effect]Doppler effect[/url] should be calculated.
 *
 * **Note:** Only effective if the current [Camera]'s [member Camera.doppler_tracking] property is set to a value other than [constant Camera.DOPPLER_TRACKING_DISABLED].
 *
*/
doppler_tracking: int;

/** The angle in which the audio reaches cameras undampened. */
emission_angle_degrees: float;

/** If [code]true[/code], the audio should be dampened according to the direction of the sound. */
emission_angle_enabled: boolean;

/** Dampens audio if camera is outside of [member emission_angle_degrees] and [member emission_angle_enabled] is set by this factor, in decibels. */
emission_angle_filter_attenuation_db: float;

/** Sets the absolute maximum of the soundlevel, in decibels. */
max_db: float;

/** Sets the distance from which the [member out_of_range_mode] takes effect. Has no effect if set to 0. */
max_distance: float;

/** Decides if audio should pause when source is outside of [member max_distance] range. */
out_of_range_mode: int;

/** The pitch and the tempo of the audio, as a multiplier of the audio sample's sample rate. */
pitch_scale: float;

/** If [code]true[/code], audio is playing. */
playing: boolean;

/** The [AudioStream] resource to be played. */
stream: AudioStream;

/** If [code]true[/code], the playback is paused. You can resume it by setting [member stream_paused] to [code]false[/code]. */
stream_paused: boolean;

/** The base sound level unaffected by dampening, in decibels. */
unit_db: float;

/** The factor for the attenuation effect. Higher values make the sound audible over a larger distance. */
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

  connect<T extends SignalsOf<AudioStreamPlayer3D>>(signal: T, method: SignalFunction<AudioStreamPlayer3D[T]>): number;



/**
 * Linear dampening of loudness according to distance.
 *
*/
static ATTENUATION_INVERSE_DISTANCE: any;

/**
 * Squared dampening of loudness according to distance.
 *
*/
static ATTENUATION_INVERSE_SQUARE_DISTANCE: any;

/**
 * Logarithmic dampening of loudness according to distance.
 *
*/
static ATTENUATION_LOGARITHMIC: any;

/**
 * No dampening of loudness according to distance. The sound will still be heard positionally, unlike an [AudioStreamPlayer]. [constant ATTENUATION_DISABLED] can be combined with a [member max_distance] value greater than `0.0` to achieve linear attenuation clamped to a sphere of a defined size.
 *
*/
static ATTENUATION_DISABLED: any;

/**
 * Mix this audio in, even when it's out of range. This increases CPU usage, but keeps the sound playing at the correct position if the camera leaves and enters the [AudioStreamPlayer3D]'s [member max_distance] radius.
 *
*/
static OUT_OF_RANGE_MIX: any;

/**
 * Pause this audio when it gets out of range. This decreases CPU usage, but will cause the sound to restart if the camera leaves and enters the [AudioStreamPlayer3D]'s [member max_distance] radius.
 *
*/
static OUT_OF_RANGE_PAUSE: any;

/**
 * Disables doppler tracking.
 *
*/
static DOPPLER_TRACKING_DISABLED: any;

/**
 * Executes doppler tracking in idle step (every rendered frame).
 *
*/
static DOPPLER_TRACKING_IDLE_STEP: any;

/**
 * Executes doppler tracking in physics step (every simulated physics frame).
 *
*/
static DOPPLER_TRACKING_PHYSICS_STEP: any;


/**
 * Emitted when the audio stops playing.
 *
*/
$finished: Signal<() => void>

}

