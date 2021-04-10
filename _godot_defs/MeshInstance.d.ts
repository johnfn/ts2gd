
/**
 * MeshInstance is a node that takes a [Mesh] resource and adds it to the current scenario by creating an instance of it. This is the class most often used to get 3D geometry rendered and can be used to instance a single [Mesh] in many places. This allows to reuse geometry and save on resources. When a [Mesh] has to be instanced more than thousands of times at close proximity, consider using a [MultiMesh] in a [MultiMeshInstance] instead.
 *
*/
declare class MeshInstance extends GeometryInstance {

  
/**
 * MeshInstance is a node that takes a [Mesh] resource and adds it to the current scenario by creating an instance of it. This is the class most often used to get 3D geometry rendered and can be used to instance a single [Mesh] in many places. This allows to reuse geometry and save on resources. When a [Mesh] has to be instanced more than thousands of times at close proximity, consider using a [MultiMesh] in a [MultiMeshInstance] instead.
 *
*/
  "new"(): MeshInstance;
  static "new"(): MeshInstance;



/** The [Mesh] resource for the instance. */
mesh: Mesh;

/** [NodePath] to the [Skeleton] associated with the instance. */
skeleton: NodePathType;

/** Sets the skin to be used by this instance. */
skin: Skin;

/** This helper creates a [StaticBody] child node with a [ConvexPolygonShape] collision shape calculated from the mesh geometry. It's mainly used for testing. */
create_convex_collision(): void;

/** This helper creates a [MeshInstance] child node with gizmos at every vertex calculated from the mesh geometry. It's mainly used for testing. */
create_debug_tangents(): void;

/** This helper creates a [StaticBody] child node with a [ConcavePolygonShape] collision shape calculated from the mesh geometry. It's mainly used for testing. */
create_trimesh_collision(): void;

/** Returns the [Material] for a surface of the [Mesh] resource. */
get_surface_material(surface: int): Material;

/** Returns the number of surface materials. */
get_surface_material_count(): int;

/** Sets the [Material] for a surface of the [Mesh] resource. */
set_surface_material(surface: int, material: Material): void;

  connect<T extends SignalsOf<MeshInstance>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
