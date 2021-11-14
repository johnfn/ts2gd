
/**
 * [GIProbe]s are used to provide high-quality real-time indirect light to scenes. They precompute the effect of objects that emit light and the effect of static geometry to simulate the behavior of complex light in real-time. [GIProbe]s need to be baked before using, however, once baked, dynamic objects will receive light from them. Further, lights can be fully dynamic or baked.
 *
 * Having [GIProbe]s in a scene can be expensive, the quality of the probe can be turned down in exchange for better performance in the [ProjectSettings] using [member ProjectSettings.rendering/quality/voxel_cone_tracing/high_quality].
 *
 * **Note:** Meshes should have sufficiently thick walls to avoid light leaks (avoid one-sided walls). For interior levels, enclose your level geometry in a sufficiently large box and bridge the loops to close the mesh.
 *
 * **Note:** Due to a renderer limitation, emissive [ShaderMaterial]s cannot emit light when used in a [GIProbe]. Only emissive [SpatialMaterial]s can emit light in a [GIProbe].
 *
*/
declare class GIProbe extends VisualInstance  {

  
/**
 * [GIProbe]s are used to provide high-quality real-time indirect light to scenes. They precompute the effect of objects that emit light and the effect of static geometry to simulate the behavior of complex light in real-time. [GIProbe]s need to be baked before using, however, once baked, dynamic objects will receive light from them. Further, lights can be fully dynamic or baked.
 *
 * Having [GIProbe]s in a scene can be expensive, the quality of the probe can be turned down in exchange for better performance in the [ProjectSettings] using [member ProjectSettings.rendering/quality/voxel_cone_tracing/high_quality].
 *
 * **Note:** Meshes should have sufficiently thick walls to avoid light leaks (avoid one-sided walls). For interior levels, enclose your level geometry in a sufficiently large box and bridge the loops to close the mesh.
 *
 * **Note:** Due to a renderer limitation, emissive [ShaderMaterial]s cannot emit light when used in a [GIProbe]. Only emissive [SpatialMaterial]s can emit light in a [GIProbe].
 *
*/
  new(): GIProbe; 
  static "new"(): GIProbe 


/**
 * Offsets the lookup of the light contribution from the [GIProbe]. This can be used to avoid self-shadowing, but may introduce light leaking at higher values. This and [member normal_bias] should be played around with to minimize self-shadowing and light leaking.
 *
 * **Note:** `bias` should usually be above 1.0 as that is the size of the voxels.
 *
*/
bias: float;

/** [i]Deprecated.[/i] This property has been deprecated due to known bugs and no longer has any effect when enabled. */
compress: boolean;

/** The [GIProbeData] resource that holds the data for this [GIProbe]. */
data: GIProbeData;

/** The maximum brightness that the [GIProbe] will recognize. Brightness will be scaled within this range. */
dynamic_range: int;

/** Energy multiplier. Makes the lighting contribution from the [GIProbe] brighter. */
energy: float;

/** The size of the area covered by the [GIProbe]. If you make the extents larger without increasing the subdivisions with [member subdiv], the size of each cell will increase and result in lower detailed lighting. */
extents: Vector3;

/** If [code]true[/code], ignores the sky contribution when calculating lighting. */
interior: boolean;

/** Offsets the lookup into the [GIProbe] based on the object's normal direction. Can be used to reduce some self-shadowing artifacts. */
normal_bias: float;

/** How much light propagates through the probe internally. A higher value allows light to spread further. */
propagation: float;

/** Number of times to subdivide the grid that the [GIProbe] operates on. A higher number results in finer detail and thus higher visual quality, while lower numbers result in better performance. */
subdiv: int;

/** Bakes the effect from all [GeometryInstance]s marked with [member GeometryInstance.use_in_baked_light] and [Light]s marked with either [constant Light.BAKE_INDIRECT] or [constant Light.BAKE_ALL]. If [code]create_visual_debug[/code] is [code]true[/code], after baking the light, this will generate a [MultiMesh] that has a cube representing each solid cell with each cube colored to the cell's albedo color. This can be used to visualize the [GIProbe]'s data and debug any issues that may be occurring. */
bake(from_node?: Node, create_visual_debug?: boolean): void;

/** Calls [method bake] with [code]create_visual_debug[/code] enabled. */
debug_bake(): void;

  connect<T extends SignalsOf<GIProbe>>(signal: T, method: SignalFunction<GIProbe[T]>): number;



/**
 * Use 64 subdivisions. This is the lowest quality setting, but the fastest. Use it if you can, but especially use it on lower-end hardware.
 *
*/
static SUBDIV_64: any;

/**
 * Use 128 subdivisions. This is the default quality setting.
 *
*/
static SUBDIV_128: any;

/**
 * Use 256 subdivisions.
 *
*/
static SUBDIV_256: any;

/**
 * Use 512 subdivisions. This is the highest quality setting, but the slowest. On lower-end hardware this could cause the GPU to stall.
 *
*/
static SUBDIV_512: any;

/**
 * Represents the size of the [enum Subdiv] enum.
 *
*/
static SUBDIV_MAX: any;



}

