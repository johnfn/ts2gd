
/**
 * Contains mouse click information. See [method Node._input].
 *
*/
declare class InputEventMouseButton extends InputEventMouse  {

  
/**
 * Contains mouse click information. See [method Node._input].
 *
*/
  new(): InputEventMouseButton; 
  static "new"(): InputEventMouseButton 


/** The mouse button identifier, one of the [enum ButtonList] button or button wheel constants. */
button_index: int;

/** If [code]true[/code], the mouse button's state is a double-click. */
doubleclick: boolean;

/** The amount (or delta) of the event. When used for high-precision scroll events, this indicates the scroll amount (vertical or horizontal). This is only supported on some platforms; the reported sensitivity varies depending on the platform. May be [code]0[/code] if not supported. */
factor: float;

/** If [code]true[/code], the mouse button's state is pressed. If [code]false[/code], the mouse button's state is released. */
pressed: boolean;



  connect<T extends SignalsOf<InputEventMouseButton>>(signal: T, method: SignalFunction<InputEventMouseButton[T]>): number;






}

