
/**
 * Dynamic range compressor reduces the level of the sound when the amplitude goes over a certain threshold in Decibels. One of the main uses of a compressor is to increase the dynamic range by clipping as little as possible (when sound goes over 0dB).
 *
 * Compressor has many uses in the mix:
 *
 * - In the Master bus to compress the whole output (although an [AudioEffectLimiter] is probably better).
 *
 * - In voice channels to ensure they sound as balanced as possible.
 *
 * - Sidechained. This can reduce the sound level sidechained with another audio bus for threshold detection. This technique is common in video game mixing to the level of music and SFX while voices are being heard.
 *
 * - Accentuates transients by using a wider attack, making effects sound more punchy.
 *
*/
declare class AudioEffectCompressor extends AudioEffect {

  
/**
 * Dynamic range compressor reduces the level of the sound when the amplitude goes over a certain threshold in Decibels. One of the main uses of a compressor is to increase the dynamic range by clipping as little as possible (when sound goes over 0dB).
 *
 * Compressor has many uses in the mix:
 *
 * - In the Master bus to compress the whole output (although an [AudioEffectLimiter] is probably better).
 *
 * - In voice channels to ensure they sound as balanced as possible.
 *
 * - Sidechained. This can reduce the sound level sidechained with another audio bus for threshold detection. This technique is common in video game mixing to the level of music and SFX while voices are being heard.
 *
 * - Accentuates transients by using a wider attack, making effects sound more punchy.
 *
*/
  "new"(): AudioEffectCompressor;
  static "new"(): AudioEffectCompressor;



/** Compressor's reaction time when the signal exceeds the threshold, in microseconds. Value can range from 20 to 2000. */
attack_us: float;

/** Gain applied to the output signal. */
gain: float;

/** Balance between original signal and effect signal. Value can range from 0 (totally dry) to 1 (totally wet). */
mix: float;

/** Amount of compression applied to the audio once it passes the threshold level. The higher the ratio, the more the loud parts of the audio will be compressed. Value can range from 1 to 48. */
ratio: float;

/** Compressor's delay time to stop reducing the signal after the signal level falls below the threshold, in milliseconds. Value can range from 20 to 2000. */
release_ms: float;

/** Reduce the sound level using another audio bus for threshold detection. */
sidechain: string;

/** The level above which compression is applied to the audio. Value can range from -60 to 0. */
threshold: float;



  // connect<T extends SignalsOf<AudioEffectCompressor>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AudioEffectCompressorSignals>>(signal: T, method: SignalFunction<AudioEffectCompressorSignals[T]>): number;




}

declare class AudioEffectCompressorSignals extends AudioEffectSignals {
  
}
