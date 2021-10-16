
/**
 * Stores information about joystick motions. One [InputEventJoypadMotion] represents one axis at a time.
 *
*/
declare class InputEventJoypadMotion extends InputEvent {

  
/**
 * Stores information about joystick motions. One [InputEventJoypadMotion] represents one axis at a time.
 *
*/
  "new"(): InputEventJoypadMotion;
  static "new"(): InputEventJoypadMotion;



/** Axis identifier. Use one of the [enum JoystickList] axis constants. */
axis: int;

/** Current position of the joystick on the given axis. The value ranges from [code]-1.0[/code] to [code]1.0[/code]. A value of [code]0[/code] means the axis is in its resting position. */
axis_value: float;



  // connect<T extends SignalsOf<InputEventJoypadMotion>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<InputEventJoypadMotionSignals>>(signal: T, method: SignalFunction<InputEventJoypadMotionSignals[T]>): number;




}

declare class InputEventJoypadMotionSignals extends InputEventSignals {
  
}
