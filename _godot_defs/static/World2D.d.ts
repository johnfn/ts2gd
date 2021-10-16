
/**
 * Class that has everything pertaining to a 2D world. A physics space, a visual scenario and a sound space. 2D nodes register their resources into the current 2D world.
 *
*/
declare class World2D extends Resource {

  
/**
 * Class that has everything pertaining to a 2D world. A physics space, a visual scenario and a sound space. 2D nodes register their resources into the current 2D world.
 *
*/
  "new"(): World2D;
  static "new"(): World2D;



/** The [RID] of this world's canvas resource. Used by the [VisualServer] for 2D drawing. */
canvas: RID;

/** Direct access to the world's physics 2D space state. Used for querying current and potential collisions. When using multi-threaded physics, access is limited to [code]_physics_process(delta)[/code] in the main thread. */
direct_space_state: Physics2DDirectSpaceState;

/** The [RID] of this world's physics space resource. Used by the [Physics2DServer] for 2D physics, treating it as both a space and an area. */
space: RID;



  // connect<T extends SignalsOf<World2D>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<World2DSignals>>(signal: T, method: SignalFunction<World2DSignals[T]>): number;




}

declare class World2DSignals extends ResourceSignals {
  
}
