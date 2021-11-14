
/**
 * A material that uses a custom [Shader] program to render either items to screen or process particles. You can create multiple materials for the same shader but configure different values for the uniforms defined in the shader.
 *
 * **Note:** Due to a renderer limitation, emissive [ShaderMaterial]s cannot emit light when used in a [GIProbe]. Only emissive [SpatialMaterial]s can emit light in a [GIProbe].
 *
*/
declare class ShaderMaterial extends Material  {

  
/**
 * A material that uses a custom [Shader] program to render either items to screen or process particles. You can create multiple materials for the same shader but configure different values for the uniforms defined in the shader.
 *
 * **Note:** Due to a renderer limitation, emissive [ShaderMaterial]s cannot emit light when used in a [GIProbe]. Only emissive [SpatialMaterial]s can emit light in a [GIProbe].
 *
*/
  new(): ShaderMaterial; 
  static "new"(): ShaderMaterial 


/** The [Shader] program used to render this material. */
shader: Shader;

/** Returns the current value set for this material of a uniform in the shader. */
get_shader_param(param: string): any;

/** Returns [code]true[/code] if the property identified by [code]name[/code] can be reverted to a default value. */
property_can_revert(name: string): boolean;

/** Returns the default value of the material property with given [code]name[/code]. */
property_get_revert(name: string): any;

/**
 * Changes the value set for this material of a uniform in the shader.
 *
 * **Note:** `param` must match the name of the uniform in the code exactly.
 *
*/
set_shader_param(param: string, value: any): void;

  connect<T extends SignalsOf<ShaderMaterial>>(signal: T, method: SignalFunction<ShaderMaterial[T]>): number;






}

