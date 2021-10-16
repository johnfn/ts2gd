
/**
 * [Portal]s are a special type of [MeshInstance] that allow the portal culling system to 'see' from one room to the next. They often correspond to doors and windows in level geometry. By only allowing [Camera]s to see through portals, this allows the system to cull out all the objects in rooms that cannot be seen through portals. This is a form of **occlusion culling**, and can greatly increase performance.
 *
 * There are some limitations to the form of portals:
 *
 * They must be single sided convex polygons, and usually you would orientate their front faces **outward** from the [Room] they are placed in. The vertices should be positioned on a single plane (although their positioning does not have to be perfect).
 *
 * There is no need to place an opposite portal in an adjacent room, links are made two-way automatically.
 *
*/
declare class Portal extends Spatial {

  
/**
 * [Portal]s are a special type of [MeshInstance] that allow the portal culling system to 'see' from one room to the next. They often correspond to doors and windows in level geometry. By only allowing [Camera]s to see through portals, this allows the system to cull out all the objects in rooms that cannot be seen through portals. This is a form of **occlusion culling**, and can greatly increase performance.
 *
 * There are some limitations to the form of portals:
 *
 * They must be single sided convex polygons, and usually you would orientate their front faces **outward** from the [Room] they are placed in. The vertices should be positioned on a single plane (although their positioning does not have to be perfect).
 *
 * There is no need to place an opposite portal in an adjacent room, links are made two-way automatically.
 *
*/
  "new"(): Portal;
  static "new"(): Portal;



/** This is a shortcut for setting the linked [Room] in the name of the [Portal] (the name is used during conversion). */
linked_room: NodePathType;

/**
 * The points defining the shape of the [Portal] polygon (which should be convex).
 *
 * These are defined in 2D, with `0,0` being the origin of the [Portal] node's [member Spatial.global_transform].
 *
 * **Note:** These raw points are sanitized for winding order internally.
 *
*/
points: PoolVector2Array;

/** Visibility through [Portal]s can be turned on and off at runtime - this is useful for having closable doors. */
portal_active: boolean;

/** Some objects are so big that they may be present in more than one [Room] ('sprawling'). As we often don't want objects that *just* breach the edges to be assigned to neighbouring rooms, you can assign an extra margin through the [Portal] to allow objects to breach without sprawling. */
portal_margin: float;

/** Portals default to being two way - see through in both directions, however you can make them one way, visible from the source room only. */
two_way: boolean;

/**
 * In most cases you will want to use the default [Portal] margin in your portals (this is set in the [RoomManager]).
 *
 * If you want to override this default, set this value to `false`, and the local [member portal_margin] will take effect.
 *
*/
use_default_margin: boolean;

/** Sets individual points. Primarily for use by the editor. */
set_point(index: int, position: Vector2): void;

  // connect<T extends SignalsOf<Portal>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<PortalSignals>>(signal: T, method: SignalFunction<PortalSignals[T]>): number;




}

declare class PortalSignals extends SpatialSignals {
  
}
