
/**
 * The [ArrayMesh] is used to construct a [Mesh] by specifying the attributes as arrays.
 *
 * The most basic example is the creation of a single triangle:
 *
 * @example 
 * 
 * var vertices = PoolVector3Array()
 * vertices.push_back(Vector3(0, 1, 0))
 * vertices.push_back(Vector3(1, 0, 0))
 * vertices.push_back(Vector3(0, 0, 1))
 * # Initialize the ArrayMesh.
 * var arr_mesh = ArrayMesh.new()
 * var arrays = []
 * arrays.resize(ArrayMesh.ARRAY_MAX)
 * arrays[ArrayMesh.ARRAY_VERTEX] = vertices
 * # Create the Mesh.
 * arr_mesh.add_surface_from_arrays(Mesh.PRIMITIVE_TRIANGLES, arrays)
 * var m = MeshInstance.new()
 * m.mesh = arr_mesh
 * @summary 
 * 
 *
 * The [MeshInstance] is ready to be added to the [SceneTree] to be shown.
 *
 * See also [ImmediateGeometry], [MeshDataTool] and [SurfaceTool] for procedural geometry generation.
 *
 * **Note:** Godot uses clockwise [url=https://learnopengl.com/Advanced-OpenGL/Face-culling]winding order[/url] for front faces of triangle primitive modes.
 *
*/
declare class ArrayMesh extends Mesh {

  
/**
 * The [ArrayMesh] is used to construct a [Mesh] by specifying the attributes as arrays.
 *
 * The most basic example is the creation of a single triangle:
 *
 * @example 
 * 
 * var vertices = PoolVector3Array()
 * vertices.push_back(Vector3(0, 1, 0))
 * vertices.push_back(Vector3(1, 0, 0))
 * vertices.push_back(Vector3(0, 0, 1))
 * # Initialize the ArrayMesh.
 * var arr_mesh = ArrayMesh.new()
 * var arrays = []
 * arrays.resize(ArrayMesh.ARRAY_MAX)
 * arrays[ArrayMesh.ARRAY_VERTEX] = vertices
 * # Create the Mesh.
 * arr_mesh.add_surface_from_arrays(Mesh.PRIMITIVE_TRIANGLES, arrays)
 * var m = MeshInstance.new()
 * m.mesh = arr_mesh
 * @summary 
 * 
 *
 * The [MeshInstance] is ready to be added to the [SceneTree] to be shown.
 *
 * See also [ImmediateGeometry], [MeshDataTool] and [SurfaceTool] for procedural geometry generation.
 *
 * **Note:** Godot uses clockwise [url=https://learnopengl.com/Advanced-OpenGL/Face-culling]winding order[/url] for front faces of triangle primitive modes.
 *
*/
  "new"(): ArrayMesh;
  static "new"(): ArrayMesh;



/** Sets the blend shape mode to one of [enum Mesh.BlendShapeMode]. */
blend_shape_mode: int;

/** Overrides the [AABB] with one defined by user for use with frustum culling. Especially useful to avoid unexpected culling when using a shader to offset vertices. */
custom_aabb: AABB;

/** Adds name for a blend shape that will be added with [method add_surface_from_arrays]. Must be called before surface is added. */
add_blend_shape(name: string): void;

/**
 * Creates a new surface.
 *
 * Surfaces are created to be rendered using a `primitive`, which may be any of the types defined in [enum Mesh.PrimitiveType]. (As a note, when using indices, it is recommended to only use points, lines, or triangles.) [method Mesh.get_surface_count] will become the `surf_idx` for this new surface.
 *
 * The `arrays` argument is an array of arrays. See [enum ArrayType] for the values used in this array. For example, `arrays[0]` is the array of vertices. That first vertex sub-array is always required; the others are optional. Adding an index array puts this function into "index mode" where the vertex and other arrays become the sources of data and the index array defines the vertex order. All sub-arrays must have the same length as the vertex array or be empty, except for [constant ARRAY_INDEX] if it is used.
 *
*/
add_surface_from_arrays(primitive: int, arrays: any[], blend_shapes?: any[], compress_flags?: int): void;

/** Removes all blend shapes from this [ArrayMesh]. */
clear_blend_shapes(): void;

/** Removes all surfaces from this [ArrayMesh]. */
clear_surfaces(): void;

/** Returns the number of blend shapes that the [ArrayMesh] holds. */
get_blend_shape_count(): int;

/** Returns the name of the blend shape at this index. */
get_blend_shape_name(index: int): string;

/** Will perform a UV unwrap on the [ArrayMesh] to prepare the mesh for lightmapping. */
lightmap_unwrap(transform: Transform, texel_size: float): int;

/** Will regenerate normal maps for the [ArrayMesh]. */
regen_normalmaps(): void;

/** No documentation provided. */
set_blend_shape_name(index: int, name: string): void;

/** Returns the index of the first surface with this name held within this [ArrayMesh]. If none are found, -1 is returned. */
surface_find_by_name(name: string): int;

/** Returns the length in indices of the index array in the requested surface (see [method add_surface_from_arrays]). */
surface_get_array_index_len(surf_idx: int): int;

/** Returns the length in vertices of the vertex array in the requested surface (see [method add_surface_from_arrays]). */
surface_get_array_len(surf_idx: int): int;

/** Returns the format mask of the requested surface (see [method add_surface_from_arrays]). */
surface_get_format(surf_idx: int): int;

/** Gets the name assigned to this surface. */
surface_get_name(surf_idx: int): string;

/** Returns the primitive type of the requested surface (see [method add_surface_from_arrays]). */
surface_get_primitive_type(surf_idx: int): int;

/** Removes a surface at position [code]surf_idx[/code], shifting greater surfaces one [code]surf_idx[/code] slot down. */
surface_remove(surf_idx: int): void;

/** Sets a name for a given surface. */
surface_set_name(surf_idx: int, name: string): void;

/**
 * Updates a specified region of mesh arrays on the GPU.
 *
 * **Warning:** Only use if you know what you are doing. You can easily cause crashes by calling this function with improper arguments.
 *
*/
surface_update_region(surf_idx: int, offset: int, data: PoolByteArray): void;

