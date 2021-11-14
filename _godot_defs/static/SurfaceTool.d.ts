
/**
 * The [SurfaceTool] is used to construct a [Mesh] by specifying vertex attributes individually. It can be used to construct a [Mesh] from a script. All properties except indices need to be added before calling [method add_vertex]. For example, to add vertex colors and UVs:
 *
 * @example 
 * 
 * var st = SurfaceTool.new()
 * st.begin(Mesh.PRIMITIVE_TRIANGLES)
 * st.add_color(Color(1, 0, 0))
 * st.add_uv(Vector2(0, 0))
 * st.add_vertex(Vector3(0, 0, 0))
 * @summary 
 * 
 *
 * The above [SurfaceTool] now contains one vertex of a triangle which has a UV coordinate and a specified [Color]. If another vertex were added without calling [method add_uv] or [method add_color], then the last values would be used.
 *
 * Vertex attributes must be passed **before** calling [method add_vertex]. Failure to do so will result in an error when committing the vertex information to a mesh.
 *
 * Additionally, the attributes used before the first vertex is added determine the format of the mesh. For example, if you only add UVs to the first vertex, you cannot add color to any of the subsequent vertices.
 *
 * See also [ArrayMesh], [ImmediateGeometry] and [MeshDataTool] for procedural geometry generation.
 *
 * **Note:** Godot uses clockwise [url=https://learnopengl.com/Advanced-OpenGL/Face-culling]winding order[/url] for front faces of triangle primitive modes.
 *
*/
declare class SurfaceTool extends Reference  {

  
/**
 * The [SurfaceTool] is used to construct a [Mesh] by specifying vertex attributes individually. It can be used to construct a [Mesh] from a script. All properties except indices need to be added before calling [method add_vertex]. For example, to add vertex colors and UVs:
 *
 * @example 
 * 
 * var st = SurfaceTool.new()
 * st.begin(Mesh.PRIMITIVE_TRIANGLES)
 * st.add_color(Color(1, 0, 0))
 * st.add_uv(Vector2(0, 0))
 * st.add_vertex(Vector3(0, 0, 0))
 * @summary 
 * 
 *
 * The above [SurfaceTool] now contains one vertex of a triangle which has a UV coordinate and a specified [Color]. If another vertex were added without calling [method add_uv] or [method add_color], then the last values would be used.
 *
 * Vertex attributes must be passed **before** calling [method add_vertex]. Failure to do so will result in an error when committing the vertex information to a mesh.
 *
 * Additionally, the attributes used before the first vertex is added determine the format of the mesh. For example, if you only add UVs to the first vertex, you cannot add color to any of the subsequent vertices.
 *
 * See also [ArrayMesh], [ImmediateGeometry] and [MeshDataTool] for procedural geometry generation.
 *
 * **Note:** Godot uses clockwise [url=https://learnopengl.com/Advanced-OpenGL/Face-culling]winding order[/url] for front faces of triangle primitive modes.
 *
*/
  new(): SurfaceTool; 
  static "new"(): SurfaceTool 



/** Specifies an array of bones to use for the [i]next[/i] vertex. [code]bones[/code] must contain 4 integers. */
add_bones(bones: PoolIntArray): void;

/**
 * Specifies a [Color] to use for the **next** vertex. If every vertex needs to have this information set and you fail to submit it for the first vertex, this information may not be used at all.
 *
 * **Note:** The material must have [member SpatialMaterial.vertex_color_use_as_albedo] enabled for the vertex color to be visible.
 *
*/
add_color(color: Color): void;

/** Adds an index to index array if you are using indexed vertices. Does not need to be called before adding vertices. */
add_index(index: int): void;

/** Specifies a normal to use for the [i]next[/i] vertex. If every vertex needs to have this information set and you fail to submit it for the first vertex, this information may not be used at all. */
add_normal(normal: Vector3): void;

/** Specifies whether the current vertex (if using only vertex arrays) or current index (if also using index arrays) should use smooth normals for normal calculation. */
add_smooth_group(smooth: boolean): void;

/** Specifies a tangent to use for the [i]next[/i] vertex. If every vertex needs to have this information set and you fail to submit it for the first vertex, this information may not be used at all. */
add_tangent(tangent: Plane): void;

/**
 * Inserts a triangle fan made of array data into [Mesh] being constructed.
 *
 * Requires the primitive type be set to [constant Mesh.PRIMITIVE_TRIANGLES].
 *
*/
add_triangle_fan(vertices: PoolVector3Array, uvs?: PoolVector2Array, colors?: PoolColorArray, uv2s?: PoolVector2Array, normals?: PoolVector3Array, tangents?: any[]): void;

/** Specifies a set of UV coordinates to use for the [i]next[/i] vertex. If every vertex needs to have this information set and you fail to submit it for the first vertex, this information may not be used at all. */
add_uv(uv: Vector2): void;

/** Specifies an optional second set of UV coordinates to use for the [i]next[/i] vertex. If every vertex needs to have this information set and you fail to submit it for the first vertex, this information may not be used at all. */
add_uv2(uv2: Vector2): void;

/** Specifies the position of current vertex. Should be called after specifying other vertex properties (e.g. Color, UV). */
add_vertex(vertex: Vector3): void;

/** Specifies weight values to use for the [i]next[/i] vertex. [code]weights[/code] must contain 4 values. If every vertex needs to have this information set and you fail to submit it for the first vertex, this information may not be used at all. */
add_weights(weights: PoolRealArray): void;

/** Append vertices from a given [Mesh] surface onto the current vertex array with specified [Transform]. */
append_from(existing: Mesh, surface: int, transform: Transform): void;

/** Called before adding any vertices. Takes the primitive type as an argument (e.g. [constant Mesh.PRIMITIVE_TRIANGLES]). */
begin(primitive: int): void;

/** Clear all information passed into the surface tool so far. */
clear(): void;

/**
 * Returns a constructed [ArrayMesh] from current information passed in. If an existing [ArrayMesh] is passed in as an argument, will add an extra surface to the existing [ArrayMesh].
 *
 * Default flag is [constant Mesh.ARRAY_COMPRESS_DEFAULT] if compression is enabled. If compression is disabled the default flag is [constant Mesh.ARRAY_FLAG_USE_OCTAHEDRAL_COMPRESSION]. See `ARRAY_COMPRESS_*` constants in [enum Mesh.ArrayFormat] for other flags.
 *
*/
commit(existing?: ArrayMesh, flags?: int): ArrayMesh;

/** Commits the data to the same format used by [method ArrayMesh.add_surface_from_arrays]. This way you can further process the mesh data using the [ArrayMesh] API. */
commit_to_arrays(): any[];

/** Creates a vertex array from an existing [Mesh]. */
create_from(existing: Mesh, surface: int): void;

/** Creates a vertex array from the specified blend shape of an existing [Mesh]. This can be used to extract a specific pose from a blend shape. */
create_from_blend_shape(existing: Mesh, surface: int, blend_shape: string): void;

/** Removes the index array by expanding the vertex array. */
deindex(): void;

/**
 * Generates normals from vertices so you do not have to do it manually. If `flip` is `true`, the resulting normals will be inverted. [method generate_normals] should be called **after** generating geometry and **before** committing the mesh using [method commit] or [method commit_to_arrays]. For correct display of normal-mapped surfaces, you will also have to generate tangents using [method generate_tangents].
 *
 * **Note:** [method generate_normals] only works if the primitive type to be set to [constant Mesh.PRIMITIVE_TRIANGLES].
 *
*/
generate_normals(flip?: boolean): void;

/** Generates a tangent vector for each vertex. Requires that each vertex have UVs and normals set already (see [method generate_normals]). */
generate_tangents(): void;

/** Shrinks the vertex array by creating an index array. This can improve performance by avoiding vertex reuse. */
index(): void;

/** Sets [Material] to be used by the [Mesh] you are constructing. */
set_material(material: Material): void;

  connect<T extends SignalsOf<SurfaceTool>>(signal: T, method: SignalFunction<SurfaceTool[T]>): number;






}

