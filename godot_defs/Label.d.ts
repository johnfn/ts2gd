
/**
 * Label displays plain text on the screen. It gives you control over the horizontal and vertical alignment, and can wrap the text inside the node's bounding rectangle. It doesn't support bold, italics or other formatting. For that, use [RichTextLabel] instead.
 *
 * **Note:** Contrarily to most other [Control]s, Label's [member Control.mouse_filter] defaults to [constant Control.MOUSE_FILTER_IGNORE] (i.e. it doesn't react to mouse input events). This implies that a label won't display any configured [member Control.hint_tooltip], unless you change its mouse filter.
 *
*/
declare class Label extends Control {

  
/**
 * Label displays plain text on the screen. It gives you control over the horizontal and vertical alignment, and can wrap the text inside the node's bounding rectangle. It doesn't support bold, italics or other formatting. For that, use [RichTextLabel] instead.
 *
 * **Note:** Contrarily to most other [Control]s, Label's [member Control.mouse_filter] defaults to [constant Control.MOUSE_FILTER_IGNORE] (i.e. it doesn't react to mouse input events). This implies that a label won't display any configured [member Control.hint_tooltip], unless you change its mouse filter.
 *
*/
  "new"(): Label;
  static "new"(): Label;



/** Controls the text's horizontal align. Supports left, center, right, and fill, or justify. Set it to one of the [enum Align] constants. */
align: int;

/** If [code]true[/code], wraps the text inside the node's bounding rectangle. If you resize the node, it will change its height automatically to show all the text. */
autowrap: boolean;

/** If [code]true[/code], the Label only shows the text that fits inside its bounding rectangle. It also lets you scale the node down freely. */
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

  connect<T extends SignalsOf<Label>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Align rows to the left (default).
 *
*/
static ALIGN_LEFT: 0;

/**
 * Align rows centered.
 *
*/
static ALIGN_CENTER: 1;

/**
 * Align rows to the right.
 *
*/
static ALIGN_RIGHT: 2;

/**
 * Expand row whitespaces to fit the width.
 *
*/
static ALIGN_FILL: 3;

/**
 * Align the whole text to the top.
 *
*/
static VALIGN_TOP: 0;

/**
 * Align the whole text to the center.
 *
*/
static VALIGN_CENTER: 1;

/**
 * Align the whole text to the bottom.
 *
*/
static VALIGN_BOTTOM: 2;

/**
 * Align the whole text by spreading the rows.
 *
*/
static VALIGN_FILL: 3;


  
}
