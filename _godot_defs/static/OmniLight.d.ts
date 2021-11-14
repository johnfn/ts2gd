
/**
 * An Omnidirectional light is a type of [Light] that emits light in all directions. The light is attenuated by distance and this attenuation can be configured by changing its energy, radius, and attenuation parameters.
 *
 * **Note:** By default, only 32 OmniLights may affect a single mesh **resource** at once. Consider splitting your level into several meshes to decrease the likelihood that more than 32 lights will affect the same mesh resource. Splitting the level mesh will also improve frustum culling effectiveness, leading to greater performance. If you need to use more lights per mesh, you can increase [member ProjectSettings.rendering/limits/rendering/max_lights_per_object] at the cost of shader compilation times.
 *
*/
declare class OmniLight extends Light  {

  
/**
 * An Omnidirectional light is a type of [Light] that emits light in all directions. The light is attenuated by distance and this attenuation can be configured by changing its energy, radius, and attenuation parameters.
 *
 * **Note:** By default, only 32 OmniLights may affect a single mesh **resource** at once. Consider splitting your level into several meshes to decrease the likelihood that more than 32 lights will affect the same mesh resource. Splitting the level mesh will also improve frustum culling effectiveness, leading to greater performance. If you need to use more lights per mesh, you can increase [member ProjectSettings.rendering/limits/rendering/max_lights_per_object] at the cost of shader compilation times.
 *
*/
  new(): OmniLight; 
  static "new"(): OmniLight 


/** The light's attenuation (drop-off) curve. A number of presets are available in the [b]Inspector[/b] by right-clicking the curve. */
omni_attenuation: float;

/** The light's radius. Note that the effectively lit area may appear to be smaller depending on the [member omni_attenuation] in use. No matter the [member omni_attenuation] in use, the light will never reach anything outside this radius. */
omni_range: float;

/** See [enum ShadowDetail]. */
omni_shadow_detail: int;

/** See [enum ShadowMode]. */
omni_shadow_mode: int;



  connect<T extends SignalsOf<OmniLight>>(signal: T, method: SignalFunction<OmniLight[T]>): number;



/**
 * Shadows are rendered to a dual-paraboloid texture. Faster than [constant SHADOW_CUBE], but lower-quality.
 *
*/
static SHADOW_DUAL_PARABOLOID: any;

/**
 * Shadows are rendered to a cubemap. Slower than [constant SHADOW_DUAL_PARABOLOID], but higher-quality.
 *
*/
static SHADOW_CUBE: any;

/**
 * Use more detail vertically when computing the shadow.
 *
*/
static SHADOW_DETAIL_VERTICAL: any;

/**
 * Use more detail horizontally when computing the shadow.
 *
*/
static SHADOW_DETAIL_HORIZONTAL: any;



}

