
/**
 * Sphere shape for 3D collisions, which can be set into a [PhysicsBody] or [Area]. This shape is useful for modeling sphere-like 3D objects.
 *
*/
declare class SphereShape extends Shape {

  
/**
 * Sphere shape for 3D collisions, which can be set into a [PhysicsBody] or [Area]. This shape is useful for modeling sphere-like 3D objects.
 *
*/
  "new"(): SphereShape;
  static "new"(): SphereShape;



/** The sphere's radius. The shape's diameter is double the radius. */
radius: float;



  // connect<T extends SignalsOf<SphereShape>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<SphereShapeSignals>>(signal: T, method: SignalFunction<SphereShapeSignals[T]>): number;




}

declare class SphereShapeSignals extends ShapeSignals {
  
}
