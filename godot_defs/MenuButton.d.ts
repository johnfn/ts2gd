
/**
 * Special button that brings up a [PopupMenu] when clicked.
 *
 * New items can be created inside this [PopupMenu] using `get_popup().add_item("My Item Name")`. You can also create them directly from the editor. To do so, select the [MenuButton] node, then in the toolbar at the top of the 2D editor, click **Items** then click **Add** in the popup. You will be able to give each items new properties.
 *
*/
declare class MenuButton extends Button {

  
/**
 * Special button that brings up a [PopupMenu] when clicked.
 *
 * New items can be created inside this [PopupMenu] using `get_popup().add_item("My Item Name")`. You can also create them directly from the editor. To do so, select the [MenuButton] node, then in the toolbar at the top of the 2D editor, click **Items** then click **Add** in the popup. You will be able to give each items new properties.
 *
*/
  "new"(): MenuButton;
  static "new"(): MenuButton;







/** If [code]true[/code], when the cursor hovers above another [MenuButton] within the same parent which also has [code]switch_on_hover[/code] enabled, it will close the current [MenuButton] and open the other one. */
switch_on_hover: boolean;


/** Returns the [PopupMenu] contained in this button. */
get_popup(): PopupMenu;

/** If [code]true[/code], shortcuts are disabled and cannot be used to trigger the button. */
set_disable_shortcuts(disabled: boolean): void;

  connect<T extends SignalsOf<MenuButton>, U extends Node>(signal: T, node: U, method: keyof U): number;





  /**
 * Emitted when [PopupMenu] of this MenuButton is about to show.
 *
*/
about_to_show: Signal<() => void>

}
