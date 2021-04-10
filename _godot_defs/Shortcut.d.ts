
/**
 * A shortcut for binding input.
 *
 * Shortcuts are commonly used for interacting with a [Control] element from a [InputEvent].
 *
*/
declare class ShortCut extends Resource {

  
/**
 * A shortcut for binding input.
 *
 * Shortcuts are commonly used for interacting with a [Control] element from a [InputEvent].
 *
*/
  "new"(): ShortCut;
  static "new"(): ShortCut;



/**
 * The shortcut's [InputEvent].
 *
 * Generally the [InputEvent] is a keyboard key, though it can be any [InputEvent].
 *
*/
shortcut: InputEvent;

/** Returns the shortcut's [InputEvent] as a [String]. */
get_as_text(): string;

/** Returns [code]true[/code] if the shortcut's [InputEvent] equals [code]event[/code]. */
is_shortcut(event: InputEvent): boolean;

/** If [code]true[/code], this shortcut is valid. */
is_valid(): boolean;

  connect<T extends SignalsOf<ShortCut>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
