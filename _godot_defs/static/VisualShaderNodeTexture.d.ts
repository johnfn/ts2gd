
/**
 * Performs a lookup operation on the provided texture, with support for multiple texture sources to choose from.
 *
*/
declare class VisualShaderNodeTexture extends VisualShaderNode {

  
/**
 * Performs a lookup operation on the provided texture, with support for multiple texture sources to choose from.
 *
*/
  "new"(): VisualShaderNodeTexture;
  static "new"(): VisualShaderNodeTexture;



/** Determines the source for the lookup. See [enum Source] for options. */
source: int;

/** The source texture, if needed for the selected [member source]. */
texture: Texture;

/** Specifies the type of the texture if [member source] is set to [constant SOURCE_TEXTURE]. See [enum TextureType] for options. */
texture_type: int;



  connect<T extends SignalsOf<VisualShaderNodeTexture>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Use the texture given as an argument for this function.
 *
*/
static SOURCE_TEXTURE: 0;

/**
 * Use the current viewport's texture as the source.
 *
*/
static SOURCE_SCREEN: 1;

/**
 * Use the texture from this shader's texture built-in (e.g. a texture of a [Sprite]).
 *
*/
static SOURCE_2D_TEXTURE: 2;

/**
 * Use the texture from this shader's normal map built-in.
 *
*/
static SOURCE_2D_NORMAL: 3;

/**
 * Use the depth texture available for this shader.
 *
*/
static SOURCE_DEPTH: 4;

/**
 * Use the texture provided in the input port for this function.
 *
*/
static SOURCE_PORT: 5;

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


  
}
