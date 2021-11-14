
/**
 * Provides a means of modifying the collision properties of a [PhysicsBody].
 *
*/
declare class PhysicsMaterial extends Resource  {

  
/**
 * Provides a means of modifying the collision properties of a [PhysicsBody].
 *
*/
  new(): PhysicsMaterial; 
  static "new"(): PhysicsMaterial 


/** If [code]true[/code], subtracts the bounciness from the colliding object's bounciness instead of adding it. */
absorbent: boolean;

/** The body's bounciness. Values range from [code]0[/code] (no bounce) to [code]1[/code] (full bounciness). */
bounce: float;

/** The body's friction. Values range from [code]0[/code] (frictionless) to [code]1[/code] (maximum friction). */
friction: float;

/** If [code]true[/code], the physics engine will use the friction of the object marked as "rough" when two objects collide. If [code]false[/code], the physics engine will use the lowest friction of all colliding objects instead. If [code]true[/code] for both colliding objects, the physics engine will use the highest friction. */
rough: boolean;



  connect<T extends SignalsOf<PhysicsMaterial>>(signal: T, method: SignalFunction<PhysicsMaterial[T]>): number;






}

