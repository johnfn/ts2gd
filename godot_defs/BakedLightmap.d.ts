
/**
 * Baked lightmaps are an alternative workflow for adding indirect (or baked) lighting to a scene. Unlike the [GIProbe] approach, baked lightmaps work fine on low-end PCs and mobile devices as they consume almost no resources in run-time.
 *
 * **Note:** This node has many known bugs and will be [url=https://godotengine.org/article/godot-40-will-get-new-modernized-lightmapper]rewritten for Godot 4.0[/url]. See [url=https://github.com/godotengine/godot/issues/30929]GitHub issue #30929[/url].
 *
*/
declare class BakedLightmap extends VisualInstance {

  
/**
 * Baked lightmaps are an alternative workflow for adding indirect (or baked) lighting to a scene. Unlike the [GIProbe] approach, baked lightmaps work fine on low-end PCs and mobile devices as they consume almost no resources in run-time.
 *
 * **Note:** This node has many known bugs and will be [url=https://godotengine.org/article/godot-40-will-get-new-modernized-lightmapper]rewritten for Godot 4.0[/url]. See [url=https://github.com/godotengine/godot/issues/30929]GitHub issue #30929[/url].
 *
*/
  "new"(): BakedLightmap;
  static "new"(): BakedLightmap;



/** Grid subdivision size for lightmapper calculation. The default value will work for most cases. Increase for better lighting on small details or if your scene is very large. */
bake_cell_size: float;

/** If a [member Mesh.lightmap_size_hint] isn't specified, the lightmap baker will dynamically set the lightmap size using this value. This value is measured in texels per world unit. The maximum lightmap texture size is 4096x4096. */
bake_default_texels_per_unit: float;

/** Multiplies the light sources' intensity by this value. For instance, if the value is set to 2, lights will be twice as bright. If the value is set to 0.5, lights will be half as bright. */
bake_energy: float;

/** The size of the affected area. */
bake_extents: Vector3;

/** If [code]true[/code], the lightmap can capture light values greater than [code]1.0[/code]. Turning this off will result in a smaller file size. */
bake_hdr: boolean;

/** Lightmapping mode. See [enum BakeMode]. */
bake_mode: int;

/** Defines how far the light will travel before it is no longer effective. The higher the number, the farther the light will travel. For instance, if the value is set to 2, the light will go twice as far. If the value is set to 0.5, the light will only go half as far. */
bake_propagation: float;

/** Three quality modes are available. Higher quality requires more rendering time. See [enum BakeQuality]. */
bake_quality: int;

/** Grid size used for real-time capture information on dynamic objects. Cannot be larger than [member bake_cell_size]. */
capture_cell_size: float;

/** The location where lightmaps will be saved. */
image_path: string;

/** The calculated light data. */
light_data: BakedLightmapData;

/** Bakes the lightmaps within the currently edited scene. Returns a [enum BakeError] to signify if the bake was successful, or if unsuccessful, how the bake failed. */
bake(from_node?: Node, create_visual_debug?: boolean): int;

/** Executes a dry run bake of lightmaps within the currently edited scene. */
debug_bake(): void;

  connect<T extends SignalsOf<BakedLightmap>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * The lowest bake quality mode. Fastest to calculate.
 *
*/
static BAKE_QUALITY_LOW: 0;

/**
 * The default bake quality mode.
 *
*/
static BAKE_QUALITY_MEDIUM: 1;

/**
 * The highest bake quality mode. Takes longer to calculate.
 *
*/
static BAKE_QUALITY_HIGH: 2;

/**
 * Less precise but faster bake mode.
 *
*/
static BAKE_MODE_CONE_TRACE: 0;

/**
 * More precise bake mode but can take considerably longer to bake.
 *
*/
static BAKE_MODE_RAY_TRACE: 1;

/**
 * Baking was successful.
 *
*/
static BAKE_ERROR_OK: 0;

/**
 * Returns if no viable save path is found. This can happen where an [member image_path] is not specified or when the save location is invalid.
 *
*/
static BAKE_ERROR_NO_SAVE_PATH: 1;

/**
 * Currently unused.
 *
*/
static BAKE_ERROR_NO_MESHES: 2;

/**
 * Returns when the baker cannot save per-mesh textures to file.
 *
*/
static BAKE_ERROR_CANT_CREATE_IMAGE: 3;

/**
 * Returns if user cancels baking.
 *
*/
static BAKE_ERROR_USER_ABORTED: 4;


  
}
