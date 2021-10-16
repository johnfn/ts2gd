
/**
 * Stores key presses on the keyboard. Supports key presses, key releases and [member echo] events.
 *
*/
declare class InputEventKey extends InputEventWithModifiers {

  
/**
 * Stores key presses on the keyboard. Supports key presses, key releases and [member echo] events.
 *
*/
  "new"(): InputEventKey;
  static "new"(): InputEventKey;



/** If [code]true[/code], the key was already pressed before this event. It means the user is holding the key down. */
echo: boolean;

/**
 * Key physical scancode, which corresponds to one of the [enum KeyList] constants. Represent the physical location of a key on the 101/102-key US QWERTY keyboard.
 *
 * To get a human-readable representation of the [InputEventKey], use `OS.get_scancode_string(event.physical_scancode)` where `event` is the [InputEventKey].
 *
*/
physical_scancode: int;

/** If [code]true[/code], the key's state is pressed. If [code]false[/code], the key's state is released. */
pressed: boolean;

/**
 * The key scancode, which corresponds to one of the [enum KeyList] constants. Represent key in the current keyboard layout.
 *
 * To get a human-readable representation of the [InputEventKey], use `OS.get_scancode_string(event.scancode)` where `event` is the [InputEventKey].
 *
*/
scancode: int;

/** The key Unicode identifier (when relevant). Unicode identifiers for the composite characters and complex scripts may not be available unless IME input mode is active. See [method OS.set_ime_active] for more information. */
unicode: int;

/**
 * Returns the physical scancode combined with modifier keys such as `Shift` or `Alt`. See also [InputEventWithModifiers].
 *
 * To get a human-readable representation of the [InputEventKey] with modifiers, use `OS.get_scancode_string(event.get_physical_scancode_with_modifiers())` where `event` is the [InputEventKey].
 *
*/
get_physical_scancode_with_modifiers(): int;

/**
 * Returns the scancode combined with modifier keys such as `Shift` or `Alt`. See also [InputEventWithModifiers].
 *
 * To get a human-readable representation of the [InputEventKey] with modifiers, use `OS.get_scancode_string(event.get_scancode_with_modifiers())` where `event` is the [InputEventKey].
 *
*/
get_scancode_with_modifiers(): int;

  // connect<T extends SignalsOf<InputEventKey>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<InputEventKeySignals>>(signal: T, method: SignalFunction<InputEventKeySignals[T]>): number;




}

declare class InputEventKeySignals extends InputEventWithModifiersSignals {
  
}
