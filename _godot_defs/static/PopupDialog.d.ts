
/**
 * PopupDialog is a base class for popup dialogs, along with [WindowDialog].
 *
*/
declare class PopupDialog extends Popup  {

  
/**
 * PopupDialog is a base class for popup dialogs, along with [WindowDialog].
 *
*/
  new(): PopupDialog; 
  static "new"(): PopupDialog 





  connect<T extends SignalsOf<PopupDialog>>(signal: T, method: SignalFunction<PopupDialog[T]>): number;






}

