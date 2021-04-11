
/**
 * Can have [PathFollow] child nodes moving along the [Curve3D]. See [PathFollow] for more information on the usage.
 *
 * Note that the path is considered as relative to the moved nodes (children of [PathFollow]). As such, the curve should usually start with a zero vector `(0, 0, 0)`.
 *
*/
declare class Path extends Spatial {

  
/**
 * Can have [PathFollow] child nodes moving along the [Curve3D]. See [PathFollow] for more information on the usage.
 *
 * Note that the path is considered as relative to the moved nodes (children of [PathFollow]). As such, the curve should usually start with a zero vector `(0, 0, 0)`.
 *
*/
  "new"(): Path;
  static "new"(): Path;



/** A [Curve3D] describing the path. */
curve: Curve3D;



  connect<T extends SignalsOf<Path>, U extends Node>(signal: T, node: U, method: keyof U): number;





  /**
 * Emitted when the [member curve] changes.
 *
*/
curve_changed: Signal<() => void>

}
