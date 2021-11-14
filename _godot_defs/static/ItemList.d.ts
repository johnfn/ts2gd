
/**
 * This control provides a selectable list of items that may be in a single (or multiple columns) with option of text, icons, or both text and icon. Tooltips are supported and may be different for every item in the list.
 *
 * Selectable items in the list may be selected or deselected and multiple selection may be enabled. Selection with right mouse button may also be enabled to allow use of popup context menus. Items may also be "activated" by double-clicking them or by pressing Enter.
 *
 * Item text only supports single-line strings, newline characters (e.g. `\n`) in the string won't produce a newline. Text wrapping is enabled in [constant ICON_MODE_TOP] mode, but column's width is adjusted to fully fit its content by default. You need to set [member fixed_column_width] greater than zero to wrap the text.
 *
*/
declare class ItemList extends Control  {

  
/**
 * This control provides a selectable list of items that may be in a single (or multiple columns) with option of text, icons, or both text and icon. Tooltips are supported and may be different for every item in the list.
 *
 * Selectable items in the list may be selected or deselected and multiple selection may be enabled. Selection with right mouse button may also be enabled to allow use of popup context menus. Items may also be "activated" by double-clicking them or by pressing Enter.
 *
 * Item text only supports single-line strings, newline characters (e.g. `\n`) in the string won't produce a newline. Text wrapping is enabled in [constant ICON_MODE_TOP] mode, but column's width is adjusted to fully fit its content by default. You need to set [member fixed_column_width] greater than zero to wrap the text.
 *
*/
  new(): ItemList; 
  static "new"(): ItemList 


/** If [code]true[/code], the currently selected item can be selected again. */
allow_reselect: boolean;

/** If [code]true[/code], right mouse button click can select items. */
allow_rmb_select: boolean;

/** If [code]true[/code], the control will automatically resize the height to fit its content. */
auto_height: boolean;

/**
 * The width all columns will be adjusted to.
 *
 * A value of zero disables the adjustment, each item will have a width equal to the width of its content and the columns will have an uneven width.
 *
*/
fixed_column_width: int;

/**
 * The size all icons will be adjusted to.
 *
 * If either X or Y component is not greater than zero, icon size won't be affected.
 *
*/
fixed_icon_size: Vector2;


/** The icon position, whether above or to the left of the text. See the [enum IconMode] constants. */
icon_mode: int;

/** The scale of icon applied after [member fixed_icon_size] and transposing takes effect. */
icon_scale: float;

/**
 * Maximum columns the list will have.
 *
 * If greater than zero, the content will be split among the specified columns.
 *
 * A value of zero means unlimited columns, i.e. all items will be put in the same row.
 *
*/
max_columns: int;

/**
 * Maximum lines of text allowed in each item. Space will be reserved even when there is not enough lines of text to display.
 *
 * **Note:** This property takes effect only when [member icon_mode] is [constant ICON_MODE_TOP]. To make the text wrap, [member fixed_column_width] should be greater than zero.
 *
*/
max_text_lines: int;


/**
 * Whether all columns will have the same width.
 *
 * If `true`, the width is equal to the largest column width of all columns.
 *
*/
same_column_width: boolean;

/** Allows single or multiple item selection. See the [enum SelectMode] constants. */
select_mode: int;

/** Adds an item to the item list with no text, only an icon. */
add_icon_item(icon: Texture, selectable?: boolean): void;

/**
 * Adds an item to the item list with specified text. Specify an `icon`, or use `null` as the `icon` for a list item with no icon.
 *
 * If selectable is `true`, the list item will be selectable.
 *
*/
add_item(text: string, icon?: Texture, selectable?: boolean): void;

/** Removes all items from the list. */
clear(): void;

/** Ensure current selection is visible, adjusting the scroll position as necessary. */
ensure_current_is_visible(): void;

/**
 * Returns the item index at the given `position`.
 *
 * When there is no item at that point, -1 will be returned if `exact` is `true`, and the closest item index will be returned otherwise.
 *
*/
get_item_at_position(position: Vector2, exact?: boolean): int;

/** Returns the number of items currently in the list. */
get_item_count(): int;

/** Returns the custom background color of the item specified by [code]idx[/code] index. */
get_item_custom_bg_color(idx: int): Color;

/** Returns the custom foreground color of the item specified by [code]idx[/code] index. */
get_item_custom_fg_color(idx: int): Color;

/** Returns the icon associated with the specified index. */
get_item_icon(idx: int): Texture;

/** Returns a [Color] modulating item's icon at the specified index. */
get_item_icon_modulate(idx: int): Color;

/** Returns the region of item's icon used. The whole icon will be used if the region has no area. */
get_item_icon_region(idx: int): Rect2;

/** Returns the metadata value of the specified index. */
get_item_metadata(idx: int): any;

/** Returns the text associated with the specified index. */
get_item_text(idx: int): string;

/** Returns the tooltip hint associated with the specified index. */
get_item_tooltip(idx: int): string;

/** Returns an array with the indexes of the selected items. */
get_selected_items(): PoolIntArray;

/**
 * Returns the [Object] ID associated with the list.
 *
 * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their [member CanvasItem.visible] property.
 *
*/
get_v_scroll(): VScrollBar;

/** Returns [code]true[/code] if one or more items are selected. */
is_anything_selected(): boolean;

/** Returns [code]true[/code] if the item at the specified index is disabled. */
is_item_disabled(idx: int): boolean;

/** Returns [code]true[/code] if the item icon will be drawn transposed, i.e. the X and Y axes are swapped. */
is_item_icon_transposed(idx: int): boolean;

/** Returns [code]true[/code] if the item at the specified index is selectable. */
is_item_selectable(idx: int): boolean;

/** Returns [code]true[/code] if the tooltip is enabled for specified item index. */
is_item_tooltip_enabled(idx: int): boolean;

/** Returns [code]true[/code] if the item at the specified index is currently selected. */
is_selected(idx: int): boolean;

/** Moves item from index [code]from_idx[/code] to [code]to_idx[/code]. */
move_item(from_idx: int, to_idx: int): void;

/** Removes the item specified by [code]idx[/code] index from the list. */
remove_item(idx: int): void;

/**
 * Select the item at the specified index.
 *
 * **Note:** This method does not trigger the item selection signal.
 *
*/
select(idx: int, single?: boolean): void;

/** Sets the background color of the item specified by [code]idx[/code] index to the specified [Color]. */
set_item_custom_bg_color(idx: int, custom_bg_color: Color): void;

/** Sets the foreground color of the item specified by [code]idx[/code] index to the specified [Color]. */
set_item_custom_fg_color(idx: int, custom_fg_color: Color): void;

/**
 * Disables (or enables) the item at the specified index.
 *
 * Disabled items cannot be selected and do not trigger activation signals (when double-clicking or pressing Enter).
 *
*/
set_item_disabled(idx: int, disabled: boolean): void;

/** Sets (or replaces) the icon's [Texture] associated with the specified index. */
set_item_icon(idx: int, icon: Texture): void;

/** Sets a modulating [Color] of the item associated with the specified index. */
set_item_icon_modulate(idx: int, modulate: Color): void;

/** Sets the region of item's icon used. The whole icon will be used if the region has no area. */
set_item_icon_region(idx: int, rect: Rect2): void;

/** Sets whether the item icon will be drawn transposed. */
set_item_icon_transposed(idx: int, transposed: boolean): void;

/** Sets a value (of any type) to be stored with the item associated with the specified index. */
set_item_metadata(idx: int, metadata: any): void;

/** Allows or disallows selection of the item associated with the specified index. */
set_item_selectable(idx: int, selectable: boolean): void;

/** Sets text of the item associated with the specified index. */
set_item_text(idx: int, text: string): void;

/** Sets the tooltip hint for the item associated with the specified index. */
set_item_tooltip(idx: int, tooltip: string): void;

/** Sets whether the tooltip hint is enabled for specified item index. */
set_item_tooltip_enabled(idx: int, enable: boolean): void;

/** Sorts items in the list by their text. */
sort_items_by_text(): void;

/** Ensures the item associated with the specified index is not selected. */
unselect(idx: int): void;

/** Ensures there are no items selected. */
unselect_all(): void;

