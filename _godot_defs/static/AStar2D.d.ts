
/**
 * This is a wrapper for the [AStar] class which uses 2D vectors instead of 3D vectors.
 *
*/
declare class AStar2D extends Reference {

  
/**
 * This is a wrapper for the [AStar] class which uses 2D vectors instead of 3D vectors.
 *
*/
  "new"(): AStar2D;
  static "new"(): AStar2D;




/**
 * Called when computing the cost between two connected points.
 *
 * Note that this function is hidden in the default `AStar2D` class.
 *
*/
protected _compute_cost(from_id: int, to_id: int): float;

/**
 * Called when estimating the cost between a point and the path's ending point.
 *
 * Note that this function is hidden in the default `AStar2D` class.
 *
*/
protected _estimate_cost(from_id: int, to_id: int): float;

/**
 * Adds a new point at the given position with the given identifier. The `id` must be 0 or larger, and the `weight_scale` must be 1 or larger.
 *
 * The `weight_scale` is multiplied by the result of [method _compute_cost] when determining the overall cost of traveling across a segment from a neighboring point to this point. Thus, all else being equal, the algorithm prefers points with lower `weight_scale`s to form a path.
 *
 * @example 
 * 
 * var astar = AStar2D.new()
 * astar.add_point(1, Vector2(1, 0), 4) # Adds the point (1, 0) with weight_scale 4 and id 1
 * @summary 
 * 
 *
 * If there already exists a point for the given `id`, its position and weight scale are updated to the given values.
 *
*/
add_point(id: int, position: Vector2, weight_scale?: float): void;

/** Returns whether there is a connection/segment between the given points. */
are_points_connected(id: int, to_id: int): boolean;

/** Clears all the points and segments. */
clear(): void;

/**
 * Creates a segment between the given points. If `bidirectional` is `false`, only movement from `id` to `to_id` is allowed, not the reverse direction.
 *
 * @example 
 * 
 * var astar = AStar2D.new()
 * astar.add_point(1, Vector2(1, 1))
 * astar.add_point(2, Vector2(0, 5))
 * astar.connect_points(1, 2, false)
 * @summary 
 * 
 *
*/
connect_points(id: int, to_id: int, bidirectional?: boolean): void;

/** Deletes the segment between the given points. */
disconnect_points(id: int, to_id: int): void;

/** Returns the next available point ID with no point associated to it. */
get_available_point_id(): int;

/**
 * Returns the ID of the closest point to `to_position`, optionally taking disabled points into account. Returns `-1` if there are no points in the points pool.
 *
 * **Note:** If several points are the closest to `to_position`, the one with the smallest ID will be returned, ensuring a deterministic result.
 *
*/
get_closest_point(to_position: Vector2, include_disabled?: boolean): int;

/**
 * Returns the closest position to `to_position` that resides inside a segment between two connected points.
 *
 * @example 
 * 
 * var astar = AStar2D.new()
 * astar.add_point(1, Vector2(0, 0))
 * astar.add_point(2, Vector2(0, 5))
 * astar.connect_points(1, 2)
 * var res = astar.get_closest_position_in_segment(Vector2(3, 3)) # Returns (0, 3)
 * @summary 
 * 
 *
 * The result is in the segment that goes from `y = 0` to `y = 5`. It's the closest position in the segment to the given point.
 *
*/
get_closest_position_in_segment(to_position: Vector2): Vector2;

/**
 * Returns an array with the IDs of the points that form the path found by AStar2D between the given points. The array is ordered from the starting point to the ending point of the path.
 *
 * @example 
 * 
 * var astar = AStar2D.new()
 * astar.add_point(1, Vector2(0, 0))
 * astar.add_point(2, Vector2(0, 1), 1) # Default weight is 1
 * astar.add_point(3, Vector2(1, 1))
 * astar.add_point(4, Vector2(2, 0))
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
 * var astar = AStar2D.new()
 * astar.add_point(1, Vector2(0, 0))
 * astar.add_point(2, Vector2(0, 1))
 * astar.add_point(3, Vector2(1, 1))
 * astar.add_point(4, Vector2(2, 0))
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

/**
 * Returns an array with the points that are in the path found by AStar2D between the given points. The array is ordered from the starting point to the ending point of the path.
 *
 * **Note:** This method is not thread-safe. If called from a [Thread], it will return an empty [PoolVector2Array] and will print an error message.
 *
*/
get_point_path(from_id: int, to_id: int): PoolVector2Array;

/** Returns the position of the point associated with the given [code]id[/code]. */
get_point_position(id: int): Vector2;

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
set_point_position(id: int, position: Vector2): void;

/** Sets the [code]weight_scale[/code] for the point with the given [code]id[/code]. The [code]weight_scale[/code] is multiplied by the result of [method _compute_cost] when determining the overall cost of traveling across a segment from a neighboring point to this point. */
set_point_weight_scale(id: int, weight_scale: float): void;

  // connect<T extends SignalsOf<AStar2D>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AStar2DSignals>>(signal: T, method: SignalFunction<AStar2DSignals[T]>): number;




}

declare class AStar2DSignals extends ReferenceSignals {
  
}
