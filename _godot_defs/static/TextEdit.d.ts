
/**
 * TextEdit is meant for editing large, multiline text. It also has facilities for editing code, such as syntax highlighting support and multiple levels of undo/redo.
 *
 * **Note:** When holding down `Alt`, the vertical scroll wheel will scroll 5 times as fast as it would normally do. This also works in the Godot script editor.
 *
*/
declare class TextEdit extends Control {

  
/**
 * TextEdit is meant for editing large, multiline text. It also has facilities for editing code, such as syntax highlighting support and multiple levels of undo/redo.
 *
 * **Note:** When holding down `Alt`, the vertical scroll wheel will scroll 5 times as fast as it would normally do. This also works in the Godot script editor.
 *
*/
  "new"(): TextEdit;
  static "new"(): TextEdit;



/** If [code]true[/code], the breakpoint gutter is visible. */
breakpoint_gutter: boolean;

/** If [code]true[/code], the caret (visual cursor) blinks. */
caret_blink: boolean;

/** Duration (in seconds) of a caret's blinking cycle. */
caret_blink_speed: float;

/**
 * If `true`, the caret displays as a rectangle.
 *
 * If `false`, the caret displays as a bar.
 *
*/
caret_block_mode: boolean;

/**
 * If `true`, a right-click moves the cursor at the mouse position before displaying the context menu.
 *
 * If `false`, the context menu disregards mouse location.
 *
*/
caret_moving_by_right_click: boolean;

/** If [code]true[/code], a right-click displays the context menu. */
context_menu_enabled: boolean;

/** If [code]true[/code], the "space" character will have a visible representation. */
draw_spaces: boolean;

/** If [code]true[/code], the "tab" character will have a visible representation. */
draw_tabs: boolean;


/** If [code]true[/code], the fold gutter is visible. This enables folding groups of indented lines. */
fold_gutter: boolean;

/** If [code]true[/code], all lines that have been set to hidden by [method set_line_as_hidden], will not be visible. */
hiding_enabled: boolean;

/** If [code]true[/code], all occurrences of the selected text will be highlighted. */
highlight_all_occurrences: boolean;

/** If [code]true[/code], the line containing the cursor is highlighted. */
highlight_current_line: boolean;

/** If [code]true[/code], a minimap is shown, providing an outline of your source code. */
minimap_draw: boolean;

/** The width, in pixels, of the minimap. */
minimap_width: int;


/** If [code]true[/code], custom [code]font_color_selected[/code] will be used for selected text. */
override_selected_font_color: boolean;

/** If [code]true[/code], read-only mode is enabled. Existing text cannot be modified and new text cannot be added. */
readonly: boolean;

/** If there is a horizontal scrollbar, this determines the current horizontal scroll value in pixels. */
scroll_horizontal: int;

/** If there is a vertical scrollbar, this determines the current vertical scroll value in line numbers, starting at 0 for the top line. */
scroll_vertical: float;

/**
 * If `true`, text can be selected.
 *
 * If `false`, text can not be selected by the user or by the [method select] or [method select_all] methods.
 *
*/
selecting_enabled: boolean;

/** If [code]true[/code], shortcut keys for context menu items are enabled, even if the context menu is disabled. */
shortcut_keys_enabled: boolean;

/** If [code]true[/code], line numbers are displayed to the left of the text. */
show_line_numbers: boolean;

/** If [code]true[/code], sets the [code]step[/code] of the scrollbars to [code]0.25[/code] which results in smoother scrolling. */
smooth_scrolling: boolean;

/** If [code]true[/code], any custom color properties that have been set for this [TextEdit] will be visible. */
syntax_highlighting: boolean;

/** String value of the [TextEdit]. */
text: string;

/** Vertical scroll sensitivity. */
v_scroll_speed: float;

/** If [code]true[/code], the native virtual keyboard is shown when focused on platforms that support it. */
virtual_keyboard_enabled: boolean;

/** If [code]true[/code], enables text wrapping when it goes beyond the edge of what is visible. */
wrap_enabled: boolean;

/** Adds color region (given the delimiters) and its colors. */
add_color_region(begin_key: string, end_key: string, color: Color, line_only?: boolean): void;

/** Adds a [code]keyword[/code] and its [Color]. */
add_keyword_color(keyword: string, color: Color): void;

/** Returns if the given line is foldable, that is, it has indented lines right below it. */
can_fold(line: int): boolean;

/** Centers the viewport on the line the editing cursor is at. This also resets the [member scroll_horizontal] value to [code]0[/code]. */
center_viewport_to_cursor(): void;

/** Clears all custom syntax coloring information previously added with [method add_color_region] or [method add_keyword_color]. */
clear_colors(): void;

/** Clears the undo history. */
clear_undo_history(): void;

/** Copy's the current text selection. */
copy(): void;

/** Returns the column the editing cursor is at. */
cursor_get_column(): int;

/** Returns the line the editing cursor is at. */
cursor_get_line(): int;

/**
 * Moves the cursor at the specified `column` index.
 *
 * If `adjust_viewport` is set to `true`, the viewport will center at the cursor position after the move occurs.
 *
*/
cursor_set_column(column: int, adjust_viewport?: boolean): void;

/**
 * Moves the cursor at the specified `line` index.
 *
 * If `adjust_viewport` is set to `true`, the viewport will center at the cursor position after the move occurs.
 *
 * If `can_be_hidden` is set to `true`, the specified `line` can be hidden using [method set_line_as_hidden].
 *
*/
cursor_set_line(line: int, adjust_viewport?: boolean, can_be_hidden?: boolean, wrap_index?: int): void;

/** Cut's the current selection. */
cut(): void;

/** Deselects the current selection. */
deselect(): void;

/** Folds all lines that are possible to be folded (see [method can_fold]). */
fold_all_lines(): void;

/** Folds the given line, if possible (see [method can_fold]). */
fold_line(line: int): void;

/** Returns an array containing the line number of each breakpoint. */
get_breakpoints(): any[];

/** Returns the [Color] of the specified [code]keyword[/code]. */
get_keyword_color(keyword: string): Color;

/** Returns the text of a specific line. */
get_line(line: int): string;

/** Returns the amount of total lines in the text. */
get_line_count(): int;

/** Returns the [PopupMenu] of this [TextEdit]. By default, this menu is displayed when right-clicking on the [TextEdit]. */
get_menu(): PopupMenu;

/** Returns the selection begin column. */
get_selection_from_column(): int;

/** Returns the selection begin line. */
get_selection_from_line(): int;

/** Returns the text inside the selection. */
get_selection_text(): string;

/** Returns the selection end column. */
get_selection_to_column(): int;

/** Returns the selection end line. */
get_selection_to_line(): int;

/** Returns a [String] text with the word under the caret (text cursor) location. */
get_word_under_cursor(): string;

/** Returns whether the specified [code]keyword[/code] has a color set to it or not. */
has_keyword_color(keyword: string): boolean;

/** Returns [code]true[/code] if a "redo" action is available. */
has_redo(): boolean;

/** Returns [code]true[/code] if an "undo" action is available. */
has_undo(): boolean;

/** Insert the specified text at the cursor position. */
insert_text_at_cursor(text: string): void;

/** Returns whether the line at the specified index is folded or not. */
is_folded(line: int): boolean;

/** Returns whether the line at the specified index is hidden or not. */
is_line_hidden(line: int): boolean;

/** Returns [code]true[/code] when the specified [code]line[/code] is bookmarked. */
is_line_set_as_bookmark(line: int): boolean;

/** Returns [code]true[/code] when the specified [code]line[/code] has a breakpoint. */
is_line_set_as_breakpoint(line: int): boolean;

/** Returns [code]true[/code] when the specified [code]line[/code] is marked as safe. */
is_line_set_as_safe(line: int): boolean;

/** Returns [code]true[/code] if the selection is active. */
is_selection_active(): boolean;

/** Triggers a right-click menu action by the specified index. See [enum MenuItems] for a list of available indexes. */
menu_option(option: int): void;

/** Paste the current selection. */
paste(): void;

/** Perform redo operation. */
redo(): void;

/** Removes all the breakpoints. This will not fire the [signal breakpoint_toggled] signal. */
remove_breakpoints(): void;

/**
 * Perform a search inside the text. Search flags can be specified in the [enum SearchFlags] enum.
 *
 * Returns an empty `PoolIntArray` if no result was found. Otherwise, the result line and column can be accessed at indices specified in the [enum SearchResult] enum, e.g:
 *
 * @example 
 * 
 * var result = search(key, flags, line, column)
 * if result.size() > 0:
 *     # Result found.
 *     var res_line = result[TextEdit.SEARCH_RESULT_LINE]
 *     var res_column = result[TextEdit.SEARCH_RESULT_COLUMN]
 * @summary 
 * 
 *
*/
search(key: string, flags: int, from_line: int, from_column: int): PoolIntArray;

/**
 * Perform selection, from line/column to line/column.
 *
 * If [member selecting_enabled] is `false`, no selection will occur.
 *
*/
select(from_line: int, from_column: int, to_line: int, to_column: int): void;

/**
 * Select all the text.
 *
 * If [member selecting_enabled] is `false`, no selection will occur.
 *
*/
select_all(): void;

/** Sets the text for a specific line. */
set_line(line: int, new_text: string): void;

/**
 * Bookmarks the `line` if `bookmark` is true. Deletes the bookmark if `bookmark` is false.
 *
 * Bookmarks are shown in the [member breakpoint_gutter].
 *
*/
set_line_as_bookmark(line: int, bookmark: boolean): void;

/** Adds or removes the breakpoint in [code]line[/code]. Breakpoints are shown in the [member breakpoint_gutter]. */
set_line_as_breakpoint(line: int, breakpoint: boolean): void;

/** If [code]true[/code], hides the line of the specified index. */
set_line_as_hidden(line: int, enable: boolean): void;

/**
 * If `true`, marks the `line` as safe.
 *
 * This will show the line number with the color provided in the `safe_line_number_color` theme property.
 *
*/
set_line_as_safe(line: int, safe: boolean): void;

/** Toggle the folding of the code block at the given line. */
toggle_fold_line(line: int): void;

/** Perform undo operation. */
undo(): void;

/** Unfolds the given line, if folded. */
unfold_line(line: int): void;

/** Unhide all lines that were previously set to hidden by [method set_line_as_hidden]. */
unhide_all_lines(): void;

