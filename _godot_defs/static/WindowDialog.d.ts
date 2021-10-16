
/**
 * Windowdialog is the base class for all window-based dialogs. It's a by-default toplevel [Control] that draws a window decoration and allows motion and resizing.
 *
*/
declare class WindowDialog extends Popup {

  
/**
 * Windowdialog is the base class for all window-based dialogs. It's a by-default toplevel [Control] that draws a window decoration and allows motion and resizing.
 *
*/
  "new"(): WindowDialog;
  static "new"(): WindowDialog;



/** If [code]true[/code], the user can resize the window. */
resizable: boolean;

/** The text displayed in the window's title bar. */
window_title: string;

/** Returns the close [TextureButton]. */
get_close_button(): TextureButton;

  // connect<T extends SignalsOf<WindowDialog>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<WindowDialogSignals>>(signal: T, method: SignalFunction<WindowDialogSignals[T]>): number;




}

declare class WindowDialogSignals extends PopupSignals {
  
}
