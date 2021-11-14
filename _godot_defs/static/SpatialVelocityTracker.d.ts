
/**
*/
declare class SpatialVelocityTracker extends Reference  {

  
/**
*/
  new(): SpatialVelocityTracker; 
  static "new"(): SpatialVelocityTracker 



/** No documentation provided. */
get_tracked_linear_velocity(): Vector3;

/** No documentation provided. */
reset(position: Vector3): void;

/** No documentation provided. */
update_position(position: Vector3): void;

  connect<T extends SignalsOf<SpatialVelocityTracker>>(signal: T, method: SignalFunction<SpatialVelocityTracker[T]>): number;






}

