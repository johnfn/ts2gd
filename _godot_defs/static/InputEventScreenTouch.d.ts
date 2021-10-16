
/**
 * Stores multi-touch press/release information. Supports touch press, touch release and [member index] for multi-touch count and order.
 *
*/
declare class InputEventScreenTouch extends InputEvent {

  
/**
 * Stores multi-touch press/release information. Supports touch press, touch release and [member index] for multi-touch count and order.
 *
*/
  "new"(): InputEventScreenTouch;
  static "new"(): InputEventScreenTouch;



/** The touch index in the case of a multi-touch event. One index = one finger. */
index: int;

/** The touch position. */
position: Vector2;

/** If [code]true[/code], the touch's state is pressed. If [code]false[/code], the touch's state is released. */
pressed: boolean;



  // connect<T extends SignalsOf<InputEventScreenTouch>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<InputEventScreenTouchSignals>>(signal: T, method: SignalFunction<InputEventScreenTouchSignals[T]>): number;




}

declare class InputEventScreenTouchSignals extends InputEventSignals {
  
}
