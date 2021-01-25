
/**
 * Plane represents a normalized plane equation. Basically, "normal" is the normal of the plane (a,b,c normalized), and "d" is the distance from the origin to the plane (in the direction of "normal"). "Over" or "Above" the plane is considered the side of the plane towards where the normal is pointing.
 *
*/
declare class Plane {

  
/**
 * Plane represents a normalized plane equation. Basically, "normal" is the normal of the plane (a,b,c normalized), and "d" is the distance from the origin to the plane (in the direction of "normal"). "Over" or "Above" the plane is considered the side of the plane towards where the normal is pointing.
 *
*/

  constructor(a: float, b: float, c: float, d: float);
  constructor(v1: Vector3, v2: Vector3, v3: Vector3);
  constructor(normal: Vector3, d: float);
  static "new"(): Plane;



/**
 * The distance from the origin to the plane, in the direction of [member normal]. This value is typically non-negative.
 *
 * In the scalar equation of the plane `ax + by + cz = d`, this is `d`, while the `(a, b, c)` coordinates are represented by the [member normal] property.
 *
*/
d: float;

/**
 * The normal of the plane, which must be normalized.
 *
 * In the scalar equation of the plane `ax + by + cz = d`, this is the vector `(a, b, c)`, where `d` is the [member d] property.
 *
*/
normal: Vector3;

/** The X component of the plane's [member normal] vector. */
x: float;

/** The Y component of the plane's [member normal] vector. */
y: float;

/** The Z component of the plane's [member normal] vector. */
z: float;







/** Returns the center of the plane. */
center(): Vector3;

/** Returns the shortest distance from the plane to the position [code]point[/code]. */
distance_to(point: Vector3): float;

/**
 * Returns the center of the plane.
 *
 * This method is deprecated, please use [method center] instead.
 *
*/
get_any_point(): Vector3;

/** Returns [code]true[/code] if [code]point[/code] is inside the plane. Comparison uses a custom minimum [code]epsilon[/code] threshold. */
has_point(point: Vector3, epsilon?: float): boolean;

/** Returns the intersection point of the three planes [code]b[/code], [code]c[/code] and this plane. If no intersection is found, [code]null[/code] is returned. */
intersect_3(b: Plane, c: Plane): Vector3;

/** Returns the intersection point of a ray consisting of the position [code]from[/code] and the direction normal [code]dir[/code] with this plane. If no intersection is found, [code]null[/code] is returned. */
intersects_ray(from: Vector3, dir: Vector3): Vector3;

/** Returns the intersection point of a segment from position [code]begin[/code] to position [code]end[/code] with this plane. If no intersection is found, [code]null[/code] is returned. */
intersects_segment(begin: Vector3, end: Vector3): Vector3;

/** Returns [code]true[/code] if this plane and [code]plane[/code] are approximately equal, by running [method @GDScript.is_equal_approx] on each component. */
is_equal_approx(plane: Plane): boolean;

/** Returns [code]true[/code] if [code]point[/code] is located above the plane. */
is_point_over(point: Vector3): boolean;

/** Returns a copy of the plane, normalized. */
normalized(): Plane;

/** Returns the orthogonal projection of [code]point[/code] into a point in the plane. */
project(point: Vector3): Vector3;

  connect<T extends SignalsOf<Plane>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * A plane that extends in the Y and Z axes (normal vector points +X).
 *
*/
static PLANE_YZ: Plane;

/**
 * A plane that extends in the X and Z axes (normal vector points +Y).
 *
*/
static PLANE_XZ: Plane;

/**
 * A plane that extends in the X and Y axes (normal vector points +Z).
 *
*/
static PLANE_XY: Plane;


  
}
