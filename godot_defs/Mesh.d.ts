
/**
 * Mesh is a type of [Resource] that contains vertex array-based geometry, divided in **surfaces**. Each surface contains a completely separate array and a material used to draw it. Design wise, a mesh with multiple surfaces is preferred to a single surface, because objects created in 3D editing software commonly contain multiple materials.
 *
*/
declare class Mesh extends Resource {

  
/**
 * Mesh is a type of [Resource] that contains vertex array-based geometry, divided in **surfaces**. Each surface contains a completely separate array and a material used to draw it. Design wise, a mesh with multiple surfaces is preferred to a single surface, because objects created in 3D editing software commonly contain multiple materials.
 *
*/
  "new"(): Mesh;
  static "new"(): Mesh;



/** Sets a hint to be used for lightmap resolution in [BakedLightmap]. Overrides [member BakedLightmap.bake_default_texels_per_unit]. */
lightmap_size_hint: Vector2;

/** Calculate a [ConvexPolygonShape] from the mesh. */
create_convex_shape(): Shape;

/**
 * Calculate an outline mesh at a defined offset (margin) from the original mesh.
 *
 * **Note:** This method typically returns the vertices in reverse order (e.g. clockwise to counterclockwise).
 *
*/
create_outline(margin: float): Mesh;

/** Calculate a [ConcavePolygonShape] from the mesh. */
create_trimesh_shape(): Shape;

/** Generate a [TriangleMesh] from the mesh. */
generate_triangle_mesh(): TriangleMesh;

/**
 * Returns the smallest [AABB] enclosing this mesh in local space. Not affected by `custom_aabb`. See also [method VisualInstance.get_transformed_aabb].
 *
 * **Note:** This is only implemented for [ArrayMesh] and [PrimitiveMesh].
 *
*/
get_aabb(): AABB;

/** Returns all the vertices that make up the faces of the mesh. Each three vertices represent one triangle. */
get_faces(): PoolVector3Array;

/** Returns the amount of surfaces that the [Mesh] holds. */
get_surface_count(): int;

/** Returns the arrays for the vertices, normals, uvs, etc. that make up the requested surface (see [method ArrayMesh.add_surface_from_arrays]). */
surface_get_arrays(surf_idx: int): any[];

/** Returns the blend shape arrays for the requested surface. */
surface_get_blend_shape_arrays(surf_idx: int): any[];

/** Returns a [Material] in a given surface. Surface is rendered using this material. */
surface_get_material(surf_idx: int): Material;

/** Sets a [Material] for a given surface. Surface will be rendered using this material. */
surface_set_material(surf_idx: int, material: Material): void;

