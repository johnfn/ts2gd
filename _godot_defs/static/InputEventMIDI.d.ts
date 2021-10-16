
/**
*/
declare class InputEventMIDI extends InputEvent {

  
/**
*/
  "new"(): InputEventMIDI;
  static "new"(): InputEventMIDI;













  // connect<T extends SignalsOf<InputEventMIDI>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<InputEventMIDISignals>>(signal: T, method: SignalFunction<InputEventMIDISignals[T]>): number;




}

declare class InputEventMIDISignals extends InputEventSignals {
  
}
