
/**
 * [CanvasModulate] tints the canvas elements using its assigned [member color].
 *
*/
declare class CanvasModulate extends Node2D  {

  
/**
 * [CanvasModulate] tints the canvas elements using its assigned [member color].
 *
*/
  new(): CanvasModulate; 
  static "new"(): CanvasModulate 


/** The tint color to apply. */
color: Color;



  connect<T extends SignalsOf<CanvasModulate>>(signal: T, method: SignalFunction<CanvasModulate[T]>): number;






}

