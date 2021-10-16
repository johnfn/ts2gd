
/**
 * Once added to the scene tree and enabled using [method make_current], this node will override the location sounds are heard from. This can be used to listen from a location different from the [Camera].
 *
*/
declare class Listener extends Spatial {

  
/**
 * Once added to the scene tree and enabled using [method make_current], this node will override the location sounds are heard from. This can be used to listen from a location different from the [Camera].
 *
*/
  "new"(): Listener;
  static "new"(): Listener;




/** Disables the listener to use the current camera's listener instead. */
clear_current(): void;

/** Returns the listener's global orthonormalized [Transform]. */
get_listener_transform(): Transform;

/**
 * Returns `true` if the listener was made current using [method make_current], `false` otherwise.
 *
 * **Note:** There may be more than one Listener marked as "current" in the scene tree, but only the one that was made current last will be used.
 *
*/
is_current(): boolean;

/** Enables the listener. This will override the current camera's listener. */
make_current(): void;

  // connect<T extends SignalsOf<Listener>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<ListenerSignals>>(signal: T, method: SignalFunction<ListenerSignals[T]>): number;




}

declare class ListenerSignals extends SpatialSignals {
  
}
