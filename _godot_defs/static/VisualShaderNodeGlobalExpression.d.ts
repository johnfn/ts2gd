
/**
 * Custom Godot Shader Language expression, which is placed on top of the generated shader. You can place various function definitions inside to call later in [VisualShaderNodeExpression]s (which are injected in the main shader functions). You can also declare varyings, uniforms and global constants.
 *
*/
declare class VisualShaderNodeGlobalExpression extends VisualShaderNodeExpression  {

  
/**
 * Custom Godot Shader Language expression, which is placed on top of the generated shader. You can place various function definitions inside to call later in [VisualShaderNodeExpression]s (which are injected in the main shader functions). You can also declare varyings, uniforms and global constants.
 *
*/
  new(): VisualShaderNodeGlobalExpression; 
  static "new"(): VisualShaderNodeGlobalExpression 





  connect<T extends SignalsOf<VisualShaderNodeGlobalExpression>>(signal: T, method: SignalFunction<VisualShaderNodeGlobalExpression[T]>): number;






}

