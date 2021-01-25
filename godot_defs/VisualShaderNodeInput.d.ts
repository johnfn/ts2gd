
/**
 * Gives access to input variables (built-ins) available for the shader. See the shading reference for the list of available built-ins for each shader type (check `Tutorials` section for link).
 *
*/
declare class VisualShaderNodeInput extends VisualShaderNode {

  
/**
 * Gives access to input variables (built-ins) available for the shader. See the shading reference for the list of available built-ins for each shader type (check `Tutorials` section for link).
 *
*/
  "new"(): VisualShaderNodeInput;
  static "new"(): VisualShaderNodeInput;



/** One of the several input constants in lower-case style like: "vertex"([code]VERTEX[/code]) or "point_size"([code]POINT_SIZE[/code]). */
input_name: string;

/** No documentation provided. */
get_input_real_name(): string;

  connect<T extends SignalsOf<VisualShaderNodeInput>, U extends Node>(signal: T, node: U, method: keyof U): number;





  /**
*/
input_type_changed: Signal<() => void>

}
