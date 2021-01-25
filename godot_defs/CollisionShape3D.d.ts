
/**
 * Editor facility for creating and editing collision shapes in 3D space. You can use this node to represent all sorts of collision shapes, for example, add this to an [Area3D] to give it a detection shape, or add it to a [PhysicsBody3D] to create a solid object. **IMPORTANT**: this is an Editor-only helper to create shapes, use [method CollisionObject3D.shape_owner_get_shape] to get the actual shape.
 *
*/
declare class CollisionShape3D extends Node3D {

  
/**
 * Editor facility for creating and editing collision shapes in 3D space. You can use this node to represent all sorts of collision shapes, for example, add this to an [Area3D] to give it a detection shape, or add it to a [PhysicsBody3D] to create a solid object. **IMPORTANT**: this is an Editor-only helper to create shapes, use [method CollisionObject3D.shape_owner_get_shape] to get the actual shape.
 *
*/
  "new"(): this;
  static "new"(): this;



/** A disabled collision shape has no effect in the world. */
disabled: boolean;

/** The actual shape owned by this collision shape. */
shape: Shape3D;

/** Sets the collision shape's shape to the addition of all its convexed [MeshInstance3D] siblings geometry. */
make_convex_from_siblings(): void;

/** If this method exists within a script it will be called whenever the shape resource has been modified. */
resource_changed(resource: Resource): void;

  connect<T extends SignalsOf<CollisionShape3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
