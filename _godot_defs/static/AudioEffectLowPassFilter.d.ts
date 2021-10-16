
/**
 * Cuts frequencies higher than the [member AudioEffectFilter.cutoff_hz] and allows lower frequencies to pass.
 *
*/
declare class AudioEffectLowPassFilter extends AudioEffectFilter {

  
/**
 * Cuts frequencies higher than the [member AudioEffectFilter.cutoff_hz] and allows lower frequencies to pass.
 *
*/
  "new"(): AudioEffectLowPassFilter;
  static "new"(): AudioEffectLowPassFilter;






  // connect<T extends SignalsOf<AudioEffectLowPassFilter>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AudioEffectLowPassFilterSignals>>(signal: T, method: SignalFunction<AudioEffectLowPassFilterSignals[T]>): number;




}

declare class AudioEffectLowPassFilterSignals extends AudioEffectFilterSignals {
  
}
