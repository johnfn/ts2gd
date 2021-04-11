
/**
 * Custom Godot Shading Language expression, with a custom amount of input and output ports.
 *
 * The provided code is directly injected into the graph's matching shader function (`vertex`, `fragment`, or `light`), so it cannot be used to to declare functions, varyings, uniforms, or global constants. See [VisualShaderNodeGlobalExpression] for such global definitions.
 *
*/
declare class VisualShaderNodeExpression extends VisualShaderNodeGroupBase {

  
/**
 * Custom Godot Shading Language expression, with a custom amount of input and output ports.
 *
 * The provided code is directly injected into the graph's matching shader function (`vertex`, `fragment`, or `light`), so it cannot be used to to declare functions, varyings, uniforms, or global constants. See [VisualShaderNodeGlobalExpression] for such global definitions.
 *
*/
  "new"(): VisualShaderNodeExpression;
  static "new"(): VisualShaderNodeExpression;



/** An expression in Godot Shading Language, which will be injected at the start of the graph's matching shader function ([code]vertex[/code], [code]fragment[/code], or [code]light[/code]), and thus cannot be used to declare functions, varyings, uniforms, or global constants. */
expression: string;



  connect<T extends SignalsOf<VisualShaderNodeExpression>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
