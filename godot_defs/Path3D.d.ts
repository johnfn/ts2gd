
/**
 * Can have [PathFollow3D] child nodes moving along the [Curve3D]. See [PathFollow3D] for more information on the usage.
 *
 * Note that the path is considered as relative to the moved nodes (children of [PathFollow3D]). As such, the curve should usually start with a zero vector `(0, 0, 0)`.
 *
*/
declare class Path3D extends Node3D {

  
/**
 * Can have [PathFollow3D] child nodes moving along the [Curve3D]. See [PathFollow3D] for more information on the usage.
 *
 * Note that the path is considered as relative to the moved nodes (children of [PathFollow3D]). As such, the curve should usually start with a zero vector `(0, 0, 0)`.
 *
*/
  "new"(): this;
  static "new"(): this;



/** A [Curve3D] describing the path. */
curve: Curve3D;



  connect<T extends SignalsOf<Path3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  /**
 * Emitted when the [member curve] changes.
 *
*/
curve_changed: Signal<() => void>

}


 
