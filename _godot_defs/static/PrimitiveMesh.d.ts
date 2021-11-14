
/**
 * Base class for all primitive meshes. Handles applying a [Material] to a primitive mesh. Examples include [CapsuleMesh], [CubeMesh], [CylinderMesh], [PlaneMesh], [PrismMesh], [QuadMesh], and [SphereMesh].
 *
*/
declare class PrimitiveMesh extends Mesh  {

  
/**
 * Base class for all primitive meshes. Handles applying a [Material] to a primitive mesh. Examples include [CapsuleMesh], [CubeMesh], [CylinderMesh], [PlaneMesh], [PrismMesh], [QuadMesh], and [SphereMesh].
 *
*/
  new(): PrimitiveMesh; 
  static "new"(): PrimitiveMesh 


/** Overrides the [AABB] with one defined by user for use with frustum culling. Especially useful to avoid unexpected culling when using a shader to offset vertices. */
custom_aabb: AABB;

/**
 * If set, the order of the vertices in each triangle are reversed resulting in the backside of the mesh being drawn.
 *
 * This gives the same result as using [constant SpatialMaterial.CULL_BACK] in [member SpatialMaterial.params_cull_mode].
 *
*/
flip_faces: boolean;

/** The current [Material] of the primitive mesh. */
material: Material;

/**
 * Returns mesh arrays used to constitute surface of [Mesh]. The result can be passed to [method ArrayMesh.add_surface_from_arrays] to create a new surface. For example:
 *
 * @example 
 * 
 * var c := CylinderMesh.new()
 * var arr_mesh := ArrayMesh.new()
 * arr_mesh.add_surface_from_arrays(Mesh.PRIMITIVE_TRIANGLES, c.get_mesh_arrays())
 * @summary 
 * 
 *
*/
get_mesh_arrays(): any[];

  connect<T extends SignalsOf<PrimitiveMesh>>(signal: T, method: SignalFunction<PrimitiveMesh[T]>): number;






}

