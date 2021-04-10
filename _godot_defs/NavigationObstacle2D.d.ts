
/**
 * 2D Obstacle used in navigation for collision avoidance. The obstacle needs navigation data to work correctly. This can be done by having the obstacle as a child of a [Navigation2D] node, or using [method set_navigation]. [NavigationObstacle2D] is physics safe.
 *
*/
declare class NavigationObstacle2D extends Node {

  
/**
 * 2D Obstacle used in navigation for collision avoidance. The obstacle needs navigation data to work correctly. This can be done by having the obstacle as a child of a [Navigation2D] node, or using [method set_navigation]. [NavigationObstacle2D] is physics safe.
 *
*/
  "new"(): this;
  static "new"(): this;




/** Returns the [Navigation2D] node that the obstacle is using for its navigation system. */
get_navigation(): Node;

/** Sets the [Navigation2D] node used by the obstacle. Useful when you don't want to make the obstacle a child of a [Navigation2D] node. */
set_navigation(navigation: Node): void;

  connect<T extends SignalsOf<NavigationObstacle2D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
