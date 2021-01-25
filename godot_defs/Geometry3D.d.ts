
/**
 * Geometry3D provides users with a set of helper functions to create geometric shapes, compute intersections between shapes, and process various other geometric operations.
 *
*/
declare class Geometry3DClass extends Object {

  
/**
 * Geometry3D provides users with a set of helper functions to create geometric shapes, compute intersections between shapes, and process various other geometric operations.
 *
*/
  "new"(): this;
  static "new"(): this;




/** Returns an array with 6 [Plane]s that describe the sides of a box centered at the origin. The box size is defined by [code]extents[/code], which represents one (positive) corner of the box (i.e. half its actual size). */
build_box_planes(extents: Vector3): any[];

/** Returns an array of [Plane]s closely bounding a faceted capsule centered at the origin with radius [code]radius[/code] and height [code]height[/code]. The parameter [code]sides[/code] defines how many planes will be generated for the side part of the capsule, whereas [code]lats[/code] gives the number of latitudinal steps at the bottom and top of the capsule. The parameter [code]axis[/code] describes the axis along which the capsule is oriented (0 for X, 1 for Y, 2 for Z). */
build_capsule_planes(radius: float, height: float, sides: int, lats: int, axis?: int): any[];

/** Returns an array of [Plane]s closely bounding a faceted cylinder centered at the origin with radius [code]radius[/code] and height [code]height[/code]. The parameter [code]sides[/code] defines how many planes will be generated for the round part of the cylinder. The parameter [code]axis[/code] describes the axis along which the cylinder is oriented (0 for X, 1 for Y, 2 for Z). */
build_cylinder_planes(radius: float, height: float, sides: int, axis?: int): any[];

/** Clips the polygon defined by the points in [code]points[/code] against the [code]plane[/code] and returns the points of the clipped polygon. */
clip_polygon(points: PackedVector3Array, plane: Plane): PackedVector3Array;

/** Returns the 3D point on the 3D segment ([code]s1[/code], [code]s2[/code]) that is closest to [code]point[/code]. The returned point will always be inside the specified segment. */
get_closest_point_to_segment(point: Vector3, s1: Vector3, s2: Vector3): Vector3;

/** Returns the 3D point on the 3D line defined by ([code]s1[/code], [code]s2[/code]) that is closest to [code]point[/code]. The returned point can be inside the segment ([code]s1[/code], [code]s2[/code]) or outside of it, i.e. somewhere on the line extending from the segment. */
get_closest_point_to_segment_uncapped(point: Vector3, s1: Vector3, s2: Vector3): Vector3;

/** Given the two 3D segments ([code]p1[/code], [code]p2[/code]) and ([code]q1[/code], [code]q2[/code]), finds those two points on the two segments that are closest to each other. Returns a [PackedVector3Array] that contains this point on ([code]p1[/code], [code]p2[/code]) as well the accompanying point on ([code]q1[/code], [code]q2[/code]). */
get_closest_points_between_segments(p1: Vector3, p2: Vector3, q1: Vector3, q2: Vector3): PackedVector3Array;

/** Tests if the 3D ray starting at [code]from[/code] with the direction of [code]dir[/code] intersects the triangle specified by [code]a[/code], [code]b[/code] and [code]c[/code]. If yes, returns the point of intersection as [Vector3]. If no intersection takes place, an empty [Variant] is returned. */
ray_intersects_triangle(from: Vector3, dir: Vector3, a: Vector3, b: Vector3, c: Vector3): any;

/** Given a convex hull defined though the [Plane]s in the array [code]planes[/code], tests if the segment ([code]from[/code], [code]to[/code]) intersects with that hull. If an intersection is found, returns a [PackedVector3Array] containing the point the intersection and the hull's normal. If no intersecion is found, an the returned array is empty. */
segment_intersects_convex(from: Vector3, to: Vector3, planes: any[]): PackedVector3Array;

/** Checks if the segment ([code]from[/code], [code]to[/code]) intersects the cylinder with height [code]height[/code] that is centered at the origin and has radius [code]radius[/code]. If no, returns an empty [PackedVector3Array]. If an intersection takes place, the returned array contains the point of intersection and the cylinder's normal at the point of intersection. */
segment_intersects_cylinder(from: Vector3, to: Vector3, height: float, radius: float): PackedVector3Array;

/** Checks if the segment ([code]from[/code], [code]to[/code]) intersects the sphere that is located at [code]sphere_position[/code] and has radius [code]sphere_radius[/code]. If no, returns an empty [PackedVector3Array]. If yes, returns a [PackedVector3Array] containing the point of intersection and the sphere's normal at the point of intersection. */
segment_intersects_sphere(from: Vector3, to: Vector3, sphere_position: Vector3, sphere_radius: float): PackedVector3Array;

/** Tests if the segment ([code]from[/code], [code]to[/code]) intersects the triangle [code]a[/code], [code]b[/code], [code]c[/code]. If yes, returns the point of intersection as [Vector3]. If no intersection takes place, an empty [Variant] is returned. */
segment_intersects_triangle(from: Vector3, to: Vector3, a: Vector3, b: Vector3, c: Vector3): any;

  connect<T extends SignalsOf<Geometry3DClass>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
