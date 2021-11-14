
/**
 * This audio effect does not affect sound output, but can be used for real-time audio visualizations.
 *
 * See also [AudioStreamGenerator] for procedurally generating sounds.
 *
*/
declare class AudioEffectSpectrumAnalyzer extends AudioEffect  {

  
/**
 * This audio effect does not affect sound output, but can be used for real-time audio visualizations.
 *
 * See also [AudioStreamGenerator] for procedurally generating sounds.
 *
*/
  new(): AudioEffectSpectrumAnalyzer; 
  static "new"(): AudioEffectSpectrumAnalyzer 


/** The length of the buffer to keep (in seconds). Higher values keep data around for longer, but require more memory. */
buffer_length: float;

/** The size of the [url=https://en.wikipedia.org/wiki/Fast_Fourier_transform]Fast Fourier transform[/url] buffer. Higher values smooth out the spectrum analysis over time, but have greater latency. The effects of this higher latency are especially noticeable with sudden amplitude changes. */
fft_size: int;




  connect<T extends SignalsOf<AudioEffectSpectrumAnalyzer>>(signal: T, method: SignalFunction<AudioEffectSpectrumAnalyzer[T]>): number;



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

