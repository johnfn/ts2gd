
/**
 * Accept an integer scalar (`x`) to the input port and transform it according to [member function].
 *
*/
declare class VisualShaderNodeIntFunc extends VisualShaderNode {

  
/**
 * Accept an integer scalar (`x`) to the input port and transform it according to [member function].
 *
*/
  "new"(): this;
  static "new"(): this;



/** A function to be applied to the scalar. See [enum Function] for options. */
function: int;



  connect<T extends SignalsOf<VisualShaderNodeIntFunc>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Returns the absolute value of the parameter. Translates to `abs(x)` in the Godot Shader Language.
 *
*/
static FUNC_ABS: 0;

/**
 * Constrains a parameter between `min` and `max`. Translates to `clamp(x, min, max)` in the Godot Shader Language.
 *
*/
static FUNC_CLAMP: 1;

/**
 * Negates the `x` using `-(x)`.
 *
*/
static FUNC_NEGATE: 2;

/**
 * Extracts the sign of the parameter. Translates to `sign(x)` in the Godot Shader Language.
 *
*/
static FUNC_SIGN: 3;


  
}


 
