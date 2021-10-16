
/**
 * CheckButton is a toggle button displayed as a check field. It's similar to [CheckBox] in functionality, but it has a different appearance. To follow established UX patterns, it's recommended to use CheckButton when toggling it has an **immediate** effect on something. For instance, it should be used if toggling it enables/disables a setting without requiring the user to press a confirmation button.
 *
 * See also [BaseButton] which contains common properties and methods associated with this node.
 *
*/
declare class CheckButton extends Button {

  
/**
 * CheckButton is a toggle button displayed as a check field. It's similar to [CheckBox] in functionality, but it has a different appearance. To follow established UX patterns, it's recommended to use CheckButton when toggling it has an **immediate** effect on something. For instance, it should be used if toggling it enables/disables a setting without requiring the user to press a confirmation button.
 *
 * See also [BaseButton] which contains common properties and methods associated with this node.
 *
*/
  "new"(): CheckButton;
  static "new"(): CheckButton;







  // connect<T extends SignalsOf<CheckButton>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<CheckButtonSignals>>(signal: T, method: SignalFunction<CheckButtonSignals[T]>): number;




}

declare class CheckButtonSignals extends ButtonSignals {
  
}
