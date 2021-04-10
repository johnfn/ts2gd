
/**
*/
declare class NavigationMeshGeneratorClass extends Object {

  
/**
*/
  "new"(): this;
  static "new"(): this;




/** No documentation provided. */
bake(nav_mesh: NavigationMesh, root_node: Node): void;

/** No documentation provided. */
clear(nav_mesh: NavigationMesh): void;

  connect<T extends SignalsOf<NavigationMeshGeneratorClass>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
