
/**
 * GradientTexture uses a [Gradient] to fill the texture data. The gradient will be filled from left to right using colors obtained from the gradient. This means the texture does not necessarily represent an exact copy of the gradient, but instead an interpolation of samples obtained from the gradient at fixed steps (see [member width]).
 *
*/
declare class GradientTexture extends Texture {

  
/**
 * GradientTexture uses a [Gradient] to fill the texture data. The gradient will be filled from left to right using colors obtained from the gradient. This means the texture does not necessarily represent an exact copy of the gradient, but instead an interpolation of samples obtained from the gradient at fixed steps (see [member width]).
 *
*/
  "new"(): GradientTexture;
  static "new"(): GradientTexture;



/** The [Gradient] that will be used to fill the texture. */
gradient: Gradient;

/** The number of color samples that will be obtained from the [Gradient]. */
width: int;



  connect<T extends SignalsOf<GradientTexture>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
