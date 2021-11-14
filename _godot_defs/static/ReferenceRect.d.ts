
/**
 * A rectangle box that displays only a [member border_color] border color around its rectangle. [ReferenceRect] has no fill [Color]. If you need to display a rectangle filled with a solid color, consider using [ColorRect] instead.
 *
*/
declare class ReferenceRect extends Control  {

  
/**
 * A rectangle box that displays only a [member border_color] border color around its rectangle. [ReferenceRect] has no fill [Color]. If you need to display a rectangle filled with a solid color, consider using [ColorRect] instead.
 *
*/
  new(): ReferenceRect; 
  static "new"(): ReferenceRect 


/** Sets the border [Color] of the [ReferenceRect]. */
border_color: Color;

/** Sets the border width of the [ReferenceRect]. The border grows both inwards and outwards with respect to the rectangle box. */
border_width: float;

/** If set to [code]true[/code], the [ReferenceRect] will only be visible while in editor. Otherwise, [ReferenceRect] will be visible in game. */
editor_only: boolean;



  connect<T extends SignalsOf<ReferenceRect>>(signal: T, method: SignalFunction<ReferenceRect[T]>): number;






}

