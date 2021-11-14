
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
declare class ConfirmationDialog extends AcceptDialog  {

  
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
  new(): ConfirmationDialog; 
  static "new"(): ConfirmationDialog 




/**
 * Returns the cancel button.
 *
 * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their [member CanvasItem.visible] property.
 *
*/
get_cancel(): Button;

  connect<T extends SignalsOf<ConfirmationDialog>>(signal: T, method: SignalFunction<ConfirmationDialog[T]>): number;






}

