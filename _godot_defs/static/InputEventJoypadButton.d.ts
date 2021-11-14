
/**
 * Input event type for gamepad buttons. For gamepad analog sticks and joysticks, see [InputEventJoypadMotion].
 *
*/
declare class InputEventJoypadButton extends InputEvent  {

  
/**
 * Input event type for gamepad buttons. For gamepad analog sticks and joysticks, see [InputEventJoypadMotion].
 *
*/
  new(): InputEventJoypadButton; 
  static "new"(): InputEventJoypadButton 


/** Button identifier. One of the [enum JoystickList] button constants. */
button_index: int;

/** If [code]true[/code], the button's state is pressed. If [code]false[/code], the button's state is released. */
pressed: boolean;

/** Represents the pressure the user puts on the button with his finger, if the controller supports it. Ranges from [code]0[/code] to [code]1[/code]. */
pressure: float;



  connect<T extends SignalsOf<InputEventJoypadButton>>(signal: T, method: SignalFunction<InputEventJoypadButton[T]>): number;






}

