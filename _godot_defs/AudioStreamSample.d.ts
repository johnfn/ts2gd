
/**
 * AudioStreamSample stores sound samples loaded from WAV files. To play the stored sound, use an [AudioStreamPlayer] (for non-positional audio) or [AudioStreamPlayer2D]/[AudioStreamPlayer3D] (for positional audio). The sound can be looped.
 *
 * This class can also be used to store dynamically-generated PCM audio data.
 *
*/
declare class AudioStreamSample extends AudioStream {

  
/**
 * AudioStreamSample stores sound samples loaded from WAV files. To play the stored sound, use an [AudioStreamPlayer] (for non-positional audio) or [AudioStreamPlayer2D]/[AudioStreamPlayer3D] (for positional audio). The sound can be looped.
 *
 * This class can also be used to store dynamically-generated PCM audio data.
 *
*/
  "new"(): AudioStreamSample;
  static "new"(): AudioStreamSample;



/**
 * Contains the audio data in bytes.
 *
 * **Note:** This property expects signed PCM8 data. To convert unsigned PCM8 to signed PCM8, subtract 128 from each byte.
 *
*/
data: PoolByteArray;

/** Audio format. See [enum Format] constants for values. */
format: int;

/** The loop start point (in number of samples, relative to the beginning of the sample). This information will be imported automatically from the WAV file if present. */
loop_begin: int;

/** The loop end point (in number of samples, relative to the beginning of the sample). This information will be imported automatically from the WAV file if present. */
loop_end: int;

/** The loop mode. This information will be imported automatically from the WAV file if present. See [enum LoopMode] constants for values. */
loop_mode: int;

/** The sample rate for mixing this audio. */
mix_rate: int;

/** If [code]true[/code], audio is stereo. */
stereo: boolean;

/**
 * Saves the AudioStreamSample as a WAV file to `path`. Samples with IMA ADPCM format can't be saved.
 *
 * **Note:** A `.wav` extension is automatically appended to `path` if it is missing.
 *
*/
save_to_wav(path: string): int;

  connect<T extends SignalsOf<AudioStreamSample>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * 8-bit audio codec.
 *
*/
static FORMAT_8_BITS: 0;

/**
 * 16-bit audio codec.
 *
*/
static FORMAT_16_BITS: 1;

/**
 * Audio is compressed using IMA ADPCM.
 *
*/
static FORMAT_IMA_ADPCM: 2;

/**
 * Audio does not loop.
 *
*/
static LOOP_DISABLED: 0;

/**
 * Audio loops the data between [member loop_begin] and [member loop_end], playing forward only.
 *
*/
static LOOP_FORWARD: 1;

/**
 * Audio loops the data between [member loop_begin] and [member loop_end], playing back and forth.
 *
*/
static LOOP_PING_PONG: 2;

/**
 * Audio loops the data between [member loop_begin] and [member loop_end], playing backward only.
 *
*/
static LOOP_BACKWARD: 3;


  
}
