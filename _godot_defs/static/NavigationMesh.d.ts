
/**
 * A navigation mesh is a collection of polygons that define which areas of an environment are traversable to aid agents in pathfinding through complicated spaces.
 *
*/
declare class NavigationMesh extends Resource {

  
/**
 * A navigation mesh is a collection of polygons that define which areas of an environment are traversable to aid agents in pathfinding through complicated spaces.
 *
*/
  "new"(): NavigationMesh;
  static "new"(): NavigationMesh;



/**
 * The minimum floor to ceiling height that will still allow the floor area to be considered walkable.
 *
 * **Note:** While baking, this value will be rounded up to the nearest multiple of [member cell/height].
 *
*/
"agent/height": float;

/**
 * The minimum ledge height that is considered to still be traversable.
 *
 * **Note:** While baking, this value will be rounded down to the nearest multiple of [member cell/height].
 *
*/
"agent/max_climb": float;

/** The maximum slope that is considered walkable, in degrees. */
"agent/max_slope": float;

/**
 * The distance to erode/shrink the walkable area of the heightfield away from obstructions.
 *
 * **Note:** While baking, this value will be rounded up to the nearest multiple of [member cell/size].
 *
*/
"agent/radius": float;

/** The Y axis cell size to use for fields. */
"cell/height": float;

/** The XZ plane cell size to use for fields. */
"cell/size": float;

/** The sampling distance to use when generating the detail mesh, in cell unit. */
"detail/sample_distance": float;

/** The maximum distance the detail mesh surface should deviate from heightfield, in cell unit. */
"detail/sample_max_error": float;

/** The maximum distance a simplfied contour's border edges should deviate the original raw contour. */
"edge/max_error": float;

/**
 * The maximum allowed length for contour edges along the border of the mesh.
 *
 * **Note:** While baking, this value will be rounded up to the nearest multiple of [member cell/size].
 *
*/
"edge/max_length": float;

/** If [code]true[/code], marks walkable spans as not walkable if the clearance above the span is less than [member agent/height]. */
"filter/filter_walkable_low_height_spans": boolean;

/** If [code]true[/code], marks spans that are ledges as non-walkable. */
"filter/ledge_spans": boolean;

/** If [code]true[/code], marks non-walkable spans as walkable if their maximum is within [member agent/max_climb] of a walkable neighbor. */
"filter/low_hanging_obstacles": boolean;

/**
 * The physics layers to scan for static colliders.
 *
 * Only used when [member geometry/parsed_geometry_type] is [constant PARSED_GEOMETRY_STATIC_COLLIDERS] or [constant PARSED_GEOMETRY_BOTH].
 *
*/
"geometry/collision_mask": int;

/** Determines which type of nodes will be parsed as geometry. See [enum ParsedGeometryType] for possible values. */
"geometry/parsed_geometry_type": int;

/** The source of the geometry used when baking. See [enum SourceGeometryMode] for possible values. */
"geometry/source_geometry_mode": int;

/**
 * The name of the group to scan for geometry.
 *
 * Only used when [member geometry/source_geometry_mode] is [constant SOURCE_GEOMETRY_GROUPS_WITH_CHILDREN] or [constant SOURCE_GEOMETRY_GROUPS_EXPLICIT].
 *
*/
"geometry/source_group_name": string;

/** The maximum number of vertices allowed for polygons generated during the contour to polygon conversion process. */
"polygon/verts_per_poly": float;

/**
 * Any regions with a size smaller than this will be merged with larger regions if possible.
 *
 * **Note:** This value will be squared to calculate the number of cells. For example, a value of 20 will set the number of cells to 400.
 *
*/
"region/merge_size": float;

/**
 * The minimum size of a region for it to be created.
 *
 * **Note:** This value will be squared to calculate the minimum number of cells allowed to form isolated island areas. For example, a value of 8 will set the number of cells to 64.
 *
*/
"region/min_size": float;

/** Partitioning algorithm for creating the navigation mesh polys. See [enum SamplePartitionType] for possible values. */
"sample_partition_type/sample_partition_type": int;

/** Adds a polygon using the indices of the vertices you get when calling [method get_vertices]. */
add_polygon(polygon: PoolIntArray): void;

/** Clears the array of polygons, but it doesn't clear the array of vertices. */
clear_polygons(): void;

/** Initializes the navigation mesh by setting the vertices and indices according to a [Mesh]. */
create_from_mesh(mesh: Mesh): void;

/** Returns whether the specified [code]bit[/code] of the [member geometry/collision_mask] is set. */
get_collision_mask_bit(bit: int): boolean;

/** Returns a [PoolIntArray] containing the indices of the vertices of a created polygon. */
get_polygon(idx: int): PoolIntArray;

/** Returns the number of polygons in the navigation mesh. */
get_polygon_count(): int;

/** Returns a [PoolVector3Array] containing all the vertices being used to create the polygons. */
get_vertices(): PoolVector3Array;

/**
 * If `value` is `true`, sets the specified `bit` in the [member geometry/collision_mask].
 *
 * If `value` is `false`, clears the specified `bit` in the [member geometry/collision_mask].
 *
*/
set_collision_mask_bit(bit: int, value: boolean): void;

/** Sets the vertices that can be then indexed to create polygons with the [method add_polygon] method. */
set_vertices(vertices: PoolVector3Array): void;

