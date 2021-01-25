
/**
 * An animation player is used for general-purpose playback of [Animation] resources. It contains a dictionary of animations (referenced by name) and custom blend times between their transitions. Additionally, animations can be played and blended in different channels.
 *
 * [AnimationPlayer] is more suited than [Tween] for animations where you know the final values in advance. For example, fading a screen in and out is more easily done with an [AnimationPlayer] node thanks to the animation tools provided by the editor. That particular example can also be implemented with a [Tween] node, but it requires doing everything by code.
 *
 * Updating the target properties of animations occurs at process time.
 *
*/
declare class AnimationPlayer extends Node {

  
/**
 * An animation player is used for general-purpose playback of [Animation] resources. It contains a dictionary of animations (referenced by name) and custom blend times between their transitions. Additionally, animations can be played and blended in different channels.
 *
 * [AnimationPlayer] is more suited than [Tween] for animations where you know the final values in advance. For example, fading a screen in and out is more easily done with an [AnimationPlayer] node thanks to the animation tools provided by the editor. That particular example can also be implemented with a [Tween] node, but it requires doing everything by code.
 *
 * Updating the target properties of animations occurs at process time.
 *
*/
  "new"(): AnimationPlayer;
  static "new"(): AnimationPlayer;



/** If playing, the current animation; otherwise, the animation last played. When set, would change the animation, but would not play it unless currently playing. See also [member current_animation]. */
assigned_animation: string;

/** The name of the animation to play when the scene loads. */
autoplay: string;

/**
 * The name of the currently playing animation. If no animation is playing, the property's value is an empty string. Changing this value does not restart the animation. See [method play] for more information on playing animations.
 *
 * **Note**: while this property appears in the inspector, it's not meant to be edited and it's not saved in the scene. This property is mainly used to get the currently playing animation, and internally for animation playback tracks. For more information, see [Animation].
 *
*/
current_animation: string;

/** The length (in seconds) of the currently being played animation. */
current_animation_length: float;

/** The position (in seconds) of the currently playing animation. */
current_animation_position: float;

/** The call mode to use for Call Method tracks. */
method_call_mode: int;

/** If [code]true[/code], updates animations in response to process-related notifications. */
playback_active: boolean;

/** The default time in which to blend animations. Ranges from 0 to 4096 with 0.01 precision. */
playback_default_blend_time: float;

/** The process notification in which to update animations. */
playback_process_mode: int;

/** The speed scaling ratio. For instance, if this value is 1, then the animation plays at normal speed. If it's 0.5, then it plays at half speed. If it's 2, then it plays at double speed. */
playback_speed: float;

/** The node from which node path references will travel. */
root_node: NodePathType;

/** Adds [code]animation[/code] to the player accessible with the key [code]name[/code]. */
add_animation(name: string, animation: Animation): int;

/** Shifts position in the animation timeline and immediately updates the animation. [code]delta[/code] is the time in seconds to shift. Events between the current frame and [code]delta[/code] are handled. */
advance(delta: float): void;

/** Returns the name of the next animation in the queue. */
animation_get_next(anim_from: string): string;

/** Triggers the [code]anim_to[/code] animation when the [code]anim_from[/code] animation completes. */
animation_set_next(anim_from: string, anim_to: string): void;

/** [AnimationPlayer] caches animated nodes. It may not notice if a node disappears; [method clear_caches] forces it to update the cache again. */
clear_caches(): void;

/** Clears all queued, unplayed animations. */
clear_queue(): void;

/** Returns the name of [code]animation[/code] or an empty string if not found. */
find_animation(animation: Animation): string;

/** Returns the [Animation] with key [code]name[/code] or [code]null[/code] if not found. */
get_animation(name: string): Animation;

/** Returns the list of stored animation names. */
get_animation_list(): PoolStringArray;

/** Gets the blend time (in seconds) between two animations, referenced by their names. */
get_blend_time(anim_from: string, anim_to: string): float;

/** Gets the actual playing speed of current animation or 0 if not playing. This speed is the [member playback_speed] property multiplied by [code]custom_speed[/code] argument specified when calling the [method play] method. */
get_playing_speed(): float;

/** Returns a list of the animation names that are currently queued to play. */
get_queue(): PoolStringArray;

/** Returns [code]true[/code] if the [AnimationPlayer] stores an [Animation] with key [code]name[/code]. */
has_animation(name: string): boolean;

/** Returns [code]true[/code] if playing an animation. */
is_playing(): boolean;

/**
 * Plays the animation with key `name`. Custom blend times and speed can be set. If `custom_speed` is negative and `from_end` is `true`, the animation will play backwards (which is equivalent to calling [method play_backwards]).
 *
 * The [AnimationPlayer] keeps track of its current or last played animation with [member assigned_animation]. If this method is called with that same animation `name`, or with no `name` parameter, the assigned animation will resume playing if it was paused, or restart if it was stopped (see [method stop] for both pause and stop). If the animation was already playing, it will keep playing.
 *
 * **Note:** The animation will be updated the next time the [AnimationPlayer] is processed. If other variables are updated at the same time this is called, they may be updated too early. To perform the update immediately, call `advance(0)`.
 *
*/
play(name?: string, custom_blend?: float, custom_speed?: float, from_end?: boolean): void;

/**
 * Plays the animation with key `name` in reverse.
 *
 * This method is a shorthand for [method play] with `custom_speed = -1.0` and `from_end = true`, so see its description for more information.
 *
*/
play_backwards(name?: string, custom_blend?: float): void;

/**
 * Queues an animation for playback once the current one is done.
 *
 * **Note:** If a looped animation is currently playing, the queued animation will never play unless the looped animation is stopped somehow.
 *
*/
queue(name: string): void;

/** Removes the animation with key [code]name[/code]. */
remove_animation(name: string): void;

/** Renames an existing animation with key [code]name[/code] to [code]newname[/code]. */
rename_animation(name: string, newname: string): void;

/** Seeks the animation to the [code]seconds[/code] point in time (in seconds). If [code]update[/code] is [code]true[/code], the animation updates too, otherwise it updates at process time. Events between the current frame and [code]seconds[/code] are skipped. */
seek(seconds: float, update?: boolean): void;

/** Specifies a blend time (in seconds) between two animations, referenced by their names. */
set_blend_time(anim_from: string, anim_to: string, sec: float): void;

/**
 * Stops or pauses the currently playing animation. If `reset` is `true`, the animation position is reset to `0` and the playback speed is reset to `1.0`.
 *
 * If `reset` is `false`, the [member current_animation_position] will be kept and calling [method play] or [method play_backwards] without arguments or with the same animation name as [member assigned_animation] will resume the animation.
 *
*/
stop(reset?: boolean): void;

