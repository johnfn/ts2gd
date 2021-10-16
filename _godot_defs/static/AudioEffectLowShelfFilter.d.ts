
/**
*/
declare class AudioEffectLowShelfFilter extends AudioEffectFilter {

  
/**
*/
  "new"(): AudioEffectLowShelfFilter;
  static "new"(): AudioEffectLowShelfFilter;






  // connect<T extends SignalsOf<AudioEffectLowShelfFilter>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AudioEffectLowShelfFilterSignals>>(signal: T, method: SignalFunction<AudioEffectLowShelfFilterSignals[T]>): number;




}

declare class AudioEffectLowShelfFilterSignals extends AudioEffectFilterSignals {
  
}
