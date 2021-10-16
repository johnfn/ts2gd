
/**
 * Contains keys events information with modifiers support like `Shift` or `Alt`. See [method Node._input].
 *
*/
declare class InputEventWithModifiers extends InputEvent {

  
/**
 * Contains keys events information with modifiers support like `Shift` or `Alt`. See [method Node._input].
 *
*/
  "new"(): InputEventWithModifiers;
  static "new"(): InputEventWithModifiers;



/** State of the [code]Alt[/code] modifier. */
alt: boolean;

/** State of the [code]Command[/code] modifier. */
command: boolean;

/** State of the [code]Ctrl[/code] modifier. */
control: boolean;

/** State of the [code]Meta[/code] modifier. */
meta: boolean;

/** State of the [code]Shift[/code] modifier. */
shift: boolean;



  // connect<T extends SignalsOf<InputEventWithModifiers>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<InputEventWithModifiersSignals>>(signal: T, method: SignalFunction<InputEventWithModifiersSignals[T]>): number;




}

declare class InputEventWithModifiersSignals extends InputEventSignals {
  
}
