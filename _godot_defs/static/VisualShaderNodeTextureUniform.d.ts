
/**
 * Performs a lookup operation on the texture provided as a uniform for the shader.
 *
*/
declare class VisualShaderNodeTextureUniform extends VisualShaderNodeUniform  {

  
/**
 * Performs a lookup operation on the texture provided as a uniform for the shader.
 *
*/
  new(): VisualShaderNodeTextureUniform; 
  static "new"(): VisualShaderNodeTextureUniform 


/** Sets the default color if no texture is assigned to the uniform. */
color_default: int;

/** Defines the type of data provided by the source texture. See [enum TextureType] for options. */
texture_type: int;



  connect<T extends SignalsOf<VisualShaderNodeTextureUniform>>(signal: T, method: SignalFunction<VisualShaderNodeTextureUniform[T]>): number;



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

/**
 * Adds `hint_aniso` as hint to the uniform declaration to use for a flowmap.
 *
*/
static TYPE_ANISO: any;

/**
 * Defaults to white color.
 *
*/
static COLOR_DEFAULT_WHITE: any;

/**
 * Defaults to black color.
 *
*/
static COLOR_DEFAULT_BLACK: any;



}

