
/**
 * A limiter is similar to a compressor, but it's less flexible and designed to disallow sound going over a given dB threshold. Adding one in the Master bus is always recommended to reduce the effects of clipping.
 *
 * Soft clipping starts to reduce the peaks a little below the threshold level and progressively increases its effect as the input level increases such that the threshold is never exceeded.
 *
*/
declare class AudioEffectLimiter extends AudioEffect  {

  
/**
 * A limiter is similar to a compressor, but it's less flexible and designed to disallow sound going over a given dB threshold. Adding one in the Master bus is always recommended to reduce the effects of clipping.
 *
 * Soft clipping starts to reduce the peaks a little below the threshold level and progressively increases its effect as the input level increases such that the threshold is never exceeded.
 *
*/
  new(): AudioEffectLimiter; 
  static "new"(): AudioEffectLimiter 


/** The waveform's maximum allowed value, in decibels. Value can range from -20 to -0.1. */
ceiling_db: float;

/** Applies a gain to the limited waves, in decibels. Value can range from 0 to 6. */
soft_clip_db: float;


/** Threshold from which the limiter begins to be active, in decibels. Value can range from -30 to 0. */
threshold_db: float;



  connect<T extends SignalsOf<AudioEffectLimiter>>(signal: T, method: SignalFunction<AudioEffectLimiter[T]>): number;






}

