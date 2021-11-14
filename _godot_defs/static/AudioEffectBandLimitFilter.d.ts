
/**
 * Limits the frequencies in a range around the [member AudioEffectFilter.cutoff_hz] and allows frequencies outside of this range to pass.
 *
*/
declare class AudioEffectBandLimitFilter extends AudioEffectFilter  {

  
/**
 * Limits the frequencies in a range around the [member AudioEffectFilter.cutoff_hz] and allows frequencies outside of this range to pass.
 *
*/
  new(): AudioEffectBandLimitFilter; 
  static "new"(): AudioEffectBandLimitFilter 





  connect<T extends SignalsOf<AudioEffectBandLimitFilter>>(signal: T, method: SignalFunction<AudioEffectBandLimitFilter[T]>): number;






}

