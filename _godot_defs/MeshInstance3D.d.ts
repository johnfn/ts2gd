
/**
 * MeshInstance3D is a node that takes a [Mesh] resource and adds it to the current scenario by creating an instance of it. This is the class most often used render 3D geometry and can be used to instance a single [Mesh] in many places. This allows reuse of geometry which can save on resources. When a [Mesh] has to be instanced more than thousands of times at close proximity, consider using a [MultiMesh] in a [MultiMeshInstance3D] instead.
 *
*/
declare class MeshInstance3D extends GeometryInstance3D {

  
/**
 * MeshInstance3D is a node that takes a [Mesh] resource and adds it to the current scenario by creating an instance of it. This is the class most often used render 3D geometry and can be used to instance a single [Mesh] in many places. This allows reuse of geometry which can save on resources. When a [Mesh] has to be instanced more than thousands of times at close proximity, consider using a [MultiMesh] in a [MultiMeshInstance3D] instead.
 *
*/
  "new"(): this;
  static "new"(): this;



/** The [Mesh] resource for the instance. */
mesh: Mesh;

/** [NodePath] to the [Skeleton3D] associated with the instance. */
skeleton: NodePathType;

/** Sets the skin to be used by this instance. */
skin: Skin;

/** This helper creates a [StaticBody3D] child node with a [ConvexPolygonShape3D] collision shape calculated from the mesh geometry. It's mainly used for testing. */
create_convex_collision(): void;

/** This helper creates a [MeshInstance3D] child node with gizmos at every vertex calculated from the mesh geometry. It's mainly used for testing. */
create_debug_tangents(): void;

/** This helper creates a [StaticBody3D] child node with a [ConcavePolygonShape3D] collision shape calculated from the mesh geometry. It's mainly used for testing. */
create_trimesh_collision(): void;

/** Returns the [Material] that will be used by the [Mesh] when drawing. This can return the [member GeometryInstance3D.material_override], the surface override [Material] defined in this [MeshInstance3D], or the surface [Material] defined in the [Mesh]. For example, if [member GeometryInstance3D.material_override] is used, all surfaces will return the override material. */
get_active_material(surface: int): Material;

/** Returns the override [Material] for the specified surface of the [Mesh] resource. */
get_surface_material(surface: int): Material;

/** Returns the number of surface materials. */
get_surface_material_count(): int;

/** Sets the override [Material] for the specified surface of the [Mesh] resource. This material is associated with this [MeshInstance3D] rather than with the [Mesh] resource. */
set_surface_material(surface: int, material: Material): void;

  connect<T extends SignalsOf<MeshInstance3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
