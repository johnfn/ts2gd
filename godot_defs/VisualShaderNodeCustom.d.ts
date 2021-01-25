
/**
 * By inheriting this class you can create a custom [VisualShader] script addon which will be automatically added to the Visual Shader Editor. The [VisualShaderNode]'s behavior is defined by overriding the provided virtual methods.
 *
 * In order for the node to be registered as an editor addon, you must use the `tool` keyword and provide a `class_name` for your custom script. For example:
 *
 * @example 
 * 
 * tool
 * extends VisualShaderNodeCustom
 * class_name VisualShaderNodeNoise
 * @summary 
 * 
 *
*/
declare class VisualShaderNodeCustom extends VisualShaderNode {

  
/**
 * By inheriting this class you can create a custom [VisualShader] script addon which will be automatically added to the Visual Shader Editor. The [VisualShaderNode]'s behavior is defined by overriding the provided virtual methods.
 *
 * In order for the node to be registered as an editor addon, you must use the `tool` keyword and provide a `class_name` for your custom script. For example:
 *
 * @example 
 * 
 * tool
 * extends VisualShaderNodeCustom
 * class_name VisualShaderNodeNoise
 * @summary 
 * 
 *
*/
  "new"(): VisualShaderNodeCustom;
  static "new"(): VisualShaderNodeCustom;




/**
 * Override this method to define the category of the associated custom node in the Visual Shader Editor's members dialog.
 *
 * Defining this method is **optional**. If not overridden, the node will be filed under the "Custom" category.
 *
*/
protected _get_category(): string;

/**
 * Override this method to define the actual shader code of the associated custom node. The shader code should be returned as a string, which can have multiple lines (the `"""` multiline string construct can be used for convenience).
 *
 * The `input_vars` and `output_vars` arrays contain the string names of the various input and output variables, as defined by `_get_input_*` and `_get_output_*` virtual methods in this class.
 *
 * The output ports can be assigned values in the shader code. For example, `return output_vars[0] + " = " + input_vars[0] + ";"`.
 *
 * You can customize the generated code based on the shader `mode` (see [enum Shader.Mode]) and/or `type` (see [enum VisualShader.Type]).
 *
 * Defining this method is **required**.
 *
*/
protected _get_code(input_vars: any[], output_vars: any[], mode: int, type: int): string;

/**
 * Override this method to define the description of the associated custom node in the Visual Shader Editor's members dialog.
 *
 * Defining this method is **optional**.
 *
*/
protected _get_description(): string;

/**
 * Override this method to add shader code on top of the global shader, to define your own standard library of reusable methods, varyings, constants, uniforms, etc. The shader code should be returned as a string, which can have multiple lines (the `"""` multiline string construct can be used for convenience).
 *
 * Be careful with this functionality as it can cause name conflicts with other custom nodes, so be sure to give the defined entities unique names.
 *
 * You can customize the generated code based on the shader `mode` (see [enum Shader.Mode]).
 *
 * Defining this method is **optional**.
 *
*/
protected _get_global_code(mode: int): string;

/**
 * Override this method to define the amount of input ports of the associated custom node.
 *
 * Defining this method is **required**. If not overridden, the node has no input ports.
 *
*/
protected _get_input_port_count(): int;

/**
 * Override this method to define the names of input ports of the associated custom node. The names are used both for the input slots in the editor and as identifiers in the shader code, and are passed in the `input_vars` array in [method _get_code].
 *
 * Defining this method is **optional**, but recommended. If not overridden, input ports are named as `"in" + str(port)`.
 *
*/
protected _get_input_port_name(port: int): string;

/**
 * Override this method to define the returned type of each input port of the associated custom node (see [enum VisualShaderNode.PortType] for possible types).
 *
 * Defining this method is **optional**, but recommended. If not overridden, input ports will return the [constant VisualShaderNode.PORT_TYPE_SCALAR] type.
 *
*/
protected _get_input_port_type(port: int): int;

/**
 * Override this method to define the name of the associated custom node in the Visual Shader Editor's members dialog and graph.
 *
 * Defining this method is **optional**, but recommended. If not overridden, the node will be named as "Unnamed".
 *
*/
protected _get_name(): string;

/**
 * Override this method to define the amount of output ports of the associated custom node.
 *
 * Defining this method is **required**. If not overridden, the node has no output ports.
 *
*/
protected _get_output_port_count(): int;

/**
 * Override this method to define the names of output ports of the associated custom node. The names are used both for the output slots in the editor and as identifiers in the shader code, and are passed in the `output_vars` array in [method _get_code].
 *
 * Defining this method is **optional**, but recommended. If not overridden, output ports are named as `"out" + str(port)`.
 *
*/
protected _get_output_port_name(port: int): string;

/**
 * Override this method to define the returned type of each output port of the associated custom node (see [enum VisualShaderNode.PortType] for possible types).
 *
 * Defining this method is **optional**, but recommended. If not overridden, output ports will return the [constant VisualShaderNode.PORT_TYPE_SCALAR] type.
 *
*/
protected _get_output_port_type(port: int): int;

/**
 * Override this method to define the return icon of the associated custom node in the Visual Shader Editor's members dialog.
 *
 * Defining this method is **optional**. If not overridden, no return icon is shown.
 *
*/
protected _get_return_icon_type(): int;

/**
 * Override this method to define the subcategory of the associated custom node in the Visual Shader Editor's members dialog.
 *
 * Defining this method is **optional**. If not overridden, the node will be filed under the root of the main category (see [method _get_category]).
 *
*/
protected _get_subcategory(): string;

  connect<T extends SignalsOf<VisualShaderNodeCustom>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
