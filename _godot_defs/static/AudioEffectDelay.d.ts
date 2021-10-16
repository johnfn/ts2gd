
/**
 * Plays input signal back after a period of time. The delayed signal may be played back multiple times to create the sound of a repeating, decaying echo. Delay effects range from a subtle echo effect to a pronounced blending of previous sounds with new sounds.
 *
*/
declare class AudioEffectDelay extends AudioEffect {

  
/**
 * Plays input signal back after a period of time. The delayed signal may be played back multiple times to create the sound of a repeating, decaying echo. Delay effects range from a subtle echo effect to a pronounced blending of previous sounds with new sounds.
 *
*/
  "new"(): AudioEffectDelay;
  static "new"(): AudioEffectDelay;



/** Output percent of original sound. At 0, only delayed sounds are output. Value can range from 0 to 1. */
dry: float;

/** If [code]true[/code], feedback is enabled. */
"feedback/active": boolean;

/** Feedback delay time in milliseconds. */
"feedback/delay_ms": float;

/** Sound level for [code]tap1[/code]. */
"feedback/level_db": float;

/** Low-pass filter for feedback, in Hz. Frequencies below this value are filtered out of the source signal. */
"feedback/lowpass": float;

/** If [code]true[/code], [code]tap1[/code] will be enabled. */
"tap1/active": boolean;

/** [code]tap1[/code] delay time in milliseconds. */
"tap1/delay_ms": float;

/** Sound level for [code]tap1[/code]. */
"tap1/level_db": float;

/** Pan position for [code]tap1[/code]. Value can range from -1 (fully left) to 1 (fully right). */
"tap1/pan": float;

/** If [code]true[/code], [code]tap2[/code] will be enabled. */
"tap2/active": boolean;

/** [b]Tap2[/b] delay time in milliseconds. */
"tap2/delay_ms": float;

/** Sound level for [code]tap2[/code]. */
"tap2/level_db": float;

/** Pan position for [code]tap2[/code]. Value can range from -1 (fully left) to 1 (fully right). */
"tap2/pan": float;



  // connect<T extends SignalsOf<AudioEffectDelay>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AudioEffectDelaySignals>>(signal: T, method: SignalFunction<AudioEffectDelaySignals[T]>): number;




}

declare class AudioEffectDelaySignals extends AudioEffectSignals {
  
}
