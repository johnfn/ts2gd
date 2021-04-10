
/**
 * Class that has everything pertaining to a world. A physics space, a visual scenario and a sound space. Node3D nodes register their resources into the current world.
 *
*/
declare class World3D extends Resource {

  
/**
 * Class that has everything pertaining to a world. A physics space, a visual scenario and a sound space. Node3D nodes register their resources into the current world.
 *
*/
  "new"(): this;
  static "new"(): this;




/** Direct access to the world's physics 3D space state. Used for querying current and potential collisions. Must only be accessed from within [code]_physics_process(delta)[/code]. */
direct_space_state: PhysicsDirectSpaceState3D;

/** The World3D's [Environment]. */
environment: Environment;

/** The World3D's fallback_environment will be used if the World3D's [Environment] fails or is missing. */
fallback_environment: Environment;

/** The World3D's visual scenario. */
scenario: RID;

/** The World3D's physics space. */
space: RID;



  connect<T extends SignalsOf<World3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
