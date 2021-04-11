
/**
 * Counts down a specified interval and emits a signal on reaching 0. Can be set to repeat or "one-shot" mode.
 *
 * **Note:** To create an one-shot timer without instantiating a node, use [method SceneTree.create_timer].
 *
*/
declare class Timer extends Node {

  
/**
 * Counts down a specified interval and emits a signal on reaching 0. Can be set to repeat or "one-shot" mode.
 *
 * **Note:** To create an one-shot timer without instantiating a node, use [method SceneTree.create_timer].
 *
*/
  "new"(): Timer;
  static "new"(): Timer;



/**
 * If `true`, the timer will automatically start when entering the scene tree.
 *
 * **Note:** This property is automatically set to `false` after the timer enters the scene tree and starts.
 *
*/
autostart: boolean;

/** If [code]true[/code], the timer will stop when reaching 0. If [code]false[/code], it will restart. */
one_shot: boolean;

/** If [code]true[/code], the timer is paused and will not process until it is unpaused again, even if [method start] is called. */
paused: boolean;

/** Processing mode. See [enum TimerProcessMode]. */
process_mode: int;

/**
 * The timer's remaining time in seconds. Returns 0 if the timer is inactive.
 *
 * **Note:** You cannot set this value. To change the timer's remaining time, use [method start].
 *
*/
time_left: float;

/** Wait time in seconds. */
wait_time: float;

/** Returns [code]true[/code] if the timer is stopped. */
is_stopped(): boolean;

/**
 * Starts the timer. Sets `wait_time` to `time_sec` if `time_sec > 0`. This also resets the remaining time to `wait_time`.
 *
 * **Note:** this method will not resume a paused timer. See [member paused].
 *
*/
start(time_sec?: float): void;

/** Stops the timer. */
stop(): void;

  connect<T extends SignalsOf<Timer>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Update the timer during the physics step at each frame (fixed framerate processing).
 *
*/
static TIMER_PROCESS_PHYSICS: 0;

/**
 * Update the timer during the idle time at each frame.
 *
*/
static TIMER_PROCESS_IDLE: 1;


  /**
 * Emitted when the timer reaches 0.
 *
*/
timeout: Signal<() => void>

}
