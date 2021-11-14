
/**
 * Font contains a Unicode-compatible character set, as well as the ability to draw it with variable width, ascent, descent and kerning. For creating fonts from TTF files (or other font formats), see the editor support for fonts.
 *
 * **Note:** If a [DynamicFont] doesn't contain a character used in a string, the character in question will be replaced with codepoint `0xfffd` if it's available in the [DynamicFont]. If this replacement character isn't available in the DynamicFont, the character will be hidden without displaying any replacement character in the string.
 *
 * **Note:** If a [BitmapFont] doesn't contain a character used in a string, the character in question will be hidden without displaying any replacement character in the string.
 *
 * **Note:** Unicode characters after `0xffff` (such as most emoji) are **not** supported on Windows. They will display as unknown characters instead. This will be resolved in Godot 4.0.
 *
*/
declare class Font extends Resource  {

  
/**
 * Font contains a Unicode-compatible character set, as well as the ability to draw it with variable width, ascent, descent and kerning. For creating fonts from TTF files (or other font formats), see the editor support for fonts.
 *
 * **Note:** If a [DynamicFont] doesn't contain a character used in a string, the character in question will be replaced with codepoint `0xfffd` if it's available in the [DynamicFont]. If this replacement character isn't available in the DynamicFont, the character will be hidden without displaying any replacement character in the string.
 *
 * **Note:** If a [BitmapFont] doesn't contain a character used in a string, the character in question will be hidden without displaying any replacement character in the string.
 *
 * **Note:** Unicode characters after `0xffff` (such as most emoji) are **not** supported on Windows. They will display as unknown characters instead. This will be resolved in Godot 4.0.
 *
*/
  new(): Font; 
  static "new"(): Font 



/**
 * Draw `string` into a canvas item using the font at a given position, with `modulate` color, and optionally clipping the width. `position` specifies the baseline, not the top. To draw from the top, **ascent** must be added to the Y axis.
 *
 * See also [method CanvasItem.draw_string].
 *
*/
draw(canvas_item: RID, position: Vector2, string: string, modulate?: Color, clip_w?: int, outline_modulate?: Color): void;

/** Draw character [code]char[/code] into a canvas item using the font at a given position, with [code]modulate[/code] color, and optionally kerning if [code]next[/code] is passed. clipping the width. [code]position[/code] specifies the baseline, not the top. To draw from the top, [i]ascent[/i] must be added to the Y axis. The width used by the character is returned, making this function useful for drawing strings character by character. */
draw_char(canvas_item: RID, position: Vector2, char: int, next?: int, modulate?: Color, outline?: boolean): float;

/** Returns the font ascent (number of pixels above the baseline). */
get_ascent(): float;

/** Returns the size of a character, optionally taking kerning into account if the next character is provided. Note that the height returned is the font height (see [method get_height]) and has no relation to the glyph height. */
get_char_size(char: int, next?: int): Vector2;

/** Returns the font descent (number of pixels below the baseline). */
get_descent(): float;

/** Returns the total font height (ascent plus descent) in pixels. */
get_height(): float;

/** Returns the size of a string, taking kerning and advance into account. Note that the height returned is the font height (see [method get_height]) and has no relation to the string. */
get_string_size(string: string): Vector2;

/** Returns the size that the string would have with word wrapping enabled with a fixed [code]width[/code]. */
get_wordwrap_string_size(string: string, width: float): Vector2;

/** Returns [code]true[/code] if the font has an outline. */
has_outline(): boolean;

/** No documentation provided. */
is_distance_field_hint(): boolean;

/** After editing a font (changing size, ascent, char rects, etc.). Call this function to propagate changes to controls that might use it. */
update_changes(): void;

  connect<T extends SignalsOf<Font>>(signal: T, method: SignalFunction<Font[T]>): number;






}

