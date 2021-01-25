
/**
 * Attenuates frequencies in a narrow band around the [member AudioEffectFilter.cutoff_hz] and cuts frequencies outside of this range.
 *
*/
declare class AudioEffectNotchFilter extends AudioEffectFilter {

  
/**
 * Attenuates frequencies in a narrow band around the [member AudioEffectFilter.cutoff_hz] and cuts frequencies outside of this range.
 *
*/
  "new"(): AudioEffectNotchFilter;
  static "new"(): AudioEffectNotchFilter;






  connect<T extends SignalsOf<AudioEffectNotchFilter>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
