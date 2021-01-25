
/**
 * Provides navigation and pathfinding within a collection of [NavigationMesh]es. These will be automatically collected from child [NavigationRegion3D] nodes. In addition to basic pathfinding, this class also assists with aligning navigation agents with the meshes they are navigating on.
 *
*/
declare class Navigation3D extends Node3D {

  
/**
 * Provides navigation and pathfinding within a collection of [NavigationMesh]es. These will be automatically collected from child [NavigationRegion3D] nodes. In addition to basic pathfinding, this class also assists with aligning navigation agents with the meshes they are navigating on.
 *
*/
  "new"(): this;
  static "new"(): this;





/** Defines which direction is up. By default, this is [code](0, 1, 0)[/code], which is the world's "up" direction. */
up_vector: Vector3;

/** Returns the point closest to the provided [code]to_point[/code] on the navigation mesh surface. */
get_closest_point(to_point: Vector3): Vector3;

/** Returns the normal for the point returned by [method get_closest_point]. */
get_closest_point_normal(to_point: Vector3): Vector3;

/** Returns the owner region RID for the point returned by [method get_closest_point]. */
get_closest_point_owner(to_point: Vector3): RID;

/** Returns the closest point between the navigation surface and the segment. */
get_closest_point_to_segment(start: Vector3, end: Vector3, use_collision?: boolean): Vector3;

/** No documentation provided. */
get_rid(): RID;

/** Returns the path between two given points. Points are in local coordinate space. If [code]optimize[/code] is [code]true[/code] (the default), the agent properties associated with each [NavigationMesh] (radius, height, etc.) are considered in the path calculation, otherwise they are ignored. */
get_simple_path(start: Vector3, end: Vector3, optimize?: boolean): PackedVector3Array;

  connect<T extends SignalsOf<Navigation3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
