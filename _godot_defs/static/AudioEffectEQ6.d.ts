
/**
 * Frequency bands:
 *
 * Band 1: 32 Hz
 *
 * Band 2: 100 Hz
 *
 * Band 3: 320 Hz
 *
 * Band 4: 1000 Hz
 *
 * Band 5: 3200 Hz
 *
 * Band 6: 10000 Hz
 *
 * See also [AudioEffectEQ], [AudioEffectEQ10], [AudioEffectEQ21].
 *
*/
declare class AudioEffectEQ6 extends AudioEffectEQ  {

  
/**
 * Frequency bands:
 *
 * Band 1: 32 Hz
 *
 * Band 2: 100 Hz
 *
 * Band 3: 320 Hz
 *
 * Band 4: 1000 Hz
 *
 * Band 5: 3200 Hz
 *
 * Band 6: 10000 Hz
 *
 * See also [AudioEffectEQ], [AudioEffectEQ10], [AudioEffectEQ21].
 *
*/
  new(): AudioEffectEQ6; 
  static "new"(): AudioEffectEQ6 





  connect<T extends SignalsOf<AudioEffectEQ6>>(signal: T, method: SignalFunction<AudioEffectEQ6[T]>): number;






}

