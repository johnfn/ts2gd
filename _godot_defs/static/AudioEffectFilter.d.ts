
/**
 * Allows frequencies other than the [member cutoff_hz] to pass.
 *
*/
declare class AudioEffectFilter extends AudioEffect {

  
/**
 * Allows frequencies other than the [member cutoff_hz] to pass.
 *
*/
  "new"(): AudioEffectFilter;
  static "new"(): AudioEffectFilter;



/** Threshold frequency for the filter, in Hz. */
cutoff_hz: float;


/** Gain amount of the frequencies after the filter. */
gain: float;

/** Amount of boost in the frequency range near the cutoff frequency. */
resonance: float;



  connect<T extends SignalsOf<AudioEffectFilter>, U extends Node>(signal: T, node: U, method: keyof U): number;



/** No documentation provided. */
static FILTER_6DB: 0;

/** No documentation provided. */
static FILTER_12DB: 1;

/** No documentation provided. */
static FILTER_18DB: 2;

/** No documentation provided. */
static FILTER_24DB: 3;


  
}
