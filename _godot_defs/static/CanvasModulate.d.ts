
/**
 * [CanvasModulate] tints the canvas elements using its assigned [member color].
 *
*/
declare class CanvasModulate extends Node2D {

  
/**
 * [CanvasModulate] tints the canvas elements using its assigned [member color].
 *
*/
  "new"(): CanvasModulate;
  static "new"(): CanvasModulate;



/** The tint color to apply. */
color: Color;



  // connect<T extends SignalsOf<CanvasModulate>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<CanvasModulateSignals>>(signal: T, method: SignalFunction<CanvasModulateSignals[T]>): number;




}

declare class CanvasModulateSignals extends Node2DSignals {
  
}
