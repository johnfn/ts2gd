
/**
 * This shows a tree of items that can be selected, expanded and collapsed. The tree can have multiple columns with custom controls like text editing, buttons and popups. It can be useful for structured displays and interactions.
 *
 * Trees are built via code, using [TreeItem] objects to create the structure. They have a single root but multiple roots can be simulated if a dummy hidden root is added.
 *
 * @example 
 * 
 * func _ready():
 *     var tree = Tree.new()
 *     var root = tree.create_item()
 *     tree.set_hide_root(true)
 *     var child1 = tree.create_item(root)
 *     var child2 = tree.create_item(root)
 *     var subchild1 = tree.create_item(child1)
 *     subchild1.set_text(0, "Subchild1")
 * @summary 
 * 
 *
 * To iterate over all the [TreeItem] objects in a [Tree] object, use [method TreeItem.get_next] and [method TreeItem.get_children] after getting the root through [method get_root]. You can use [method Object.free] on a [TreeItem] to remove it from the [Tree].
 *
*/
declare class Tree extends Control  {

  
/**
 * This shows a tree of items that can be selected, expanded and collapsed. The tree can have multiple columns with custom controls like text editing, buttons and popups. It can be useful for structured displays and interactions.
 *
 * Trees are built via code, using [TreeItem] objects to create the structure. They have a single root but multiple roots can be simulated if a dummy hidden root is added.
 *
 * @example 
 * 
 * func _ready():
 *     var tree = Tree.new()
 *     var root = tree.create_item()
 *     tree.set_hide_root(true)
 *     var child1 = tree.create_item(root)
 *     var child2 = tree.create_item(root)
 *     var subchild1 = tree.create_item(child1)
 *     subchild1.set_text(0, "Subchild1")
 * @summary 
 * 
 *
 * To iterate over all the [TreeItem] objects in a [Tree] object, use [method TreeItem.get_next] and [method TreeItem.get_children] after getting the root through [method get_root]. You can use [method Object.free] on a [TreeItem] to remove it from the [Tree].
 *
*/
  new(): Tree; 
  static "new"(): Tree 


/** If [code]true[/code], the currently selected cell may be selected again. */
allow_reselect: boolean;

/** If [code]true[/code], a right mouse button click can select items. */
allow_rmb_select: boolean;

/** The number of columns. */
columns: int;

/**
 * The drop mode as an OR combination of flags. See [enum DropModeFlags] constants. Once dropping is done, reverts to [constant DROP_MODE_DISABLED]. Setting this during [method Control.can_drop_data] is recommended.
 *
 * This controls the drop sections, i.e. the decision and drawing of possible drop locations based on the mouse position.
 *
*/
drop_mode_flags: int;


/** If [code]true[/code], the folding arrow is hidden. */
hide_folding: boolean;

/** If [code]true[/code], the tree's root is hidden. */
hide_root: boolean;


/** Allows single or multiple selection. See the [enum SelectMode] constants. */
select_mode: int;

/** Returns [code]true[/code] if the column titles are being shown. */
are_column_titles_visible(): boolean;

/** Clears the tree. This removes all items. */
clear(): void;

/**
 * Creates an item in the tree and adds it as a child of `parent`.
 *
 * If `parent` is `null`, the root item will be the parent, or the new item will be the root itself if the tree is empty.
 *
 * The new item will be the `idx`th child of parent, or it will be the last child if there are not enough siblings.
 *
*/
create_item(parent?: Object, idx?: int): TreeItem;

/** Edits the selected tree item as if it was clicked. The item must be set editable with [method TreeItem.set_editable]. Returns [code]true[/code] if the item could be edited. Fails if no item is selected. */
edit_selected(): boolean;

/**
 * Makes the currently focused cell visible.
 *
 * This will scroll the tree if necessary. In [constant SELECT_ROW] mode, this will not do horizontal scrolling, as all the cells in the selected row is focused logically.
 *
 * **Note:** Despite the name of this method, the focus cursor itself is only visible in [constant SELECT_MULTI] mode.
 *
*/
ensure_cursor_is_visible(): void;

/** Returns the column index at [code]position[/code], or -1 if no item is there. */
get_column_at_position(position: Vector2): int;

/** Returns the column's title. */
get_column_title(column: int): string;

/** Returns the column's width in pixels. */
get_column_width(column: int): int;

/** Returns the rectangle for custom popups. Helper to create custom cell controls that display a popup. See [method TreeItem.set_cell_mode]. */
get_custom_popup_rect(): Rect2;

/**
 * Returns the drop section at `position`, or -100 if no item is there.
 *
 * Values -1, 0, or 1 will be returned for the "above item", "on item", and "below item" drop sections, respectively. See [enum DropModeFlags] for a description of each drop section.
 *
 * To get the item which the returned drop section is relative to, use [method get_item_at_position].
 *
*/
get_drop_section_at_position(position: Vector2): int;

/**
 * Returns the currently edited item. Can be used with [signal item_edited] to get the item that was modified.
 *
 * @example 
 * 
 * func _ready():
 *     $Tree.item_edited.connect(on_Tree_item_edited)
 * func on_Tree_item_edited():
 *     print($Tree.get_edited()) # This item just got edited (e.g. checked).
 * @summary 
 * 
 *
*/
get_edited(): TreeItem;

/** Returns the column for the currently edited item. */
get_edited_column(): int;

/** Returns the rectangle area for the specified item. If [code]column[/code] is specified, only get the position and size of that column, otherwise get the rectangle containing all columns. */
get_item_area_rect(item: Object, column?: int): Rect2;

/** Returns the tree item at the specified position (relative to the tree origin position). */
get_item_at_position(position: Vector2): TreeItem;

/**
 * Returns the next selected item after the given one, or `null` if the end is reached.
 *
 * If `from` is `null`, this returns the first selected item.
 *
*/
get_next_selected(from: Object): TreeItem;

/** Returns the last pressed button's index. */
get_pressed_button(): int;

/** Returns the tree's root item, or [code]null[/code] if the tree is empty. */
get_root(): TreeItem;

/** Returns the current scrolling position. */
get_scroll(): Vector2;

/**
 * Returns the currently focused item, or `null` if no item is focused.
 *
 * In [constant SELECT_ROW] and [constant SELECT_SINGLE] modes, the focused item is same as the selected item. In [constant SELECT_MULTI] mode, the focused item is the item under the focus cursor, not necessarily selected.
 *
 * To get the currently selected item(s), use [method get_next_selected].
 *
*/
get_selected(): TreeItem;

/**
 * Returns the currently focused column, or -1 if no column is focused.
 *
 * In [constant SELECT_SINGLE] mode, the focused column is the selected column. In [constant SELECT_ROW] mode, the focused column is always 0 if any item is selected. In [constant SELECT_MULTI] mode, the focused column is the column under the focus cursor, and there are not necessarily any column selected.
 *
 * To tell whether a column of an item is selected, use [method TreeItem.is_selected].
 *
*/
get_selected_column(): int;

/** Causes the [Tree] to jump to the specified item. */
scroll_to_item(item: Object): void;

/** If [code]true[/code], the column will have the "Expand" flag of [Control]. Columns that have the "Expand" flag will use their "min_width" in a similar fashion to [member Control.size_flags_stretch_ratio]. */
set_column_expand(column: int, expand: boolean): void;

/** Sets the minimum width of a column. Columns that have the "Expand" flag will use their "min_width" in a similar fashion to [member Control.size_flags_stretch_ratio]. */
set_column_min_width(column: int, min_width: int): void;

/** Sets the title of a column. */
set_column_title(column: int, title: string): void;

/** If [code]true[/code], column titles are visible. */
set_column_titles_visible(visible: boolean): void;

