
/**
 * An Omnidirectional light is a type of [Light3D] that emits light in all directions. The light is attenuated by distance and this attenuation can be configured by changing its energy, radius, and attenuation parameters.
 *
*/
declare class OmniLight3D extends Light3D {

  
/**
 * An Omnidirectional light is a type of [Light3D] that emits light in all directions. The light is attenuated by distance and this attenuation can be configured by changing its energy, radius, and attenuation parameters.
 *
*/
  "new"(): this;
  static "new"(): this;



/** The light's attenuation (drop-off) curve. A number of presets are available in the [b]Inspector[/b] by right-clicking the curve. */
omni_attenuation: float;

/** The light's radius. Note that the effectively lit area may appear to be smaller depending on the [member omni_attenuation] in use. No matter the [member omni_attenuation] in use, the light will never reach anything outside this radius. */
omni_range: float;

/** See [enum ShadowMode]. */
omni_shadow_mode: int;



  connect<T extends SignalsOf<OmniLight3D>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Shadows are rendered to a dual-paraboloid texture. Faster than [constant SHADOW_CUBE], but lower-quality.
 *
*/
static SHADOW_DUAL_PARABOLOID: 0;

/**
 * Shadows are rendered to a cubemap. Slower than [constant SHADOW_DUAL_PARABOLOID], but higher-quality.
 *
*/
static SHADOW_CUBE: 1;


  
}


 
