
/**
*/
declare class VelocityTracker3D extends Reference {

  
/**
*/
  "new"(): this;
  static "new"(): this;




/** No documentation provided. */
get_tracked_linear_velocity(): Vector3;

/** No documentation provided. */
reset(position: Vector3): void;

/** No documentation provided. */
update_position(position: Vector3): void;

  connect<T extends SignalsOf<VelocityTracker3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
