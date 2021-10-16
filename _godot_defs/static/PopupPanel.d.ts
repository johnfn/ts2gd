
/**
 * Class for displaying popups with a panel background. In some cases it might be simpler to use than [Popup], since it provides a configurable background. If you are making windows, better check [WindowDialog].
 *
*/
declare class PopupPanel extends Popup {

  
/**
 * Class for displaying popups with a panel background. In some cases it might be simpler to use than [Popup], since it provides a configurable background. If you are making windows, better check [WindowDialog].
 *
*/
  "new"(): PopupPanel;
  static "new"(): PopupPanel;






  // connect<T extends SignalsOf<PopupPanel>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<PopupPanelSignals>>(signal: T, method: SignalFunction<PopupPanelSignals[T]>): number;




}

declare class PopupPanelSignals extends PopupSignals {
  
}
