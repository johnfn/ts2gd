
/**
 * MeshDataTool provides access to individual vertices in a [Mesh]. It allows users to read and edit vertex data of meshes. It also creates an array of faces and edges.
 *
 * To use MeshDataTool, load a mesh with [method create_from_surface]. When you are finished editing the data commit the data to a mesh with [method commit_to_surface].
 *
 * Below is an example of how MeshDataTool may be used.
 *
 * @example 
 * 
 * var mesh = ArrayMesh.new()
 * mesh.add_surface_from_arrays(Mesh.PRIMITIVE_TRIANGLES, CubeMesh.new().get_mesh_arrays())
 * var mdt = MeshDataTool.new()
 * mdt.create_from_surface(mesh, 0)
 * for i in range(mdt.get_vertex_count()):
 *     var vertex = mdt.get_vertex(i)
 *     # In this example we extend the mesh by one unit, which results in separated faces as it is flat shaded.
 *     vertex += mdt.get_vertex_normal(i)
 *     # Save your change.
 *     mdt.set_vertex(i, vertex)
 * mesh.surface_remove(0)
 * mdt.commit_to_surface(mesh)
 * var mi = MeshInstance.new()
 * mi.mesh = mesh
 * add_child(mi)
 * @summary 
 * 
 *
 * See also [ArrayMesh], [ImmediateGeometry] and [SurfaceTool] for procedural geometry generation.
 *
 * **Note:** Godot uses clockwise [url=https://learnopengl.com/Advanced-OpenGL/Face-culling]winding order[/url] for front faces of triangle primitive modes.
 *
*/
declare class MeshDataTool extends Reference  {

  
/**
 * MeshDataTool provides access to individual vertices in a [Mesh]. It allows users to read and edit vertex data of meshes. It also creates an array of faces and edges.
 *
 * To use MeshDataTool, load a mesh with [method create_from_surface]. When you are finished editing the data commit the data to a mesh with [method commit_to_surface].
 *
 * Below is an example of how MeshDataTool may be used.
 *
 * @example 
 * 
 * var mesh = ArrayMesh.new()
 * mesh.add_surface_from_arrays(Mesh.PRIMITIVE_TRIANGLES, CubeMesh.new().get_mesh_arrays())
 * var mdt = MeshDataTool.new()
 * mdt.create_from_surface(mesh, 0)
 * for i in range(mdt.get_vertex_count()):
 *     var vertex = mdt.get_vertex(i)
 *     # In this example we extend the mesh by one unit, which results in separated faces as it is flat shaded.
 *     vertex += mdt.get_vertex_normal(i)
 *     # Save your change.
 *     mdt.set_vertex(i, vertex)
 * mesh.surface_remove(0)
 * mdt.commit_to_surface(mesh)
 * var mi = MeshInstance.new()
 * mi.mesh = mesh
 * add_child(mi)
 * @summary 
 * 
 *
 * See also [ArrayMesh], [ImmediateGeometry] and [SurfaceTool] for procedural geometry generation.
 *
 * **Note:** Godot uses clockwise [url=https://learnopengl.com/Advanced-OpenGL/Face-culling]winding order[/url] for front faces of triangle primitive modes.
 *
*/
  new(): MeshDataTool; 
  static "new"(): MeshDataTool 



/** Clears all data currently in MeshDataTool. */
clear(): void;

/** Adds a new surface to specified [Mesh] with edited data. */
commit_to_surface(mesh: ArrayMesh): int;

/**
 * Uses specified surface of given [Mesh] to populate data for MeshDataTool.
 *
 * Requires [Mesh] with primitive type [constant Mesh.PRIMITIVE_TRIANGLES].
 *
*/
create_from_surface(mesh: ArrayMesh, surface: int): int;

/** Returns the number of edges in this [Mesh]. */
get_edge_count(): int;

/** Returns array of faces that touch given edge. */
get_edge_faces(idx: int): PoolIntArray;

/** Returns meta information assigned to given edge. */
get_edge_meta(idx: int): any;

/**
 * Returns index of specified vertex connected to given edge.
 *
 * Vertex argument can only be 0 or 1 because edges are comprised of two vertices.
 *
*/
get_edge_vertex(idx: int, vertex: int): int;

/** Returns the number of faces in this [Mesh]. */
get_face_count(): int;

/**
 * Returns specified edge associated with given face.
 *
 * Edge argument must 2 or less because a face only has three edges.
 *
*/
get_face_edge(idx: int, edge: int): int;

/** Returns the metadata associated with the given face. */
get_face_meta(idx: int): any;

/** Calculates and returns the face normal of the given face. */
get_face_normal(idx: int): Vector3;

/**
 * Returns the specified vertex of the given face.
 *
 * Vertex argument must be 2 or less because faces contain three vertices.
 *
*/
get_face_vertex(idx: int, vertex: int): int;

/**
 * Returns the [Mesh]'s format. Format is an integer made up of [Mesh] format flags combined together. For example, a mesh containing both vertices and normals would return a format of `3` because [constant ArrayMesh.ARRAY_FORMAT_VERTEX] is `1` and [constant ArrayMesh.ARRAY_FORMAT_NORMAL] is `2`.
 *
 * See [enum ArrayMesh.ArrayFormat] for a list of format flags.
 *
*/
get_format(): int;

/** Returns the material assigned to the [Mesh]. */
get_material(): Material;

/** Returns the vertex at given index. */
get_vertex(idx: int): Vector3;

/** Returns the bones of the given vertex. */
get_vertex_bones(idx: int): PoolIntArray;

/** Returns the color of the given vertex. */
get_vertex_color(idx: int): Color;

/** Returns the total number of vertices in [Mesh]. */
get_vertex_count(): int;

/** Returns an array of edges that share the given vertex. */
get_vertex_edges(idx: int): PoolIntArray;

/** Returns an array of faces that share the given vertex. */
get_vertex_faces(idx: int): PoolIntArray;

/** Returns the metadata associated with the given vertex. */
get_vertex_meta(idx: int): any;

/** Returns the normal of the given vertex. */
get_vertex_normal(idx: int): Vector3;

/** Returns the tangent of the given vertex. */
get_vertex_tangent(idx: int): Plane;

/** Returns the UV of the given vertex. */
get_vertex_uv(idx: int): Vector2;

/** Returns the UV2 of the given vertex. */
get_vertex_uv2(idx: int): Vector2;

/** Returns bone weights of the given vertex. */
get_vertex_weights(idx: int): PoolRealArray;

/** Sets the metadata of the given edge. */
set_edge_meta(idx: int, meta: any): void;

/** Sets the metadata of the given face. */
set_face_meta(idx: int, meta: any): void;

/** Sets the material to be used by newly-constructed [Mesh]. */
set_material(material: Material): void;

/** Sets the position of the given vertex. */
set_vertex(idx: int, vertex: Vector3): void;

/** Sets the bones of the given vertex. */
set_vertex_bones(idx: int, bones: PoolIntArray): void;

/** Sets the color of the given vertex. */
set_vertex_color(idx: int, color: Color): void;

/** Sets the metadata associated with the given vertex. */
set_vertex_meta(idx: int, meta: any): void;

/** Sets the normal of the given vertex. */
set_vertex_normal(idx: int, normal: Vector3): void;

/** Sets the tangent of the given vertex. */
set_vertex_tangent(idx: int, tangent: Plane): void;

/** Sets the UV of the given vertex. */
set_vertex_uv(idx: int, uv: Vector2): void;

/** Sets the UV2 of the given vertex. */
set_vertex_uv2(idx: int, uv2: Vector2): void;

/** Sets the bone weights of the given vertex. */
set_vertex_weights(idx: int, weights: PoolRealArray): void;

  connect<T extends SignalsOf<MeshDataTool>>(signal: T, method: SignalFunction<MeshDataTool[T]>): number;






}

