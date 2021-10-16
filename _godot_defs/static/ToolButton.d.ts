
/**
 * This is a helper class to generate a flat [Button] (see [member Button.flat]), creating a [ToolButton] is equivalent to:
 *
 * @example 
 * 
 * var btn = Button.new()
 * btn.flat = true
 * @summary 
 * 
 *
*/
declare class ToolButton extends Button {

  
/**
 * This is a helper class to generate a flat [Button] (see [member Button.flat]), creating a [ToolButton] is equivalent to:
 *
 * @example 
 * 
 * var btn = Button.new()
 * btn.flat = true
 * @summary 
 * 
 *
*/
  "new"(): ToolButton;
  static "new"(): ToolButton;






  // connect<T extends SignalsOf<ToolButton>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<ToolButtonSignals>>(signal: T, method: SignalFunction<ToolButtonSignals[T]>): number;




}

declare class ToolButtonSignals extends ButtonSignals {
  
}