  connect<T extends SignalsOf<ItemList>>(signal: T, method: SignalFunction<ItemList[T]>): number;



/**
 * Icon is drawn above the text.
 *
*/
static ICON_MODE_TOP: any;

/**
 * Icon is drawn to the left of the text.
 *
*/
static ICON_MODE_LEFT: any;

/**
 * Only allow selecting a single item.
 *
*/
static SELECT_SINGLE: any;

/**
 * Allows selecting multiple items by holding Ctrl or Shift.
 *
*/
static SELECT_MULTI: any;


/**
 * Triggered when specified list item is activated via double-clicking or by pressing Enter.
 *
*/
$item_activated: Signal<(index: int) => void>

/**
 * Triggered when specified list item has been selected via right mouse clicking.
 *
 * The click position is also provided to allow appropriate popup of context menus at the correct location.
 *
 * [member allow_rmb_select] must be enabled.
 *
*/
$item_rmb_selected: Signal<(index: int, at_position: Vector2) => void>

/**
 * Triggered when specified item has been selected.
 *
 * [member allow_reselect] must be enabled to reselect an item.
 *
*/
$item_selected: Signal<(index: int) => void>

/**
 * Triggered when a multiple selection is altered on a list allowing multiple selection.
 *
*/
$multi_selected: Signal<(index: int, selected: boolean) => void>

/**
 * Triggered when a left mouse click is issued within the rect of the list but on empty space.
 *
*/
$nothing_selected: Signal<() => void>

/**
 * Triggered when a right mouse click is issued within the rect of the list but on empty space.
 *
 * [member allow_rmb_select] must be enabled.
 *
*/
$rmb_clicked: Signal<(at_position: Vector2) => void>

}

