
/**
 * LineEdit provides a single-line string editor, used for text fields.
 *
 * It features many built-in shortcuts which will always be available (`Ctrl` here maps to `Command` on macOS):
 *
 * - Ctrl + C: Copy
 *
 * - Ctrl + X: Cut
 *
 * - Ctrl + V or Ctrl + Y: Paste/"yank"
 *
 * - Ctrl + Z: Undo
 *
 * - Ctrl + Shift + Z: Redo
 *
 * - Ctrl + U: Delete text from the cursor position to the beginning of the line
 *
 * - Ctrl + K: Delete text from the cursor position to the end of the line
 *
 * - Ctrl + A: Select all text
 *
 * - Up/Down arrow: Move the cursor to the beginning/end of the line
 *
 * On macOS, some extra keyboard shortcuts are available:
 *
 * - Ctrl + F: Like the right arrow key, move the cursor one character right
 *
 * - Ctrl + B: Like the left arrow key, move the cursor one character left
 *
 * - Ctrl + P: Like the up arrow key, move the cursor to the previous line
 *
 * - Ctrl + N: Like the down arrow key, move the cursor to the next line
 *
 * - Ctrl + D: Like the Delete key, delete the character on the right side of cursor
 *
 * - Ctrl + H: Like the Backspace key, delete the character on the left side of the cursor
 *
 * - Command + Left arrow: Like the Home key, move the cursor to the beginning of the line
 *
 * - Command + Right arrow: Like the End key, move the cursor to the end of the line
 *
*/
declare class LineEdit extends Control  {

  
/**
 * LineEdit provides a single-line string editor, used for text fields.
 *
 * It features many built-in shortcuts which will always be available (`Ctrl` here maps to `Command` on macOS):
 *
 * - Ctrl + C: Copy
 *
 * - Ctrl + X: Cut
 *
 * - Ctrl + V or Ctrl + Y: Paste/"yank"
 *
 * - Ctrl + Z: Undo
 *
 * - Ctrl + Shift + Z: Redo
 *
 * - Ctrl + U: Delete text from the cursor position to the beginning of the line
 *
 * - Ctrl + K: Delete text from the cursor position to the end of the line
 *
 * - Ctrl + A: Select all text
 *
 * - Up/Down arrow: Move the cursor to the beginning/end of the line
 *
 * On macOS, some extra keyboard shortcuts are available:
 *
 * - Ctrl + F: Like the right arrow key, move the cursor one character right
 *
 * - Ctrl + B: Like the left arrow key, move the cursor one character left
 *
 * - Ctrl + P: Like the up arrow key, move the cursor to the previous line
 *
 * - Ctrl + N: Like the down arrow key, move the cursor to the next line
 *
 * - Ctrl + D: Like the Delete key, delete the character on the right side of cursor
 *
 * - Ctrl + H: Like the Backspace key, delete the character on the left side of the cursor
 *
 * - Command + Left arrow: Like the Home key, move the cursor to the beginning of the line
 *
 * - Command + Right arrow: Like the End key, move the cursor to the end of the line
 *
*/
  new(): LineEdit; 
  static "new"(): LineEdit 


/** Text alignment as defined in the [enum Align] enum. */
align: int;

/** If [code]true[/code], the caret (visual cursor) blinks. */
caret_blink: boolean;

/** Duration (in seconds) of a caret's blinking cycle. */
caret_blink_speed: float;

/** The cursor's position inside the [LineEdit]. When set, the text may scroll to accommodate it. */
caret_position: int;

/** If [code]true[/code], the [LineEdit] will show a clear button if [code]text[/code] is not empty, which can be used to clear the text quickly. */
clear_button_enabled: boolean;

/** If [code]true[/code], the context menu will appear when right-clicked. */
context_menu_enabled: boolean;

/** If [code]false[/code], existing text cannot be modified and new text cannot be added. */
editable: boolean;

/** If [code]true[/code], the [LineEdit] width will increase to stay longer than the [member text]. It will [b]not[/b] compress if the [member text] is shortened. */
expand_to_text_length: boolean;


/**
 * Maximum amount of characters that can be entered inside the [LineEdit]. If `0`, there is no limit.
 *
 * When a limit is defined, characters that would exceed [member max_length] are truncated. This happens both for existing [member text] contents when setting the max length, or for new text inserted in the [LineEdit], including pasting. If any input text is truncated, the [signal text_change_rejected] signal is emitted with the truncated substring as parameter.
 *
 * **Example:**
 *
 * @example 
 * 
 * text = "Hello world"
 * max_length = 5
 * # `text` becomes "Hello".
 * max_length = 10
 * text += " goodbye"
 * # `text` becomes "Hello good".
 * # `text_change_rejected` is emitted with "bye" as parameter.
 * @summary 
 * 
 *
*/
max_length: int;


/** Opacity of the [member placeholder_text]. From [code]0[/code] to [code]1[/code]. */
placeholder_alpha: float;

/** Text shown when the [LineEdit] is empty. It is [b]not[/b] the [LineEdit]'s default value (see [member text]). */
placeholder_text: string;

/** Sets the icon that will appear in the right end of the [LineEdit] if there's no [member text], or always, if [member clear_button_enabled] is set to [code]false[/code]. */
right_icon: Texture;

/** If [code]true[/code], every character is replaced with the secret character (see [member secret_character]). */
secret: boolean;

/** The character to use to mask secret input (defaults to "*"). Only a single character can be used as the secret character. */
secret_character: string;

/** If [code]false[/code], it's impossible to select the text using mouse nor keyboard. */
selecting_enabled: boolean;

/** If [code]false[/code], using shortcuts will be disabled. */
shortcut_keys_enabled: boolean;

/**
 * String value of the [LineEdit].
 *
 * **Note:** Changing text using this property won't emit the [signal text_changed] signal.
 *
*/
text: string;

/** If [code]true[/code], the native virtual keyboard is shown when focused on platforms that support it. */
virtual_keyboard_enabled: boolean;

/** Adds [code]text[/code] after the cursor. If the resulting value is longer than [member max_length], nothing happens. */
append_at_cursor(text: string): void;

/** Erases the [LineEdit]'s [member text]. */
clear(): void;

/** Deletes one character at the cursor's current position (equivalent to pressing the [code]Delete[/code] key). */
delete_char_at_cursor(): void;

/** Deletes a section of the [member text] going from position [code]from_column[/code] to [code]to_column[/code]. Both parameters should be within the text's length. */
delete_text(from_column: int, to_column: int): void;

/** Clears the current selection. */
deselect(): void;

/**
 * Returns the [PopupMenu] of this [LineEdit]. By default, this menu is displayed when right-clicking on the [LineEdit].
 *
 * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their [member CanvasItem.visible] property.
 *
*/
get_menu(): PopupMenu;

/** Returns the scroll offset due to [member caret_position], as a number of characters. */
get_scroll_offset(): int;

/** Executes a given action as defined in the [enum MenuItems] enum. */
menu_option(option: int): void;

/**
 * Selects characters inside [LineEdit] between `from` and `to`. By default, `from` is at the beginning and `to` at the end.
 *
 * @example 
 * 
 * text = "Welcome"
 * select() # Will select "Welcome".
 * select(4) # Will select "ome".
 * select(2, 5) # Will select "lco".
 * @summary 
 * 
 *
*/
select(from?: int, to?: int): void;

/** Selects the whole [String]. */
select_all(): void;

