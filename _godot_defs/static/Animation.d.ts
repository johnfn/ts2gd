
/**
 * An Animation resource contains data used to animate everything in the engine. Animations are divided into tracks, and each track must be linked to a node. The state of that node can be changed through time, by adding timed keys (events) to the track.
 *
 * @example 
 * 
 * # This creates an animation that makes the node "Enemy" move to the right by
 * # 100 pixels in 0.5 seconds.
 * var animation = Animation.new()
 * var track_index = animation.add_track(Animation.TYPE_VALUE)
 * animation.track_set_path(track_index, "Enemy:position:x")
 * animation.track_insert_key(track_index, 0.0, 0)
 * animation.track_insert_key(track_index, 0.5, 100)
 * @summary 
 * 
 *
 * Animations are just data containers, and must be added to nodes such as an [AnimationPlayer] or [AnimationTreePlayer] to be played back. Animation tracks have different types, each with its own set of dedicated methods. Check [enum TrackType] to see available types.
 *
*/
declare class Animation extends Resource  {

  
/**
 * An Animation resource contains data used to animate everything in the engine. Animations are divided into tracks, and each track must be linked to a node. The state of that node can be changed through time, by adding timed keys (events) to the track.
 *
 * @example 
 * 
 * # This creates an animation that makes the node "Enemy" move to the right by
 * # 100 pixels in 0.5 seconds.
 * var animation = Animation.new()
 * var track_index = animation.add_track(Animation.TYPE_VALUE)
 * animation.track_set_path(track_index, "Enemy:position:x")
 * animation.track_insert_key(track_index, 0.0, 0)
 * animation.track_insert_key(track_index, 0.5, 100)
 * @summary 
 * 
 *
 * Animations are just data containers, and must be added to nodes such as an [AnimationPlayer] or [AnimationTreePlayer] to be played back. Animation tracks have different types, each with its own set of dedicated methods. Check [enum TrackType] to see available types.
 *
*/
  new(): Animation; 
  static "new"(): Animation 


/**
 * The total length of the animation (in seconds).
 *
 * **Note:** Length is not delimited by the last key, as this one may be before or after the end to ensure correct interpolation and looping.
 *
*/
length: float;

/** A flag indicating that the animation must loop. This is used for correct interpolation of animation cycles, and for hinting the player that it must restart the animation. */
loop: boolean;

/** The animation step value. */
step: float;

/** Adds a track to the Animation. */
add_track(type: int, at_position?: int): int;

/** Returns the animation name at the key identified by [code]key_idx[/code]. The [code]track_idx[/code] must be the index of an Animation Track. */
animation_track_get_key_animation(track_idx: int, key_idx: int): string;

/** Inserts a key with value [code]animation[/code] at the given [code]time[/code] (in seconds). The [code]track_idx[/code] must be the index of an Animation Track. */
animation_track_insert_key(track_idx: int, time: float, animation: string): int;

/** Sets the key identified by [code]key_idx[/code] to value [code]animation[/code]. The [code]track_idx[/code] must be the index of an Animation Track. */
animation_track_set_key_animation(track_idx: int, key_idx: int, animation: string): void;

/**
 * Returns the end offset of the key identified by `key_idx`. The `track_idx` must be the index of an Audio Track.
 *
 * End offset is the number of seconds cut off at the ending of the audio stream.
 *
*/
audio_track_get_key_end_offset(track_idx: int, key_idx: int): float;

/**
 * Returns the start offset of the key identified by `key_idx`. The `track_idx` must be the index of an Audio Track.
 *
 * Start offset is the number of seconds cut off at the beginning of the audio stream.
 *
*/
audio_track_get_key_start_offset(track_idx: int, key_idx: int): float;

/** Returns the audio stream of the key identified by [code]key_idx[/code]. The [code]track_idx[/code] must be the index of an Audio Track. */
audio_track_get_key_stream(track_idx: int, key_idx: int): Resource;

/**
 * Inserts an Audio Track key at the given `time` in seconds. The `track_idx` must be the index of an Audio Track.
 *
 * `stream` is the [AudioStream] resource to play. `start_offset` is the number of seconds cut off at the beginning of the audio stream, while `end_offset` is at the ending.
 *
*/
audio_track_insert_key(track_idx: int, time: float, stream: Resource, start_offset?: float, end_offset?: float): int;

/** Sets the end offset of the key identified by [code]key_idx[/code] to value [code]offset[/code]. The [code]track_idx[/code] must be the index of an Audio Track. */
audio_track_set_key_end_offset(track_idx: int, key_idx: int, offset: float): void;

/** Sets the start offset of the key identified by [code]key_idx[/code] to value [code]offset[/code]. The [code]track_idx[/code] must be the index of an Audio Track. */
audio_track_set_key_start_offset(track_idx: int, key_idx: int, offset: float): void;

/** Sets the stream of the key identified by [code]key_idx[/code] to value [code]stream[/code]. The [code]track_idx[/code] must be the index of an Audio Track. */
audio_track_set_key_stream(track_idx: int, key_idx: int, stream: Resource): void;

/** Returns the in handle of the key identified by [code]key_idx[/code]. The [code]track_idx[/code] must be the index of a Bezier Track. */
bezier_track_get_key_in_handle(track_idx: int, key_idx: int): Vector2;

/** Returns the out handle of the key identified by [code]key_idx[/code]. The [code]track_idx[/code] must be the index of a Bezier Track. */
bezier_track_get_key_out_handle(track_idx: int, key_idx: int): Vector2;

/** Returns the value of the key identified by [code]key_idx[/code]. The [code]track_idx[/code] must be the index of a Bezier Track. */
bezier_track_get_key_value(track_idx: int, key_idx: int): float;

/**
 * Inserts a Bezier Track key at the given `time` in seconds. The `track_idx` must be the index of a Bezier Track.
 *
 * `in_handle` is the left-side weight of the added Bezier curve point, `out_handle` is the right-side one, while `value` is the actual value at this point.
 *
*/
bezier_track_insert_key(track_idx: int, time: float, value: float, in_handle?: Vector2, out_handle?: Vector2): int;

/** Returns the interpolated value at the given [code]time[/code] (in seconds). The [code]track_idx[/code] must be the index of a Bezier Track. */
bezier_track_interpolate(track_idx: int, time: float): float;

/** Sets the in handle of the key identified by [code]key_idx[/code] to value [code]in_handle[/code]. The [code]track_idx[/code] must be the index of a Bezier Track. */
bezier_track_set_key_in_handle(track_idx: int, key_idx: int, in_handle: Vector2): void;

/** Sets the out handle of the key identified by [code]key_idx[/code] to value [code]out_handle[/code]. The [code]track_idx[/code] must be the index of a Bezier Track. */
bezier_track_set_key_out_handle(track_idx: int, key_idx: int, out_handle: Vector2): void;

/** Sets the value of the key identified by [code]key_idx[/code] to the given value. The [code]track_idx[/code] must be the index of a Bezier Track. */
bezier_track_set_key_value(track_idx: int, key_idx: int, value: float): void;

/** Clear the animation (clear all tracks and reset all). */
clear(): void;

/** Adds a new track that is a copy of the given track from [code]to_animation[/code]. */
copy_track(track_idx: int, to_animation: Animation): void;

/** Returns the index of the specified track. If the track is not found, return -1. */
find_track(path: NodePathType): int;

/** Returns the amount of tracks in the animation. */
get_track_count(): int;

/** Returns all the key indices of a method track, given a position and delta time. */
method_track_get_key_indices(track_idx: int, time_sec: float, delta: float): PoolIntArray;

/** Returns the method name of a method track. */
method_track_get_name(track_idx: int, key_idx: int): string;

/** Returns the arguments values to be called on a method track for a given key in a given track. */
method_track_get_params(track_idx: int, key_idx: int): any[];

/** Removes a track by specifying the track index. */
remove_track(track_idx: int): void;

/** Finds the key index by time in a given track. Optionally, only find it if the exact time is given. */
track_find_key(track_idx: int, time: float, exact?: boolean): int;

/** Returns [code]true[/code] if the track at [code]idx[/code] wraps the interpolation loop. New tracks wrap the interpolation loop by default. */
track_get_interpolation_loop_wrap(track_idx: int): boolean;

/** Returns the interpolation type of a given track. */
track_get_interpolation_type(track_idx: int): int;

/** Returns the amount of keys in a given track. */
track_get_key_count(track_idx: int): int;

/** Returns the time at which the key is located. */
track_get_key_time(track_idx: int, key_idx: int): float;

/** Returns the transition curve (easing) for a specific key (see the built-in math function [method @GDScript.ease]). */
track_get_key_transition(track_idx: int, key_idx: int): float;

/** Returns the value of a given key in a given track. */
track_get_key_value(track_idx: int, key_idx: int): any;

/** Gets the path of a track. For more information on the path format, see [method track_set_path]. */
track_get_path(track_idx: int): NodePathType;

/** Gets the type of a track. */
track_get_type(track_idx: int): int;

/** Insert a generic key in a given track. */
track_insert_key(track_idx: int, time: float, key: any, transition?: float): void;

/** Returns [code]true[/code] if the track at index [code]idx[/code] is enabled. */
track_is_enabled(track_idx: int): boolean;

/** Returns [code]true[/code] if the given track is imported. Else, return [code]false[/code]. */
track_is_imported(track_idx: int): boolean;

/** Moves a track down. */
track_move_down(track_idx: int): void;

/** Changes the index position of track [code]idx[/code] to the one defined in [code]to_idx[/code]. */
track_move_to(track_idx: int, to_idx: int): void;

/** Moves a track up. */
track_move_up(track_idx: int): void;

/** Removes a key by index in a given track. */
track_remove_key(track_idx: int, key_idx: int): void;

/** Removes a key by position (seconds) in a given track. */
track_remove_key_at_position(track_idx: int, position: float): void;

/** Enables/disables the given track. Tracks are enabled by default. */
track_set_enabled(track_idx: int, enabled: boolean): void;

/** Sets the given track as imported or not. */
track_set_imported(track_idx: int, imported: boolean): void;

/** If [code]true[/code], the track at [code]idx[/code] wraps the interpolation loop. */
track_set_interpolation_loop_wrap(track_idx: int, interpolation: boolean): void;

/** Sets the interpolation type of a given track. */
track_set_interpolation_type(track_idx: int, interpolation: int): void;

/** Sets the time of an existing key. */
track_set_key_time(track_idx: int, key_idx: int, time: float): void;

/** Sets the transition curve (easing) for a specific key (see the built-in math function [method @GDScript.ease]). */
track_set_key_transition(track_idx: int, key_idx: int, transition: float): void;

/** Sets the value of an existing key. */
track_set_key_value(track_idx: int, key: int, value: any): void;

/**
 * Sets the path of a track. Paths must be valid scene-tree paths to a node and must be specified starting from the parent node of the node that will reproduce the animation. Tracks that control properties or bones must append their name after the path, separated by `":"`.
 *
 * For example, `"character/skeleton:ankle"` or `"character/mesh:transform/local"`.
 *
*/
track_set_path(track_idx: int, path: NodePathType): void;

/** Swaps the track [code]idx[/code]'s index position with the track [code]with_idx[/code]. */
track_swap(track_idx: int, with_idx: int): void;

/** Insert a transform key for a transform track. */
transform_track_insert_key(track_idx: int, time: float, location: Vector3, rotation: Quat, scale: Vector3): int;

/** Returns the interpolated value of a transform track at a given time (in seconds). An array consisting of 3 elements: position ([Vector3]), rotation ([Quat]) and scale ([Vector3]). */
transform_track_interpolate(track_idx: int, time_sec: float): any[];

/** Returns all the key indices of a value track, given a position and delta time. */
value_track_get_key_indices(track_idx: int, time_sec: float, delta: float): PoolIntArray;

/** Returns the update mode of a value track. */
value_track_get_update_mode(track_idx: int): int;

/** Returns the interpolated value at the given time (in seconds). The [code]track_idx[/code] must be the index of a value track. */
value_track_interpolate(track_idx: int, time_sec: float): any;

/** Sets the update mode (see [enum UpdateMode]) of a value track. */
value_track_set_update_mode(track_idx: int, mode: int): void;

