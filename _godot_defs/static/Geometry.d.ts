
/**
 * Geometry provides users with a set of helper functions to create geometric shapes, compute intersections between shapes, and process various other geometric operations.
 *
*/
declare class GeometryClass extends Object {

  
/**
 * Geometry provides users with a set of helper functions to create geometric shapes, compute intersections between shapes, and process various other geometric operations.
 *
*/
  "new"(): GeometryClass;
  static "new"(): GeometryClass;




/** Returns an array with 6 [Plane]s that describe the sides of a box centered at the origin. The box size is defined by [code]extents[/code], which represents one (positive) corner of the box (i.e. half its actual size). */
build_box_planes(extents: Vector3): any[];

/** Returns an array of [Plane]s closely bounding a faceted capsule centered at the origin with radius [code]radius[/code] and height [code]height[/code]. The parameter [code]sides[/code] defines how many planes will be generated for the side part of the capsule, whereas [code]lats[/code] gives the number of latitudinal steps at the bottom and top of the capsule. The parameter [code]axis[/code] describes the axis along which the capsule is oriented (0 for X, 1 for Y, 2 for Z). */
build_capsule_planes(radius: float, height: float, sides: int, lats: int, axis?: int): any[];

/** Returns an array of [Plane]s closely bounding a faceted cylinder centered at the origin with radius [code]radius[/code] and height [code]height[/code]. The parameter [code]sides[/code] defines how many planes will be generated for the round part of the cylinder. The parameter [code]axis[/code] describes the axis along which the cylinder is oriented (0 for X, 1 for Y, 2 for Z). */
build_cylinder_planes(radius: float, height: float, sides: int, axis?: int): any[];

/** Clips the polygon defined by the points in [code]points[/code] against the [code]plane[/code] and returns the points of the clipped polygon. */
clip_polygon(points: PoolVector3Array, plane: Plane): PoolVector3Array;

/**
 * Clips `polygon_a` against `polygon_b` and returns an array of clipped polygons. This performs [constant OPERATION_DIFFERENCE] between polygons. Returns an empty array if `polygon_b` completely overlaps `polygon_a`.
 *
 * If `polygon_b` is enclosed by `polygon_a`, returns an outer polygon (boundary) and inner polygon (hole) which could be distinguished by calling [method is_polygon_clockwise].
 *
*/
clip_polygons_2d(polygon_a: PoolVector2Array, polygon_b: PoolVector2Array): any[];

/** Clips [code]polyline[/code] against [code]polygon[/code] and returns an array of clipped polylines. This performs [constant OPERATION_DIFFERENCE] between the polyline and the polygon. This operation can be thought of as cutting a line with a closed shape. */
clip_polyline_with_polygon_2d(polyline: PoolVector2Array, polygon: PoolVector2Array): any[];

/** Given an array of [Vector2]s, returns the convex hull as a list of points in counterclockwise order. The last point is the same as the first one. */
convex_hull_2d(points: PoolVector2Array): PoolVector2Array;

/**
 * Mutually excludes common area defined by intersection of `polygon_a` and `polygon_b` (see [method intersect_polygons_2d]) and returns an array of excluded polygons. This performs [constant OPERATION_XOR] between polygons. In other words, returns all but common area between polygons.
 *
 * The operation may result in an outer polygon (boundary) and inner polygon (hole) produced which could be distinguished by calling [method is_polygon_clockwise].
 *
*/
exclude_polygons_2d(polygon_a: PoolVector2Array, polygon_b: PoolVector2Array): any[];

/** Returns the 3D point on the 3D segment ([code]s1[/code], [code]s2[/code]) that is closest to [code]point[/code]. The returned point will always be inside the specified segment. */
get_closest_point_to_segment(point: Vector3, s1: Vector3, s2: Vector3): Vector3;

/** Returns the 2D point on the 2D segment ([code]s1[/code], [code]s2[/code]) that is closest to [code]point[/code]. The returned point will always be inside the specified segment. */
get_closest_point_to_segment_2d(point: Vector2, s1: Vector2, s2: Vector2): Vector2;

/** Returns the 3D point on the 3D line defined by ([code]s1[/code], [code]s2[/code]) that is closest to [code]point[/code]. The returned point can be inside the segment ([code]s1[/code], [code]s2[/code]) or outside of it, i.e. somewhere on the line extending from the segment. */
get_closest_point_to_segment_uncapped(point: Vector3, s1: Vector3, s2: Vector3): Vector3;

/** Returns the 2D point on the 2D line defined by ([code]s1[/code], [code]s2[/code]) that is closest to [code]point[/code]. The returned point can be inside the segment ([code]s1[/code], [code]s2[/code]) or outside of it, i.e. somewhere on the line extending from the segment. */
get_closest_point_to_segment_uncapped_2d(point: Vector2, s1: Vector2, s2: Vector2): Vector2;

/** Given the two 3D segments ([code]p1[/code], [code]p2[/code]) and ([code]q1[/code], [code]q2[/code]), finds those two points on the two segments that are closest to each other. Returns a [PoolVector3Array] that contains this point on ([code]p1[/code], [code]p2[/code]) as well the accompanying point on ([code]q1[/code], [code]q2[/code]). */
get_closest_points_between_segments(p1: Vector3, p2: Vector3, q1: Vector3, q2: Vector3): PoolVector3Array;

/** Given the two 2D segments ([code]p1[/code], [code]q1[/code]) and ([code]p2[/code], [code]q2[/code]), finds those two points on the two segments that are closest to each other. Returns a [PoolVector2Array] that contains this point on ([code]p1[/code], [code]q1[/code]) as well the accompanying point on ([code]p2[/code], [code]q2[/code]). */
get_closest_points_between_segments_2d(p1: Vector2, q1: Vector2, p2: Vector2, q2: Vector2): PoolVector2Array;

/** Used internally by the engine. */
get_uv84_normal_bit(normal: Vector3): int;

/**
 * Intersects `polygon_a` with `polygon_b` and returns an array of intersected polygons. This performs [constant OPERATION_INTERSECTION] between polygons. In other words, returns common area shared by polygons. Returns an empty array if no intersection occurs.
 *
 * The operation may result in an outer polygon (boundary) and inner polygon (hole) produced which could be distinguished by calling [method is_polygon_clockwise].
 *
*/
intersect_polygons_2d(polygon_a: PoolVector2Array, polygon_b: PoolVector2Array): any[];

/** Intersects [code]polyline[/code] with [code]polygon[/code] and returns an array of intersected polylines. This performs [constant OPERATION_INTERSECTION] between the polyline and the polygon. This operation can be thought of as chopping a line with a closed shape. */
intersect_polyline_with_polygon_2d(polyline: PoolVector2Array, polygon: PoolVector2Array): any[];

/** Returns [code]true[/code] if [code]point[/code] is inside the circle or if it's located exactly [i]on[/i] the circle's boundary, otherwise returns [code]false[/code]. */
is_point_in_circle(point: Vector2, circle_position: Vector2, circle_radius: float): boolean;

/** Returns [code]true[/code] if [code]point[/code] is inside [code]polygon[/code] or if it's located exactly [i]on[/i] polygon's boundary, otherwise returns [code]false[/code]. */
is_point_in_polygon(point: Vector2, polygon: PoolVector2Array): boolean;

/** Returns [code]true[/code] if [code]polygon[/code]'s vertices are ordered in clockwise order, otherwise returns [code]false[/code]. */
is_polygon_clockwise(polygon: PoolVector2Array): boolean;

/**
 * Checks if the two lines (`from_a`, `dir_a`) and (`from_b`, `dir_b`) intersect. If yes, return the point of intersection as [Vector2]. If no intersection takes place, returns an empty [Variant].
 *
 * **Note:** The lines are specified using direction vectors, not end points.
 *
*/
line_intersects_line_2d(from_a: Vector2, dir_a: Vector2, from_b: Vector2, dir_b: Vector2): any;

/** Given an array of [Vector2]s representing tiles, builds an atlas. The returned dictionary has two keys: [code]points[/code] is a vector of [Vector2] that specifies the positions of each tile, [code]size[/code] contains the overall size of the whole atlas as [Vector2]. */
make_atlas(sizes: PoolVector2Array): Dictionary<any, any>;

/**
 * Merges (combines) `polygon_a` and `polygon_b` and returns an array of merged polygons. This performs [constant OPERATION_UNION] between polygons.
 *
 * The operation may result in an outer polygon (boundary) and multiple inner polygons (holes) produced which could be distinguished by calling [method is_polygon_clockwise].
 *
*/
merge_polygons_2d(polygon_a: PoolVector2Array, polygon_b: PoolVector2Array): any[];

/**
 * Inflates or deflates `polygon` by `delta` units (pixels). If `delta` is positive, makes the polygon grow outward. If `delta` is negative, shrinks the polygon inward. Returns an array of polygons because inflating/deflating may result in multiple discrete polygons. Returns an empty array if `delta` is negative and the absolute value of it approximately exceeds the minimum bounding rectangle dimensions of the polygon.
 *
 * Each polygon's vertices will be rounded as determined by `join_type`, see [enum PolyJoinType].
 *
 * The operation may result in an outer polygon (boundary) and inner polygon (hole) produced which could be distinguished by calling [method is_polygon_clockwise].
 *
 * **Note:** To translate the polygon's vertices specifically, use the [method Transform2D.xform] method:
 *
 * @example 
 * 
 * var polygon = PoolVector2Array([Vector2(0, 0), Vector2(100, 0), Vector2(100, 100), Vector2(0, 100)])
 * var offset = Vector2(50, 50)
 * polygon = Transform2D(0, offset).xform(polygon)
 * print(polygon) # prints [Vector2(50, 50), Vector2(150, 50), Vector2(150, 150), Vector2(50, 150)]
 * @summary 
 * 
 *
*/
offset_polygon_2d(polygon: PoolVector2Array, delta: float, join_type?: int): any[];

/**
 * Inflates or deflates `polyline` by `delta` units (pixels), producing polygons. If `delta` is positive, makes the polyline grow outward. Returns an array of polygons because inflating/deflating may result in multiple discrete polygons. If `delta` is negative, returns an empty array.
 *
 * Each polygon's vertices will be rounded as determined by `join_type`, see [enum PolyJoinType].
 *
 * Each polygon's endpoints will be rounded as determined by `end_type`, see [enum PolyEndType].
 *
 * The operation may result in an outer polygon (boundary) and inner polygon (hole) produced which could be distinguished by calling [method is_polygon_clockwise].
 *
*/
offset_polyline_2d(polyline: PoolVector2Array, delta: float, join_type?: int, end_type?: int): any[];

/** Returns if [code]point[/code] is inside the triangle specified by [code]a[/code], [code]b[/code] and [code]c[/code]. */
point_is_inside_triangle(point: Vector2, a: Vector2, b: Vector2, c: Vector2): boolean;

/** Tests if the 3D ray starting at [code]from[/code] with the direction of [code]dir[/code] intersects the triangle specified by [code]a[/code], [code]b[/code] and [code]c[/code]. If yes, returns the point of intersection as [Vector3]. If no intersection takes place, an empty [Variant] is returned. */
ray_intersects_triangle(from: Vector3, dir: Vector3, a: Vector3, b: Vector3, c: Vector3): any;

/** Given the 2D segment ([code]segment_from[/code], [code]segment_to[/code]), returns the position on the segment (as a number between 0 and 1) at which the segment hits the circle that is located at position [code]circle_position[/code] and has radius [code]circle_radius[/code]. If the segment does not intersect the circle, -1 is returned (this is also the case if the line extending the segment would intersect the circle, but the segment does not). */
segment_intersects_circle(segment_from: Vector2, segment_to: Vector2, circle_position: Vector2, circle_radius: float): float;

/** Given a convex hull defined though the [Plane]s in the array [code]planes[/code], tests if the segment ([code]from[/code], [code]to[/code]) intersects with that hull. If an intersection is found, returns a [PoolVector3Array] containing the point the intersection and the hull's normal. If no intersecion is found, an the returned array is empty. */
segment_intersects_convex(from: Vector3, to: Vector3, planes: any[]): PoolVector3Array;

/** Checks if the segment ([code]from[/code], [code]to[/code]) intersects the cylinder with height [code]height[/code] that is centered at the origin and has radius [code]radius[/code]. If no, returns an empty [PoolVector3Array]. If an intersection takes place, the returned array contains the point of intersection and the cylinder's normal at the point of intersection. */
segment_intersects_cylinder(from: Vector3, to: Vector3, height: float, radius: float): PoolVector3Array;

/** Checks if the two segments ([code]from_a[/code], [code]to_a[/code]) and ([code]from_b[/code], [code]to_b[/code]) intersect. If yes, return the point of intersection as [Vector2]. If no intersection takes place, returns an empty [Variant]. */
segment_intersects_segment_2d(from_a: Vector2, to_a: Vector2, from_b: Vector2, to_b: Vector2): any;

/** Checks if the segment ([code]from[/code], [code]to[/code]) intersects the sphere that is located at [code]sphere_position[/code] and has radius [code]sphere_radius[/code]. If no, returns an empty [PoolVector3Array]. If yes, returns a [PoolVector3Array] containing the point of intersection and the sphere's normal at the point of intersection. */
segment_intersects_sphere(from: Vector3, to: Vector3, sphere_position: Vector3, sphere_radius: float): PoolVector3Array;

/** Tests if the segment ([code]from[/code], [code]to[/code]) intersects the triangle [code]a[/code], [code]b[/code], [code]c[/code]. If yes, returns the point of intersection as [Vector3]. If no intersection takes place, an empty [Variant] is returned. */
segment_intersects_triangle(from: Vector3, to: Vector3, a: Vector3, b: Vector3, c: Vector3): any;

/** Triangulates the area specified by discrete set of [code]points[/code] such that no point is inside the circumcircle of any resulting triangle. Returns a [PoolIntArray] where each triangle consists of three consecutive point indices into [code]points[/code] (i.e. the returned array will have [code]n * 3[/code] elements, with [code]n[/code] being the number of found triangles). If the triangulation did not succeed, an empty [PoolIntArray] is returned. */
triangulate_delaunay_2d(points: PoolVector2Array): PoolIntArray;

/** Triangulates the polygon specified by the points in [code]polygon[/code]. Returns a [PoolIntArray] where each triangle consists of three consecutive point indices into [code]polygon[/code] (i.e. the returned array will have [code]n * 3[/code] elements, with [code]n[/code] being the number of found triangles). If the triangulation did not succeed, an empty [PoolIntArray] is returned. */
triangulate_polygon(polygon: PoolVector2Array): PoolIntArray;

