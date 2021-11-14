
/**
 * Provides common functionality to nodes that can be culled by the [Portal] system.
 *
 * `Static` and `Dynamic` objects are the most efficiently managed objects in the system, but there are some caveats. They are expected to be present initially when [Room]s are converted using the [RoomManager] `rooms_convert` function, and their lifetime should be the same as the game level (i.e. present until you call `rooms_clear` on the [RoomManager]. Although you shouldn't create / delete these objects during gameplay, you can manage their visibility with the standard `hide` and `show` commands.
 *
 * `Roaming` objects on the other hand, require extra processing to keep track of which [Room] they are within. This enables them to be culled effectively, wherever they are.
 *
 * `Global` objects are not culled by the portal system, and use view frustum culling only.
 *
 * Objects that are not `Static` or `Dynamic` can be freely created and deleted during the lifetime of the game level.
 *
*/
declare class CullInstance extends Spatial  {

  
/**
 * Provides common functionality to nodes that can be culled by the [Portal] system.
 *
 * `Static` and `Dynamic` objects are the most efficiently managed objects in the system, but there are some caveats. They are expected to be present initially when [Room]s are converted using the [RoomManager] `rooms_convert` function, and their lifetime should be the same as the game level (i.e. present until you call `rooms_clear` on the [RoomManager]. Although you shouldn't create / delete these objects during gameplay, you can manage their visibility with the standard `hide` and `show` commands.
 *
 * `Roaming` objects on the other hand, require extra processing to keep track of which [Room] they are within. This enables them to be culled effectively, wherever they are.
 *
 * `Global` objects are not culled by the portal system, and use view frustum culling only.
 *
 * Objects that are not `Static` or `Dynamic` can be freely created and deleted during the lifetime of the game level.
 *
*/
  new(): CullInstance; 
  static "new"(): CullInstance 


/**
 * When set to `0`, [CullInstance]s will be autoplaced in the [Room] with the highest priority.
 *
 * When set to a value other than `0`, the system will attempt to autoplace in a [Room] with the `autoplace_priority`, if it is present.
 *
 * This can be used to control autoplacement of building exteriors in an outer [RoomGroup].
 *
*/
autoplace_priority: int;

/**
 * When a manual bound has not been explicitly specified for a [Room], the convex hull bound will be estimated from the geometry of the objects within the room. This setting determines whether the geometry of an object is included in this estimate of the room bound.
 *
 * **Note:** This setting is only relevant when the object is set to `PORTAL_MODE_STATIC` or `PORTAL_MODE_DYNAMIC`, and for [Portal]s.
 *
*/
include_in_bound: boolean;

/** When using [Room]s and [Portal]s, this specifies how the [CullInstance] is processed in the system. */
portal_mode: int;



  connect<T extends SignalsOf<CullInstance>>(signal: T, method: SignalFunction<CullInstance[T]>): number;



/**
 * Use for instances within [Room]s that will **not move** - e.g. walls, floors.
 *
 * **Note:** If you attempt to delete a `PORTAL_MODE_STATIC` instance while the room graph is loaded (converted), it will unload the room graph and deactivate portal culling. This is because the **room graph** data has been invalidated. You will need to reconvert the rooms using the [RoomManager] to activate the system again.
 *
*/
static PORTAL_MODE_STATIC: any;

/**
 * Use for instances within rooms that will move but **not change room** - e.g. moving platforms.
 *
 * **Note:** If you attempt to delete a `PORTAL_MODE_DYNAMIC` instance while the room graph is loaded (converted), it will unload the room graph and deactivate portal culling. This is because the **room graph** data has been invalidated. You will need to reconvert the rooms using the [RoomManager] to activate the system again.
 *
*/
static PORTAL_MODE_DYNAMIC: any;

/**
 * Use for instances that will move **between** [Room]s - e.g. players.
 *
*/
static PORTAL_MODE_ROAMING: any;

/**
 * Use for instances that will be frustum culled only - e.g. first person weapon, debug.
 *
*/
static PORTAL_MODE_GLOBAL: any;

/**
 * Use for instances that will not be shown at all - e.g. **manual room bounds** (specified by prefix **'Bound_'**).
 *
*/
static PORTAL_MODE_IGNORE: any;



}

