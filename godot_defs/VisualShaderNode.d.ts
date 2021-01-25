
/**
*/
declare class VisualShaderNode extends Resource {

  
/**
*/
  "new"(): VisualShaderNode;
  static "new"(): VisualShaderNode;



/** Sets the output port index which will be showed for preview. If set to [code]-1[/code] no port will be open for preview. */
output_port_for_preview: int;

/** Returns an [Array] containing default values for all of the input ports of the node in the form [code][index0, value0, index1, value1, ...][/code]. */
get_default_input_values(): any[];

/** Returns the default value of the input [code]port[/code]. */
get_input_port_default_value(port: int): any;

/** Sets the default input ports values using an [Array] of the form [code][index0, value0, index1, value1, ...][/code]. For example: [code][0, Vector3(0, 0, 0), 1, Vector3(0, 0, 0)][/code]. */
set_default_input_values(values: any[]): void;

/** Sets the default value for the selected input [code]port[/code]. */
set_input_port_default_value(port: int, value: any): void;

  connect<T extends SignalsOf<VisualShaderNode>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Floating-point scalar. Translated to `float` type in shader code.
 *
*/
static PORT_TYPE_SCALAR: 0;

/**
 * 3D vector of floating-point values. Translated to `vec3` type in shader code.
 *
*/
static PORT_TYPE_VECTOR: 1;

/**
 * Boolean type. Translated to `bool` type in shader code.
 *
*/
static PORT_TYPE_BOOLEAN: 2;

/**
 * Transform type. Translated to `mat4` type in shader code.
 *
*/
static PORT_TYPE_TRANSFORM: 3;

/**
 * Sampler type. Translated to reference of sampler uniform in shader code. Can only be used for input ports in non-uniform nodes.
 *
*/
static PORT_TYPE_SAMPLER: 4;

/**
 * Represents the size of the [enum PortType] enum.
 *
*/
static PORT_TYPE_MAX: 5;


  /**
 * Emitted when the node requests an editor refresh. Currently called only in setter of [member VisualShaderNodeTexture.source], [VisualShaderNodeTexture], and [VisualShaderNodeCubeMap] (and their derivatives).
 *
*/
editor_refresh_request: Signal<() => void>

}
