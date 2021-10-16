
/**
 * Baked lightmaps are an alternative workflow for adding indirect (or baked) lighting to a scene. Unlike the [GIProbe] approach, baked lightmaps work fine on low-end PCs and mobile devices as they consume almost no resources in run-time.
 *
 * **Note:** Due to how lightmaps work, most properties only have a visible effect once lightmaps are baked again.
 *
*/
declare class BakedLightmap extends VisualInstance {

  
/**
 * Baked lightmaps are an alternative workflow for adding indirect (or baked) lighting to a scene. Unlike the [GIProbe] approach, baked lightmaps work fine on low-end PCs and mobile devices as they consume almost no resources in run-time.
 *
 * **Note:** Due to how lightmaps work, most properties only have a visible effect once lightmaps are baked again.
 *
*/
  "new"(): BakedLightmap;
  static "new"(): BakedLightmap;



/** When enabled, the lightmapper will merge the textures for all meshes into a single large layered texture. Not supported in GLES2. */
atlas_generate: boolean;

/** Maximum size of each lightmap layer, only used when [member atlas_generate] is enabled. */
atlas_max_size: int;

/** Raycasting bias used during baking to avoid floating point precision issues. */
bias: float;

/**
 * The energy multiplier for each bounce. Higher values will make indirect lighting brighter. A value of `1.0` represents physically accurate behavior, but higher values can be used to make indirect lighting propagate more visibly when using a low number of bounces. This can be used to speed up bake times by lowering the number of [member bounces] then increasing [member bounce_indirect_energy]. Unlike [member BakedLightmapData.energy], this property does not affect direct lighting emitted by light nodes, emissive materials and the environment.
 *
 * **Note:** [member bounce_indirect_energy] only has an effect if [member bounces] is set to a value greater than or equal to `1`.
 *
*/
bounce_indirect_energy: float;

/** Number of light bounces that are taken into account during baking. See also [member bounce_indirect_energy]. */
bounces: int;

/** Grid size used for real-time capture information on dynamic objects. */
capture_cell_size: float;

/** When enabled, an octree containing the scene's lighting information will be computed. This octree will then be used to light dynamic objects in the scene. */
capture_enabled: boolean;

/** Bias value to reduce the amount of light proagation in the captured octree. */
capture_propagation: float;

/** Bake quality of the capture data. */
capture_quality: int;

/** If a baked mesh doesn't have a UV2 size hint, this value will be used to roughly compute a suitable lightmap size. */
default_texels_per_unit: float;

/** The environment color when [member environment_mode] is set to [constant ENVIRONMENT_MODE_CUSTOM_COLOR]. */
environment_custom_color: Color;

/** The energy scaling factor when when [member environment_mode] is set to [constant ENVIRONMENT_MODE_CUSTOM_COLOR] or [constant ENVIRONMENT_MODE_CUSTOM_SKY]. */
environment_custom_energy: float;

/** The [Sky] resource to use when [member environment_mode] is set o [constant ENVIRONMENT_MODE_CUSTOM_SKY]. */
environment_custom_sky: Sky;

/** The rotation of the baked custom sky. */
environment_custom_sky_rotation_degrees: Vector3;

/** Minimum ambient light for all the lightmap texels. This doesn't take into account any occlusion from the scene's geometry, it simply ensures a minimum amount of light on all the lightmap texels. Can be used for artistic control on shadow color. */
environment_min_light: Color;

/** Decides which environment to use during baking. */
environment_mode: int;

/** Size of the baked lightmap. Only meshes inside this region will be included in the baked lightmap, also used as the bounds of the captured region for dynamic lighting. */
extents: Vector3;

/** Deprecated, in previous versions it determined the location where lightmaps were be saved. */
image_path: string;

/** The calculated light data. */
light_data: BakedLightmapData;

/** Determines the amount of samples per texel used in indrect light baking. The amount of samples for each quality level can be configured in the project settings. */
quality: int;

/** Store full color values in the lightmap textures. When disabled, lightmap textures will store a single brightness channel. Can be disabled to reduce disk usage if the scene contains only white lights or you don't mind losing color information in indirect lighting. */
use_color: boolean;

/** When enabled, a lightmap denoiser will be used to reduce the noise inherent to Monte Carlo based global illumination. */
use_denoiser: boolean;

/**
 * If `true`, stores the lightmap textures in a high dynamic range format (EXR). If `false`, stores the lightmap texture in a low dynamic range PNG image. This can be set to `false` to reduce disk usage, but light values over 1.0 will be clamped and you may see banding caused by the reduced precision.
 *
 * **Note:** Setting [member use_hdr] to `true` will decrease lightmap banding even when using the GLES2 backend or if [member ProjectSettings.rendering/quality/depth/hdr] is `false`.
 *
*/
use_hdr: boolean;

/** Bakes the lightmap, scanning from the given [code]from_node[/code] root and saves the resulting [BakedLightmapData] in [code]data_save_path[/code]. If no save path is provided it will try to match the path from the current [member light_data]. */
bake(from_node?: Node, data_save_path?: string): int;

  // connect<T extends SignalsOf<BakedLightmap>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<BakedLightmapSignals>>(signal: T, method: SignalFunction<BakedLightmapSignals[T]>): number;



/**
 * The lowest bake quality mode. Fastest to calculate.
 *
*/
static BAKE_QUALITY_LOW: any;

/**
 * The default bake quality mode.
 *
*/
static BAKE_QUALITY_MEDIUM: any;

/**
 * A higher bake quality mode. Takes longer to calculate.
 *
*/
static BAKE_QUALITY_HIGH: any;

/**
 * The highest bake quality mode. Takes the longest to calculate.
 *
*/
static BAKE_QUALITY_ULTRA: any;

/**
 * Baking was successful.
 *
*/
static BAKE_ERROR_OK: any;

/**
 * Returns if no viable save path is found. This can happen where an [member image_path] is not specified or when the save location is invalid.
 *
*/
static BAKE_ERROR_NO_SAVE_PATH: any;

/**
 * Currently unused.
 *
*/
static BAKE_ERROR_NO_MESHES: any;

/**
 * Returns when the baker cannot save per-mesh textures to file.
 *
*/
static BAKE_ERROR_CANT_CREATE_IMAGE: any;

/**
 * The size of the generated lightmaps is too large.
 *
*/
static BAKE_ERROR_LIGHTMAP_SIZE: any;

/**
 * Some mesh contains UV2 values outside the `[0,1]` range.
 *
*/
static BAKE_ERROR_INVALID_MESH: any;

/**
 * Returns if user cancels baking.
 *
*/
static BAKE_ERROR_USER_ABORTED: any;

/** No documentation provided. */
static BAKE_ERROR_NO_LIGHTMAPPER: any;

/**
 * No environment is used during baking.
 *
*/
static ENVIRONMENT_MODE_DISABLED: any;

/**
 * The baked environment is automatically picked from the current scene.
 *
*/
static ENVIRONMENT_MODE_SCENE: any;

/**
 * A custom sky is used as environment during baking.
 *
*/
static ENVIRONMENT_MODE_CUSTOM_SKY: any;

/**
 * A custom solid color is used as environment during baking.
 *
*/
static ENVIRONMENT_MODE_CUSTOM_COLOR: any;

}

declare class BakedLightmapSignals extends VisualInstanceSignals {
  
}
