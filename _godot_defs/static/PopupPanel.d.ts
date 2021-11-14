
/**
 * Class for displaying popups with a panel background. In some cases it might be simpler to use than [Popup], since it provides a configurable background. If you are making windows, better check [WindowDialog].
 *
*/
declare class PopupPanel extends Popup  {

  
/**
 * Class for displaying popups with a panel background. In some cases it might be simpler to use than [Popup], since it provides a configurable background. If you are making windows, better check [WindowDialog].
 *
*/
  new(): PopupPanel; 
  static "new"(): PopupPanel 





  connect<T extends SignalsOf<PopupPanel>>(signal: T, method: SignalFunction<PopupPanel[T]>): number;






}

