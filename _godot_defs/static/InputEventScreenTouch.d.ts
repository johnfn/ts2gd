
/**
 * Stores multi-touch press/release information. Supports touch press, touch release and [member index] for multi-touch count and order.
 *
*/
declare class InputEventScreenTouch extends InputEvent  {

  
/**
 * Stores multi-touch press/release information. Supports touch press, touch release and [member index] for multi-touch count and order.
 *
*/
  new(): InputEventScreenTouch; 
  static "new"(): InputEventScreenTouch 


/** The touch index in the case of a multi-touch event. One index = one finger. */
index: int;

/** The touch position. */
position: Vector2;

/** If [code]true[/code], the touch's state is pressed. If [code]false[/code], the touch's state is released. */
pressed: boolean;



  connect<T extends SignalsOf<InputEventScreenTouch>>(signal: T, method: SignalFunction<InputEventScreenTouch[T]>): number;






}