  connect<T extends SignalsOf<Tree>>(signal: T, method: SignalFunction<Tree[T]>): number;



/**
 * Allows selection of a single cell at a time. From the perspective of items, only a single item is allowed to be selected. And there is only one column selected in the selected item.
 *
 * The focus cursor is always hidden in this mode, but it is positioned at the current selection, making the currently selected item the currently focused item.
 *
*/
static SELECT_SINGLE: any;

/**
 * Allows selection of a single row at a time. From the perspective of items, only a single items is allowed to be selected. And all the columns are selected in the selected item.
 *
 * The focus cursor is always hidden in this mode, but it is positioned at the first column of the current selection, making the currently selected item the currently focused item.
 *
*/
static SELECT_ROW: any;

/**
 * Allows selection of multiple cells at the same time. From the perspective of items, multiple items are allowed to be selected. And there can be multiple columns selected in each selected item.
 *
 * The focus cursor is visible in this mode, the item or column under the cursor is not necessarily selected.
 *
*/
static SELECT_MULTI: any;

/**
 * Disables all drop sections, but still allows to detect the "on item" drop section by [method get_drop_section_at_position].
 *
 * **Note:** This is the default flag, it has no effect when combined with other flags.
 *
*/
static DROP_MODE_DISABLED: any;

/**
 * Enables the "on item" drop section. This drop section covers the entire item.
 *
 * When combined with [constant DROP_MODE_INBETWEEN], this drop section halves the height and stays centered vertically.
 *
*/
static DROP_MODE_ON_ITEM: any;

/**
 * Enables "above item" and "below item" drop sections. The "above item" drop section covers the top half of the item, and the "below item" drop section covers the bottom half.
 *
 * When combined with [constant DROP_MODE_ON_ITEM], these drop sections halves the height and stays on top / bottom accordingly.
 *
*/
static DROP_MODE_INBETWEEN: any;


/**
 * Emitted when a button on the tree was pressed (see [method TreeItem.add_button]).
 *
*/
$button_pressed: Signal<(item: TreeItem, column: int, id: int) => void>

/**
 * Emitted when a cell is selected.
 *
*/
$cell_selected: Signal<() => void>

/**
 * Emitted when a column's title is pressed.
 *
*/
$column_title_pressed: Signal<(column: int) => void>

/**
 * Emitted when a cell with the [constant TreeItem.CELL_MODE_CUSTOM] is clicked to be edited.
 *
*/
$custom_popup_edited: Signal<(arrow_clicked: boolean) => void>

/**
 * Emitted when the right mouse button is pressed in the empty space of the tree.
 *
*/
$empty_rmb: Signal<(position: Vector2) => void>

/**
 * Emitted when the right mouse button is pressed if right mouse button selection is active and the tree is empty.
 *
*/
$empty_tree_rmb_selected: Signal<(position: Vector2) => void>

/**
 * Emitted when an item's label is double-clicked.
 *
*/
$item_activated: Signal<() => void>

/**
 * Emitted when an item is collapsed by a click on the folding arrow.
 *
*/
$item_collapsed: Signal<(item: TreeItem) => void>

/**
 * Emitted when a custom button is pressed (i.e. in a [constant TreeItem.CELL_MODE_CUSTOM] mode cell).
 *
*/
$item_custom_button_pressed: Signal<() => void>

/**
 * Emitted when an item's icon is double-clicked.
 *
*/
$item_double_clicked: Signal<() => void>

/**
 * Emitted when an item is edited.
 *
*/
$item_edited: Signal<() => void>

/**
 * Emitted when an item is edited using the right mouse button.
 *
*/
$item_rmb_edited: Signal<() => void>

/**
 * Emitted when an item is selected with the right mouse button.
 *
*/
$item_rmb_selected: Signal<(position: Vector2) => void>

/**
 * Emitted when an item is selected.
 *
*/
$item_selected: Signal<() => void>

/**
 * Emitted instead of `item_selected` if `select_mode` is [constant SELECT_MULTI].
 *
*/
$multi_selected: Signal<(item: TreeItem, column: int, selected: boolean) => void>

/**
 * Emitted when a left mouse button click does not select any item.
 *
*/
$nothing_selected: Signal<() => void>

}

