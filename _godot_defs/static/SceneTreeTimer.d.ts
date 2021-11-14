
/**
 * A one-shot timer managed by the scene tree, which emits [signal timeout] on completion. See also [method SceneTree.create_timer].
 *
 * As opposed to [Timer], it does not require the instantiation of a node. Commonly used to create a one-shot delay timer as in the following example:
 *
 * @example 
 * 
 * func some_function():
 *     print("Timer started.")
 *     yield(get_tree().create_timer(1.0), "timeout")
 *     print("Timer ended.")
 * @summary 
 * 
 *
*/
declare class SceneTreeTimer extends Reference  {

  
/**
 * A one-shot timer managed by the scene tree, which emits [signal timeout] on completion. See also [method SceneTree.create_timer].
 *
 * As opposed to [Timer], it does not require the instantiation of a node. Commonly used to create a one-shot delay timer as in the following example:
 *
 * @example 
 * 
 * func some_function():
 *     print("Timer started.")
 *     yield(get_tree().create_timer(1.0), "timeout")
 *     print("Timer ended.")
 * @summary 
 * 
 *
*/
  new(): SceneTreeTimer; 
  static "new"(): SceneTreeTimer 


/** The time remaining. */
time_left: float;



  connect<T extends SignalsOf<SceneTreeTimer>>(signal: T, method: SignalFunction<SceneTreeTimer[T]>): number;





/**
 * Emitted when the timer reaches 0.
 *
*/
$timeout: Signal<() => void>

}

