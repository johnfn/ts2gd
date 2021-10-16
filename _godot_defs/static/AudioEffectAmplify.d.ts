
/**
 * Increases or decreases the volume being routed through the audio bus.
 *
*/
declare class AudioEffectAmplify extends AudioEffect {

  
/**
 * Increases or decreases the volume being routed through the audio bus.
 *
*/
  "new"(): AudioEffectAmplify;
  static "new"(): AudioEffectAmplify;



/** Amount of amplification in decibels. Positive values make the sound louder, negative values make it quieter. Value can range from -80 to 24. */
volume_db: float;



  // connect<T extends SignalsOf<AudioEffectAmplify>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AudioEffectAmplifySignals>>(signal: T, method: SignalFunction<AudioEffectAmplifySignals[T]>): number;




}

declare class AudioEffectAmplifySignals extends AudioEffectSignals {
  
}