  connect<T extends SignalsOf<Mesh>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Render array as points (one vertex equals one point).
 *
*/
static PRIMITIVE_POINTS: 0;

/**
 * Render array as lines (every two vertices a line is created).
 *
*/
static PRIMITIVE_LINES: 1;

/**
 * Render array as line strip.
 *
*/
static PRIMITIVE_LINE_STRIP: 2;

/**
 * Render array as line loop (like line strip, but closed).
 *
*/
static PRIMITIVE_LINE_LOOP: 3;

/**
 * Render array as triangles (every three vertices a triangle is created).
 *
*/
static PRIMITIVE_TRIANGLES: 4;

/**
 * Render array as triangle strips.
 *
*/
static PRIMITIVE_TRIANGLE_STRIP: 5;

/**
 * Render array as triangle fans.
 *
*/
static PRIMITIVE_TRIANGLE_FAN: 6;

/**
 * Blend shapes are normalized.
 *
*/
static BLEND_SHAPE_MODE_NORMALIZED: 0;

/**
 * Blend shapes are relative to base weight.
 *
*/
static BLEND_SHAPE_MODE_RELATIVE: 1;

/**
 * Mesh array contains vertices. All meshes require a vertex array so this should always be present.
 *
*/
static ARRAY_FORMAT_VERTEX: 1;

/**
 * Mesh array contains normals.
 *
*/
static ARRAY_FORMAT_NORMAL: 2;

/**
 * Mesh array contains tangents.
 *
*/
static ARRAY_FORMAT_TANGENT: 4;

/**
 * Mesh array contains colors.
 *
*/
static ARRAY_FORMAT_COLOR: 8;

/**
 * Mesh array contains UVs.
 *
*/
static ARRAY_FORMAT_TEX_UV: 16;

/**
 * Mesh array contains second UV.
 *
*/
static ARRAY_FORMAT_TEX_UV2: 32;

/**
 * Mesh array contains bones.
 *
*/
static ARRAY_FORMAT_BONES: 64;

/**
 * Mesh array contains bone weights.
 *
*/
static ARRAY_FORMAT_WEIGHTS: 128;

/**
 * Mesh array uses indices.
 *
*/
static ARRAY_FORMAT_INDEX: 256;

/**
 * Used internally to calculate other `ARRAY_COMPRESS_*` enum values. Do not use.
 *
*/
static ARRAY_COMPRESS_BASE: 9;

/**
 * Flag used to mark a compressed (half float) vertex array.
 *
*/
static ARRAY_COMPRESS_VERTEX: 512;

/**
 * Flag used to mark a compressed (half float) normal array.
 *
*/
static ARRAY_COMPRESS_NORMAL: 1024;

/**
 * Flag used to mark a compressed (half float) tangent array.
 *
*/
static ARRAY_COMPRESS_TANGENT: 2048;

/**
 * Flag used to mark a compressed (half float) color array.
 *
*/
static ARRAY_COMPRESS_COLOR: 4096;

/**
 * Flag used to mark a compressed (half float) UV coordinates array.
 *
*/
static ARRAY_COMPRESS_TEX_UV: 8192;

/**
 * Flag used to mark a compressed (half float) UV coordinates array for the second UV coordinates.
 *
*/
static ARRAY_COMPRESS_TEX_UV2: 16384;

/**
 * Flag used to mark a compressed bone array.
 *
*/
static ARRAY_COMPRESS_BONES: 32768;

/**
 * Flag used to mark a compressed (half float) weight array.
 *
*/
static ARRAY_COMPRESS_WEIGHTS: 65536;

/**
 * Flag used to mark a compressed index array.
 *
*/
static ARRAY_COMPRESS_INDEX: 131072;

/**
 * Flag used to mark that the array contains 2D vertices.
 *
*/
static ARRAY_FLAG_USE_2D_VERTICES: 262144;

/**
 * Flag used to mark that the array uses 16-bit bones instead of 8-bit.
 *
*/
static ARRAY_FLAG_USE_16_BIT_BONES: 524288;

/**
 * Used to set flags [constant ARRAY_COMPRESS_VERTEX], [constant ARRAY_COMPRESS_NORMAL], [constant ARRAY_COMPRESS_TANGENT], [constant ARRAY_COMPRESS_COLOR], [constant ARRAY_COMPRESS_TEX_UV], [constant ARRAY_COMPRESS_TEX_UV2] and [constant ARRAY_COMPRESS_WEIGHTS] quickly.
 *
*/
static ARRAY_COMPRESS_DEFAULT: 97280;

/**
 * Array of vertices.
 *
*/
static ARRAY_VERTEX: 0;

/**
 * Array of normals.
 *
*/
static ARRAY_NORMAL: 1;

/**
 * Array of tangents as an array of floats, 4 floats per tangent.
 *
*/
static ARRAY_TANGENT: 2;

/**
 * Array of colors.
 *
*/
static ARRAY_COLOR: 3;

/**
 * Array of UV coordinates.
 *
*/
static ARRAY_TEX_UV: 4;

/**
 * Array of second set of UV coordinates.
 *
*/
static ARRAY_TEX_UV2: 5;

/**
 * Array of bone data.
 *
*/
static ARRAY_BONES: 6;

/**
 * Array of weights.
 *
*/
static ARRAY_WEIGHTS: 7;

/**
 * Array of indices.
 *
*/
static ARRAY_INDEX: 8;

/**
 * Represents the size of the [enum ArrayType] enum.
 *
*/
static ARRAY_MAX: 9;


  
}
