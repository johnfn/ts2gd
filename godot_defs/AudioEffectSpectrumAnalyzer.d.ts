
/**
*/
declare class AudioEffectSpectrumAnalyzer extends AudioEffect {

  
/**
*/
  "new"(): AudioEffectSpectrumAnalyzer;
  static "new"(): AudioEffectSpectrumAnalyzer;








  connect<T extends SignalsOf<AudioEffectSpectrumAnalyzer>, U extends Node>(signal: T, node: U, method: keyof U): number;



/** No documentation provided. */
static FFT_SIZE_256: 0;

/** No documentation provided. */
static FFT_SIZE_512: 1;

/** No documentation provided. */
static FFT_SIZE_1024: 2;

/** No documentation provided. */
static FFT_SIZE_2048: 3;

/** No documentation provided. */
static FFT_SIZE_4096: 4;

/**
 * Represents the size of the [enum FFT_Size] enum.
 *
*/
static FFT_SIZE_MAX: 5;


  
}
