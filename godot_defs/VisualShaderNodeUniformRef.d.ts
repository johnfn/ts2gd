
/**
 * Creating a reference to a [VisualShaderNodeUniform] allows you to reuse this uniform in different shaders or shader stages easily.
 *
*/
declare class VisualShaderNodeUniformRef extends VisualShaderNode {

  
/**
 * Creating a reference to a [VisualShaderNodeUniform] allows you to reuse this uniform in different shaders or shader stages easily.
 *
*/
  "new"(): this;
  static "new"(): this;



/** The name of the uniform which this reference points to. */
uniform_name: String;



  connect<T extends SignalsOf<VisualShaderNodeUniformRef>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
