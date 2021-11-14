
/**
 * Static body for 2D physics. A StaticBody2D is a body that is not intended to move. It is ideal for implementing objects in the environment, such as walls or platforms.
 *
 * Additionally, a constant linear or angular velocity can be set for the static body, which will affect colliding bodies as if it were moving (for example, a conveyor belt).
 *
*/
declare class StaticBody2D extends PhysicsBody2D  {

  
/**
 * Static body for 2D physics. A StaticBody2D is a body that is not intended to move. It is ideal for implementing objects in the environment, such as walls or platforms.
 *
 * Additionally, a constant linear or angular velocity can be set for the static body, which will affect colliding bodies as if it were moving (for example, a conveyor belt).
 *
*/
  new(): StaticBody2D; 
  static "new"(): StaticBody2D 


/**
 * The body's bounciness. Values range from `0` (no bounce) to `1` (full bounciness).
 *
 * Deprecated, use [member PhysicsMaterial.bounce] instead via [member physics_material_override].
 *
*/
bounce: float;

/** The body's constant angular velocity. This does not rotate the body, but affects colliding bodies, as if it were rotating. */
constant_angular_velocity: float;

/** The body's constant linear velocity. This does not move the body, but affects colliding bodies, as if it were moving. */
constant_linear_velocity: Vector2;

/**
 * The body's friction. Values range from `0` (no friction) to `1` (full friction).
 *
 * Deprecated, use [member PhysicsMaterial.friction] instead via [member physics_material_override].
 *
*/
friction: float;

/**
 * The physics material override for the body.
 *
 * If a material is assigned to this property, it will be used instead of any other physics material, such as an inherited one.
 *
*/
physics_material_override: PhysicsMaterial;



  connect<T extends SignalsOf<StaticBody2D>>(signal: T, method: SignalFunction<StaticBody2D[T]>): number;






}