  connect<T extends SignalsOf<AnimationPlayer>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Process animation during the physics process. This is especially useful when animating physics bodies.
 *
*/
static ANIMATION_PROCESS_PHYSICS: 0;

/**
 * Process animation during the idle process.
 *
*/
static ANIMATION_PROCESS_IDLE: 1;

/**
 * Do not process animation. Use [method advance] to process the animation manually.
 *
*/
static ANIMATION_PROCESS_MANUAL: 2;

/**
 * Batch method calls during the animation process, then do the calls after events are processed. This avoids bugs involving deleting nodes or modifying the AnimationPlayer while playing.
 *
*/
static ANIMATION_METHOD_CALL_DEFERRED: 0;

/**
 * Make method calls immediately when reached in the animation.
 *
*/
static ANIMATION_METHOD_CALL_IMMEDIATE: 1;


  /**
 * If the currently being played animation changes, this signal will notify of such change.
 *
*/
animation_changed: Signal<(old_name: string, new_name: string) => void>

/**
 * Notifies when an animation finished playing.
 *
*/
animation_finished: Signal<(anim_name: string) => void>

/**
 * Notifies when an animation starts playing.
 *
*/
animation_started: Signal<(anim_name: string) => void>

/**
 * Notifies when the caches have been cleared, either automatically, or manually via [method clear_caches].
 *
*/
caches_cleared: Signal<() => void>

}
