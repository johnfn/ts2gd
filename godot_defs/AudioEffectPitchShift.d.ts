
/**
 * Allows modulation of pitch independently of tempo. All frequencies can be increased/decreased with minimal effect on transients.
 *
*/
declare class AudioEffectPitchShift extends AudioEffect {

  
/**
 * Allows modulation of pitch independently of tempo. All frequencies can be increased/decreased with minimal effect on transients.
 *
*/
  "new"(): AudioEffectPitchShift;
  static "new"(): AudioEffectPitchShift;





/** Pitch value. Can range from 0 (-1 octave) to 16 (+16 octaves). */
pitch_scale: float;



  connect<T extends SignalsOf<AudioEffectPitchShift>, U extends Node>(signal: T, node: U, method: keyof U): number;



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
