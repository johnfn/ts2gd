
/**
 * Geometry2D provides users with a set of helper functions to create geometric shapes, compute intersections between shapes, and process various other geometric operations.
 *
*/
declare class Geometry2DClass extends Object {

  
/**
 * Geometry2D provides users with a set of helper functions to create geometric shapes, compute intersections between shapes, and process various other geometric operations.
 *
*/
  "new"(): this;
  static "new"(): this;




/**
 * Clips `polygon_a` against `polygon_b` and returns an array of clipped polygons. This performs [constant OPERATION_DIFFERENCE] between polygons. Returns an empty array if `polygon_b` completely overlaps `polygon_a`.
 *
 * If `polygon_b` is enclosed by `polygon_a`, returns an outer polygon (boundary) and inner polygon (hole) which could be distinguished by calling [method is_polygon_clockwise].
 *
*/
clip_polygons(polygon_a: PackedVector2Array, polygon_b: PackedVector2Array): any[];

/** Clips [code]polyline[/code] against [code]polygon[/code] and returns an array of clipped polylines. This performs [constant OPERATION_DIFFERENCE] between the polyline and the polygon. This operation can be thought of as cutting a line with a closed shape. */
clip_polyline_with_polygon(polyline: PackedVector2Array, polygon: PackedVector2Array): any[];

/** Given an array of [Vector2]s, returns the convex hull as a list of points in counterclockwise order. The last point is the same as the first one. */
convex_hull(points: PackedVector2Array): PackedVector2Array;

/**
 * Mutually excludes common area defined by intersection of `polygon_a` and `polygon_b` (see [method intersect_polygons]) and returns an array of excluded polygons. This performs [constant OPERATION_XOR] between polygons. In other words, returns all but common area between polygons.
 *
 * The operation may result in an outer polygon (boundary) and inner polygon (hole) produced which could be distinguished by calling [method is_polygon_clockwise].
 *
*/
exclude_polygons(polygon_a: PackedVector2Array, polygon_b: PackedVector2Array): any[];

/** Returns the 2D point on the 2D segment ([code]s1[/code], [code]s2[/code]) that is closest to [code]point[/code]. The returned point will always be inside the specified segment. */
get_closest_point_to_segment(point: Vector2, s1: Vector2, s2: Vector2): Vector2;

/** Returns the 2D point on the 2D line defined by ([code]s1[/code], [code]s2[/code]) that is closest to [code]point[/code]. The returned point can be inside the segment ([code]s1[/code], [code]s2[/code]) or outside of it, i.e. somewhere on the line extending from the segment. */
get_closest_point_to_segment_uncapped(point: Vector2, s1: Vector2, s2: Vector2): Vector2;

/** Given the two 2D segments ([code]p1[/code], [code]p2[/code]) and ([code]q1[/code], [code]q2[/code]), finds those two points on the two segments that are closest to each other. Returns a [PackedVector2Array] that contains this point on ([code]p1[/code], [code]p2[/code]) as well the accompanying point on ([code]q1[/code], [code]q2[/code]). */
get_closest_points_between_segments(p1: Vector2, q1: Vector2, p2: Vector2, q2: Vector2): PackedVector2Array;

/**
 * Intersects `polygon_a` with `polygon_b` and returns an array of intersected polygons. This performs [constant OPERATION_INTERSECTION] between polygons. In other words, returns common area shared by polygons. Returns an empty array if no intersection occurs.
 *
 * The operation may result in an outer polygon (boundary) and inner polygon (hole) produced which could be distinguished by calling [method is_polygon_clockwise].
 *
*/
intersect_polygons(polygon_a: PackedVector2Array, polygon_b: PackedVector2Array): any[];

/** Intersects [code]polyline[/code] with [code]polygon[/code] and returns an array of intersected polylines. This performs [constant OPERATION_INTERSECTION] between the polyline and the polygon. This operation can be thought of as chopping a line with a closed shape. */
intersect_polyline_with_polygon(polyline: PackedVector2Array, polygon: PackedVector2Array): any[];

/** Returns [code]true[/code] if [code]point[/code] is inside the circle or if it's located exactly [i]on[/i] the circle's boundary, otherwise returns [code]false[/code]. */
is_point_in_circle(point: Vector2, circle_position: Vector2, circle_radius: float): boolean;

/** Returns [code]true[/code] if [code]point[/code] is inside [code]polygon[/code] or if it's located exactly [i]on[/i] polygon's boundary, otherwise returns [code]false[/code]. */
is_point_in_polygon(point: Vector2, polygon: PackedVector2Array): boolean;

/** Returns [code]true[/code] if [code]polygon[/code]'s vertices are ordered in clockwise order, otherwise returns [code]false[/code]. */
is_polygon_clockwise(polygon: PackedVector2Array): boolean;

/**
 * Checks if the two lines (`from_a`, `dir_a`) and (`from_b`, `dir_b`) intersect. If yes, return the point of intersection as [Vector2]. If no intersection takes place, returns an empty [Variant].
 *
 * **Note:** The lines are specified using direction vectors, not end points.
 *
*/
line_intersects_line(from_a: Vector2, dir_a: Vector2, from_b: Vector2, dir_b: Vector2): any;

/** Given an array of [Vector2]s representing tiles, builds an atlas. The returned dictionary has two keys: [code]points[/code] is a vector of [Vector2] that specifies the positions of each tile, [code]size[/code] contains the overall size of the whole atlas as [Vector2]. */
make_atlas(sizes: PackedVector2Array): Dictionary;

/**
 * Merges (combines) `polygon_a` and `polygon_b` and returns an array of merged polygons. This performs [constant OPERATION_UNION] between polygons.
 *
 * The operation may result in an outer polygon (boundary) and inner polygon (hole) produced which could be distinguished by calling [method is_polygon_clockwise].
 *
*/
merge_polygons(polygon_a: PackedVector2Array, polygon_b: PackedVector2Array): any[];

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
 * var polygon = PackedVector2Array([Vector2(0, 0), Vector2(100, 0), Vector2(100, 100), Vector2(0, 100)])
 * var offset = Vector2(50, 50)
 * polygon = Transform2D(0, offset).xform(polygon)
 * print(polygon) # prints [Vector2(50, 50), Vector2(150, 50), Vector2(150, 150), Vector2(50, 150)]
 * @summary 
 * 
 *
*/
offset_polygon(polygon: PackedVector2Array, delta: float, join_type?: int): any[];

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
offset_polyline(polyline: PackedVector2Array, delta: float, join_type?: int, end_type?: int): any[];

/** Returns if [code]point[/code] is inside the triangle specified by [code]a[/code], [code]b[/code] and [code]c[/code]. */
point_is_inside_triangle(point: Vector2, a: Vector2, b: Vector2, c: Vector2): boolean;

/** Checks if the two segments ([code]from_a[/code], [code]to_a[/code]) and ([code]from_b[/code], [code]to_b[/code]) intersect. If yes, return the point of intersection as [Vector2]. If no intersection takes place, returns an empty [Variant]. */
segment_intersects_segment(from_a: Vector2, to_a: Vector2, from_b: Vector2, to_b: Vector2): any;

/** Triangulates the area specified by discrete set of [code]points[/code] such that no point is inside the circumcircle of any resulting triangle. Returns a [PackedInt32Array] where each triangle consists of three consecutive point indices into [code]points[/code] (i.e. the returned array will have [code]n * 3[/code] elements, with [code]n[/code] being the number of found triangles). If the triangulation did not succeed, an empty [PackedInt32Array] is returned. */
triangulate_delaunay(points: PackedVector2Array): PackedInt32Array;

/** Triangulates the polygon specified by the points in [code]polygon[/code]. Returns a [PackedInt32Array] where each triangle consists of three consecutive point indices into [code]polygon[/code] (i.e. the returned array will have [code]n * 3[/code] elements, with [code]n[/code] being the number of found triangles). If the triangulation did not succeed, an empty [PackedInt32Array] is returned. */
triangulate_polygon(polygon: PackedVector2Array): PackedInt32Array;

