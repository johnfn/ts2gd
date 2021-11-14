
/**
 * A Spotlight is a type of [Light] node that emits lights in a specific direction, in the shape of a cone. The light is attenuated through the distance. This attenuation can be configured by changing the energy, radius and attenuation parameters of [Light].
 *
 * **Note:** By default, only 32 SpotLights may affect a single mesh **resource** at once. Consider splitting your level into several meshes to decrease the likelihood that more than 32 lights will affect the same mesh resource. Splitting the level mesh will also improve frustum culling effectiveness, leading to greater performance. If you need to use more lights per mesh, you can increase [member ProjectSettings.rendering/limits/rendering/max_lights_per_object] at the cost of shader compilation times.
 *
*/
declare class SpotLight extends Light  {

  
/**
 * A Spotlight is a type of [Light] node that emits lights in a specific direction, in the shape of a cone. The light is attenuated through the distance. This attenuation can be configured by changing the energy, radius and attenuation parameters of [Light].
 *
 * **Note:** By default, only 32 SpotLights may affect a single mesh **resource** at once. Consider splitting your level into several meshes to decrease the likelihood that more than 32 lights will affect the same mesh resource. Splitting the level mesh will also improve frustum culling effectiveness, leading to greater performance. If you need to use more lights per mesh, you can increase [member ProjectSettings.rendering/limits/rendering/max_lights_per_object] at the cost of shader compilation times.
 *
*/
  new(): SpotLight; 
  static "new"(): SpotLight 


/** The spotlight's angle in degrees. */
spot_angle: float;

/** The spotlight's angular attenuation curve. */
spot_angle_attenuation: float;

/** The spotlight's light energy attenuation curve. */
spot_attenuation: float;

/** The maximal range that can be reached by the spotlight. Note that the effectively lit area may appear to be smaller depending on the [member spot_attenuation] in use. No matter the [member spot_attenuation] in use, the light will never reach anything outside this range. */
spot_range: float;



  connect<T extends SignalsOf<SpotLight>>(signal: T, method: SignalFunction<SpotLight[T]>): number;






}

