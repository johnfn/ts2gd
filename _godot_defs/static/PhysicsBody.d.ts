
/**
 * PhysicsBody is an abstract base class for implementing a physics body. All *Body types inherit from it.
 *
*/
declare class PhysicsBody extends CollisionObject {

  
/**
 * PhysicsBody is an abstract base class for implementing a physics body. All *Body types inherit from it.
 *
*/
  "new"(): PhysicsBody;
  static "new"(): PhysicsBody;




/** Adds a body to the list of bodies that this body can't collide with. */
add_collision_exception_with(body: Node): void;

/** Returns an array of nodes that were added as collision exceptions for this body. */
get_collision_exceptions(): any[];

/** Removes a body from the list of bodies that this body can't collide with. */
remove_collision_exception_with(body: Node): void;

  // connect<T extends SignalsOf<PhysicsBody>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<PhysicsBodySignals>>(signal: T, method: SignalFunction<PhysicsBodySignals[T]>): number;




}

declare class PhysicsBodySignals extends CollisionObjectSignals {
  
}
