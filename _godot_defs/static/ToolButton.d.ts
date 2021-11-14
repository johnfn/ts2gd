
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
declare class ToolButton extends Button  {

  
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
  new(): ToolButton; 
  static "new"(): ToolButton 





  connect<T extends SignalsOf<ToolButton>>(signal: T, method: SignalFunction<ToolButton[T]>): number;






}

