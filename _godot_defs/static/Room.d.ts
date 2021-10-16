
/**
 * The [Portal] culling system requires levels to be built using objects grouped together by location in areas called [Room]s. In many cases these will correspond to actual rooms in buildings, but not necessarily (a canyon area may be treated as a room).
 *
 * Any [VisualInstance] that is a child or grandchild of a [Room] will be assigned to that room, if the `portal_mode` of that [VisualInstance] is set to `STATIC` (does not move) or `DYNAMIC` (moves only within the room).
 *
 * Internally the room boundary must form a **convex hull**, and by default this is determined automatically by the geometry of the objects you place within the room.
 *
 * You can alternatively precisely specify a **manual bound**. If you place a [MeshInstance] with a name prefixed by `Bound_`, it will turn off the bound generation from geometry, and instead use the vertices of this MeshInstance to directly calculate a convex hull during the conversion stage (see [RoomManager]).
 *
 * In order to see from one room into an adjacent room, [Portal]s must be placed over non-occluded openings between rooms. These will often be placed over doors and windows.
 *
*/
declare class Room extends Spatial {

  
/**
 * The [Portal] culling system requires levels to be built using objects grouped together by location in areas called [Room]s. In many cases these will correspond to actual rooms in buildings, but not necessarily (a canyon area may be treated as a room).
 *
 * Any [VisualInstance] that is a child or grandchild of a [Room] will be assigned to that room, if the `portal_mode` of that [VisualInstance] is set to `STATIC` (does not move) or `DYNAMIC` (moves only within the room).
 *
 * Internally the room boundary must form a **convex hull**, and by default this is determined automatically by the geometry of the objects you place within the room.
 *
 * You can alternatively precisely specify a **manual bound**. If you place a [MeshInstance] with a name prefixed by `Bound_`, it will turn off the bound generation from geometry, and instead use the vertices of this MeshInstance to directly calculate a convex hull during the conversion stage (see [RoomManager]).
 *
 * In order to see from one room into an adjacent room, [Portal]s must be placed over non-occluded openings between rooms. These will often be placed over doors and windows.
 *
*/
  "new"(): Room;
  static "new"(): Room;



/**
 * If `points` are set, the [Room] bounding convex hull will be built from these points. If no points are set, the room bound will either be derived from a manual bound ([MeshInstance] with name prefix `Bound_`), or from the geometry within the room.
 *
 * Note that you can use the `Generate Points` editor button to get started. This will use either the geometry or manual bound to generate the room hull, and save the resulting points, allowing you to edit them to further refine the bound.
 *
*/
points: PoolVector3Array;

/** The [code]simplify[/code] value determines to what degree room hulls (bounds) are simplified, by removing similar planes. A value of 0 gives no simplification, 1 gives maximum simplification. */
room_simplify: float;

/** The room hull simplification can either use the default value set in the [RoomManager], or override this and use the per room setting. */
use_default_simplify: boolean;

/** Sets individual points. Primarily for use by the editor. */
set_point(index: int, position: Vector3): void;

  // connect<T extends SignalsOf<Room>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<RoomSignals>>(signal: T, method: SignalFunction<RoomSignals[T]>): number;




}

declare class RoomSignals extends SpatialSignals {
  
}
