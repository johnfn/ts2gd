
/**
*/
declare class AudioEffectSpectrumAnalyzerInstance extends AudioEffectInstance {

  
/**
*/
  "new"(): AudioEffectSpectrumAnalyzerInstance;
  static "new"(): AudioEffectSpectrumAnalyzerInstance;




/** No documentation provided. */
get_magnitude_for_frequency_range(from_hz: float, to_hz: float, mode?: int): Vector2;

  // connect<T extends SignalsOf<AudioEffectSpectrumAnalyzerInstance>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AudioEffectSpectrumAnalyzerInstanceSignals>>(signal: T, method: SignalFunction<AudioEffectSpectrumAnalyzerInstanceSignals[T]>): number;



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

declare class AudioEffectSpectrumAnalyzerInstanceSignals extends AudioEffectInstanceSignals {
  
}
