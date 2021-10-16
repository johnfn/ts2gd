
/**
 * The base class for [PanoramaSky] and [ProceduralSky].
 *
*/
declare class Sky extends Resource {

  
/**
 * The base class for [PanoramaSky] and [ProceduralSky].
 *
*/
  "new"(): Sky;
  static "new"(): Sky;



/**
 * The [Sky]'s radiance map size. The higher the radiance map size, the more detailed the lighting from the [Sky] will be.
 *
 * See [enum RadianceSize] constants for values.
 *
 * **Note:** You will only benefit from high radiance sizes if you have perfectly sharp reflective surfaces in your project and are not using [ReflectionProbe]s or [GIProbe]s. For most projects, keeping [member radiance_size] to the default value is the best compromise between visuals and performance. Be careful when using high radiance size values as these can cause crashes on low-end GPUs.
 *
*/
radiance_size: int;



  // connect<T extends SignalsOf<Sky>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<SkySignals>>(signal: T, method: SignalFunction<SkySignals[T]>): number;



/**
 * Radiance texture size is 32×32 pixels.
 *
*/
static RADIANCE_SIZE_32: any;

/**
 * Radiance texture size is 64×64 pixels.
 *
*/
static RADIANCE_SIZE_64: any;

/**
 * Radiance texture size is 128×128 pixels.
 *
*/
static RADIANCE_SIZE_128: any;

/**
 * Radiance texture size is 256×256 pixels.
 *
*/
static RADIANCE_SIZE_256: any;

/**
 * Radiance texture size is 512×512 pixels.
 *
*/
static RADIANCE_SIZE_512: any;

/**
 * Radiance texture size is 1024×1024 pixels.
 *
 * **Note:** [constant RADIANCE_SIZE_1024] is not exposed in the inspector as it is known to cause GPU hangs on certain systems.
 *
*/
static RADIANCE_SIZE_1024: any;

/**
 * Radiance texture size is 2048×2048 pixels.
 *
 * **Note:** [constant RADIANCE_SIZE_2048] is not exposed in the inspector as it is known to cause GPU hangs on certain systems.
 *
*/
static RADIANCE_SIZE_2048: any;

/**
 * Represents the size of the [enum RadianceSize] enum.
 *
*/
static RADIANCE_SIZE_MAX: any;

}

declare class SkySignals extends ResourceSignals {
  
}
