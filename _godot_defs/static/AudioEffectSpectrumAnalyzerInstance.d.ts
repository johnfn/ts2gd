
/**
*/
declare class AudioEffectSpectrumAnalyzerInstance extends AudioEffectInstance  {

  
/**
*/
  new(): AudioEffectSpectrumAnalyzerInstance; 
  static "new"(): AudioEffectSpectrumAnalyzerInstance 



/** No documentation provided. */
get_magnitude_for_frequency_range(from_hz: float, to_hz: float, mode?: int): Vector2;

  connect<T extends SignalsOf<AudioEffectSpectrumAnalyzerInstance>>(signal: T, method: SignalFunction<AudioEffectSpectrumAnalyzerInstance[T]>): number;



/**
 * Use the average value as magnitude.
 *
*/
static MAGNITUDE_AVERAGE: any;

/**
 * Use the maximum value as magnitude.
 *
*/
static MAGNITUDE_MAX: any;



}

