
/**
 * Displays a rectangle filled with a solid [member color]. If you need to display the border alone, consider using [ReferenceRect] instead.
 *
*/
declare class ColorRect extends Control  {

  
/**
 * Displays a rectangle filled with a solid [member color]. If you need to display the border alone, consider using [ReferenceRect] instead.
 *
*/
  new(): ColorRect; 
  static "new"(): ColorRect 


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



  connect<T extends SignalsOf<ColorRect>>(signal: T, method: SignalFunction<ColorRect[T]>): number;






}

