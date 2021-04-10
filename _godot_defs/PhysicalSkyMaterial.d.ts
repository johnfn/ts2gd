
/**
 * The [PhysicalSkyMaterial] uses the Preetham analytic daylight model to draw a sky based on physical properties. This results in a substantially more realistic sky than the [ProceduralSkyMaterial], but it is slightly slower and less flexible.
 *
 * The [PhysicalSkyMaterial] only supports one sun. The color, energy, and direction of the sun are taken from the first [DirectionalLight3D] in the scene tree.
 *
 * As it is based on a daylight model, the sky fades to black as the sunset ends. If you want a full day/night cycle, you will have to add a night sky by converting this to a [ShaderMaterial] and adding a night sky directly into the resulting shader.
 *
*/
declare class PhysicalSkyMaterial extends Material {

  
/**
 * The [PhysicalSkyMaterial] uses the Preetham analytic daylight model to draw a sky based on physical properties. This results in a substantially more realistic sky than the [ProceduralSkyMaterial], but it is slightly slower and less flexible.
 *
 * The [PhysicalSkyMaterial] only supports one sun. The color, energy, and direction of the sun are taken from the first [DirectionalLight3D] in the scene tree.
 *
 * As it is based on a daylight model, the sky fades to black as the sunset ends. If you want a full day/night cycle, you will have to add a night sky by converting this to a [ShaderMaterial] and adding a night sky directly into the resulting shader.
 *
*/
  "new"(): this;
  static "new"(): this;



/** Sets the amount of dithering to use. Dithering helps reduce banding that appears from the smooth changes in color in the sky. Use the lowest value possible, higher amounts may add fuzziness to the sky. */
dither_strength: float;

/** Sets the exposure of the sky. Higher exposure values make the entire sky brighter. */
exposure: float;

/** Modulates the [Color] on the bottom half of the sky to represent the ground. */
ground_color: Color;

/** Controls the strength of mie scattering for the sky. Mie scattering results from light colliding with larger particles (like water). On earth, mie scattering results in a whiteish color around the sun and horizon. */
mie_coefficient: float;

/** Controls the [Color] of the mie scattering effect. While not physically accurate, this allows for the creation of alien looking planets. */
mie_color: Color;

/** Controls the direction of the mie scattering. A value of [code]1[/code] means that when light hits a particle it passing through straight forward. A value of [code]-1[/code] means that all light is scatter backwards. */
mie_eccentricity: float;

/** [Texture2D] for the night sky. This is added to the sky, so if it is bright enough, it may be visible during the day. */
night_sky: Texture2D;

/** Controls the strength of the rayleigh scattering. Rayleigh scattering results from light colliding with small particles. It is responsible for the blue color of the sky. */
rayleigh_coefficient: float;

/** Controls the [Color] of the rayleigh scattering. While not physically accurate, this allows for the creation of alien looking planets. For example, setting this to a red [Color] results in a mars looking atmosphere with a corresponding blue sunset. */
rayleigh_color: Color;

/** Sets the size of the sun disk. Default value is based on Sol's perceived size from Earth. */
sun_disk_scale: float;

/** Sets the thickness of the atmosphere. High turbidity creates a foggy looking atmosphere, while a low turbidity results in a clearer atmosphere. */
turbidity: float;



  connect<T extends SignalsOf<PhysicalSkyMaterial>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
