
/**
 * Performs a lookup operation on the texture provided as a uniform for the shader.
 *
*/
declare class VisualShaderNodeTextureUniform extends VisualShaderNodeUniform {

  
/**
 * Performs a lookup operation on the texture provided as a uniform for the shader.
 *
*/
  "new"(): VisualShaderNodeTextureUniform;
  static "new"(): VisualShaderNodeTextureUniform;



/** Sets the default color if no texture is assigned to the uniform. */
color_default: int;

/** Defines the type of data provided by the source texture. See [enum TextureType] for options. */
texture_type: int;



  connect<T extends SignalsOf<VisualShaderNodeTextureUniform>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * No hints are added to the uniform declaration.
 *
*/
static TYPE_DATA: 0;

/**
 * Adds `hint_albedo` as hint to the uniform declaration for proper sRGB to linear conversion.
 *
*/
static TYPE_COLOR: 1;

/**
 * Adds `hint_normal` as hint to the uniform declaration, which internally converts the texture for proper usage as normal map.
 *
*/
static TYPE_NORMALMAP: 2;

/**
 * Adds `hint_aniso` as hint to the uniform declaration to use for a flowmap.
 *
*/
static TYPE_ANISO: 3;

/**
 * Defaults to white color.
 *
*/
static COLOR_DEFAULT_WHITE: 0;

/**
 * Defaults to black color.
 *
*/
static COLOR_DEFAULT_BLACK: 1;


  
}
