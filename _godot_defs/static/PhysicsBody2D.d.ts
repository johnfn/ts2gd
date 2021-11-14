
/**
 * PhysicsBody2D is an abstract base class for implementing a physics body. All *Body2D types inherit from it.
 *
*/
declare class PhysicsBody2D extends CollisionObject2D  {

  
/**
 * PhysicsBody2D is an abstract base class for implementing a physics body. All *Body2D types inherit from it.
 *
*/
  new(): PhysicsBody2D; 
  static "new"(): PhysicsBody2D 



/** Both collision_layer and collision_mask. Returns collision_layer when accessed. Updates collision_layer and collision_mask when modified. */
layers: int;

/** Adds a body to the list of bodies that this body can't collide with. */
add_collision_exception_with(body: Node): void;

/** Returns an array of nodes that were added as collision exceptions for this body. */
get_collision_exceptions(): any[];

/** Removes a body from the list of bodies that this body can't collide with. */
remove_collision_exception_with(body: Node): void;

  connect<T extends SignalsOf<PhysicsBody2D>>(signal: T, method: SignalFunction<PhysicsBody2D[T]>): number;






}

