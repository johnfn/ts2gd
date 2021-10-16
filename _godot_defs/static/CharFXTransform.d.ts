
/**
 * By setting various properties on this object, you can control how individual characters will be displayed in a [RichTextEffect].
 *
*/
declare class CharFXTransform extends Reference {

  
/**
 * By setting various properties on this object, you can control how individual characters will be displayed in a [RichTextEffect].
 *
*/
  "new"(): CharFXTransform;
  static "new"(): CharFXTransform;



/** The index of the current character (starting from 0). Setting this property won't affect drawing. */
absolute_index: int;

/**
 * The Unicode codepoint the character will use. This only affects non-whitespace characters. [method @GDScript.ord] can be useful here. For example, the following will replace all characters with asterisks:
 *
 * @example 
 * 
 * # `char_fx` is the CharFXTransform parameter from `_process_custom_fx()`.
 * # See the RichTextEffect documentation for details.
 * char_fx.character = ord("*")
 * @summary 
 * 
 *
*/
character: int;

/** The color the character will be drawn with. */
color: Color;

/**
 * The time elapsed since the [RichTextLabel] was added to the scene tree (in seconds). Time stops when the project is paused, unless the [RichTextLabel]'s [member Node.pause_mode] is set to [constant Node.PAUSE_MODE_PROCESS].
 *
 * **Note:** Time still passes while the [RichTextLabel] is hidden.
 *
*/
elapsed_time: float;

/**
 * Contains the arguments passed in the opening BBCode tag. By default, arguments are strings; if their contents match a type such as [bool], [int] or [float], they will be converted automatically. Color codes in the form `#rrggbb` or `#rgb` will be converted to an opaque [Color]. String arguments may not contain spaces, even if they're quoted. If present, quotes will also be present in the final string.
 *
 * For example, the opening BBCode tag `[example foo=hello bar=true baz=42 color=#ffffff]` will map to the following [Dictionary]:
 *
 * @example 
 * 
 * {"foo": "hello", "bar": true, "baz": 42, "color": Color(1, 1, 1, 1)}
 * @summary 
 * 
 *
*/
env: Dictionary<any, any>;

/** The position offset the character will be drawn with (in pixels). */
offset: Vector2;

/** The index of the current character (starting from 0). Setting this property won't affect drawing. */
relative_index: int;

/** If [code]true[/code], the character will be drawn. If [code]false[/code], the character will be hidden. Characters around hidden characters will reflow to take the space of hidden characters. If this is not desired, set their [member color] to [code]Color(1, 1, 1, 0)[/code] instead. */
visible: boolean;



  // connect<T extends SignalsOf<CharFXTransform>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<CharFXTransformSignals>>(signal: T, method: SignalFunction<CharFXTransformSignals[T]>): number;




}

declare class CharFXTransformSignals extends ReferenceSignals {
  
}
