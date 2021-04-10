
/**
 * Static body for 3D physics. A static body is a simple body that is not intended to move. In contrast to [RigidBody3D], they don't consume any CPU resources as long as they don't move.
 *
 * Additionally, a constant linear or angular velocity can be set for the static body, so even if it doesn't move, it affects other bodies as if it was moving (this is useful for simulating conveyor belts or conveyor wheels).
 *
*/
declare class StaticBody3D extends PhysicsBody3D {

  
/**
 * Static body for 3D physics. A static body is a simple body that is not intended to move. In contrast to [RigidBody3D], they don't consume any CPU resources as long as they don't move.
 *
 * Additionally, a constant linear or angular velocity can be set for the static body, so even if it doesn't move, it affects other bodies as if it was moving (this is useful for simulating conveyor belts or conveyor wheels).
 *
*/
  "new"(): this;
  static "new"(): this;



/** The body's constant angular velocity. This does not rotate the body, but affects other bodies that touch it, as if it was in a state of rotation. */
constant_angular_velocity: Vector3;

/** The body's constant linear velocity. This does not move the body, but affects other bodies that touch it, as if it was in a state of movement. */
constant_linear_velocity: Vector3;

/**
 * The physics material override for the body.
 *
 * If a material is assigned to this property, it will be used instead of any other physics material, such as an inherited one.
 *
*/
physics_material_override: PhysicsMaterial;



  connect<T extends SignalsOf<StaticBody3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
