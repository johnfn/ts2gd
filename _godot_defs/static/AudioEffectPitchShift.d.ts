
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



/** The size of the [url=https://en.wikipedia.org/wiki/Fast_Fourier_transform]Fast Fourier transform[/url] buffer. Higher values smooth out the effect over time, but have greater latency. The effects of this higher latency are especially noticeable on sounds that have sudden amplitude changes. */
fft_size: int;

/** The oversampling factor to use. Higher values result in better quality, but are more demanding on the CPU and may cause audio cracking if the CPU can't keep up. */
oversampling: int;

/** The pitch scale to use. [code]1.0[/code] is the default pitch and plays sounds unaltered. [member pitch_scale] can range from [code]0.0[/code] (infinitely low pitch, inaudible) to [code]16[/code] (16 times higher than the initial pitch). */
pitch_scale: float;



  // connect<T extends SignalsOf<AudioEffectPitchShift>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AudioEffectPitchShiftSignals>>(signal: T, method: SignalFunction<AudioEffectPitchShiftSignals[T]>): number;



/**
 * Use a buffer of 256 samples for the Fast Fourier transform. Lowest latency, but least stable over time.
 *
*/
static FFT_SIZE_256: any;

/**
 * Use a buffer of 512 samples for the Fast Fourier transform. Low latency, but less stable over time.
 *
*/
static FFT_SIZE_512: any;

/**
 * Use a buffer of 1024 samples for the Fast Fourier transform. This is a compromise between latency and stability over time.
 *
*/
static FFT_SIZE_1024: any;

/**
 * Use a buffer of 2048 samples for the Fast Fourier transform. High latency, but stable over time.
 *
*/
static FFT_SIZE_2048: any;

/**
 * Use a buffer of 4096 samples for the Fast Fourier transform. Highest latency, but most stable over time.
 *
*/
static FFT_SIZE_4096: any;

/**
 * Represents the size of the [enum FFT_Size] enum.
 *
*/
static FFT_SIZE_MAX: any;

}

declare class AudioEffectPitchShiftSignals extends AudioEffectSignals {
  
}
