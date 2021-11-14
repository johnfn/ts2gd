
/**
 * Creates a 4x4 transform matrix using four vectors of type `vec3`. Each vector is one row in the matrix and the last column is a `vec4(0, 0, 0, 1)`.
 *
*/
declare class VisualShaderNodeTransformCompose extends VisualShaderNode  {

  
/**
 * Creates a 4x4 transform matrix using four vectors of type `vec3`. Each vector is one row in the matrix and the last column is a `vec4(0, 0, 0, 1)`.
 *
*/
  new(): VisualShaderNodeTransformCompose; 
  static "new"(): VisualShaderNodeTransformCompose 





  connect<T extends SignalsOf<VisualShaderNodeTransformCompose>>(signal: T, method: SignalFunction<VisualShaderNodeTransformCompose[T]>): number;






}

