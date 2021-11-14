
/**
 * This class allows you to define a custom shader program that can be used by a [ShaderMaterial]. Shaders allow you to write your own custom behavior for rendering objects or updating particle information. For a detailed explanation and usage, please see the tutorials linked below.
 *
*/
declare class Shader extends Resource  {

  
/**
 * This class allows you to define a custom shader program that can be used by a [ShaderMaterial]. Shaders allow you to write your own custom behavior for rendering objects or updating particle information. For a detailed explanation and usage, please see the tutorials linked below.
 *
*/
  new(): Shader; 
  static "new"(): Shader 


/** Returns the shader's code as the user has written it, not the full generated code used internally. */
code: string;

/**
 * Returns the shader's custom defines. Custom defines can be used in Godot to add GLSL preprocessor directives (e.g: extensions) required for the shader logic.
 *
 * **Note:** Custom defines are not validated by the Godot shader parser, so care should be taken when using them.
 *
*/
custom_defines: string;

/**
 * Returns the texture that is set as default for the specified parameter.
 *
 * **Note:** `param` must match the name of the uniform in the code exactly.
 *
*/
get_default_texture_param(param: string): Texture;

/** Returns the shader mode for the shader, either [constant MODE_CANVAS_ITEM], [constant MODE_SPATIAL] or [constant MODE_PARTICLES]. */
get_mode(): int;

/**
 * Returns `true` if the shader has this param defined as a uniform in its code.
 *
 * **Note:** `param` must match the name of the uniform in the code exactly.
 *
*/
has_param(name: string): boolean;

/**
 * Sets the default texture to be used with a texture uniform. The default is used if a texture is not set in the [ShaderMaterial].
 *
 * **Note:** `param` must match the name of the uniform in the code exactly.
 *
*/
set_default_texture_param(param: string, texture: Texture): void;

  connect<T extends SignalsOf<Shader>>(signal: T, method: SignalFunction<Shader[T]>): number;



/**
 * Mode used to draw all 3D objects.
 *
*/
static MODE_SPATIAL: any;

/**
 * Mode used to draw all 2D objects.
 *
*/
static MODE_CANVAS_ITEM: any;

/**
 * Mode used to calculate particle information on a per-particle basis. Not used for drawing.
 *
*/
static MODE_PARTICLES: any;



}

