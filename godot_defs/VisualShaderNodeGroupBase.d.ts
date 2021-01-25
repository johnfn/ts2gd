
/**
 * Currently, has no direct usage, use the derived classes instead.
 *
*/
declare class VisualShaderNodeGroupBase extends VisualShaderNode {

  
/**
 * Currently, has no direct usage, use the derived classes instead.
 *
*/
  "new"(): VisualShaderNodeGroupBase;
  static "new"(): VisualShaderNodeGroupBase;



/** The size of the node in the visual shader graph. */
size: Vector2;

/** Adds an input port with the specified [code]type[/code] (see [enum VisualShaderNode.PortType]) and [code]name[/code]. */
add_input_port(id: int, type: int, name: string): void;

/** Adds an output port with the specified [code]type[/code] (see [enum VisualShaderNode.PortType]) and [code]name[/code]. */
add_output_port(id: int, type: int, name: string): void;

/** Removes all previously specified input ports. */
clear_input_ports(): void;

/** Removes all previously specified output ports. */
clear_output_ports(): void;

/** Returns a free input port ID which can be used in [method add_input_port]. */
get_free_input_port_id(): int;

/** Returns a free output port ID which can be used in [method add_output_port]. */
get_free_output_port_id(): int;

/** Returns the number of input ports in use. Alternative for [method get_free_input_port_id]. */
get_input_port_count(): int;

/** Returns a [String] description of the input ports as as colon-separated list using the format [code]id,type,name;[/code] (see [method add_input_port]). */
get_inputs(): string;

/** Returns the number of output ports in use. Alternative for [method get_free_output_port_id]. */
get_output_port_count(): int;

/** Returns a [String] description of the output ports as as colon-separated list using the format [code]id,type,name;[/code] (see [method add_output_port]). */
get_outputs(): string;

/** Returns [code]true[/code] if the specified input port exists. */
has_input_port(id: int): boolean;

/** Returns [code]true[/code] if the specified output port exists. */
has_output_port(id: int): boolean;

/** Returns [code]true[/code] if the specified port name does not override an existed port name and is valid within the shader. */
is_valid_port_name(name: string): boolean;

/** Removes the specified input port. */
remove_input_port(id: int): void;

/** Removes the specified output port. */
remove_output_port(id: int): void;

/** Renames the specified input port. */
set_input_port_name(id: int, name: string): void;

/** Sets the specified input port's type (see [enum VisualShaderNode.PortType]). */
set_input_port_type(id: int, type: int): void;

/** Defines all input ports using a [String] formatted as a colon-separated list: [code]id,type,name;[/code] (see [method add_input_port]). */
set_inputs(inputs: string): void;

/** Renames the specified output port. */
set_output_port_name(id: int, name: string): void;

/** Sets the specified output port's type (see [enum VisualShaderNode.PortType]). */
set_output_port_type(id: int, type: int): void;

/** Defines all output ports using a [String] formatted as a colon-separated list: [code]id,type,name;[/code] (see [method add_output_port]). */
set_outputs(outputs: string): void;

  connect<T extends SignalsOf<VisualShaderNodeGroupBase>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
