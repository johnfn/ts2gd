
/**
 * Editor facility for creating and editing collision shapes in 3D space. You can use this node to represent all sorts of collision shapes, for example, add this to an [Area] to give it a detection shape, or add it to a [PhysicsBody] to create a solid object. **IMPORTANT**: this is an Editor-only helper to create shapes, use [method CollisionObject.shape_owner_get_shape] to get the actual shape.
 *
*/
declare class CollisionShape extends Spatial {

  
/**
 * Editor facility for creating and editing collision shapes in 3D space. You can use this node to represent all sorts of collision shapes, for example, add this to an [Area] to give it a detection shape, or add it to a [PhysicsBody] to create a solid object. **IMPORTANT**: this is an Editor-only helper to create shapes, use [method CollisionObject.shape_owner_get_shape] to get the actual shape.
 *
*/
  "new"(): CollisionShape;
  static "new"(): CollisionShape;



/** A disabled collision shape has no effect in the world. */
disabled: boolean;

/** The actual shape owned by this collision shape. */
shape: Shape;

/** Sets the collision shape's shape to the addition of all its convexed [MeshInstance] siblings geometry. */
make_convex_from_brothers(): void;

/** If this method exists within a script it will be called whenever the shape resource has been modified. */
resource_changed(resource: Resource): void;

  // connect<T extends SignalsOf<CollisionShape>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<CollisionShapeSignals>>(signal: T, method: SignalFunction<CollisionShapeSignals[T]>): number;




}

declare class CollisionShapeSignals extends SpatialSignals {
  
}
