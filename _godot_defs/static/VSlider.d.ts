
/**
 * Vertical slider. See [Slider]. This one goes from bottom (min) to top (max).
 *
 * **Note:** The [signal Range.changed] and [signal Range.value_changed] signals are part of the [Range] class which this class inherits from.
 *
*/
declare class VSlider extends Slider {

  
/**
 * Vertical slider. See [Slider]. This one goes from bottom (min) to top (max).
 *
 * **Note:** The [signal Range.changed] and [signal Range.value_changed] signals are part of the [Range] class which this class inherits from.
 *
*/
  "new"(): VSlider;
  static "new"(): VSlider;







  // connect<T extends SignalsOf<VSlider>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VSliderSignals>>(signal: T, method: SignalFunction<VSliderSignals[T]>): number;




}

declare class VSliderSignals extends SliderSignals {
  
}
