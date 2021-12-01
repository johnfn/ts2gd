
/**
 * [AABB] consists of a position, a size, and several utility functions. It is typically used for fast overlap tests.
 *
 * It uses floating-point coordinates. The 2D counterpart to [AABB] is [Rect2].
 *
 * **Note:** Unlike [Rect2], [AABB] does not have a variant that uses integer coordinates.
 *
*/
declare class AABB {

  
/**
 * [AABB] consists of a position, a size, and several utility functions. It is typically used for fast overlap tests.
 *
 * It uses floating-point coordinates. The 2D counterpart to [AABB] is [Rect2].
 *
 * **Note:** Unlike [Rect2], [AABB] does not have a variant that uses integer coordinates.
 *
*/

  new(position: Vector3, size: Vector3): AABB;
  static "new"(): AABB 


/** Ending corner. This is calculated as [code]position + size[/code]. Setting this value will change the size. */
end: Vector3;

/** Beginning corner. Typically has values lower than [member end]. */
position: Vector3;

/**
 * Size from [member position] to [member end]. Typically, all components are positive.
 *
 * If the size is negative, you can use [method abs] to fix it.
 *
*/
size: Vector3;



/** Returns an AABB with equivalent position and size, modified so that the most-negative corner is the origin and the size is positive. */
abs(): AABB;

/** Returns [code]true[/code] if this [AABB] completely encloses another one. */
encloses(_with: AABB): boolean;

/**
 * Returns a copy of this [AABB] expanded to include a given point.
 *
 * **Example:**
 *
 * @example 
 * 
 * # position (-3, 2, 0), size (1, 1, 1)
 * var box = AABB(Vector3(-3, 2, 0), Vector3(1, 1, 1))
 * # position (-3, -1, 0), size (3, 4, 2), so we fit both the original AABB and Vector3(0, -1, 2)
 * var box2 = box.expand(Vector3(0, -1, 2))
 * @summary 
 * 
 *
*/
expand(to_point: Vector3): AABB;

/** Returns the volume of the [AABB]. */
get_area(): float;

/** Gets the position of the 8 endpoints of the [AABB] in space. */
get_endpoint(idx: int): Vector3;

/** Returns the normalized longest axis of the [AABB]. */
get_longest_axis(): Vector3;

/** Returns the index of the longest axis of the [AABB] (according to [Vector3]'s [code]AXIS_*[/code] constants). */
get_longest_axis_index(): int;

/** Returns the scalar length of the longest axis of the [AABB]. */
get_longest_axis_size(): float;

/** Returns the normalized shortest axis of the [AABB]. */
get_shortest_axis(): Vector3;

/** Returns the index of the shortest axis of the [AABB] (according to [Vector3]::AXIS* enum). */
get_shortest_axis_index(): int;

/** Returns the scalar length of the shortest axis of the [AABB]. */
get_shortest_axis_size(): float;

/** Returns the support point in a given direction. This is useful for collision detection algorithms. */
get_support(dir: Vector3): Vector3;

/** Returns a copy of the [AABB] grown a given amount of units towards all the sides. */
grow(by: float): AABB;

/** Returns [code]true[/code] if the [AABB] is flat or empty. */
has_no_area(): boolean;

/** Returns [code]true[/code] if the [AABB] is empty. */
has_no_surface(): boolean;

/** Returns [code]true[/code] if the [AABB] contains a point. */
has_point(point: Vector3): boolean;

/** Returns the intersection between two [AABB]. An empty AABB (size 0,0,0) is returned on failure. */
intersection(_with: AABB): AABB;

/** Returns [code]true[/code] if the [AABB] overlaps with another. */
intersects(_with: AABB): boolean;

/** Returns [code]true[/code] if the [AABB] is on both sides of a plane. */
intersects_plane(plane: Plane): boolean;

/** Returns [code]true[/code] if the [AABB] intersects the line segment between [code]from[/code] and [code]to[/code]. */
intersects_segment(from: Vector3, to: Vector3): boolean;

/** Returns [code]true[/code] if this [AABB] and [code]aabb[/code] are approximately equal, by calling [method @GDScript.is_equal_approx] on each component. */
is_equal_approx(aabb: AABB): boolean;

/** Returns a larger [AABB] that contains both this [AABB] and [code]with[/code]. */
merge(_with: AABB): AABB;

  connect<T extends SignalsOf<AABB>>(signal: T, method: SignalFunction<AABB[T]>): number;






}

