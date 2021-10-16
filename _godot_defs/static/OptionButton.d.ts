
/**
 * OptionButton is a type button that provides a selectable list of items when pressed. The item selected becomes the "current" item and is displayed as the button text.
 *
 * See also [BaseButton] which contains common properties and methods associated with this node.
 *
*/
declare class OptionButton extends Button {

  
/**
 * OptionButton is a type button that provides a selectable list of items when pressed. The item selected becomes the "current" item and is displayed as the button text.
 *
 * See also [BaseButton] which contains common properties and methods associated with this node.
 *
*/
  "new"(): OptionButton;
  static "new"(): OptionButton;





/** The index of the currently selected item, or [code]-1[/code] if no item is selected. */
selected: int;


/** Adds an item, with a [code]texture[/code] icon, text [code]label[/code] and (optionally) [code]id[/code]. If no [code]id[/code] is passed, the item index will be used as the item's ID. New items are appended at the end. */
add_icon_item(texture: Texture, label: string, id?: int): void;

/** Adds an item, with text [code]label[/code] and (optionally) [code]id[/code]. If no [code]id[/code] is passed, the item index will be used as the item's ID. New items are appended at the end. */
add_item(label: string, id?: int): void;

/** Adds a separator to the list of items. Separators help to group items. Separator also takes up an index and is appended at the end. */
add_separator(): void;

/** Clears all the items in the [OptionButton]. */
clear(): void;

/** Returns the amount of items in the OptionButton, including separators. */
get_item_count(): int;

/** Returns the icon of the item at index [code]idx[/code]. */
get_item_icon(idx: int): Texture;

/** Returns the ID of the item at index [code]idx[/code]. */
get_item_id(idx: int): int;

/** Returns the index of the item with the given [code]id[/code]. */
get_item_index(id: int): int;

/** Retrieves the metadata of an item. Metadata may be any type and can be used to store extra information about an item, such as an external string ID. */
get_item_metadata(idx: int): any;

/** Returns the text of the item at index [code]idx[/code]. */
get_item_text(idx: int): string;

/** Returns the [PopupMenu] contained in this button. */
get_popup(): PopupMenu;

/** Returns the ID of the selected item, or [code]0[/code] if no item is selected. */
get_selected_id(): int;

/** Gets the metadata of the selected item. Metadata for items can be set using [method set_item_metadata]. */
get_selected_metadata(): any;

/** Returns [code]true[/code] if the item at index [code]idx[/code] is disabled. */
is_item_disabled(idx: int): boolean;

/** Removes the item at index [code]idx[/code]. */
remove_item(idx: int): void;

/** Selects an item by index and makes it the current item. This will work even if the item is disabled. */
select(idx: int): void;

/**
 * Sets whether the item at index `idx` is disabled.
 *
 * Disabled items are drawn differently in the dropdown and are not selectable by the user. If the current selected item is set as disabled, it will remain selected.
 *
*/
set_item_disabled(idx: int, disabled: boolean): void;

/** Sets the icon of the item at index [code]idx[/code]. */
set_item_icon(idx: int, texture: Texture): void;

/** Sets the ID of the item at index [code]idx[/code]. */
set_item_id(idx: int, id: int): void;

/** Sets the metadata of an item. Metadata may be of any type and can be used to store extra information about an item, such as an external string ID. */
set_item_metadata(idx: int, metadata: any): void;

/** Sets the text of the item at index [code]idx[/code]. */
set_item_text(idx: int, text: string): void;

  // connect<T extends SignalsOf<OptionButton>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<OptionButtonSignals>>(signal: T, method: SignalFunction<OptionButtonSignals[T]>): number;




}

declare class OptionButtonSignals extends ButtonSignals {
  /**
 * Emitted when the user navigates to an item using the `ui_up` or `ui_down` actions. The index of the item selected is passed as argument.
 *
*/
item_focused: Signal<(index: int) => void>

/**
 * Emitted when the current item has been changed by the user. The index of the item selected is passed as argument.
 *
*/
item_selected: Signal<(index: int) => void>

}