  // connect<T extends SignalsOf<NavigationMesh>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<NavigationMeshSignals>>(signal: T, method: SignalFunction<NavigationMeshSignals[T]>): number;



/**
 * Watershed partitioning. Generally the best choice if you precompute the navigation mesh, use this if you have large open areas.
 *
*/
static SAMPLE_PARTITION_WATERSHED: any;

/**
 * Monotone partitioning. Use this if you want fast navigation mesh generation.
 *
*/
static SAMPLE_PARTITION_MONOTONE: any;

/**
 * Layer partitioning. Good choice to use for tiled navigation mesh with medium and small sized tiles.
 *
*/
static SAMPLE_PARTITION_LAYERS: any;

/**
 * Represents the size of the [enum SamplePartitionType] enum.
 *
*/
static SAMPLE_PARTITION_MAX: any;

/**
 * Parses mesh instances as geometry. This includes [MeshInstance], [CSGShape], and [GridMap] nodes.
 *
*/
static PARSED_GEOMETRY_MESH_INSTANCES: any;

/**
 * Parses [StaticBody] colliders as geometry. The collider should be in any of the layers specified by [member geometry/collision_mask].
 *
*/
static PARSED_GEOMETRY_STATIC_COLLIDERS: any;

/**
 * Both [constant PARSED_GEOMETRY_MESH_INSTANCES] and [constant PARSED_GEOMETRY_STATIC_COLLIDERS].
 *
*/
static PARSED_GEOMETRY_BOTH: any;

/**
 * Represents the size of the [enum ParsedGeometryType] enum.
 *
*/
static PARSED_GEOMETRY_MAX: any;

/**
 * Scans the child nodes of [NavigationMeshInstance] recursively for geometry.
 *
*/
static SOURCE_GEOMETRY_NAVMESH_CHILDREN: any;

/**
 * Scans nodes in a group and their child nodes recursively for geometry. The group is specified by [member geometry/source_group_name].
 *
*/
static SOURCE_GEOMETRY_GROUPS_WITH_CHILDREN: any;

/**
 * Uses nodes in a group for geometry. The group is specified by [member geometry/source_group_name].
 *
*/
static SOURCE_GEOMETRY_GROUPS_EXPLICIT: any;

/**
 * Represents the size of the [enum SourceGeometryMode] enum.
 *
*/
static SOURCE_GEOMETRY_MAX: any;

}

declare class NavigationMeshSignals extends ResourceSignals {
  
}
