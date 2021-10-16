
/**
 * Dialog for confirmation of actions. This dialog inherits from [AcceptDialog], but has by default an OK and Cancel button (in host OS order).
 *
 * To get cancel action, you can use:
 *
 * @example 
 * 
 * get_cancel().connect("pressed", self, "cancelled")
 * @summary 
 * .
 *
*/
declare class ConfirmationDialog extends AcceptDialog {

  
/**
 * Dialog for confirmation of actions. This dialog inherits from [AcceptDialog], but has by default an OK and Cancel button (in host OS order).
 *
 * To get cancel action, you can use:
 *
 * @example 
 * 
 * get_cancel().connect("pressed", self, "cancelled")
 * @summary 
 * .
 *
*/
  "new"(): ConfirmationDialog;
  static "new"(): ConfirmationDialog;





/** Returns the cancel button. */
get_cancel(): Button;

  // connect<T extends SignalsOf<ConfirmationDialog>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<ConfirmationDialogSignals>>(signal: T, method: SignalFunction<ConfirmationDialogSignals[T]>): number;




}

declare class ConfirmationDialogSignals extends AcceptDialogSignals {
  
}
