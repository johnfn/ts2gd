
/**
 * [StyleBox] that displays a single line of a given color and thickness. It can be used to draw things like separators.
 *
*/
declare class StyleBoxLine extends StyleBox  {

  
/**
 * [StyleBox] that displays a single line of a given color and thickness. It can be used to draw things like separators.
 *
*/
  new(): StyleBoxLine; 
  static "new"(): StyleBoxLine 


/** The line's color. */
color: Color;

/** The number of pixels the line will extend before the [StyleBoxLine]'s bounds. If set to a negative value, the line will begin inside the [StyleBoxLine]'s bounds. */
grow_begin: float;

/** The number of pixels the line will extend past the [StyleBoxLine]'s bounds. If set to a negative value, the line will end inside the [StyleBoxLine]'s bounds. */
grow_end: float;

/** The line's thickness in pixels. */
thickness: int;

/** If [code]true[/code], the line will be vertical. If [code]false[/code], the line will be horizontal. */
vertical: boolean;



  connect<T extends SignalsOf<StyleBoxLine>>(signal: T, method: SignalFunction<StyleBoxLine[T]>): number;






}

