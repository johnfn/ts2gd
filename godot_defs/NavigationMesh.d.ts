
/**
*/
declare class NavigationMesh extends Resource {

  
/**
*/
  "new"(): NavigationMesh;
  static "new"(): NavigationMesh;
























/** No documentation provided. */
add_polygon(polygon: PoolIntArray): void;

/** No documentation provided. */
clear_polygons(): void;

/** No documentation provided. */
create_from_mesh(mesh: Mesh): void;

/** No documentation provided. */
get_collision_mask_bit(bit: int): boolean;

/** No documentation provided. */
get_polygon(idx: int): PoolIntArray;

/** No documentation provided. */
get_polygon_count(): int;

/** No documentation provided. */
get_vertices(): PoolVector3Array;

/** No documentation provided. */
set_collision_mask_bit(bit: int, value: boolean): void;

/** No documentation provided. */
set_vertices(vertices: PoolVector3Array): void;

  connect<T extends SignalsOf<NavigationMesh>, U extends Node>(signal: T, node: U, method: keyof U): number;



/** No documentation provided. */
static SAMPLE_PARTITION_WATERSHED: 0;

/** No documentation provided. */
static SAMPLE_PARTITION_MONOTONE: 1;

/** No documentation provided. */
static SAMPLE_PARTITION_LAYERS: 2;

/** No documentation provided. */
static PARSED_GEOMETRY_MESH_INSTANCES: 0;

/** No documentation provided. */
static PARSED_GEOMETRY_STATIC_COLLIDERS: 1;

/** No documentation provided. */
static PARSED_GEOMETRY_BOTH: 2;


  
}
