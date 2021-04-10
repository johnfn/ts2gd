
/**
 * NavigationServer3D is the server responsible for all 3D navigation. It creates the agents, maps, and regions for navigation to work as expected. This keeps tracks of any call and executes them during the sync phase. This means that you can request any change to the map, using any thread, without worrying.
 *
*/
declare class NavigationServer3DClass extends Object {

  
/**
 * NavigationServer3D is the server responsible for all 3D navigation. It creates the agents, maps, and regions for navigation to work as expected. This keeps tracks of any call and executes them during the sync phase. This means that you can request any change to the map, using any thread, without worrying.
 *
*/
  "new"(): this;
  static "new"(): this;




/** Creates the agent. */
agent_create(): RID;

/** Returns true if the map got changed the previous frame. */
agent_is_map_changed(agent: RID): boolean;

/** Callback called at the end of the RVO process. */
agent_set_callback(agent: RID, receiver: Object, method: StringName, userdata?: any): void;

/** Puts the agent in the map. */
agent_set_map(agent: RID, map: RID): void;

/** Sets the maximum number of other agents the agent takes into account in the navigation. The larger this number, the longer the running time of the simulation. If the number is too low, the simulation will not be safe. */
agent_set_max_neighbors(agent: RID, count: int): void;

/** Sets the maximum speed of the agent. Must be positive. */
agent_set_max_speed(agent: RID, max_speed: float): void;

/** Sets the maximum distance to other agents this agent takes into account in the navigation. The larger this number, the longer the running time of the simulation. If the number is too low, the simulation will not be safe. */
agent_set_neighbor_dist(agent: RID, dist: float): void;

/** Sets the position of the agent in world space. */
agent_set_position(agent: RID, position: Vector3): void;

/** Sets the radius of the agent. */
agent_set_radius(agent: RID, radius: float): void;

/** Sets the new target velocity. */
agent_set_target_velocity(agent: RID, target_velocity: Vector3): void;

/** The minimal amount of time for which the agent's velocities that are computed by the simulation are safe with respect to other agents. The larger this number, the sooner this agent will respond to the presence of other agents, but the less freedom this agent has in choosing its velocities. Must be positive. */
agent_set_time_horizon(agent: RID, time: float): void;

/** Sets the current velocity of the agent. */
agent_set_velocity(agent: RID, velocity: Vector3): void;

/** Destroy the RID */
free(object: RID): void;

/** Create a new map. */
map_create(): RID;

/** Returns the map cell size. */
map_get_cell_size(map: RID): float;

/** Returns the point closest to the provided [code]point[/code] on the navigation mesh surface. */
map_get_closest_point(map: RID, to_point: Vector3): Vector3;

/** Returns the normal for the point returned by [method map_get_closest_point]. */
map_get_closest_point_normal(map: RID, to_point: Vector3): Vector3;

/** Returns the owner region RID for the point returned by [method map_get_closest_point]. */
map_get_closest_point_owner(map: RID, to_point: Vector3): RID;

/** Returns the closest point between the navigation surface and the segment. */
map_get_closest_point_to_segment(map: RID, start: Vector3, end: Vector3, use_collision?: boolean): Vector3;

/** Returns the edge connection margin of the map. */
map_get_edge_connection_margin(map: RID): float;

/** Returns the navigation path to reach the destination from the origin. */
map_get_path(map: RID, origin: Vector3, destination: Vector3, optimize: boolean): PackedVector3Array;

/** Returns the map's up direction. */
map_get_up(map: RID): Vector3;

/** Returns true if the map is active. */
map_is_active(nap: RID): boolean;

/** Sets the map active. */
map_set_active(map: RID, active: boolean): void;

/** Set the map cell size used to weld the navigation mesh polygons. */
map_set_cell_size(map: RID, cell_size: float): void;

/** Set the map edge connection margein used to weld the compatible region edges. */
map_set_edge_connection_margin(map: RID, margin: float): void;

/** Sets the map up direction. */
map_set_up(map: RID, up: Vector3): void;

/**
 * Process the collision avoidance agents.
 *
 * The result of this process is needed by the physics server, so this must be called in the main thread.
 *
 * Note: This function is not thread safe.
 *
*/
process(delta_time: float): void;

/** Bakes the navigation mesh. */
region_bake_navmesh(mesh: NavigationMesh, node: Node): void;

/** Creates a new region. */
region_create(): RID;

/** Sets the map for the region. */
region_set_map(region: RID, map: RID): void;

/** Sets the navigation mesh for the region. */
region_set_navmesh(region: RID, nav_mesh: NavigationMesh): void;

/** Sets the global transformation for the region. */
region_set_transform(region: RID, transform: Transform): void;

/** Control activation of this server. */
set_active(active: boolean): void;

  connect<T extends SignalsOf<NavigationServer3DClass>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
