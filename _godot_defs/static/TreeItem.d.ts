
/**
 * Control for a single item inside a [Tree]. May have child [TreeItem]s and be styled as well as contain buttons.
 *
 * You can remove a [TreeItem] by using [method Object.free].
 *
*/
declare class TreeItem extends Object {

  
/**
 * Control for a single item inside a [Tree]. May have child [TreeItem]s and be styled as well as contain buttons.
 *
 * You can remove a [TreeItem] by using [method Object.free].
 *
*/
  "new"(): TreeItem;
  static "new"(): TreeItem;



/** If [code]true[/code], the TreeItem is collapsed. */
collapsed: boolean;

/** The custom minimum height. */
custom_minimum_height: int;

/** If [code]true[/code], folding is disabled for this TreeItem. */
disable_folding: boolean;

/** Adds a button with [Texture] [code]button[/code] at column [code]column[/code]. The [code]button_idx[/code] index is used to identify the button when calling other methods. If not specified, the next available index is used, which may be retrieved by calling [method get_button_count] immediately after this method. Optionally, the button can be [code]disabled[/code] and have a [code]tooltip[/code]. */
add_button(column: int, button: Texture, button_idx?: int, disabled?: boolean, tooltip?: string): void;

/** Calls the [code]method[/code] on the actual TreeItem and its children recursively. Pass parameters as a comma separated list. */
call_recursive(...args: any[]): any;

/** Resets the background color for the given column to default. */
clear_custom_bg_color(column: int): void;

/** Resets the color for the given column to default. */
clear_custom_color(column: int): void;

/** Deselects the given column. */
deselect(column: int): void;

/** Removes the button at index [code]button_idx[/code] in column [code]column[/code]. */
erase_button(column: int, button_idx: int): void;

/** Returns the [Texture] of the button at index [code]button_idx[/code] in column [code]column[/code]. */
get_button(column: int, button_idx: int): Texture;

/** Returns the number of buttons in column [code]column[/code]. May be used to get the most recently added button's index, if no index was specified. */
get_button_count(column: int): int;

/** Returns the tooltip string for the button at index [code]button_idx[/code] in column [code]column[/code]. */
get_button_tooltip(column: int, button_idx: int): string;

/** Returns the column's cell mode. */
get_cell_mode(column: int): int;

/** Returns the TreeItem's first child item or a null object if there is none. */
get_children(): TreeItem;

/** Returns the custom background color of column [code]column[/code]. */
get_custom_bg_color(column: int): Color;

/** Returns the custom color of column [code]column[/code]. */
get_custom_color(column: int): Color;

/** Returns [code]true[/code] if [code]expand_right[/code] is set. */
get_expand_right(column: int): boolean;

/** Returns the given column's icon [Texture]. Error if no icon is set. */
get_icon(column: int): Texture;

/** Returns the column's icon's maximum width. */
get_icon_max_width(column: int): int;

/** Returns the [Color] modulating the column's icon. */
get_icon_modulate(column: int): Color;

/** Returns the icon [Texture] region as [Rect2]. */
get_icon_region(column: int): Rect2;

/** Returns the metadata value that was set for the given column using [method set_metadata]. */
get_metadata(column: int): any;

/** Returns the next TreeItem in the tree or a null object if there is none. */
get_next(): TreeItem;

/**
 * Returns the next visible TreeItem in the tree or a null object if there is none.
 *
 * If `wrap` is enabled, the method will wrap around to the first visible element in the tree when called on the last visible element, otherwise it returns `null`.
 *
*/
get_next_visible(wrap?: boolean): TreeItem;

/** Returns the parent TreeItem or a null object if there is none. */
get_parent(): TreeItem;

/** Returns the previous TreeItem in the tree or a null object if there is none. */
get_prev(): TreeItem;

/**
 * Returns the previous visible TreeItem in the tree or a null object if there is none.
 *
 * If `wrap` is enabled, the method will wrap around to the last visible element in the tree when called on the first visible element, otherwise it returns `null`.
 *
*/
get_prev_visible(wrap?: boolean): TreeItem;

/** Returns the value of a [constant CELL_MODE_RANGE] column. */
get_range(column: int): float;

/** Returns a dictionary containing the range parameters for a given column. The keys are "min", "max", "step", and "expr". */
get_range_config(column: int): Dictionary<any, any>;

/** Gets the suffix string shown after the column value. */
get_suffix(column: int): string;

/** Returns the given column's text. */
get_text(column: int): string;

/** Returns the given column's text alignment. */
get_text_align(column: int): int;

/** Returns the given column's tooltip. */
get_tooltip(column: int): string;

/** Returns [code]true[/code] if the button at index [code]button_idx[/code] for the given column is disabled. */
is_button_disabled(column: int, button_idx: int): boolean;

/** Returns [code]true[/code] if the given column is checked. */
is_checked(column: int): boolean;

/** No documentation provided. */
is_custom_set_as_button(column: int): boolean;

/** Returns [code]true[/code] if column [code]column[/code] is editable. */
is_editable(column: int): boolean;

/** Returns [code]true[/code] if column [code]column[/code] is selectable. */
is_selectable(column: int): boolean;

/** Returns [code]true[/code] if column [code]column[/code] is selected. */
is_selected(column: int): boolean;

/** Moves this TreeItem to the bottom in the [Tree] hierarchy. */
move_to_bottom(): void;

/** Moves this TreeItem to the top in the [Tree] hierarchy. */
move_to_top(): void;

/** Removes the given child [TreeItem] and all its children from the [Tree]. Note that it doesn't free the item from memory, so it can be reused later. To completely remove a [TreeItem] use [method Object.free]. */
remove_child(child: Object): void;

/** Selects the column [code]column[/code]. */
select(column: int): void;

/** Sets the given column's button [Texture] at index [code]button_idx[/code] to [code]button[/code]. */
set_button(column: int, button_idx: int, button: Texture): void;

/** If [code]true[/code], disables the button at index [code]button_idx[/code] in column [code]column[/code]. */
set_button_disabled(column: int, button_idx: int, disabled: boolean): void;

/** Sets the given column's cell mode to [code]mode[/code]. See [enum TreeCellMode] constants. */
set_cell_mode(column: int, mode: int): void;

/** If [code]true[/code], the column [code]column[/code] is checked. */
set_checked(column: int, checked: boolean): void;

/** No documentation provided. */
set_custom_as_button(column: int, enable: boolean): void;

/** Sets the given column's custom background color and whether to just use it as an outline. */
set_custom_bg_color(column: int, color: Color, just_outline?: boolean): void;

/** Sets the given column's custom color. */
set_custom_color(column: int, color: Color): void;

/**
 * Sets the given column's custom draw callback to `callback` method on `object`.
 *
 * The `callback` should accept two arguments: the [TreeItem] that is drawn and its position and size as a [Rect2].
 *
*/
set_custom_draw(column: int, object: Object, callback: string): void;

/** If [code]true[/code], column [code]column[/code] is editable. */
set_editable(column: int, enabled: boolean): void;

/** If [code]true[/code], column [code]column[/code] is expanded to the right. */
set_expand_right(column: int, enable: boolean): void;

/** Sets the given column's icon [Texture]. */
set_icon(column: int, texture: Texture): void;

/** Sets the given column's icon's maximum width. */
set_icon_max_width(column: int, width: int): void;

/** Modulates the given column's icon with [code]modulate[/code]. */
set_icon_modulate(column: int, modulate: Color): void;

/** Sets the given column's icon's texture region. */
set_icon_region(column: int, region: Rect2): void;

/** Sets the metadata value for the given column, which can be retrieved later using [method get_metadata]. This can be used, for example, to store a reference to the original data. */
set_metadata(column: int, meta: any): void;

/** Sets the value of a [constant CELL_MODE_RANGE] column. */
set_range(column: int, value: float): void;

/**
 * Sets the range of accepted values for a column. The column must be in the [constant CELL_MODE_RANGE] mode.
 *
 * If `expr` is `true`, the edit mode slider will use an exponential scale as with [member Range.exp_edit].
 *
*/
set_range_config(column: int, min: float, max: float, step: float, expr?: boolean): void;

/** If [code]true[/code], the given column is selectable. */
set_selectable(column: int, selectable: boolean): void;

/** Sets a string to be shown after a column's value (for example, a unit abbreviation). */
set_suffix(column: int, text: string): void;

/** Sets the given column's text value. */
set_text(column: int, text: string): void;

/** Sets the given column's text alignment. See [enum TextAlign] for possible values. */
set_text_align(column: int, text_align: int): void;

/** Sets the given column's tooltip text. */
set_tooltip(column: int, tooltip: string): void;

  // connect<T extends SignalsOf<TreeItem>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<TreeItemSignals>>(signal: T, method: SignalFunction<TreeItemSignals[T]>): number;



/**
 * Cell contains a string.
 *
*/
static CELL_MODE_STRING: any;

/**
 * Cell contains a checkbox.
 *
*/
static CELL_MODE_CHECK: any;

/**
 * Cell contains a range.
 *
*/
static CELL_MODE_RANGE: any;

/**
 * Cell contains an icon.
 *
*/
static CELL_MODE_ICON: any;

/** No documentation provided. */
static CELL_MODE_CUSTOM: any;

/**
 * Align text to the left. See `set_text_align()`.
 *
*/
static ALIGN_LEFT: any;

/**
 * Center text. See `set_text_align()`.
 *
*/
static ALIGN_CENTER: any;

/**
 * Align text to the right. See `set_text_align()`.
 *
*/
static ALIGN_RIGHT: any;

}

declare class TreeItemSignals extends ObjectSignals {
  
}
