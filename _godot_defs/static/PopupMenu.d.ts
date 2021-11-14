
/**
 * [PopupMenu] is a [Control] that displays a list of options. They are popular in toolbars or context menus.
 *
*/
declare class PopupMenu extends Popup  {

  
/**
 * [PopupMenu] is a [Control] that displays a list of options. They are popular in toolbars or context menus.
 *
*/
  new(): PopupMenu; 
  static "new"(): PopupMenu 


/** If [code]true[/code], allows navigating [PopupMenu] with letter keys. */
allow_search: boolean;


/** If [code]true[/code], hides the [PopupMenu] when a checkbox or radio button is selected. */
hide_on_checkable_item_selection: boolean;

/** If [code]true[/code], hides the [PopupMenu] when an item is selected. */
hide_on_item_selection: boolean;

/** If [code]true[/code], hides the [PopupMenu] when a state item is selected. */
hide_on_state_item_selection: boolean;

/** Sets the delay time in seconds for the submenu item to popup on mouse hovering. If the popup menu is added as a child of another (acting as a submenu), it will inherit the delay time of the parent menu item. */
submenu_popup_delay: float;

/**
 * Adds a new checkable item with text `label`.
 *
 * An `id` can optionally be provided, as well as an accelerator (`accel`). If no `id` is provided, one will be created from the index. If no `accel` is provided then the default `0` will be assigned to it. See [method get_item_accelerator] for more info on accelerators.
 *
 * **Note:** Checkable items just display a checkmark, but don't have any built-in checking behavior and must be checked/unchecked manually. See [method set_item_checked] for more info on how to control it.
 *
*/
add_check_item(label: string, id?: int, accel?: int): void;

/**
 * Adds a new checkable item and assigns the specified [ShortCut] to it. Sets the label of the checkbox to the [ShortCut]'s name.
 *
 * An `id` can optionally be provided. If no `id` is provided, one will be created from the index.
 *
 * **Note:** Checkable items just display a checkmark, but don't have any built-in checking behavior and must be checked/unchecked manually. See [method set_item_checked] for more info on how to control it.
 *
*/
add_check_shortcut(shortcut: ShortCut, id?: int, global?: boolean): void;

/**
 * Adds a new checkable item with text `label` and icon `texture`.
 *
 * An `id` can optionally be provided, as well as an accelerator (`accel`). If no `id` is provided, one will be created from the index. If no `accel` is provided then the default `0` will be assigned to it. See [method get_item_accelerator] for more info on accelerators.
 *
 * **Note:** Checkable items just display a checkmark, but don't have any built-in checking behavior and must be checked/unchecked manually. See [method set_item_checked] for more info on how to control it.
 *
*/
add_icon_check_item(texture: Texture, label: string, id?: int, accel?: int): void;

/**
 * Adds a new checkable item and assigns the specified [ShortCut] and icon `texture` to it. Sets the label of the checkbox to the [ShortCut]'s name.
 *
 * An `id` can optionally be provided. If no `id` is provided, one will be created from the index.
 *
 * **Note:** Checkable items just display a checkmark, but don't have any built-in checking behavior and must be checked/unchecked manually. See [method set_item_checked] for more info on how to control it.
 *
*/
add_icon_check_shortcut(texture: Texture, shortcut: ShortCut, id?: int, global?: boolean): void;

/**
 * Adds a new item with text `label` and icon `texture`.
 *
 * An `id` can optionally be provided, as well as an accelerator (`accel`). If no `id` is provided, one will be created from the index. If no `accel` is provided then the default `0` will be assigned to it. See [method get_item_accelerator] for more info on accelerators.
 *
*/
add_icon_item(texture: Texture, label: string, id?: int, accel?: int): void;

/** Same as [method add_icon_check_item], but uses a radio check button. */
add_icon_radio_check_item(texture: Texture, label: string, id?: int, accel?: int): void;

/** Same as [method add_icon_check_shortcut], but uses a radio check button. */
add_icon_radio_check_shortcut(texture: Texture, shortcut: ShortCut, id?: int, global?: boolean): void;

/**
 * Adds a new item and assigns the specified [ShortCut] and icon `texture` to it. Sets the label of the checkbox to the [ShortCut]'s name.
 *
 * An `id` can optionally be provided. If no `id` is provided, one will be created from the index.
 *
*/
add_icon_shortcut(texture: Texture, shortcut: ShortCut, id?: int, global?: boolean): void;

/**
 * Adds a new item with text `label`.
 *
 * An `id` can optionally be provided, as well as an accelerator (`accel`). If no `id` is provided, one will be created from the index. If no `accel` is provided then the default `0` will be assigned to it. See [method get_item_accelerator] for more info on accelerators.
 *
*/
add_item(label: string, id?: int, accel?: int): void;

/**
 * Adds a new multistate item with text `label`.
 *
 * Contrarily to normal binary items, multistate items can have more than two states, as defined by `max_states`. Each press or activate of the item will increase the state by one. The default value is defined by `default_state`.
 *
 * An `id` can optionally be provided, as well as an accelerator (`accel`). If no `id` is provided, one will be created from the index. If no `accel` is provided then the default `0` will be assigned to it. See [method get_item_accelerator] for more info on accelerators.
 *
*/
add_multistate_item(label: string, max_states: int, default_state?: int, id?: int, accel?: int): void;

/**
 * Adds a new radio check button with text `label`.
 *
 * An `id` can optionally be provided, as well as an accelerator (`accel`). If no `id` is provided, one will be created from the index. If no `accel` is provided then the default `0` will be assigned to it. See [method get_item_accelerator] for more info on accelerators.
 *
 * **Note:** Checkable items just display a checkmark, but don't have any built-in checking behavior and must be checked/unchecked manually. See [method set_item_checked] for more info on how to control it.
 *
*/
add_radio_check_item(label: string, id?: int, accel?: int): void;

/**
 * Adds a new radio check button and assigns a [ShortCut] to it. Sets the label of the checkbox to the [ShortCut]'s name.
 *
 * An `id` can optionally be provided. If no `id` is provided, one will be created from the index.
 *
 * **Note:** Checkable items just display a checkmark, but don't have any built-in checking behavior and must be checked/unchecked manually. See [method set_item_checked] for more info on how to control it.
 *
*/
add_radio_check_shortcut(shortcut: ShortCut, id?: int, global?: boolean): void;

/**
 * Adds a separator between items. Separators also occupy an index, which you can set by using the `id` parameter.
 *
 * A `label` can optionally be provided, which will appear at the center of the separator.
 *
*/
add_separator(label?: string, id?: int): void;

/**
 * Adds a [ShortCut].
 *
 * An `id` can optionally be provided. If no `id` is provided, one will be created from the index.
 *
*/
add_shortcut(shortcut: ShortCut, id?: int, global?: boolean): void;

/**
 * Adds an item that will act as a submenu of the parent [PopupMenu] node when clicked. The `submenu` argument is the name of the child [PopupMenu] node that will be shown when the item is clicked.
 *
 * An `id` can optionally be provided. If no `id` is provided, one will be created from the index.
 *
*/
add_submenu_item(label: string, submenu: string, id?: int): void;

/** Removes all items from the [PopupMenu]. */
clear(): void;

/** Returns the index of the currently focused item. Returns [code]-1[/code] if no item is focused. */
get_current_index(): int;

/** Returns the accelerator of the item at index [code]idx[/code]. Accelerators are special combinations of keys that activate the item, no matter which control is focused. */
get_item_accelerator(idx: int): int;

/** Returns the number of items in the [PopupMenu]. */
get_item_count(): int;

/** Returns the icon of the item at index [code]idx[/code]. */
get_item_icon(idx: int): Texture;

/** Returns the id of the item at index [code]idx[/code]. [code]id[/code] can be manually assigned, while index can not. */
get_item_id(idx: int): int;

/** Returns the index of the item containing the specified [code]id[/code]. Index is automatically assigned to each item by the engine. Index can not be set manually. */
get_item_index(id: int): int;

/** Returns the metadata of the specified item, which might be of any type. You can set it with [method set_item_metadata], which provides a simple way of assigning context data to items. */
get_item_metadata(idx: int): any;

/** Returns the [ShortCut] associated with the specified [code]idx[/code] item. */
get_item_shortcut(idx: int): ShortCut;

/** Returns the submenu name of the item at index [code]idx[/code]. See [method add_submenu_item] for more info on how to add a submenu. */
get_item_submenu(idx: int): string;

/** Returns the text of the item at index [code]idx[/code]. */
get_item_text(idx: int): string;

/** Returns the tooltip associated with the specified index index [code]idx[/code]. */
get_item_tooltip(idx: int): string;

/** Returns [code]true[/code] if the popup will be hidden when the window loses focus or not. */
is_hide_on_window_lose_focus(): boolean;

/**
 * Returns `true` if the item at index `idx` is checkable in some way, i.e. if it has a checkbox or radio button.
 *
 * **Note:** Checkable items just display a checkmark or radio button, but don't have any built-in checking behavior and must be checked/unchecked manually.
 *
*/
is_item_checkable(idx: int): boolean;

/** Returns [code]true[/code] if the item at index [code]idx[/code] is checked. */
is_item_checked(idx: int): boolean;

/**
 * Returns `true` if the item at index `idx` is disabled. When it is disabled it can't be selected, or its action invoked.
 *
 * See [method set_item_disabled] for more info on how to disable an item.
 *
*/
is_item_disabled(idx: int): boolean;

/**
 * Returns `true` if the item at index `idx` has radio button-style checkability.
 *
 * **Note:** This is purely cosmetic; you must add the logic for checking/unchecking items in radio groups.
 *
*/
is_item_radio_checkable(idx: int): boolean;

/** Returns [code]true[/code] if the item is a separator. If it is, it will be displayed as a line. See [method add_separator] for more info on how to add a separator. */
is_item_separator(idx: int): boolean;

/** Returns [code]true[/code] if the specified item's shortcut is disabled. */
is_item_shortcut_disabled(idx: int): boolean;

/**
 * Removes the item at index `idx` from the menu.
 *
 * **Note:** The indices of items after the removed item will be shifted by one.
 *
*/
remove_item(idx: int): void;

/** Hides the [PopupMenu] when the window loses focus. */
set_hide_on_window_lose_focus(enable: boolean): void;

/** Sets the accelerator of the item at index [code]idx[/code]. Accelerators are special combinations of keys that activate the item, no matter which control is focused. */
set_item_accelerator(idx: int, accel: int): void;

/**
 * Sets whether the item at index `idx` has a checkbox. If `false`, sets the type of the item to plain text.
 *
 * **Note:** Checkable items just display a checkmark, but don't have any built-in checking behavior and must be checked/unchecked manually.
 *
*/
set_item_as_checkable(idx: int, enable: boolean): void;

/** Sets the type of the item at the specified index [code]idx[/code] to radio button. If [code]false[/code], sets the type of the item to plain text. */
set_item_as_radio_checkable(idx: int, enable: boolean): void;

/** Mark the item at index [code]idx[/code] as a separator, which means that it would be displayed as a line. If [code]false[/code], sets the type of the item to plain text. */
set_item_as_separator(idx: int, enable: boolean): void;

/** Sets the checkstate status of the item at index [code]idx[/code]. */
set_item_checked(idx: int, checked: boolean): void;

/** Enables/disables the item at index [code]idx[/code]. When it is disabled, it can't be selected and its action can't be invoked. */
set_item_disabled(idx: int, disabled: boolean): void;

/** Replaces the [Texture] icon of the specified [code]idx[/code]. */
set_item_icon(idx: int, icon: Texture): void;

/** Sets the [code]id[/code] of the item at index [code]idx[/code]. */
set_item_id(idx: int, id: int): void;

/** Sets the metadata of an item, which may be of any type. You can later get it with [method get_item_metadata], which provides a simple way of assigning context data to items. */
set_item_metadata(idx: int, metadata: any): void;

/** Sets the state of a multistate item. See [method add_multistate_item] for details. */
set_item_multistate(idx: int, state: int): void;

/** Sets a [ShortCut] for the specified item [code]idx[/code]. */
set_item_shortcut(idx: int, shortcut: ShortCut, global?: boolean): void;

/** Disables the [ShortCut] of the specified index [code]idx[/code]. */
set_item_shortcut_disabled(idx: int, disabled: boolean): void;

/** Sets the submenu of the item at index [code]idx[/code]. The submenu is the name of a child [PopupMenu] node that would be shown when the item is clicked. */
set_item_submenu(idx: int, submenu: string): void;

/** Sets the text of the item at index [code]idx[/code]. */
set_item_text(idx: int, text: string): void;

/** Sets the [String] tooltip of the item at the specified index [code]idx[/code]. */
set_item_tooltip(idx: int, tooltip: string): void;

/** Toggles the check state of the item of the specified index [code]idx[/code]. */
toggle_item_checked(idx: int): void;

/** Cycle to the next state of a multistate item. See [method add_multistate_item] for details. */
toggle_item_multistate(idx: int): void;

  connect<T extends SignalsOf<PopupMenu>>(signal: T, method: SignalFunction<PopupMenu[T]>): number;





/**
 * Emitted when user navigated to an item of some `id` using `ui_up` or `ui_down` action.
 *
*/
$id_focused: Signal<(id: int) => void>

/**
 * Emitted when an item of some `id` is pressed or its accelerator is activated.
 *
*/
$id_pressed: Signal<(id: int) => void>

/**
 * Emitted when an item of some `index` is pressed or its accelerator is activated.
 *
*/
$index_pressed: Signal<(index: int) => void>

}

