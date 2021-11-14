
/**
 * Translated to `texture(cubemap, vec3)` in the shader language. Returns a color vector and alpha channel as scalar.
 *
*/
declare class VisualShaderNodeCubeMap extends VisualShaderNode  {

  
/**
 * Translated to `texture(cubemap, vec3)` in the shader language. Returns a color vector and alpha channel as scalar.
 *
*/
  new(): VisualShaderNodeCubeMap; 
  static "new"(): VisualShaderNodeCubeMap 


/** The [CubeMap] texture to sample when using [constant SOURCE_TEXTURE] as [member source]. */
cube_map: CubeMap;

/** Defines which source should be used for the sampling. See [enum Source] for options. */
source: int;

/** Defines the type of data provided by the source texture. See [enum TextureType] for options. */
texture_type: int;



  connect<T extends SignalsOf<VisualShaderNodeCubeMap>>(signal: T, method: SignalFunction<VisualShaderNodeCubeMap[T]>): number;



/**
 * Use the [CubeMap] set via [member cube_map]. If this is set to [member source], the `samplerCube` port is ignored.
 *
*/
static SOURCE_TEXTURE: any;

/**
 * Use the [CubeMap] sampler reference passed via the `samplerCube` port. If this is set to [member source], the [member cube_map] texture is ignored.
 *
*/
static SOURCE_PORT: any;

/**
 * No hints are added to the uniform declaration.
 *
*/
static TYPE_DATA: any;

/**
 * Adds `hint_albedo` as hint to the uniform declaration for proper sRGB to linear conversion.
 *
*/
static TYPE_COLOR: any;

/**
 * Adds `hint_normal` as hint to the uniform declaration, which internally converts the texture for proper usage as normal map.
 *
*/
static TYPE_NORMALMAP: any;



}

