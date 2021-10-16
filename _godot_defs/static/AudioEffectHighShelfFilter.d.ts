
/**
*/
declare class AudioEffectHighShelfFilter extends AudioEffectFilter {

  
/**
*/
  "new"(): AudioEffectHighShelfFilter;
  static "new"(): AudioEffectHighShelfFilter;






  // connect<T extends SignalsOf<AudioEffectHighShelfFilter>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AudioEffectHighShelfFilterSignals>>(signal: T, method: SignalFunction<AudioEffectHighShelfFilterSignals[T]>): number;




}

declare class AudioEffectHighShelfFilterSignals extends AudioEffectFilterSignals {
  
}
