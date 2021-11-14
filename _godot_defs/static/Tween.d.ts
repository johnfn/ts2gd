
/**
 * Tweens are useful for animations requiring a numerical property to be interpolated over a range of values. The name **tween** comes from **in-betweening**, an animation technique where you specify **keyframes** and the computer interpolates the frames that appear between them.
 *
 * [Tween] is more suited than [AnimationPlayer] for animations where you don't know the final values in advance. For example, interpolating a dynamically-chosen camera zoom value is best done with a [Tween] node; it would be difficult to do the same thing with an [AnimationPlayer] node.
 *
 * Here is a brief usage example that makes a 2D node move smoothly between two positions:
 *
 * @example 
 * 
 * var tween = get_node("Tween")
 * tween.interpolate_property($Node2D, "position",
 *         Vector2(0, 0), Vector2(100, 100), 1,
 *         Tween.TRANS_LINEAR, Tween.EASE_IN_OUT)
 * tween.start()
 * @summary 
 * 
 *
 * Many methods require a property name, such as `"position"` above. You can find the correct property name by hovering over the property in the Inspector. You can also provide the components of a property directly by using `"property:component"` (e.g. `position:x`), where it would only apply to that particular component.
 *
 * Many of the methods accept `trans_type` and `ease_type`. The first accepts an [enum TransitionType] constant, and refers to the way the timing of the animation is handled (see [url=https://easings.net/]easings.net[/url] for some examples). The second accepts an [enum EaseType] constant, and controls where the `trans_type` is applied to the interpolation (in the beginning, the end, or both). If you don't know which transition and easing to pick, you can try different [enum TransitionType] constants with [constant EASE_IN_OUT], and use the one that looks best.
 *
 * [url=https://raw.githubusercontent.com/godotengine/godot-docs/master/img/tween_cheatsheet.png]Tween easing and transition types cheatsheet[/url]
 *
*/
declare class Tween extends Node  {

  
/**
 * Tweens are useful for animations requiring a numerical property to be interpolated over a range of values. The name **tween** comes from **in-betweening**, an animation technique where you specify **keyframes** and the computer interpolates the frames that appear between them.
 *
 * [Tween] is more suited than [AnimationPlayer] for animations where you don't know the final values in advance. For example, interpolating a dynamically-chosen camera zoom value is best done with a [Tween] node; it would be difficult to do the same thing with an [AnimationPlayer] node.
 *
 * Here is a brief usage example that makes a 2D node move smoothly between two positions:
 *
 * @example 
 * 
 * var tween = get_node("Tween")
 * tween.interpolate_property($Node2D, "position",
 *         Vector2(0, 0), Vector2(100, 100), 1,
 *         Tween.TRANS_LINEAR, Tween.EASE_IN_OUT)
 * tween.start()
 * @summary 
 * 
 *
 * Many methods require a property name, such as `"position"` above. You can find the correct property name by hovering over the property in the Inspector. You can also provide the components of a property directly by using `"property:component"` (e.g. `position:x`), where it would only apply to that particular component.
 *
 * Many of the methods accept `trans_type` and `ease_type`. The first accepts an [enum TransitionType] constant, and refers to the way the timing of the animation is handled (see [url=https://easings.net/]easings.net[/url] for some examples). The second accepts an [enum EaseType] constant, and controls where the `trans_type` is applied to the interpolation (in the beginning, the end, or both). If you don't know which transition and easing to pick, you can try different [enum TransitionType] constants with [constant EASE_IN_OUT], and use the one that looks best.
 *
 * [url=https://raw.githubusercontent.com/godotengine/godot-docs/master/img/tween_cheatsheet.png]Tween easing and transition types cheatsheet[/url]
 *
*/
  new(): Tween; 
  static "new"(): Tween 


/** The tween's animation process thread. See [enum TweenProcessMode]. */
playback_process_mode: int;

/** The tween's speed multiplier. For example, set it to [code]1.0[/code] for normal speed, [code]2.0[/code] for two times normal speed, or [code]0.5[/code] for half of the normal speed. A value of [code]0[/code] pauses the animation, but see also [method set_active] or [method stop_all] for this. */
playback_speed: float;

/** If [code]true[/code], the tween loops. */
repeat: boolean;

/**
 * Follows `method` of `object` and applies the returned value on `target_method` of `target`, beginning from `initial_val` for `duration` seconds, `delay` later. Methods are called with consecutive values.
 *
 * Use [enum TransitionType] for `trans_type` and [enum EaseType] for `ease_type` parameters. These values control the timing and direction of the interpolation. See the class description for more information.
 *
*/
follow_method(object: Object, method: string, initial_val: any, target: Object, target_method: string, duration: float, trans_type?: int, ease_type?: int, delay?: float): boolean;

/**
 * Follows `property` of `object` and applies it on `target_property` of `target`, beginning from `initial_val` for `duration` seconds, `delay` seconds later.
 *
 * Use [enum TransitionType] for `trans_type` and [enum EaseType] for `ease_type` parameters. These values control the timing and direction of the interpolation. See the class description for more information.
 *
*/
follow_property(object: Object, property: NodePathType, initial_val: any, target: Object, target_property: NodePathType, duration: float, trans_type?: int, ease_type?: int, delay?: float): boolean;

/** Returns the total time needed for all tweens to end. If you have two tweens, one lasting 10 seconds and the other 20 seconds, it would return 20 seconds, as by that time all tweens would have finished. */
get_runtime(): float;

/** Calls [code]callback[/code] of [code]object[/code] after [code]duration[/code]. [code]arg1[/code]-[code]arg5[/code] are arguments to be passed to the callback. */
interpolate_callback(object: Object, duration: float, callback: string, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any): boolean;

/** Calls [code]callback[/code] of [code]object[/code] after [code]duration[/code] on the main thread (similar to [method Object.call_deferred]). [code]arg1[/code]-[code]arg5[/code] are arguments to be passed to the callback. */
interpolate_deferred_callback(object: Object, duration: float, callback: string, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any): boolean;

/**
 * Animates `method` of `object` from `initial_val` to `final_val` for `duration` seconds, `delay` seconds later. Methods are called with consecutive values.
 *
 * Use [enum TransitionType] for `trans_type` and [enum EaseType] for `ease_type` parameters. These values control the timing and direction of the interpolation. See the class description for more information.
 *
*/
interpolate_method(object: Object, method: string, initial_val: any, final_val: any, duration: float, trans_type?: int, ease_type?: int, delay?: float): boolean;

/**
 * Animates `property` of `object` from `initial_val` to `final_val` for `duration` seconds, `delay` seconds later. Setting the initial value to `null` uses the current value of the property.
 *
 * Use [enum TransitionType] for `trans_type` and [enum EaseType] for `ease_type` parameters. These values control the timing and direction of the interpolation. See the class description for more information.
 *
*/
interpolate_property(object: Object, property: NodePathType, initial_val: any, final_val: any, duration: float, trans_type?: int, ease_type?: int, delay?: float): boolean;

/**
 * Returns `true` if any tweens are currently running.
 *
 * **Note:** This method doesn't consider tweens that have ended.
 *
*/
is_active(): boolean;

/** Stops animation and removes a tween, given its object and property/method pair. By default, all tweens are removed, unless [code]key[/code] is specified. */
remove(object: Object, key?: string): boolean;

/** Stops animation and removes all tweens. */
remove_all(): boolean;

/** Resets a tween to its initial value (the one given, not the one before the tween), given its object and property/method pair. By default, all tweens are removed, unless [code]key[/code] is specified. */
reset(object: Object, key?: string): boolean;

/** Resets all tweens to their initial values (the ones given, not those before the tween). */
reset_all(): boolean;

/** Continues animating a stopped tween, given its object and property/method pair. By default, all tweens are resumed, unless [code]key[/code] is specified. */
resume(object: Object, key?: string): boolean;

/** Continues animating all stopped tweens. */
resume_all(): boolean;

/** Sets the interpolation to the given [code]time[/code] in seconds. */
seek(time: float): boolean;

/** Activates/deactivates the tween. See also [method stop_all] and [method resume_all]. */
set_active(active: boolean): void;

/** Starts the tween. You can define animations both before and after this. */
start(): boolean;

/** Stops a tween, given its object and property/method pair. By default, all tweens are stopped, unless [code]key[/code] is specified. */
stop(object: Object, key?: string): boolean;

/** Stops animating all tweens. */
stop_all(): boolean;

/**
 * Animates `method` of `object` from the value returned by `initial_method` to `final_val` for `duration` seconds, `delay` seconds later. Methods are animated by calling them with consecutive values.
 *
 * Use [enum TransitionType] for `trans_type` and [enum EaseType] for `ease_type` parameters. These values control the timing and direction of the interpolation. See the class description for more information.
 *
*/
targeting_method(object: Object, method: string, initial: Object, initial_method: string, final_val: any, duration: float, trans_type?: int, ease_type?: int, delay?: float): boolean;

/**
 * Animates `property` of `object` from the current value of the `initial_val` property of `initial` to `final_val` for `duration` seconds, `delay` seconds later.
 *
 * Use [enum TransitionType] for `trans_type` and [enum EaseType] for `ease_type` parameters. These values control the timing and direction of the interpolation. See the class description for more information.
 *
*/
targeting_property(object: Object, property: NodePathType, initial: Object, initial_val: NodePathType, final_val: any, duration: float, trans_type?: int, ease_type?: int, delay?: float): boolean;

/** Returns the current time of the tween. */
tell(): float;

