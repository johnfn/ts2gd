
/**
 * A* (A star) is a computer algorithm that is widely used in pathfinding and graph traversal, the process of plotting short paths among vertices (points), passing through a given set of edges (segments). It enjoys widespread use due to its performance and accuracy. Godot's A* implementation uses points in three-dimensional space and Euclidean distances by default.
 *
 * You must add points manually with [method add_point] and create segments manually with [method connect_points]. Then you can test if there is a path between two points with the [method are_points_connected] function, get a path containing indices by [method get_id_path], or one containing actual coordinates with [method get_point_path].
 *
 * It is also possible to use non-Euclidean distances. To do so, create a class that extends `AStar` and override methods [method _compute_cost] and [method _estimate_cost]. Both take two indices and return a length, as is shown in the following example.
 *
 * @example 
 * 
 * class MyAStar:
 *     extends AStar
 *     func _compute_cost(u, v):
 *         return abs(u - v)
 *     func _estimate_cost(u, v):
 *         return min(0, abs(u - v) - 1)
 * @summary 
 * 
 *
 * [method _estimate_cost] should return a lower bound of the distance, i.e. `_estimate_cost(u, v) <= _compute_cost(u, v)`. This serves as a hint to the algorithm because the custom `_compute_cost` might be computation-heavy. If this is not the case, make [method _estimate_cost] return the same value as [method _compute_cost] to provide the algorithm with the most accurate information.
 *
*/
declare class AStar extends Reference {

  
/**
 * A* (A star) is a computer algorithm that is widely used in pathfinding and graph traversal, the process of plotting short paths among vertices (points), passing through a given set of edges (segments). It enjoys widespread use due to its performance and accuracy. Godot's A* implementation uses points in three-dimensional space and Euclidean distances by default.
 *
 * You must add points manually with [method add_point] and create segments manually with [method connect_points]. Then you can test if there is a path between two points with the [method are_points_connected] function, get a path containing indices by [method get_id_path], or one containing actual coordinates with [method get_point_path].
 *
 * It is also possible to use non-Euclidean distances. To do so, create a class that extends `AStar` and override methods [method _compute_cost] and [method _estimate_cost]. Both take two indices and return a length, as is shown in the following example.
 *
 * @example 
 * 
 * class MyAStar:
 *     extends AStar
 *     func _compute_cost(u, v):
 *         return abs(u - v)
 *     func _estimate_cost(u, v):
 *         return min(0, abs(u - v) - 1)
 * @summary 
 * 
 *
 * [method _estimate_cost] should return a lower bound of the distance, i.e. `_estimate_cost(u, v) <= _compute_cost(u, v)`. This serves as a hint to the algorithm because the custom `_compute_cost` might be computation-heavy. If this is not the case, make [method _estimate_cost] return the same value as [method _compute_cost] to provide the algorithm with the most accurate information.
 *
*/
  "new"(): AStar;
  static "new"(): AStar;




/**
 * Called when computing the cost between two connected points.
 *
 * Note that this function is hidden in the default `AStar` class.
 *
*/
protected _compute_cost(from_id: int, to_id: int): float;

/**
 * Called when estimating the cost between a point and the path's ending point.
 *
 * Note that this function is hidden in the default `AStar` class.
 *
*/
protected _estimate_cost(from_id: int, to_id: int): float;

/**
 * Adds a new point at the given position with the given identifier. The algorithm prefers points with lower `weight_scale` to form a path. The `id` must be 0 or larger, and the `weight_scale` must be 1 or larger.
 *
 * @example 
 * 
 * var astar = AStar.new()
 * astar.add_point(1, Vector3(1, 0, 0), 4) # Adds the point (1, 0, 0) with weight_scale 4 and id 1
 * @summary 
 * 
 *
 * If there already exists a point for the given `id`, its position and weight scale are updated to the given values.
 *
*/
add_point(id: int, position: Vector3, weight_scale?: float): void;

/** Returns whether the two given points are directly connected by a segment. If [code]bidirectional[/code] is [code]false[/code], returns whether movement from [code]id[/code] to [code]to_id[/code] is possible through this segment. */
are_points_connected(id: int, to_id: int, bidirectional?: boolean): boolean;

/** Clears all the points and segments. */
clear(): void;

/**
 * Creates a segment between the given points. If `bidirectional` is `false`, only movement from `id` to `to_id` is allowed, not the reverse direction.
 *
 * @example 
 * 
 * var astar = AStar.new()
 * astar.add_point(1, Vector3(1, 1, 0))
 * astar.add_point(2, Vector3(0, 5, 0))
 * astar.connect_points(1, 2, false)
 * @summary 
 * 
 *
*/
connect_points(id: int, to_id: int, bidirectional?: boolean): void;

/** Deletes the segment between the given points. If [code]bidirectional[/code] is [code]false[/code], only movement from [code]id[/code] to [code]to_id[/code] is prevented, and a unidirectional segment possibly remains. */
disconnect_points(id: int, to_id: int, bidirectional?: boolean): void;

/** Returns the next available point ID with no point associated to it. */
get_available_point_id(): int;

/**
 * Returns the ID of the closest point to `to_position`, optionally taking disabled points into account. Returns `-1` if there are no points in the points pool.
 *
 * **Note:** If several points are the closest to `to_position`, the one with the smallest ID will be returned, ensuring a deterministic result.
 *
*/
get_closest_point(to_position: Vector3, include_disabled?: boolean): int;

/**
 * Returns the closest position to `to_position` that resides inside a segment between two connected points.
 *
 * @example 
 * 
 * var astar = AStar.new()
 * astar.add_point(1, Vector3(0, 0, 0))
 * astar.add_point(2, Vector3(0, 5, 0))
 * astar.connect_points(1, 2)
 * var res = astar.get_closest_position_in_segment(Vector3(3, 3, 0)) # Returns (0, 3, 0)
 * @summary 
 * 
 *
 * The result is in the segment that goes from `y = 0` to `y = 5`. It's the closest position in the segment to the given point.
 *
*/
get_closest_position_in_segment(to_position: Vector3): Vector3;

/**
 * Returns an array with the IDs of the points that form the path found by AStar between the given points. The array is ordered from the starting point to the ending point of the path.
 *
 * @example 
 * 
 * var astar = AStar.new()
 * astar.add_point(1, Vector3(0, 0, 0))
 * astar.add_point(2, Vector3(0, 1, 0), 1) # Default weight is 1
 * astar.add_point(3, Vector3(1, 1, 0))
 * astar.add_point(4, Vector3(2, 0, 0))
 * astar.connect_points(1, 2, false)
 * astar.connect_points(2, 3, false)
 * astar.connect_points(4, 3, false)
 * astar.connect_points(1, 4, false)
 * var res = astar.get_id_path(1, 3) # Returns [1, 2, 3]
 * @summary 
 * 
 *
 * If you change the 2nd point's weight to 3, then the result will be `[1, 4, 3]` instead, because now even though the distance is longer, it's "easier" to get through point 4 than through point 2.
 *
*/
get_id_path(from_id: int, to_id: int): PoolIntArray;

/** Returns the capacity of the structure backing the points, useful in conjunction with [code]reserve_space[/code]. */
get_point_capacity(): int;

/**
 * Returns an array with the IDs of the points that form the connection with the given point.
 *
 * @example 
 * 
 * var astar = AStar.new()
 * astar.add_point(1, Vector3(0, 0, 0))
 * astar.add_point(2, Vector3(0, 1, 0))
 * astar.add_point(3, Vector3(1, 1, 0))
 * astar.add_point(4, Vector3(2, 0, 0))
 * astar.connect_points(1, 2, true)
 * astar.connect_points(1, 3, true)
 * var neighbors = astar.get_point_connections(1) # Returns [2, 3]
 * @summary 
 * 
 *
*/
get_point_connections(id: int): PoolIntArray;

/** Returns the number of points currently in the points pool. */
get_point_count(): int;

/** Returns an array with the points that are in the path found by AStar between the given points. The array is ordered from the starting point to the ending point of the path. */
get_point_path(from_id: int, to_id: int): PoolVector3Array;

/** Returns the position of the point associated with the given [code]id[/code]. */
get_point_position(id: int): Vector3;

/** Returns the weight scale of the point associated with the given [code]id[/code]. */
get_point_weight_scale(id: int): float;

/** Returns an array of all points. */
get_points(): any[];

/** Returns whether a point associated with the given [code]id[/code] exists. */
has_point(id: int): boolean;

/** Returns whether a point is disabled or not for pathfinding. By default, all points are enabled. */
is_point_disabled(id: int): boolean;

/** Removes the point associated with the given [code]id[/code] from the points pool. */
remove_point(id: int): void;

/** Reserves space internally for [code]num_nodes[/code] points, useful if you're adding a known large number of points at once, for a grid for instance. New capacity must be greater or equals to old capacity. */
reserve_space(num_nodes: int): void;

/** Disables or enables the specified point for pathfinding. Useful for making a temporary obstacle. */
set_point_disabled(id: int, disabled?: boolean): void;

/** Sets the [code]position[/code] for the point with the given [code]id[/code]. */
set_point_position(id: int, position: Vector3): void;

/** Sets the [code]weight_scale[/code] for the point with the given [code]id[/code]. */
set_point_weight_scale(id: int, weight_scale: float): void;

  connect<T extends SignalsOf<AStar>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
