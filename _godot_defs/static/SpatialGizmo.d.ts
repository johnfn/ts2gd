
/**
*/
declare class SpatialGizmo extends Reference  {

  
/**
*/
  new(): SpatialGizmo; 
  static "new"(): SpatialGizmo 





  connect<T extends SignalsOf<SpatialGizmo>>(signal: T, method: SignalFunction<SpatialGizmo[T]>): number;






}

