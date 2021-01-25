
/**
 * Editor facility for creating and editing collision shapes in 2D space. You can use this node to represent all sorts of collision shapes, for example, add this to an [Area2D] to give it a detection shape, or add it to a [PhysicsBody2D] to create a solid object. **IMPORTANT**: this is an Editor-only helper to create shapes, use [method CollisionObject2D.shape_owner_get_shape] to get the actual shape.
 *
*/
declare class CollisionShape2D extends Node2D {

  
/**
 * Editor facility for creating and editing collision shapes in 2D space. You can use this node to represent all sorts of collision shapes, for example, add this to an [Area2D] to give it a detection shape, or add it to a [PhysicsBody2D] to create a solid object. **IMPORTANT**: this is an Editor-only helper to create shapes, use [method CollisionObject2D.shape_owner_get_shape] to get the actual shape.
 *
*/
  "new"(): CollisionShape2D;
  static "new"(): CollisionShape2D;



/** A disabled collision shape has no effect in the world. This property should be changed with [method Object.set_deferred]. */
disabled: boolean;

/** Sets whether this collision shape should only detect collision on one side (top or bottom). */
one_way_collision: boolean;

/** The margin used for one-way collision (in pixels). Higher values will make the shape thicker, and work better for colliders that enter the shape at a high velocity. */
one_way_collision_margin: float;

/** The actual shape owned by this collision shape. */
shape: Shape2D;



  connect<T extends SignalsOf<CollisionShape2D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
