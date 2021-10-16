
/**
 * Stores position, muting, solo, bypass, effects, effect position, volume, and the connections between buses. See [AudioServer] for usage.
 *
*/
declare class AudioBusLayout extends Resource {

  
/**
 * Stores position, muting, solo, bypass, effects, effect position, volume, and the connections between buses. See [AudioServer] for usage.
 *
*/
  "new"(): AudioBusLayout;
  static "new"(): AudioBusLayout;






  // connect<T extends SignalsOf<AudioBusLayout>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AudioBusLayoutSignals>>(signal: T, method: SignalFunction<AudioBusLayoutSignals[T]>): number;




}

declare class AudioBusLayoutSignals extends ResourceSignals {
  
}
