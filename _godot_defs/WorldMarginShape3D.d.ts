
/**
 * An infinite plane shape for 3D collisions. Note that the [Plane]'s normal matters; anything "below" the plane will collide with it. If the [WorldMarginShape3D] is used in a [PhysicsBody3D], it will cause colliding objects placed "below" it to teleport "above" the plane.
 *
*/
declare class WorldMarginShape3D extends Shape3D {

  
/**
 * An infinite plane shape for 3D collisions. Note that the [Plane]'s normal matters; anything "below" the plane will collide with it. If the [WorldMarginShape3D] is used in a [PhysicsBody3D], it will cause colliding objects placed "below" it to teleport "above" the plane.
 *
*/
  "new"(): this;
  static "new"(): this;



/** The [Plane] used by the [WorldMarginShape3D] for collision. */
plane: Plane;



  connect<T extends SignalsOf<WorldMarginShape3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
