
/**
 * Frequency bands:
 *
 * Band 1: 31 Hz
 *
 * Band 2: 62 Hz
 *
 * Band 3: 125 Hz
 *
 * Band 4: 250 Hz
 *
 * Band 5: 500 Hz
 *
 * Band 6: 1000 Hz
 *
 * Band 7: 2000 Hz
 *
 * Band 8: 4000 Hz
 *
 * Band 9: 8000 Hz
 *
 * Band 10: 16000 Hz
 *
 * See also [AudioEffectEQ], [AudioEffectEQ6], [AudioEffectEQ21].
 *
*/
declare class AudioEffectEQ10 extends AudioEffectEQ  {

  
/**
 * Frequency bands:
 *
 * Band 1: 31 Hz
 *
 * Band 2: 62 Hz
 *
 * Band 3: 125 Hz
 *
 * Band 4: 250 Hz
 *
 * Band 5: 500 Hz
 *
 * Band 6: 1000 Hz
 *
 * Band 7: 2000 Hz
 *
 * Band 8: 4000 Hz
 *
 * Band 9: 8000 Hz
 *
 * Band 10: 16000 Hz
 *
 * See also [AudioEffectEQ], [AudioEffectEQ6], [AudioEffectEQ21].
 *
*/
  new(): AudioEffectEQ10; 
  static "new"(): AudioEffectEQ10 





  connect<T extends SignalsOf<AudioEffectEQ10>>(signal: T, method: SignalFunction<AudioEffectEQ10[T]>): number;






}

