
/**
 * There are two ways to create polygons. Either by using the [method add_outline] method, or using the [method add_polygon] method.
 *
 * Using [method add_outline]:
 *
 * @example 
 * 
 * var polygon = NavigationPolygon.new()
 * var outline = PoolVector2Array([Vector2(0, 0), Vector2(0, 50), Vector2(50, 50), Vector2(50, 0)])
 * polygon.add_outline(outline)
 * polygon.make_polygons_from_outlines()
 * $NavigationPolygonInstance.navpoly = polygon
 * @summary 
 * 
 *
 * Using [method add_polygon] and indices of the vertices array.
 *
 * @example 
 * 
 * var polygon = NavigationPolygon.new()
 * var vertices = PoolVector2Array([Vector2(0, 0), Vector2(0, 50), Vector2(50, 50), Vector2(50, 0)])
 * polygon.set_vertices(vertices)
 * var indices = PoolIntArray([0, 1, 2, 3])
 * polygon.add_polygon(indices)
 * $NavigationPolygonInstance.navpoly = polygon
 * @summary 
 * 
 *
*/
declare class NavigationPolygon extends Resource  {

  
/**
 * There are two ways to create polygons. Either by using the [method add_outline] method, or using the [method add_polygon] method.
 *
 * Using [method add_outline]:
 *
 * @example 
 * 
 * var polygon = NavigationPolygon.new()
 * var outline = PoolVector2Array([Vector2(0, 0), Vector2(0, 50), Vector2(50, 50), Vector2(50, 0)])
 * polygon.add_outline(outline)
 * polygon.make_polygons_from_outlines()
 * $NavigationPolygonInstance.navpoly = polygon
 * @summary 
 * 
 *
 * Using [method add_polygon] and indices of the vertices array.
 *
 * @example 
 * 
 * var polygon = NavigationPolygon.new()
 * var vertices = PoolVector2Array([Vector2(0, 0), Vector2(0, 50), Vector2(50, 50), Vector2(50, 0)])
 * polygon.set_vertices(vertices)
 * var indices = PoolIntArray([0, 1, 2, 3])
 * polygon.add_polygon(indices)
 * $NavigationPolygonInstance.navpoly = polygon
 * @summary 
 * 
 *
*/
  new(): NavigationPolygon; 
  static "new"(): NavigationPolygon 



/** Appends a [PoolVector2Array] that contains the vertices of an outline to the internal array that contains all the outlines. You have to call [method make_polygons_from_outlines] in order for this array to be converted to polygons that the engine will use. */
add_outline(outline: PoolVector2Array): void;

/** Adds a [PoolVector2Array] that contains the vertices of an outline to the internal array that contains all the outlines at a fixed position. You have to call [method make_polygons_from_outlines] in order for this array to be converted to polygons that the engine will use. */
add_outline_at_index(outline: PoolVector2Array, index: int): void;

/** Adds a polygon using the indices of the vertices you get when calling [method get_vertices]. */
add_polygon(polygon: PoolIntArray): void;

/** Clears the array of the outlines, but it doesn't clear the vertices and the polygons that were created by them. */
clear_outlines(): void;

/** Clears the array of polygons, but it doesn't clear the array of outlines and vertices. */
clear_polygons(): void;

/** Returns a [PoolVector2Array] containing the vertices of an outline that was created in the editor or by script. */
get_outline(idx: int): PoolVector2Array;

/** Returns the number of outlines that were created in the editor or by script. */
get_outline_count(): int;

/** Returns a [PoolIntArray] containing the indices of the vertices of a created polygon. */
get_polygon(idx: int): PoolIntArray;

/** Returns the count of all polygons. */
get_polygon_count(): int;

/** Returns a [PoolVector2Array] containing all the vertices being used to create the polygons. */
get_vertices(): PoolVector2Array;

/** Creates polygons from the outlines added in the editor or by script. */
make_polygons_from_outlines(): void;

/** Removes an outline created in the editor or by script. You have to call [method make_polygons_from_outlines] for the polygons to update. */
remove_outline(idx: int): void;

/** Changes an outline created in the editor or by script. You have to call [method make_polygons_from_outlines] for the polygons to update. */
set_outline(idx: int, outline: PoolVector2Array): void;

/** Sets the vertices that can be then indexed to create polygons with the [method add_polygon] method. */
set_vertices(vertices: PoolVector2Array): void;

  connect<T extends SignalsOf<NavigationPolygon>>(signal: T, method: SignalFunction<NavigationPolygon[T]>): number;






}

