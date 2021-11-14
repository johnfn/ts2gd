
/**
 * [AudioServer] is a low-level server interface for audio access. It is in charge of creating sample data (playable audio) as well as its playback via a voice interface.
 *
*/
declare class AudioServerClass extends Object  {

  
/**
 * [AudioServer] is a low-level server interface for audio access. It is in charge of creating sample data (playable audio) as well as its playback via a voice interface.
 *
*/
  new(): AudioServerClass; 
  static "new"(): AudioServerClass 


/** Number of available audio buses. */
bus_count: int;

/** Name of the current device for audio output (see [method get_device_list]). */
device: string;

/** Scales the rate at which audio is played (i.e. setting it to [code]0.5[/code] will make the audio be played twice as fast). */
global_rate_scale: float;

/** Adds a bus at [code]at_position[/code]. */
add_bus(at_position?: int): void;

/** Adds an [AudioEffect] effect to the bus [code]bus_idx[/code] at [code]at_position[/code]. */
add_bus_effect(bus_idx: int, effect: AudioEffect, at_position?: int): void;

/** Name of the current device for audio input (see [method capture_get_device_list]). */
capture_get_device(): string;

/** Returns the names of all audio input devices detected on the system. */
capture_get_device_list(): any[];

/** Sets which audio input device is used for audio capture. */
capture_set_device(name: string): void;

/** Generates an [AudioBusLayout] using the available buses and effects. */
generate_bus_layout(): AudioBusLayout;

/** Returns the amount of channels of the bus at index [code]bus_idx[/code]. */
get_bus_channels(bus_idx: int): int;

/** Returns the [AudioEffect] at position [code]effect_idx[/code] in bus [code]bus_idx[/code]. */
get_bus_effect(bus_idx: int, effect_idx: int): AudioEffect;

/** Returns the number of effects on the bus at [code]bus_idx[/code]. */
get_bus_effect_count(bus_idx: int): int;

/** Returns the [AudioEffectInstance] assigned to the given bus and effect indices (and optionally channel). */
get_bus_effect_instance(bus_idx: int, effect_idx: int, channel?: int): AudioEffectInstance;

/** Returns the index of the bus with the name [code]bus_name[/code]. */
get_bus_index(bus_name: string): int;

/** Returns the name of the bus with the index [code]bus_idx[/code]. */
get_bus_name(bus_idx: int): string;

/** Returns the peak volume of the left speaker at bus index [code]bus_idx[/code] and channel index [code]channel[/code]. */
get_bus_peak_volume_left_db(bus_idx: int, channel: int): float;

/** Returns the peak volume of the right speaker at bus index [code]bus_idx[/code] and channel index [code]channel[/code]. */
get_bus_peak_volume_right_db(bus_idx: int, channel: int): float;

/** Returns the name of the bus that the bus at index [code]bus_idx[/code] sends to. */
get_bus_send(bus_idx: int): string;

/** Returns the volume of the bus at index [code]bus_idx[/code] in dB. */
get_bus_volume_db(bus_idx: int): float;

/** Returns the names of all audio devices detected on the system. */
get_device_list(): any[];

/** Returns the sample rate at the output of the [AudioServer]. */
get_mix_rate(): float;

/** Returns the audio driver's output latency. */
get_output_latency(): float;

/** Returns the speaker configuration. */
get_speaker_mode(): int;

/** Returns the relative time since the last mix occurred. */
get_time_since_last_mix(): float;

/** Returns the relative time until the next mix occurs. */
get_time_to_next_mix(): float;

/** If [code]true[/code], the bus at index [code]bus_idx[/code] is bypassing effects. */
is_bus_bypassing_effects(bus_idx: int): boolean;

/** If [code]true[/code], the effect at index [code]effect_idx[/code] on the bus at index [code]bus_idx[/code] is enabled. */
is_bus_effect_enabled(bus_idx: int, effect_idx: int): boolean;

/** If [code]true[/code], the bus at index [code]bus_idx[/code] is muted. */
is_bus_mute(bus_idx: int): boolean;

/** If [code]true[/code], the bus at index [code]bus_idx[/code] is in solo mode. */
is_bus_solo(bus_idx: int): boolean;

/**
 * Locks the audio driver's main loop.
 *
 * **Note:** Remember to unlock it afterwards.
 *
*/
lock(): void;

/** Moves the bus from index [code]index[/code] to index [code]to_index[/code]. */
move_bus(index: int, to_index: int): void;

/** Removes the bus at index [code]index[/code]. */
remove_bus(index: int): void;

/** Removes the effect at index [code]effect_idx[/code] from the bus at index [code]bus_idx[/code]. */
remove_bus_effect(bus_idx: int, effect_idx: int): void;

/** If [code]true[/code], the bus at index [code]bus_idx[/code] is bypassing effects. */
set_bus_bypass_effects(bus_idx: int, enable: boolean): void;

/** If [code]true[/code], the effect at index [code]effect_idx[/code] on the bus at index [code]bus_idx[/code] is enabled. */
set_bus_effect_enabled(bus_idx: int, effect_idx: int, enabled: boolean): void;

/** Overwrites the currently used [AudioBusLayout]. */
set_bus_layout(bus_layout: AudioBusLayout): void;

/** If [code]true[/code], the bus at index [code]bus_idx[/code] is muted. */
set_bus_mute(bus_idx: int, enable: boolean): void;

/** Sets the name of the bus at index [code]bus_idx[/code] to [code]name[/code]. */
set_bus_name(bus_idx: int, name: string): void;

/** Connects the output of the bus at [code]bus_idx[/code] to the bus named [code]send[/code]. */
set_bus_send(bus_idx: int, send: string): void;

/** If [code]true[/code], the bus at index [code]bus_idx[/code] is in solo mode. */
set_bus_solo(bus_idx: int, enable: boolean): void;

/** Sets the volume of the bus at index [code]bus_idx[/code] to [code]volume_db[/code]. */
set_bus_volume_db(bus_idx: int, volume_db: float): void;

/** Swaps the position of two effects in bus [code]bus_idx[/code]. */
swap_bus_effects(bus_idx: int, effect_idx: int, by_effect_idx: int): void;

/** Unlocks the audio driver's main loop. (After locking it, you should always unlock it.) */
unlock(): void;

  connect<T extends SignalsOf<AudioServerClass>>(signal: T, method: SignalFunction<AudioServerClass[T]>): number;



/**
 * Two or fewer speakers were detected.
 *
*/
static SPEAKER_MODE_STEREO: any;

/**
 * A 3.1 channel surround setup was detected.
 *
*/
static SPEAKER_SURROUND_31: any;

/**
 * A 5.1 channel surround setup was detected.
 *
*/
static SPEAKER_SURROUND_51: any;

/**
 * A 7.1 channel surround setup was detected.
 *
*/
static SPEAKER_SURROUND_71: any;


/**
 * Emitted when the [AudioBusLayout] changes.
 *
*/
$bus_layout_changed: Signal<() => void>

}

