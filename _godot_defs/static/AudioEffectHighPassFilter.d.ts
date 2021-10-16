
/**
 * Cuts frequencies lower than the [member AudioEffectFilter.cutoff_hz] and allows higher frequencies to pass.
 *
*/
declare class AudioEffectHighPassFilter extends AudioEffectFilter {

  
/**
 * Cuts frequencies lower than the [member AudioEffectFilter.cutoff_hz] and allows higher frequencies to pass.
 *
*/
  "new"(): AudioEffectHighPassFilter;
  static "new"(): AudioEffectHighPassFilter;






  // connect<T extends SignalsOf<AudioEffectHighPassFilter>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AudioEffectHighPassFilterSignals>>(signal: T, method: SignalFunction<AudioEffectHighPassFilterSignals[T]>): number;




}

declare class AudioEffectHighPassFilterSignals extends AudioEffectFilterSignals {
  
}
