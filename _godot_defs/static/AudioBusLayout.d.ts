
/**
 * Stores position, muting, solo, bypass, effects, effect position, volume, and the connections between buses. See [AudioServer] for usage.
 *
*/
declare class AudioBusLayout extends Resource  {

  
/**
 * Stores position, muting, solo, bypass, effects, effect position, volume, and the connections between buses. See [AudioServer] for usage.
 *
*/
  new(): AudioBusLayout; 
  static "new"(): AudioBusLayout 





  connect<T extends SignalsOf<AudioBusLayout>>(signal: T, method: SignalFunction<AudioBusLayout[T]>): number;






}

