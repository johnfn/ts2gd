
/**
*/
declare class AudioEffectStereoEnhance extends AudioEffect {

  
/**
*/
  "new"(): AudioEffectStereoEnhance;
  static "new"(): AudioEffectStereoEnhance;








  // connect<T extends SignalsOf<AudioEffectStereoEnhance>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AudioEffectStereoEnhanceSignals>>(signal: T, method: SignalFunction<AudioEffectStereoEnhanceSignals[T]>): number;




}

declare class AudioEffectStereoEnhanceSignals extends AudioEffectSignals {
  
}
