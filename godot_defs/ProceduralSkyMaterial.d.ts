
/**
 * ProceduralSkyMaterial provides a way to create an effective background quickly by defining procedural parameters for the sun, the sky and the ground. The sky and ground are very similar, they are defined by a color at the horizon, another color, and finally an easing curve to interpolate between these two colors. Similarly, the sun is described by a position in the sky, a color, and an easing curve. However, the sun also defines a minimum and maximum angle, these two values define at what distance the easing curve begins and ends from the sun, and thus end up defining the size of the sun in the sky.
 *
 * The [ProceduralSkyMaterial] uses a lightweight shader to draw the sky and is thus suited for real time updates. When you do not need a quick sky that is not realistic, this is a good option.
 *
 * The [ProceduralSkyMaterial] supports up to 4 suns. Each sun takes its color, energy, and direction from the corresponding [DirectionalLight3D] in the scene.
 *
*/
declare class ProceduralSkyMaterial extends Material {

  
/**
 * ProceduralSkyMaterial provides a way to create an effective background quickly by defining procedural parameters for the sun, the sky and the ground. The sky and ground are very similar, they are defined by a color at the horizon, another color, and finally an easing curve to interpolate between these two colors. Similarly, the sun is described by a position in the sky, a color, and an easing curve. However, the sun also defines a minimum and maximum angle, these two values define at what distance the easing curve begins and ends from the sun, and thus end up defining the size of the sun in the sky.
 *
 * The [ProceduralSkyMaterial] uses a lightweight shader to draw the sky and is thus suited for real time updates. When you do not need a quick sky that is not realistic, this is a good option.
 *
 * The [ProceduralSkyMaterial] supports up to 4 suns. Each sun takes its color, energy, and direction from the corresponding [DirectionalLight3D] in the scene.
 *
*/
  "new"(): this;
  static "new"(): this;



/** Color of the ground at the bottom. Blends with [member ground_horizon_color]. */
ground_bottom_color: Color;

/** How quickly the [member ground_horizon_color] fades into the [member ground_bottom_color]. */
ground_curve: float;

/** Amount of energy contribution from the ground. */
ground_energy: float;

/** Color of the ground at the horizon. Blends with [member ground_bottom_color]. */
ground_horizon_color: Color;

/** How quickly the [member sky_horizon_color] fades into the [member sky_top_color]. */
sky_curve: float;

/** Amount of energy contribution from the sky. */
sky_energy: float;

/** Color of the sky at the horizon. Blends with [member sky_top_color]. */
sky_horizon_color: Color;

/** Color of the sky at the top. Blends with [member sky_horizon_color]. */
sky_top_color: Color;

/** Distance from center of sun where it fades out completely. */
sun_angle_max: float;

/** How quickly the sun fades away between the edge of the sun disk and [member sun_angle_max]. */
sun_curve: float;



  connect<T extends SignalsOf<ProceduralSkyMaterial>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
