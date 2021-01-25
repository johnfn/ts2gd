
/**
 * Concave polygon shape resource, which can be set into a [PhysicsBody3D] or area. This shape is created by feeding a list of triangles.
 *
 * Note: when used for collision, [ConcavePolygonShape3D] is intended to work with static [PhysicsBody3D] nodes like [StaticBody3D] and will not work with [KinematicBody3D] or [RigidBody3D] with a mode other than Static.
 *
*/
declare class ConcavePolygonShape3D extends Shape3D {

  
/**
 * Concave polygon shape resource, which can be set into a [PhysicsBody3D] or area. This shape is created by feeding a list of triangles.
 *
 * Note: when used for collision, [ConcavePolygonShape3D] is intended to work with static [PhysicsBody3D] nodes like [StaticBody3D] and will not work with [KinematicBody3D] or [RigidBody3D] with a mode other than Static.
 *
*/
  "new"(): this;
  static "new"(): this;




/** Returns the faces (an array of triangles). */
get_faces(): PackedVector3Array;

/** Sets the faces (an array of triangles). */
set_faces(faces: PackedVector3Array): void;

  connect<T extends SignalsOf<ConcavePolygonShape3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
