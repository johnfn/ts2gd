
/**
 * Base resource for audio bus. Applies an audio effect on the bus that the resource is applied on.
 *
*/
declare class AudioEffect extends Resource {

  
/**
 * Base resource for audio bus. Applies an audio effect on the bus that the resource is applied on.
 *
*/
  "new"(): AudioEffect;
  static "new"(): AudioEffect;






  // connect<T extends SignalsOf<AudioEffect>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AudioEffectSignals>>(signal: T, method: SignalFunction<AudioEffectSignals[T]>): number;




}

declare class AudioEffectSignals extends ResourceSignals {
  
}
