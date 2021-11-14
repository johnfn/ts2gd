
/**
 * Stores general mouse events information.
 *
*/
declare class InputEventMouse extends InputEventWithModifiers  {

  
/**
 * Stores general mouse events information.
 *
*/
  new(): InputEventMouse; 
  static "new"(): InputEventMouse 


/** The mouse button mask identifier, one of or a bitwise combination of the [enum ButtonList] button masks. */
button_mask: int;

/** The global mouse position relative to the current [Viewport] when used in [method Control._gui_input], otherwise is at 0,0. */
global_position: Vector2;

/** The local mouse position relative to the [Viewport]. If used in [method Control._gui_input], the position is relative to the current [Control] which is under the mouse. */
position: Vector2;



  connect<T extends SignalsOf<InputEventMouse>>(signal: T, method: SignalFunction<InputEventMouse[T]>): number;






}

