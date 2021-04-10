
/**
 * 3D Obstacle used in navigation for collision avoidance. The obstacle needs navigation data to work correctly. This can be done by having the obstacle as a child of a [Navigation3D] node, or using [method set_navigation]. [NavigationObstacle3D] is physics safe.
 *
*/
declare class NavigationObstacle3D extends Node {

  
/**
 * 3D Obstacle used in navigation for collision avoidance. The obstacle needs navigation data to work correctly. This can be done by having the obstacle as a child of a [Navigation3D] node, or using [method set_navigation]. [NavigationObstacle3D] is physics safe.
 *
*/
  "new"(): this;
  static "new"(): this;




/** Returns the [Navigation3D] node that the obstacle is using for its navigation system. */
get_navigation(): Node;

/** Sets the [Navigation3D] node used by the obstacle. Useful when you don't want to make the obstacle a child of a [Navigation3D] node. */
set_navigation(navigation: Node): void;

  connect<T extends SignalsOf<NavigationObstacle3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
