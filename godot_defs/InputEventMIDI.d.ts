
/**
*/
declare class InputEventMIDI extends InputEvent {

  
/**
*/
  "new"(): InputEventMIDI;
  static "new"(): InputEventMIDI;













  connect<T extends SignalsOf<InputEventMIDI>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
