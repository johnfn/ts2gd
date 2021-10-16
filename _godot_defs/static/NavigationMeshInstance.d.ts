
/**
 * NavigationMeshInstance is a node that takes a [NavigationMesh] resource and adds it to the current scenario by creating an instance of it.
 *
*/
declare class NavigationMeshInstance extends Spatial {

  
/**
 * NavigationMeshInstance is a node that takes a [NavigationMesh] resource and adds it to the current scenario by creating an instance of it.
 *
*/
  "new"(): NavigationMeshInstance;
  static "new"(): NavigationMeshInstance;



/** If [code]true[/code], the navigation mesh will be used by [Navigation]. */
enabled: boolean;

/** The [NavigationMesh] resource for the instance. */
navmesh: NavigationMesh;



  // connect<T extends SignalsOf<NavigationMeshInstance>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<NavigationMeshInstanceSignals>>(signal: T, method: SignalFunction<NavigationMeshInstanceSignals[T]>): number;




}

declare class NavigationMeshInstanceSignals extends SpatialSignals {
  
}
