
/**
 * Draws simple geometry from code. Uses a drawing mode similar to OpenGL 1.x.
 *
 * See also [ArrayMesh], [MeshDataTool] and [SurfaceTool] for procedural geometry generation.
 *
 * **Note:** ImmediateGeometry3D is best suited to small amounts of mesh data that change every frame. It will be slow when handling large amounts of mesh data. If mesh data doesn't change often, use [ArrayMesh], [MeshDataTool] or [SurfaceTool] instead.
 *
 * **Note:** Godot uses clockwise [url=https://learnopengl.com/Advanced-OpenGL/Face-culling]winding order[/url] for front faces of triangle primitive modes.
 *
 * **Note:** In case of missing points when handling large amounts of mesh data, try increasing its buffer size limit under [member ProjectSettings.rendering/limits/buffers/immediate_buffer_size_kb].
 *
*/
declare class ImmediateGeometry extends GeometryInstance  {

  
/**
 * Draws simple geometry from code. Uses a drawing mode similar to OpenGL 1.x.
 *
 * See also [ArrayMesh], [MeshDataTool] and [SurfaceTool] for procedural geometry generation.
 *
 * **Note:** ImmediateGeometry3D is best suited to small amounts of mesh data that change every frame. It will be slow when handling large amounts of mesh data. If mesh data doesn't change often, use [ArrayMesh], [MeshDataTool] or [SurfaceTool] instead.
 *
 * **Note:** Godot uses clockwise [url=https://learnopengl.com/Advanced-OpenGL/Face-culling]winding order[/url] for front faces of triangle primitive modes.
 *
 * **Note:** In case of missing points when handling large amounts of mesh data, try increasing its buffer size limit under [member ProjectSettings.rendering/limits/buffers/immediate_buffer_size_kb].
 *
*/
  new(): ImmediateGeometry; 
  static "new"(): ImmediateGeometry 



/** Simple helper to draw an UV sphere with given latitude, longitude and radius. */
add_sphere(lats: int, lons: int, radius: float, add_uv?: boolean): void;

/** Adds a vertex in local coordinate space with the currently set color/uv/etc. */
add_vertex(position: Vector3): void;

/**
 * Begin drawing (and optionally pass a texture override). When done call [method end]. For more information on how this works, search for `glBegin()` and `glEnd()` references.
 *
 * For the type of primitive, see the [enum Mesh.PrimitiveType] enum.
 *
*/
begin(primitive: int, texture?: Texture): void;

/** Clears everything that was drawn using begin/end. */
clear(): void;

/** Ends a drawing context and displays the results. */
end(): void;

/** The current drawing color. */
set_color(color: Color): void;

/** The next vertex's normal. */
set_normal(normal: Vector3): void;

/** The next vertex's tangent (and binormal facing). */
set_tangent(tangent: Plane): void;

/** The next vertex's UV. */
set_uv(uv: Vector2): void;

/** The next vertex's second layer UV. */
set_uv2(uv: Vector2): void;

  connect<T extends SignalsOf<ImmediateGeometry>>(signal: T, method: SignalFunction<ImmediateGeometry[T]>): number;






}

