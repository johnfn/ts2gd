
/**
 * A Spotlight is a type of [Light3D] node that emits lights in a specific direction, in the shape of a cone. The light is attenuated through the distance. This attenuation can be configured by changing the energy, radius and attenuation parameters of [Light3D].
 *
*/
declare class SpotLight3D extends Light3D {

  
/**
 * A Spotlight is a type of [Light3D] node that emits lights in a specific direction, in the shape of a cone. The light is attenuated through the distance. This attenuation can be configured by changing the energy, radius and attenuation parameters of [Light3D].
 *
*/
  "new"(): this;
  static "new"(): this;





/** The spotlight's angle in degrees. */
spot_angle: float;

/** The spotlight's angular attenuation curve. */
spot_angle_attenuation: float;

/** The spotlight's light energy attenuation curve. */
spot_attenuation: float;

/** The maximal range that can be reached by the spotlight. Note that the effectively lit area may appear to be smaller depending on the [member spot_attenuation] in use. No matter the [member spot_attenuation] in use, the light will never reach anything outside this range. */
spot_range: float;



  connect<T extends SignalsOf<SpotLight3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
