
/**
*/
declare class AudioEffectInstance extends Reference {

  
/**
*/
  "new"(): AudioEffectInstance;
  static "new"(): AudioEffectInstance;






  connect<T extends SignalsOf<AudioEffectInstance>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
