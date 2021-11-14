
/**
 * Label displays plain text on the screen. It gives you control over the horizontal and vertical alignment and can wrap the text inside the node's bounding rectangle. It doesn't support bold, italics, or other formatting. For that, use [RichTextLabel] instead.
 *
 * **Note:** Contrarily to most other [Control]s, Label's [member Control.mouse_filter] defaults to [constant Control.MOUSE_FILTER_IGNORE] (i.e. it doesn't react to mouse input events). This implies that a label won't display any configured [member Control.hint_tooltip], unless you change its mouse filter.
 *
 * **Note:** Unicode characters after `0xffff` (such as most emoji) are **not** supported on Windows. They will display as unknown characters instead. This will be resolved in Godot 4.0.
 *
*/
declare class Label extends Control  {

  
/**
 * Label displays plain text on the screen. It gives you control over the horizontal and vertical alignment and can wrap the text inside the node's bounding rectangle. It doesn't support bold, italics, or other formatting. For that, use [RichTextLabel] instead.
 *
 * **Note:** Contrarily to most other [Control]s, Label's [member Control.mouse_filter] defaults to [constant Control.MOUSE_FILTER_IGNORE] (i.e. it doesn't react to mouse input events). This implies that a label won't display any configured [member Control.hint_tooltip], unless you change its mouse filter.
 *
 * **Note:** Unicode characters after `0xffff` (such as most emoji) are **not** supported on Windows. They will display as unknown characters instead. This will be resolved in Godot 4.0.
 *
*/
  new(): Label; 
  static "new"(): Label 


/** Controls the text's horizontal align. Supports left, center, right, and fill, or justify. Set it to one of the [enum Align] constants. */
align: int;

/** If [code]true[/code], wraps the text inside the node's bounding rectangle. If you resize the node, it will change its height automatically to show all the text. */
autowrap: boolean;

/** If [code]true[/code], the Label only shows the text that fits inside its bounding rectangle and will clip text horizontally. */
clip_text: boolean;

/** The node ignores the first [code]lines_skipped[/code] lines before it starts to display text. */
lines_skipped: int;

/** Limits the lines of text the node shows on screen. */
max_lines_visible: int;


/** Limits the amount of visible characters. If you set [code]percent_visible[/code] to 0.5, only up to half of the text's characters will display on screen. Useful to animate the text in a dialog box. */
percent_visible: float;


/** The text to display on screen. */
text: string;

/** If [code]true[/code], all the text displays as UPPERCASE. */
uppercase: boolean;

/** Controls the text's vertical align. Supports top, center, bottom, and fill. Set it to one of the [enum VAlign] constants. */
valign: int;

/** Restricts the number of characters to display. Set to -1 to disable. */
visible_characters: int;

/** Returns the amount of lines of text the Label has. */
get_line_count(): int;

/** Returns the font size in pixels. */
get_line_height(): int;

/** Returns the total number of printable characters in the text (excluding spaces and newlines). */
get_total_character_count(): int;

/** Returns the number of lines shown. Useful if the [Label]'s height cannot currently display all lines. */
get_visible_line_count(): int;

  connect<T extends SignalsOf<Label>>(signal: T, method: SignalFunction<Label[T]>): number;



/**
 * Align rows to the left (default).
 *
*/
static ALIGN_LEFT: any;

/**
 * Align rows centered.
 *
*/
static ALIGN_CENTER: any;

/**
 * Align rows to the right.
 *
*/
static ALIGN_RIGHT: any;

/**
 * Expand row whitespaces to fit the width.
 *
*/
static ALIGN_FILL: any;

/**
 * Align the whole text to the top.
 *
*/
static VALIGN_TOP: any;

/**
 * Align the whole text to the center.
 *
*/
static VALIGN_CENTER: any;

/**
 * Align the whole text to the bottom.
 *
*/
static VALIGN_BOTTOM: any;

/**
 * Align the whole text by spreading the rows.
 *
*/
static VALIGN_FILL: any;



}