  // connect<T extends SignalsOf<ArrayMesh>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<ArrayMeshSignals>>(signal: T, method: SignalFunction<ArrayMeshSignals[T]>): number;



/**
 * Default value used for index_array_len when no indices are present.
 *
*/
static NO_INDEX_ARRAY: any;

/**
 * Amount of weights/bone indices per vertex (always 4).
 *
*/
static ARRAY_WEIGHTS_SIZE: any;

/**
 * [PoolVector3Array], [PoolVector2Array], or [Array] of vertex positions.
 *
*/
static ARRAY_VERTEX: any;

/**
 * [PoolVector3Array] of vertex normals.
 *
*/
static ARRAY_NORMAL: any;

/**
 * [PoolRealArray] of vertex tangents. Each element in groups of 4 floats, first 3 floats determine the tangent, and the last the binormal direction as -1 or 1.
 *
*/
static ARRAY_TANGENT: any;

/**
 * [PoolColorArray] of vertex colors.
 *
*/
static ARRAY_COLOR: any;

/**
 * [PoolVector2Array] for UV coordinates.
 *
*/
static ARRAY_TEX_UV: any;

/**
 * [PoolVector2Array] for second UV coordinates.
 *
*/
static ARRAY_TEX_UV2: any;

/**
 * [PoolRealArray] or [PoolIntArray] of bone indices. Each element in groups of 4 floats.
 *
*/
static ARRAY_BONES: any;

/**
 * [PoolRealArray] of bone weights. Each element in groups of 4 floats.
 *
*/
static ARRAY_WEIGHTS: any;

/**
 * [PoolIntArray] of integers used as indices referencing vertices, colors, normals, tangents, and textures. All of those arrays must have the same number of elements as the vertex array. No index can be beyond the vertex array size. When this index array is present, it puts the function into "index mode," where the index selects the *i*'th vertex, normal, tangent, color, UV, etc. This means if you want to have different normals or colors along an edge, you have to duplicate the vertices.
 *
 * For triangles, the index array is interpreted as triples, referring to the vertices of each triangle. For lines, the index array is in pairs indicating the start and end of each line.
 *
*/
static ARRAY_INDEX: any;

/**
 * Represents the size of the [enum ArrayType] enum.
 *
*/
static ARRAY_MAX: any;

/**
 * Array format will include vertices (mandatory).
 *
*/
static ARRAY_FORMAT_VERTEX: any;

/**
 * Array format will include normals.
 *
*/
static ARRAY_FORMAT_NORMAL: any;

/**
 * Array format will include tangents.
 *
*/
static ARRAY_FORMAT_TANGENT: any;

/**
 * Array format will include a color array.
 *
*/
static ARRAY_FORMAT_COLOR: any;

/**
 * Array format will include UVs.
 *
*/
static ARRAY_FORMAT_TEX_UV: any;

/**
 * Array format will include another set of UVs.
 *
*/
static ARRAY_FORMAT_TEX_UV2: any;

/**
 * Array format will include bone indices.
 *
*/
static ARRAY_FORMAT_BONES: any;

/**
 * Array format will include bone weights.
 *
*/
static ARRAY_FORMAT_WEIGHTS: any;

/**
 * Index array will be used.
 *
*/
static ARRAY_FORMAT_INDEX: any;

}

declare class ArrayMeshSignals extends MeshSignals {
  
}
