
/**
*/
declare class SpatialVelocityTracker extends Reference {

  
/**
*/
  "new"(): SpatialVelocityTracker;
  static "new"(): SpatialVelocityTracker;




/** No documentation provided. */
get_tracked_linear_velocity(): Vector3;

/** No documentation provided. */
reset(position: Vector3): void;

/** No documentation provided. */
update_position(position: Vector3): void;

  // connect<T extends SignalsOf<SpatialVelocityTracker>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<SpatialVelocityTrackerSignals>>(signal: T, method: SignalFunction<SpatialVelocityTrackerSignals[T]>): number;




}

declare class SpatialVelocityTrackerSignals extends ReferenceSignals {
  
}