  connect<T extends SignalsOf<LineEdit>>(signal: T, method: SignalFunction<LineEdit[T]>): number;



/**
 * Aligns the text on the left-hand side of the [LineEdit].
 *
*/
static ALIGN_LEFT: any;

/**
 * Centers the text in the middle of the [LineEdit].
 *
*/
static ALIGN_CENTER: any;

/**
 * Aligns the text on the right-hand side of the [LineEdit].
 *
*/
static ALIGN_RIGHT: any;

/**
 * Stretches whitespaces to fit the [LineEdit]'s width.
 *
*/
static ALIGN_FILL: any;

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
 * Non-printable escape characters are automatically stripped from the OS clipboard via [method String.strip_escapes].
 *
*/
static MENU_PASTE: any;

/**
 * Erases the whole [LineEdit] text.
 *
*/
static MENU_CLEAR: any;

/**
 * Selects the whole [LineEdit] text.
 *
*/
static MENU_SELECT_ALL: any;

/**
 * Undoes the previous action.
 *
*/
static MENU_UNDO: any;

/**
 * Reverse the last undo action.
 *
*/
static MENU_REDO: any;

/**
 * Represents the size of the [enum MenuItems] enum.
 *
*/
static MENU_MAX: any;


/**
 * Emitted when appending text that overflows the [member max_length]. The appended text is truncated to fit [member max_length], and the part that couldn't fit is passed as the `rejected_substring` argument.
 *
*/
$text_change_rejected: Signal<(rejected_substring: string) => void>

/**
 * Emitted when the text changes.
 *
*/
$text_changed: Signal<(new_text: string) => void>

/**
 * Emitted when the user presses [constant KEY_ENTER] on the [LineEdit].
 *
*/
$text_entered: Signal<(new_text: string) => void>

}

