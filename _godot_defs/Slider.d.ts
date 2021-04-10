
/**
 * Base class for GUI sliders.
 *
 * **Note:** The [signal Range.changed] and [signal Range.value_changed] signals are part of the [Range] class which this class inherits from.
 *
*/
declare class Slider extends Range {

  
/**
 * Base class for GUI sliders.
 *
 * **Note:** The [signal Range.changed] and [signal Range.value_changed] signals are part of the [Range] class which this class inherits from.
 *
*/
  "new"(): Slider;
  static "new"(): Slider;



/** If [code]true[/code], the slider can be interacted with. If [code]false[/code], the value can be changed only by code. */
editable: boolean;


/** If [code]true[/code], the value can be changed using the mouse wheel. */
scrollable: boolean;


/** Number of ticks displayed on the slider, including border ticks. Ticks are uniformly-distributed value markers. */
tick_count: int;

/** If [code]true[/code], the slider will display ticks for minimum and maximum values. */
ticks_on_borders: boolean;



  connect<T extends SignalsOf<Slider>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
