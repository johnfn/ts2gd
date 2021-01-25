
/**
 * A region of the navigation map. It tells the [Navigation3D] node what can be navigated and what cannot, based on the [NavigationMesh] resource. This should be a child of a [Navigation3D] node (even not a direct child).
 *
*/
declare class NavigationRegion3D extends Node3D {

  
/**
 * A region of the navigation map. It tells the [Navigation3D] node what can be navigated and what cannot, based on the [NavigationMesh] resource. This should be a child of a [Navigation3D] node (even not a direct child).
 *
*/
  "new"(): this;
  static "new"(): this;



/** Determines if the [NavigationRegion3D] is enabled or disabled. */
enabled: boolean;

/** The [NavigationMesh] resource to use. */
navmesh: NavigationMesh;

/** Bakes the [NavigationMesh]. The baking is done in a separate thread because navigation baking is not a cheap operation. This can be done at runtime. When it is completed, it automatically sets the new [NavigationMesh]. */
bake_navigation_mesh(): void;

  connect<T extends SignalsOf<NavigationRegion3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  /**
 * Notifies when the navigation mesh bake operation is completed.
 *
*/
bake_finished: Signal<() => void>

/**
 * Notifies when the [NavigationMesh] has changed.
 *
*/
navigation_mesh_changed: Signal<() => void>

}


 
