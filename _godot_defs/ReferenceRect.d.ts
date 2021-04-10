
/**
 * A rectangle box that displays only a [member border_color] border color around its rectangle. [ReferenceRect] has no fill [Color].
 *
*/
declare class ReferenceRect extends Control {

  
/**
 * A rectangle box that displays only a [member border_color] border color around its rectangle. [ReferenceRect] has no fill [Color].
 *
*/
  "new"(): ReferenceRect;
  static "new"(): ReferenceRect;



/** Sets the border [Color] of the [ReferenceRect]. */
border_color: Color;

/** If set to [code]true[/code], the [ReferenceRect] will only be visible while in editor. Otherwise, [ReferenceRect] will be visible in game. */
editor_only: boolean;



  connect<T extends SignalsOf<ReferenceRect>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
