
/**
 * Although [Room] behaviour can be specified individually, sometimes it is faster and more convenient to write functionality for a group of rooms.
 *
 * [RoomGroup]s should be placed as children of the **room list** (the parent [Node] of your [Room]s), and [Room]s should be placed in turn as children of a [RoomGroup] in order to assign them to the RoomGroup.
 *
 * A [RoomGroup] can for example be used to specify [Room]s that are **outside**, and switch on or off a directional light, sky, or rain effect as the player enters / exits the area.
 *
 * [RoomGroup]s receive **gameplay callbacks** when the `gameplay_monitor` is switched on, as `signal`s or `notification`s as they enter and exit the **gameplay area** (see [RoomManager] for details).
 *
*/
declare class RoomGroup extends Spatial {

  
/**
 * Although [Room] behaviour can be specified individually, sometimes it is faster and more convenient to write functionality for a group of rooms.
 *
 * [RoomGroup]s should be placed as children of the **room list** (the parent [Node] of your [Room]s), and [Room]s should be placed in turn as children of a [RoomGroup] in order to assign them to the RoomGroup.
 *
 * A [RoomGroup] can for example be used to specify [Room]s that are **outside**, and switch on or off a directional light, sky, or rain effect as the player enters / exits the area.
 *
 * [RoomGroup]s receive **gameplay callbacks** when the `gameplay_monitor` is switched on, as `signal`s or `notification`s as they enter and exit the **gameplay area** (see [RoomManager] for details).
 *
*/
  "new"(): RoomGroup;
  static "new"(): RoomGroup;



/**
 * This priority will be applied to [Room]s within the group. The [Room] priority allows the use of **internal rooms**, rooms **within** another room or rooms.
 *
 * When the [Camera] is within more than one room (regular and internal), the higher priority room will take precedence. So with for example, a house inside a terrain 'room', you would make the house higher priority, so that when the camera is within the house, the house is used as the source room, but outside the house, the terrain room would be used instead.
 *
*/
roomgroup_priority: int;



  // connect<T extends SignalsOf<RoomGroup>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<RoomGroupSignals>>(signal: T, method: SignalFunction<RoomGroupSignals[T]>): number;




}

declare class RoomGroupSignals extends SpatialSignals {
  
}
