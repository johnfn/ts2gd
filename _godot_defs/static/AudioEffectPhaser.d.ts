
/**
 * Combines phase-shifted signals with the original signal. The movement of the phase-shifted signals is controlled using a low-frequency oscillator.
 *
*/
declare class AudioEffectPhaser extends AudioEffect  {

  
/**
 * Combines phase-shifted signals with the original signal. The movement of the phase-shifted signals is controlled using a low-frequency oscillator.
 *
*/
  new(): AudioEffectPhaser; 
  static "new"(): AudioEffectPhaser 


/** Governs how high the filter frequencies sweep. Low value will primarily affect bass frequencies. High value can sweep high into the treble. Value can range from 0.1 to 4. */
depth: float;

/** Output percent of modified sound. Value can range from 0.1 to 0.9. */
feedback: float;

/** Determines the maximum frequency affected by the LFO modulations, in Hz. Value can range from 10 to 10000. */
range_max_hz: float;

/** Determines the minimum frequency affected by the LFO modulations, in Hz. Value can range from 10 to 10000. */
range_min_hz: float;

/** Adjusts the rate in Hz at which the effect sweeps up and down across the frequency range. */
rate_hz: float;



  connect<T extends SignalsOf<AudioEffectPhaser>>(signal: T, method: SignalFunction<AudioEffectPhaser[T]>): number;






}

