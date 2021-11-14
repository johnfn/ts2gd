
/**
 * AudioEffectEQ gives you control over frequencies. Use it to compensate for existing deficiencies in audio. AudioEffectEQs are useful on the Master bus to completely master a mix and give it more character. They are also useful when a game is run on a mobile device, to adjust the mix to that kind of speakers (it can be added but disabled when headphones are plugged).
 *
*/
declare class AudioEffectEQ extends AudioEffect  {

  
/**
 * AudioEffectEQ gives you control over frequencies. Use it to compensate for existing deficiencies in audio. AudioEffectEQs are useful on the Master bus to completely master a mix and give it more character. They are also useful when a game is run on a mobile device, to adjust the mix to that kind of speakers (it can be added but disabled when headphones are plugged).
 *
*/
  new(): AudioEffectEQ; 
  static "new"(): AudioEffectEQ 



/** Returns the number of bands of the equalizer. */
get_band_count(): int;

/** Returns the band's gain at the specified index, in dB. */
get_band_gain_db(band_idx: int): float;

/** Sets band's gain at the specified index, in dB. */
set_band_gain_db(band_idx: int, volume_db: float): void;

  connect<T extends SignalsOf<AudioEffectEQ>>(signal: T, method: SignalFunction<AudioEffectEQ[T]>): number;






}

