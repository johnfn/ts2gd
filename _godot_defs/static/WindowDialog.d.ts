
/**
 * Windowdialog is the base class for all window-based dialogs. It's a by-default toplevel [Control] that draws a window decoration and allows motion and resizing.
 *
*/
declare class WindowDialog extends Popup  {

  
/**
 * Windowdialog is the base class for all window-based dialogs. It's a by-default toplevel [Control] that draws a window decoration and allows motion and resizing.
 *
*/
  new(): WindowDialog; 
  static "new"(): WindowDialog 


/** If [code]true[/code], the user can resize the window. */
resizable: boolean;

/** The text displayed in the window's title bar. */
window_title: string;

/**
 * Returns the close [TextureButton].
 *
 * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their [member CanvasItem.visible] property.
 *
*/
get_close_button(): TextureButton;

  connect<T extends SignalsOf<WindowDialog>>(signal: T, method: SignalFunction<WindowDialog[T]>): number;






}

