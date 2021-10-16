
/**
*/
declare class NavigationPolygonInstance extends Node2D {

  
/**
*/
  "new"(): NavigationPolygonInstance;
  static "new"(): NavigationPolygonInstance;







  // connect<T extends SignalsOf<NavigationPolygonInstance>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<NavigationPolygonInstanceSignals>>(signal: T, method: SignalFunction<NavigationPolygonInstanceSignals[T]>): number;




}

declare class NavigationPolygonInstanceSignals extends Node2DSignals {
  
}
