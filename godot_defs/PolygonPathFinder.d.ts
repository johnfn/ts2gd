
/**
*/
declare class PolygonPathFinder extends Resource {

  
/**
*/
  "new"(): PolygonPathFinder;
  static "new"(): PolygonPathFinder;




/** No documentation provided. */
find_path(from: Vector2, to: Vector2): PoolVector2Array;

/** No documentation provided. */
get_bounds(): Rect2;

/** No documentation provided. */
get_closest_point(point: Vector2): Vector2;

/** No documentation provided. */
get_intersections(from: Vector2, to: Vector2): PoolVector2Array;

/** No documentation provided. */
get_point_penalty(idx: int): float;

/** No documentation provided. */
is_point_inside(point: Vector2): boolean;

/** No documentation provided. */
set_point_penalty(idx: int, penalty: float): void;

/** No documentation provided. */
setup(points: PoolVector2Array, connections: PoolIntArray): void;

  connect<T extends SignalsOf<PolygonPathFinder>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
