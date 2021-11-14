
/**
 * Navigation2D provides navigation and pathfinding within a 2D area, specified as a collection of [NavigationPolygon] resources. By default, these are automatically collected from child [NavigationPolygonInstance] nodes, but they can also be added on the fly with [method navpoly_add].
 *
 * **Note:** The current navigation system has many known issues and will not always return optimal paths as expected. These issues will be fixed in Godot 4.0.
 *
*/
declare class Navigation2D extends Node2D  {

  
/**
 * Navigation2D provides navigation and pathfinding within a 2D area, specified as a collection of [NavigationPolygon] resources. By default, these are automatically collected from child [NavigationPolygonInstance] nodes, but they can also be added on the fly with [method navpoly_add].
 *
 * **Note:** The current navigation system has many known issues and will not always return optimal paths as expected. These issues will be fixed in Godot 4.0.
 *
*/
  new(): Navigation2D; 
  static "new"(): Navigation2D 



/** Returns the navigation point closest to the point given. Points are in local coordinate space. */
get_closest_point(to_point: Vector2): Vector2;

/** Returns the owner of the [NavigationPolygon] which contains the navigation point closest to the point given. This is usually a [NavigationPolygonInstance]. For polygons added via [method navpoly_add], returns the owner that was given (or [code]null[/code] if the [code]owner[/code] parameter was omitted). */
get_closest_point_owner(to_point: Vector2): Object;

/**
 * Returns the path between two given points. Points are in local coordinate space. If `optimize` is `true` (the default), the path is smoothed by merging path segments where possible.
 *
 * **Note:** This method has known issues and will often return non-optimal paths. These issues will be fixed in Godot 4.0.
 *
*/
get_simple_path(start: Vector2, end: Vector2, optimize?: boolean): PoolVector2Array;

/** Adds a [NavigationPolygon]. Returns an ID for use with [method navpoly_remove] or [method navpoly_set_transform]. If given, a [Transform2D] is applied to the polygon. The optional [code]owner[/code] is used as return value for [method get_closest_point_owner]. */
navpoly_add(mesh: NavigationPolygon, xform: Transform2D, owner?: Object): int;

/** Removes the [NavigationPolygon] with the given ID. */
navpoly_remove(id: int): void;

/** Sets the transform applied to the [NavigationPolygon] with the given ID. */
navpoly_set_transform(id: int, xform: Transform2D): void;

  connect<T extends SignalsOf<Navigation2D>>(signal: T, method: SignalFunction<Navigation2D[T]>): number;






}

