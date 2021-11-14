
/**
 * Creating a reference to a [VisualShaderNodeUniform] allows you to reuse this uniform in different shaders or shader stages easily.
 *
*/
declare class VisualShaderNodeUniformRef extends VisualShaderNode  {

  
/**
 * Creating a reference to a [VisualShaderNodeUniform] allows you to reuse this uniform in different shaders or shader stages easily.
 *
*/
  new(): VisualShaderNodeUniformRef; 
  static "new"(): VisualShaderNodeUniformRef 


/** The name of the uniform which this reference points to. */
uniform_name: string;



  connect<T extends SignalsOf<VisualShaderNodeUniformRef>>(signal: T, method: SignalFunction<VisualShaderNodeUniformRef[T]>): number;






}

