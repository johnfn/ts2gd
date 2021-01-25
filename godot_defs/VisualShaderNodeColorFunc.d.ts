
/**
 * Accept a [Color] to the input port and transform it according to [member function].
 *
*/
declare class VisualShaderNodeColorFunc extends VisualShaderNode {

  
/**
 * Accept a [Color] to the input port and transform it according to [member function].
 *
*/
  "new"(): VisualShaderNodeColorFunc;
  static "new"(): VisualShaderNodeColorFunc;



/** A function to be applied to the input color. See [enum Function] for options. */
function: int;



  connect<T extends SignalsOf<VisualShaderNodeColorFunc>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Converts the color to grayscale using the following formula:
 *
 * @example 
 * 
 * vec3 c = input;
 * float max1 = max(c.r, c.g);
 * float max2 = max(max1, c.b);
 * float max3 = max(max1, max2);
 * return vec3(max3, max3, max3);
 * @summary 
 * 
 *
*/
static FUNC_GRAYSCALE: 0;

/**
 * Applies sepia tone effect using the following formula:
 *
 * @example 
 * 
 * vec3 c = input;
 * float r = (c.r * 0.393) + (c.g * 0.769) + (c.b * 0.189);
 * float g = (c.r * 0.349) + (c.g * 0.686) + (c.b * 0.168);
 * float b = (c.r * 0.272) + (c.g * 0.534) + (c.b * 0.131);
 * return vec3(r, g, b);
 * @summary 
 * 
 *
*/
static FUNC_SEPIA: 1;


  
}
