
/**
 * Attenuates the frequencies inside of a range around the [member AudioEffectFilter.cutoff_hz] and cuts frequencies outside of this band.
 *
*/
declare class AudioEffectBandPassFilter extends AudioEffectFilter  {

  
/**
 * Attenuates the frequencies inside of a range around the [member AudioEffectFilter.cutoff_hz] and cuts frequencies outside of this band.
 *
*/
  new(): AudioEffectBandPassFilter; 
  static "new"(): AudioEffectBandPassFilter 





  connect<T extends SignalsOf<AudioEffectBandPassFilter>>(signal: T, method: SignalFunction<AudioEffectBandPassFilter[T]>): number;






}

