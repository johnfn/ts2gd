
/**
 * Class that has everything pertaining to a world. A physics space, a visual scenario and a sound space. Spatial nodes register their resources into the current world.
 *
*/
declare class World extends Resource  {

  
/**
 * Class that has everything pertaining to a world. A physics space, a visual scenario and a sound space. Spatial nodes register their resources into the current world.
 *
*/
  new(): World; 
  static "new"(): World 


/** Direct access to the world's physics 3D space state. Used for querying current and potential collisions. */
direct_space_state: PhysicsDirectSpaceState;

/** The World's [Environment]. */
environment: Environment;

/** The World's fallback_environment will be used if the World's [Environment] fails or is missing. */
fallback_environment: Environment;

/** The World's visual scenario. */
scenario: RID;

/** The World's physics space. */
space: RID;



  connect<T extends SignalsOf<World>>(signal: T, method: SignalFunction<World[T]>): number;






}

