
/**
*/
declare class InputEventMIDI extends InputEvent  {

  
/**
*/
  new(): InputEventMIDI; 
  static "new"(): InputEventMIDI 












  connect<T extends SignalsOf<InputEventMIDI>>(signal: T, method: SignalFunction<InputEventMIDI[T]>): number;






}

