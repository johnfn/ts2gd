
/**
*/
declare class AudioEffectLowShelfFilter extends AudioEffectFilter  {

  
/**
*/
  new(): AudioEffectLowShelfFilter; 
  static "new"(): AudioEffectLowShelfFilter 





  connect<T extends SignalsOf<AudioEffectLowShelfFilter>>(signal: T, method: SignalFunction<AudioEffectLowShelfFilter[T]>): number;






}