  // connect<T extends SignalsOf<GeometryClass>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<GeometryClassSignals>>(signal: T, method: SignalFunction<GeometryClassSignals[T]>): number;



/**
 * Create regions where either subject or clip polygons (or both) are filled.
 *
*/
static OPERATION_UNION: any;

/**
 * Create regions where subject polygons are filled except where clip polygons are filled.
 *
*/
static OPERATION_DIFFERENCE: any;

/**
 * Create regions where both subject and clip polygons are filled.
 *
*/
static OPERATION_INTERSECTION: any;

/**
 * Create regions where either subject or clip polygons are filled but not where both are filled.
 *
*/
static OPERATION_XOR: any;

/**
 * Squaring is applied uniformally at all convex edge joins at `1 * delta`.
 *
*/
static JOIN_SQUARE: any;

/**
 * While flattened paths can never perfectly trace an arc, they are approximated by a series of arc chords.
 *
*/
static JOIN_ROUND: any;

/**
 * There's a necessary limit to mitered joins since offsetting edges that join at very acute angles will produce excessively long and narrow "spikes". For any given edge join, when miter offsetting would exceed that maximum distance, "square" joining is applied.
 *
*/
static JOIN_MITER: any;

/**
 * Endpoints are joined using the [enum PolyJoinType] value and the path filled as a polygon.
 *
*/
static END_POLYGON: any;

/**
 * Endpoints are joined using the [enum PolyJoinType] value and the path filled as a polyline.
 *
*/
static END_JOINED: any;

/**
 * Endpoints are squared off with no extension.
 *
*/
static END_BUTT: any;

/**
 * Endpoints are squared off and extended by `delta` units.
 *
*/
static END_SQUARE: any;

/**
 * Endpoints are rounded off and extended by `delta` units.
 *
*/
static END_ROUND: any;

}

declare class GeometryClassSignals extends ObjectSignals {
  
}