  connect<T extends SignalsOf<Geometry2DClass>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Create regions where either subject or clip polygons (or both) are filled.
 *
*/
static OPERATION_UNION: 0;

/**
 * Create regions where subject polygons are filled except where clip polygons are filled.
 *
*/
static OPERATION_DIFFERENCE: 1;

/**
 * Create regions where both subject and clip polygons are filled.
 *
*/
static OPERATION_INTERSECTION: 2;

/**
 * Create regions where either subject or clip polygons are filled but not where both are filled.
 *
*/
static OPERATION_XOR: 3;

/**
 * Squaring is applied uniformally at all convex edge joins at `1 * delta`.
 *
*/
static JOIN_SQUARE: 0;

/**
 * While flattened paths can never perfectly trace an arc, they are approximated by a series of arc chords.
 *
*/
static JOIN_ROUND: 1;

/**
 * There's a necessary limit to mitered joins since offsetting edges that join at very acute angles will produce excessively long and narrow "spikes". For any given edge join, when miter offsetting would exceed that maximum distance, "square" joining is applied.
 *
*/
static JOIN_MITER: 2;

/**
 * Endpoints are joined using the [enum PolyJoinType] value and the path filled as a polygon.
 *
*/
static END_POLYGON: 0;

/**
 * Endpoints are joined using the [enum PolyJoinType] value and the path filled as a polyline.
 *
*/
static END_JOINED: 1;

/**
 * Endpoints are squared off with no extension.
 *
*/
static END_BUTT: 2;

/**
 * Endpoints are squared off and extended by `delta` units.
 *
*/
static END_SQUARE: 3;

/**
 * Endpoints are rounded off and extended by `delta` units.
 *
*/
static END_ROUND: 4;


  
}


 
