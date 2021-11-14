
/**
 * ProceduralSky provides a way to create an effective background quickly by defining procedural parameters for the sun, the sky and the ground. The sky and ground are very similar, they are defined by a color at the horizon, another color, and finally an easing curve to interpolate between these two colors. Similarly, the sun is described by a position in the sky, a color, and an easing curve. However, the sun also defines a minimum and maximum angle, these two values define at what distance the easing curve begins and ends from the sun, and thus end up defining the size of the sun in the sky.
 *
 * The ProceduralSky is updated on the CPU after the parameters change. It is stored in a texture and then displayed as a background in the scene. This makes it relatively unsuitable for real-time updates during gameplay. However, with a small enough texture size, it can still be updated relatively frequently, as it is updated on a background thread when multi-threading is available.
 *
*/
declare class ProceduralSky extends Sky  {

  
/**
 * ProceduralSky provides a way to create an effective background quickly by defining procedural parameters for the sun, the sky and the ground. The sky and ground are very similar, they are defined by a color at the horizon, another color, and finally an easing curve to interpolate between these two colors. Similarly, the sun is described by a position in the sky, a color, and an easing curve. However, the sun also defines a minimum and maximum angle, these two values define at what distance the easing curve begins and ends from the sun, and thus end up defining the size of the sun in the sky.
 *
 * The ProceduralSky is updated on the CPU after the parameters change. It is stored in a texture and then displayed as a background in the scene. This makes it relatively unsuitable for real-time updates during gameplay. However, with a small enough texture size, it can still be updated relatively frequently, as it is updated on a background thread when multi-threading is available.
 *
*/
  new(): ProceduralSky; 
  static "new"(): ProceduralSky 


/** Color of the ground at the bottom. */
ground_bottom_color: Color;

/** How quickly the [member ground_horizon_color] fades into the [member ground_bottom_color]. */
ground_curve: float;

/** Amount of energy contribution from the ground. */
ground_energy: float;

/** Color of the ground at the horizon. */
ground_horizon_color: Color;

/** How quickly the [member sky_horizon_color] fades into the [member sky_top_color]. */
sky_curve: float;

/** Amount of energy contribution from the sky. */
sky_energy: float;

/** Color of the sky at the horizon. */
sky_horizon_color: Color;

/** Color of the sky at the top. */
sky_top_color: Color;

/** Distance from center of sun where it fades out completely. */
sun_angle_max: float;

/** Distance from sun where it goes from solid to starting to fade. */
sun_angle_min: float;

/** The sun's color. */
sun_color: Color;

/** How quickly the sun fades away between [member sun_angle_min] and [member sun_angle_max]. */
sun_curve: float;

/** Amount of energy contribution from the sun. */
sun_energy: float;

/** The sun's height using polar coordinates. */
sun_latitude: float;

/** The direction of the sun using polar coordinates. */
sun_longitude: float;

/** Size of [Texture] that the ProceduralSky will generate. The size is set using [enum TextureSize]. */
texture_size: int;



  connect<T extends SignalsOf<ProceduralSky>>(signal: T, method: SignalFunction<ProceduralSky[T]>): number;



/**
 * Sky texture will be 256x128.
 *
*/
static TEXTURE_SIZE_256: any;

/**
 * Sky texture will be 512x256.
 *
*/
static TEXTURE_SIZE_512: any;

/**
 * Sky texture will be 1024x512. This is the default size.
 *
*/
static TEXTURE_SIZE_1024: any;

/**
 * Sky texture will be 2048x1024.
 *
*/
static TEXTURE_SIZE_2048: any;

/**
 * Sky texture will be 4096x2048.
 *
*/
static TEXTURE_SIZE_4096: any;

/**
 * Represents the size of the [enum TextureSize] enum.
 *
*/
static TEXTURE_SIZE_MAX: any;



}

