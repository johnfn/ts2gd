
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
 * **Note:** Some hardware will have trouble with higher radiance sizes, especially [constant RADIANCE_SIZE_512] and above. Only use such high values on high-end hardware.
 *
*/
radiance_size: int;



  connect<T extends SignalsOf<Sky>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Radiance texture size is 32×32 pixels.
 *
*/
static RADIANCE_SIZE_32: 0;

/**
 * Radiance texture size is 64×64 pixels.
 *
*/
static RADIANCE_SIZE_64: 1;

/**
 * Radiance texture size is 128×128 pixels.
 *
*/
static RADIANCE_SIZE_128: 2;

/**
 * Radiance texture size is 256×256 pixels.
 *
*/
static RADIANCE_SIZE_256: 3;

/**
 * Radiance texture size is 512×512 pixels.
 *
*/
static RADIANCE_SIZE_512: 4;

/**
 * Radiance texture size is 1024×1024 pixels.
 *
*/
static RADIANCE_SIZE_1024: 5;

/**
 * Radiance texture size is 2048×2048 pixels.
 *
*/
static RADIANCE_SIZE_2048: 6;

/**
 * Represents the size of the [enum RadianceSize] enum.
 *
*/
static RADIANCE_SIZE_MAX: 7;


  
}
