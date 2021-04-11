
/**
 * Displays a colored rectangle.
 *
*/
declare class ColorRect extends Control {

  
/**
 * Displays a colored rectangle.
 *
*/
  "new"(): ColorRect;
  static "new"(): ColorRect;



/**
 * The fill color.
 *
 * @example 
 * 
 * $ColorRect.color = Color(1, 0, 0, 1) # Set ColorRect's color to red.
 * @summary 
 * 
 *
*/
color: Color;



  connect<T extends SignalsOf<ColorRect>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