  connect<T extends SignalsOf<Tween>>(signal: T, method: SignalFunction<Tween[T]>): number;



/**
 * The tween updates with the `_physics_process` callback.
 *
*/
static TWEEN_PROCESS_PHYSICS: any;

/**
 * The tween updates with the `_process` callback.
 *
*/
static TWEEN_PROCESS_IDLE: any;

/**
 * The animation is interpolated linearly.
 *
*/
static TRANS_LINEAR: any;

/**
 * The animation is interpolated using a sine function.
 *
*/
static TRANS_SINE: any;

/**
 * The animation is interpolated with a quintic (to the power of 5) function.
 *
*/
static TRANS_QUINT: any;

/**
 * The animation is interpolated with a quartic (to the power of 4) function.
 *
*/
static TRANS_QUART: any;

/**
 * The animation is interpolated with a quadratic (to the power of 2) function.
 *
*/
static TRANS_QUAD: any;

/**
 * The animation is interpolated with an exponential (to the power of x) function.
 *
*/
static TRANS_EXPO: any;

/**
 * The animation is interpolated with elasticity, wiggling around the edges.
 *
*/
static TRANS_ELASTIC: any;

/**
 * The animation is interpolated with a cubic (to the power of 3) function.
 *
*/
static TRANS_CUBIC: any;

/**
 * The animation is interpolated with a function using square roots.
 *
*/
static TRANS_CIRC: any;

/**
 * The animation is interpolated by bouncing at the end.
 *
*/
static TRANS_BOUNCE: any;

/**
 * The animation is interpolated backing out at ends.
 *
*/
static TRANS_BACK: any;

/**
 * The interpolation starts slowly and speeds up towards the end.
 *
*/
static EASE_IN: any;

/**
 * The interpolation starts quickly and slows down towards the end.
 *
*/
static EASE_OUT: any;

/**
 * A combination of [constant EASE_IN] and [constant EASE_OUT]. The interpolation is slowest at both ends.
 *
*/
static EASE_IN_OUT: any;

/**
 * A combination of [constant EASE_IN] and [constant EASE_OUT]. The interpolation is fastest at both ends.
 *
*/
static EASE_OUT_IN: any;


/**
 * Emitted when all processes in a tween end.
 *
*/
$tween_all_completed: Signal<() => void>

/**
 * Emitted when a tween ends.
 *
*/
$tween_completed: Signal<(object: Object, key: NodePathType) => void>

/**
 * Emitted when a tween starts.
 *
*/
$tween_started: Signal<(object: Object, key: NodePathType) => void>

/**
 * Emitted at each step of the animation.
 *
*/
$tween_step: Signal<(object: Object, key: NodePathType, elapsed: float, value: Object) => void>

}

