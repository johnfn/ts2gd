
/**
 * Once added to the scene tree and enabled using [method make_current], this node will override the location sounds are heard from. Only one [Listener2D] can be current. Using [method make_current] will disable the previous [Listener2D].
 *
 * If there is no active [Listener2D] in the current [Viewport], center of the screen will be used as a hearing point for the audio. [Listener2D] needs to be inside [SceneTree] to function.
 *
*/
declare class Listener2D extends Node2D {

  
/**
 * Once added to the scene tree and enabled using [method make_current], this node will override the location sounds are heard from. Only one [Listener2D] can be current. Using [method make_current] will disable the previous [Listener2D].
 *
 * If there is no active [Listener2D] in the current [Viewport], center of the screen will be used as a hearing point for the audio. [Listener2D] needs to be inside [SceneTree] to function.
 *
*/
  "new"(): Listener2D;
  static "new"(): Listener2D;




/** Disables the [Listener2D]. If it's not set as current, this method will have no effect. */
clear_current(): void;

/** Returns [code]true[/code] if this [Listener2D] is currently active. */
is_current(): boolean;

/**
 * Makes the [Listener2D] active, setting it as the hearing point for the sounds. If there is already another active [Listener2D], it will be disabled.
 *
 * This method will have no effect if the [Listener2D] is not added to [SceneTree].
 *
*/
make_current(): void;

  // connect<T extends SignalsOf<Listener2D>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<Listener2DSignals>>(signal: T, method: SignalFunction<Listener2DSignals[T]>): number;




}

declare class Listener2DSignals extends Node2DSignals {
  
}
