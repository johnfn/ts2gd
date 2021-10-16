
/**
 * This [Control] node is used in the editor's Inspector dock to allow editing of numeric values. Can be used with [EditorInspectorPlugin] to recreate the same behavior.
 *
*/
declare class EditorSpinSlider extends Range {

  
/**
 * This [Control] node is used in the editor's Inspector dock to allow editing of numeric values. Can be used with [EditorInspectorPlugin] to recreate the same behavior.
 *
*/
  "new"(): EditorSpinSlider;
  static "new"(): EditorSpinSlider;









  // connect<T extends SignalsOf<EditorSpinSlider>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<EditorSpinSliderSignals>>(signal: T, method: SignalFunction<EditorSpinSliderSignals[T]>): number;




}

declare class EditorSpinSliderSignals extends RangeSignals {
  
}
