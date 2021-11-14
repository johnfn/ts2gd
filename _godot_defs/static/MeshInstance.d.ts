
/**
 * MeshInstance is a node that takes a [Mesh] resource and adds it to the current scenario by creating an instance of it. This is the class most often used to get 3D geometry rendered and can be used to instance a single [Mesh] in many places. This allows to reuse geometry and save on resources. When a [Mesh] has to be instanced more than thousands of times at close proximity, consider using a [MultiMesh] in a [MultiMeshInstance] instead.
 *
*/
declare class MeshInstance extends GeometryInstance  {

  
/**
 * MeshInstance is a node that takes a [Mesh] resource and adds it to the current scenario by creating an instance of it. This is the class most often used to get 3D geometry rendered and can be used to instance a single [Mesh] in many places. This allows to reuse geometry and save on resources. When a [Mesh] has to be instanced more than thousands of times at close proximity, consider using a [MultiMesh] in a [MultiMeshInstance] instead.
 *
*/
  new(): MeshInstance; 
  static "new"(): MeshInstance 


/** The [Mesh] resource for the instance. */
mesh: Mesh;

/** [NodePath] to the [Skeleton] associated with the instance. */
skeleton: NodePathType;

/** Sets the skin to be used by this instance. */
skin: Skin;

/**
 * If `true`, normals are transformed when software skinning is used. Set to `false` when normals are not needed for better performance.
 *
 * See [member ProjectSettings.rendering/quality/skinning/software_skinning_fallback] for details about how software skinning is enabled.
 *
*/
software_skinning_transform_normals: boolean;

/**
 * This helper creates a [StaticBody] child node with a [ConvexPolygonShape] collision shape calculated from the mesh geometry. It's mainly used for testing.
 *
 * If `clean` is `true` (default), duplicate and interior vertices are removed automatically. You can set it to `false` to make the process faster if not needed.
 *
 * If `simplify` is `true`, the geometry can be further simplified to reduce the amount of vertices. Disabled by default.
 *
*/
create_convex_collision(clean?: boolean, simplify?: boolean): void;

/** This helper creates a [MeshInstance] child node with gizmos at every vertex calculated from the mesh geometry. It's mainly used for testing. */
create_debug_tangents(): void;

/** This helper creates a [StaticBody] child node with multiple [ConvexPolygonShape] collision shapes calculated from the mesh geometry via convex decomposition. It's mainly used for testing. */
create_multiple_convex_collisions(): void;

/** This helper creates a [StaticBody] child node with a [ConcavePolygonShape] collision shape calculated from the mesh geometry. It's mainly used for testing. */
create_trimesh_collision(): void;

/** Returns the [Material] that will be used by the [Mesh] when drawing. This can return the [member GeometryInstance.material_override], the surface override [Material] defined in this [MeshInstance], or the surface [Material] defined in the [Mesh]. For example, if [member GeometryInstance.material_override] is used, all surfaces will return the override material. */
get_active_material(surface: int): Material;

/** Returns the [Material] for a surface of the [Mesh] resource. */
get_surface_material(surface: int): Material;

/** Returns the number of surface materials. */
get_surface_material_count(): int;

/** Sets the [Material] for a surface of the [Mesh] resource. */
set_surface_material(surface: int, material: Material): void;

  connect<T extends SignalsOf<MeshInstance>>(signal: T, method: SignalFunction<MeshInstance[T]>): number;






}

