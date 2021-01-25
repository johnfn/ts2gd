
/**
 * Provides navigation and pathfinding within a collection of [NavigationMesh]es. By default, these will be automatically collected from child [NavigationMeshInstance] nodes, but they can also be added on the fly with [method navmesh_add]. In addition to basic pathfinding, this class also assists with aligning navigation agents with the meshes they are navigating on.
 *
*/
declare class Navigation extends Spatial {

  
/**
 * Provides navigation and pathfinding within a collection of [NavigationMesh]es. By default, these will be automatically collected from child [NavigationMeshInstance] nodes, but they can also be added on the fly with [method navmesh_add]. In addition to basic pathfinding, this class also assists with aligning navigation agents with the meshes they are navigating on.
 *
*/
  "new"(): Navigation;
  static "new"(): Navigation;



/** Defines which direction is up. By default, this is [code](0, 1, 0)[/code], which is the world's "up" direction. */
up_vector: Vector3;

/** Returns the navigation point closest to the point given. Points are in local coordinate space. */
get_closest_point(to_point: Vector3): Vector3;

/** Returns the surface normal at the navigation point closest to the point given. Useful for rotating a navigation agent according to the navigation mesh it moves on. */
get_closest_point_normal(to_point: Vector3): Vector3;

/** Returns the owner of the [NavigationMesh] which contains the navigation point closest to the point given. This is usually a [NavigationMeshInstance]. For meshes added via [method navmesh_add], returns the owner that was given (or [code]null[/code] if the [code]owner[/code] parameter was omitted). */
get_closest_point_owner(to_point: Vector3): Object;

/** Returns the navigation point closest to the given line segment. When enabling [code]use_collision[/code], only considers intersection points between segment and navigation meshes. If multiple intersection points are found, the one closest to the segment start point is returned. */
get_closest_point_to_segment(start: Vector3, end: Vector3, use_collision?: boolean): Vector3;

/** Returns the path between two given points. Points are in local coordinate space. If [code]optimize[/code] is [code]true[/code] (the default), the agent properties associated with each [NavigationMesh] (radius, height, etc.) are considered in the path calculation, otherwise they are ignored. */
get_simple_path(start: Vector3, end: Vector3, optimize?: boolean): PoolVector3Array;

/** Adds a [NavigationMesh]. Returns an ID for use with [method navmesh_remove] or [method navmesh_set_transform]. If given, a [Transform2D] is applied to the polygon. The optional [code]owner[/code] is used as return value for [method get_closest_point_owner]. */
navmesh_add(mesh: NavigationMesh, xform: Transform, owner?: Object): int;

/** Removes the [NavigationMesh] with the given ID. */
navmesh_remove(id: int): void;

/** Sets the transform applied to the [NavigationMesh] with the given ID. */
navmesh_set_transform(id: int, xform: Transform): void;

  connect<T extends SignalsOf<Navigation>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
