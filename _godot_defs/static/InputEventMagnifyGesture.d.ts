
/**
*/
declare class InputEventMagnifyGesture extends InputEventGesture {

  
/**
*/
  "new"(): InputEventMagnifyGesture;
  static "new"(): InputEventMagnifyGesture;






  // connect<T extends SignalsOf<InputEventMagnifyGesture>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<InputEventMagnifyGestureSignals>>(signal: T, method: SignalFunction<InputEventMagnifyGestureSignals[T]>): number;




}

declare class InputEventMagnifyGestureSignals extends InputEventGestureSignals {
  
}