  connect<T extends SignalsOf<Animation>>(signal: T, method: SignalFunction<Animation[T]>): number;



/**
 * Value tracks set values in node properties, but only those which can be Interpolated.
 *
*/
static TYPE_VALUE: any;

/**
 * Transform tracks are used to change node local transforms or skeleton pose bones. Transitions are interpolated.
 *
*/
static TYPE_TRANSFORM: any;

/**
 * Method tracks call functions with given arguments per key.
 *
*/
static TYPE_METHOD: any;

/**
 * Bezier tracks are used to interpolate a value using custom curves. They can also be used to animate sub-properties of vectors and colors (e.g. alpha value of a [Color]).
 *
*/
static TYPE_BEZIER: any;

/**
 * Audio tracks are used to play an audio stream with either type of [AudioStreamPlayer]. The stream can be trimmed and previewed in the animation.
 *
*/
static TYPE_AUDIO: any;

/**
 * Animation tracks play animations in other [AnimationPlayer] nodes.
 *
*/
static TYPE_ANIMATION: any;

/**
 * No interpolation (nearest value).
 *
*/
static INTERPOLATION_NEAREST: any;

/**
 * Linear interpolation.
 *
*/
static INTERPOLATION_LINEAR: any;

/**
 * Cubic interpolation.
 *
*/
static INTERPOLATION_CUBIC: any;

/**
 * Update between keyframes.
 *
*/
static UPDATE_CONTINUOUS: any;

/**
 * Update at the keyframes and hold the value.
 *
*/
static UPDATE_DISCRETE: any;

/**
 * Update at the keyframes.
 *
*/
static UPDATE_TRIGGER: any;

/**
 * Same as linear interpolation, but also interpolates from the current value (i.e. dynamically at runtime) if the first key isn't at 0 seconds.
 *
*/
static UPDATE_CAPTURE: any;


/**
 * Emitted when there's a change in the list of tracks, e.g. tracks are added, moved or have changed paths.
 *
*/
$tracks_changed: Signal<() => void>

}

