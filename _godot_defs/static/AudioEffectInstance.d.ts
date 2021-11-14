
/**
*/
declare class AudioEffectInstance extends Reference  {

  
/**
*/
  new(): AudioEffectInstance; 
  static "new"(): AudioEffectInstance 





  connect<T extends SignalsOf<AudioEffectInstance>>(signal: T, method: SignalFunction<AudioEffectInstance[T]>): number;






}

