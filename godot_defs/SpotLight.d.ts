
/**
 * A Spotlight is a type of [Light] node that emits lights in a specific direction, in the shape of a cone. The light is attenuated through the distance. This attenuation can be configured by changing the energy, radius and attenuation parameters of [Light].
 *
*/
declare class SpotLight extends Light {

  
/**
 * A Spotlight is a type of [Light] node that emits lights in a specific direction, in the shape of a cone. The light is attenuated through the distance. This attenuation can be configured by changing the energy, radius and attenuation parameters of [Light].
 *
*/
  "new"(): SpotLight;
  static "new"(): SpotLight;



/** The spotlight's angle in degrees. */
spot_angle: float;

/** The spotlight's angular attenuation curve. */
spot_angle_attenuation: float;

/** The spotlight's light energy attenuation curve. */
spot_attenuation: float;

/** The maximal range that can be reached by the spotlight. Note that the effectively lit area may appear to be smaller depending on the [member spot_attenuation] in use. No matter the [member spot_attenuation] in use, the light will never reach anything outside this range. */
spot_range: float;



  connect<T extends SignalsOf<SpotLight>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
