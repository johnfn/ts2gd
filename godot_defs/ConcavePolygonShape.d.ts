
/**
 * Concave polygon shape resource, which can be set into a [PhysicsBody] or area. This shape is created by feeding a list of triangles.
 *
 * Note: when used for collision, [ConcavePolygonShape] is intended to work with static [PhysicsBody] nodes like [StaticBody] and will not work with [KinematicBody] or [RigidBody] with a mode other than Static.
 *
*/
declare class ConcavePolygonShape extends Shape {

  
/**
 * Concave polygon shape resource, which can be set into a [PhysicsBody] or area. This shape is created by feeding a list of triangles.
 *
 * Note: when used for collision, [ConcavePolygonShape] is intended to work with static [PhysicsBody] nodes like [StaticBody] and will not work with [KinematicBody] or [RigidBody] with a mode other than Static.
 *
*/
  "new"(): ConcavePolygonShape;
  static "new"(): ConcavePolygonShape;




/** Returns the faces (an array of triangles). */
get_faces(): PoolVector3Array;

/** Sets the faces (an array of triangles). */
set_faces(faces: PoolVector3Array): void;

  connect<T extends SignalsOf<ConcavePolygonShape>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