  // connect<T extends SignalsOf<TextEdit>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<TextEditSignals>>(signal: T, method: SignalFunction<TextEditSignals[T]>): number;



/**
 * Match case when searching.
 *
*/
static SEARCH_MATCH_CASE: any;

/**
 * Match whole words when searching.
 *
*/
static SEARCH_WHOLE_WORDS: any;

/**
 * Search from end to beginning.
 *
*/
static SEARCH_BACKWARDS: any;

/**
 * Used to access the result column from [method search].
 *
*/
static SEARCH_RESULT_COLUMN: any;

/**
 * Used to access the result line from [method search].
 *
*/
static SEARCH_RESULT_LINE: any;

/**
 * Cuts (copies and clears) the selected text.
 *
*/
static MENU_CUT: any;

/**
 * Copies the selected text.
 *
*/
static MENU_COPY: any;

/**
 * Pastes the clipboard text over the selected text (or at the cursor's position).
 *
*/
static MENU_PASTE: any;

/**
 * Erases the whole [TextEdit] text.
 *
*/
static MENU_CLEAR: any;

/**
 * Selects the whole [TextEdit] text.
 *
*/
static MENU_SELECT_ALL: any;

/**
 * Undoes the previous action.
 *
*/
static MENU_UNDO: any;

/**
 * Redoes the previous action.
 *
*/
static MENU_REDO: any;

/**
 * Represents the size of the [enum MenuItems] enum.
 *
*/
static MENU_MAX: any;

}

declare class TextEditSignals extends ControlSignals {
  /**
 * Emitted when a breakpoint is placed via the breakpoint gutter.
 *
*/
breakpoint_toggled: Signal<(row: int) => void>

/**
 * Emitted when the cursor changes.
 *
*/
cursor_changed: Signal<() => void>

/**
 * Emitted when the info icon is clicked.
 *
*/
info_clicked: Signal<(row: int, info: string) => void>

/**
*/
request_completion: Signal<() => void>

/**
*/
symbol_lookup: Signal<(symbol: string, row: int, column: int) => void>

/**
 * Emitted when the text changes.
 *
*/
text_changed: Signal<() => void>

}
