
/**
 * 2D Agent that is used in navigation to reach a location while avoiding static and dynamic obstacles. The dynamic obstacles are avoided using RVO collision avoidance. The agent needs navigation data to work correctly. This can be done by having the agent as a child of a [Navigation2D] node, or using [method set_navigation]. [NavigationAgent2D] is physics safe.
 *
*/
declare class NavigationAgent2D extends Node {

  
/**
 * 2D Agent that is used in navigation to reach a location while avoiding static and dynamic obstacles. The dynamic obstacles are avoided using RVO collision avoidance. The agent needs navigation data to work correctly. This can be done by having the agent as a child of a [Navigation2D] node, or using [method set_navigation]. [NavigationAgent2D] is physics safe.
 *
*/
  "new"(): this;
  static "new"(): this;



/** The maximum number of neighbors for the agent to consider. */
max_neighbors: int;

/** The maximum speed that an agent can move. */
max_speed: float;

/** The distance to search for other agents. */
neighbor_dist: float;

/** The maximum distance the agent is allowed away from the ideal path to the final location. This can happen due to trying to avoid collisions. When the maximum distance is exceeded, it recalculates the ideal path. */
path_max_distance: float;

/** The radius of the agent. */
radius: float;

/** The distance threshold before a target is considered to be reached. This will allow an agent to not have to hit a point on the path exactly, but in the area. */
target_desired_distance: float;

/** The minimal amount of time for which this agent's velocities, that are computed with the collision avoidance algorithim, are safe with respect to other agents. The larger the number, the sooner the agent will respond to other agents, but less freedom in choosing its velocities. Must be positive. */
time_horizon: float;

/** Returns the distance to the target location, using the agent's global position. The user must set the target location with [method set_target_location] in order for this to be accurate. */
distance_to_target(): float;

/** Returns the reachable final location in global coordinates. This can change if the navigation path is altered in any way. */
get_final_location(): Vector2;

/** Returns the path from start to finish in global coordinates. */
get_nav_path(): PackedVector2Array;

/** Returns which index the agent is currently on in the navigation path's [PackedVector2Array]. */
get_nav_path_index(): int;

/** Returns the [Navigation2D] node that the agent is using for its navigation system. */
get_navigation(): Node;

/** Returns a [Vector2] in global coordinates, that can be moved to, making sure that there are no static objects in the way. If the agent does not have a navigation path, it will return the position of the agent's parent. */
get_next_location(): Vector2;

/** Returns the user defined [Vector2] after setting the target location. */
get_target_location(): Vector2;

/** Returns true if the navigation path's final location has been reached. */
is_navigation_finished(): boolean;

/** Returns true if the target location is reachable. The target location is set using [method set_target_location]. */
is_target_reachable(): boolean;

/** Returns true if the target location is reached. The target location is set using [method set_target_location]. It may not always be possible to reach the target location. It should always be possible to reach the final location though. See [method get_final_location]. */
is_target_reached(): boolean;

/** Sets the [Navigation2D] node used by the agent. Useful when you don't want to make the agent a child of a [Navigation2D] node. */
set_navigation(navigation: Node): void;

/** Sets the user desired final location. This will clear the current navigation path. */
set_target_location(location: Vector2): void;

/** Sends the passed in velocity to the collision avoidance algorithm. It will adjust the velocity to avoid collisions. Once the adjustment to the velocity is complete, it will emit the [signal velocity_computed] signal. */
set_velocity(velocity: Vector2): void;

  connect<T extends SignalsOf<NavigationAgent2D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  /**
 * Notifies when the final location is reached.
 *
*/
navigation_finished: Signal<() => void>

/**
 * Notifies when the navigation path changes.
 *
*/
path_changed: Signal<() => void>

/**
 * Notifies when the player defined target, set with [method set_target_location], is reached.
 *
*/
target_reached: Signal<() => void>

/**
 * Notifies when the collision avoidance velocity is calculated. Emitted by [method set_velocity].
 *
*/
velocity_computed: Signal<(safe_velocity: Vector3) => void>

}


 
