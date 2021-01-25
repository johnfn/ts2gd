
/**
*/
declare class SpatialGizmo extends Reference {

  
/**
*/
  "new"(): SpatialGizmo;
  static "new"(): SpatialGizmo;






  connect<T extends SignalsOf<SpatialGizmo>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
