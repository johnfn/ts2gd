
/**
 * Group of [Button]. All direct and indirect children buttons become radios. Only one allows being pressed.
 *
 * [member BaseButton.toggle_mode] should be `true`.
 *
*/
declare class ButtonGroup extends Resource {

  
/**
 * Group of [Button]. All direct and indirect children buttons become radios. Only one allows being pressed.
 *
 * [member BaseButton.toggle_mode] should be `true`.
 *
*/
  "new"(): ButtonGroup;
  static "new"(): ButtonGroup;




/** Returns an [Array] of [Button]s who have this as their [ButtonGroup] (see [member BaseButton.group]). */
get_buttons(): any[];

/** Returns the current pressed button. */
get_pressed_button(): BaseButton;

  // connect<T extends SignalsOf<ButtonGroup>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<ButtonGroupSignals>>(signal: T, method: SignalFunction<ButtonGroupSignals[T]>): number;




}

declare class ButtonGroupSignals extends ResourceSignals {
  /**
 * Emitted when one of the buttons of the group is pressed.
 *
*/
pressed: Signal<(button: Object) => void>

}
