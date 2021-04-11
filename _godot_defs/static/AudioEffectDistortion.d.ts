
/**
 * Different types are available: clip, tan, lo-fi (bit crushing), overdrive, or waveshape.
 *
 * By distorting the waveform the frequency content change, which will often make the sound "crunchy" or "abrasive". For games, it can simulate sound coming from some saturated device or speaker very efficiently.
 *
*/
declare class AudioEffectDistortion extends AudioEffect {

  
/**
 * Different types are available: clip, tan, lo-fi (bit crushing), overdrive, or waveshape.
 *
 * By distorting the waveform the frequency content change, which will often make the sound "crunchy" or "abrasive". For games, it can simulate sound coming from some saturated device or speaker very efficiently.
 *
*/
  "new"(): AudioEffectDistortion;
  static "new"(): AudioEffectDistortion;



/** Distortion power. Value can range from 0 to 1. */
drive: float;

/** High-pass filter, in Hz. Frequencies higher than this value will not be affected by the distortion. Value can range from 1 to 20000. */
keep_hf_hz: float;

/** Distortion type. */
mode: int;

/** Increases or decreases the volume after the effect. Value can range from -80 to 24. */
post_gain: float;

/** Increases or decreases the volume before the effect. Value can range from -60 to 60. */
pre_gain: float;



  connect<T extends SignalsOf<AudioEffectDistortion>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Digital distortion effect which cuts off peaks at the top and bottom of the waveform.
 *
*/
static MODE_CLIP: 0;

/** No documentation provided. */
static MODE_ATAN: 1;

/**
 * Low-resolution digital distortion effect. You can use it to emulate the sound of early digital audio devices.
 *
*/
static MODE_LOFI: 2;

/**
 * Emulates the warm distortion produced by a field effect transistor, which is commonly used in solid-state musical instrument amplifiers.
 *
*/
static MODE_OVERDRIVE: 3;

/**
 * Waveshaper distortions are used mainly by electronic musicians to achieve an extra-abrasive sound.
 *
*/
static MODE_WAVESHAPE: 4;


  
}
