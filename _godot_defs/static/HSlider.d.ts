
/**
 * Horizontal slider. See [Slider]. This one goes from left (min) to right (max).
 *
 * **Note:** The [signal Range.changed] and [signal Range.value_changed] signals are part of the [Range] class which this class inherits from.
 *
*/
declare class HSlider extends Slider  {

  
/**
 * Horizontal slider. See [Slider]. This one goes from left (min) to right (max).
 *
 * **Note:** The [signal Range.changed] and [signal Range.value_changed] signals are part of the [Range] class which this class inherits from.
 *
*/
  new(): HSlider; 
  static "new"(): HSlider 





  connect<T extends SignalsOf<HSlider>>(signal: T, method: SignalFunction<HSlider[T]>): number;






}

