
/**
 * AudioStreamSample stores sound samples loaded from WAV files. To play the stored sound, use an [AudioStreamPlayer] (for non-positional audio) or [AudioStreamPlayer2D]/[AudioStreamPlayer3D] (for positional audio). The sound can be looped.
 *
 * This class can also be used to store dynamically-generated PCM audio data. See also [AudioStreamGenerator] for procedural audio generation.
 *
*/
declare class AudioStreamSample extends AudioStream {

  
/**
 * AudioStreamSample stores sound samples loaded from WAV files. To play the stored sound, use an [AudioStreamPlayer] (for non-positional audio) or [AudioStreamPlayer2D]/[AudioStreamPlayer3D] (for positional audio). The sound can be looped.
 *
 * This class can also be used to store dynamically-generated PCM audio data. See also [AudioStreamGenerator] for procedural audio generation.
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

/**
 * The sample rate for mixing this audio. Higher values require more storage space, but result in better quality.
 *
 * In games, common sample rates in use are `11025`, `16000`, `22050`, `32000`, `44100`, and `48000`.
 *
 * According to the [url=https://en.wikipedia.org/wiki/Nyquist%E2%80%93Shannon_sampling_theorem]Nyquist-Shannon sampling theorem[/url], there is no quality difference to human hearing when going past 40,000 Hz (since most humans can only hear up to ~20,000 Hz, often less). If you are using lower-pitched sounds such as voices, lower sample rates such as `32000` or `22050` may be usable with no loss in quality.
 *
*/
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

  // connect<T extends SignalsOf<AudioStreamSample>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AudioStreamSampleSignals>>(signal: T, method: SignalFunction<AudioStreamSampleSignals[T]>): number;



/**
 * 8-bit audio codec.
 *
*/
static FORMAT_8_BITS: any;

/**
 * 16-bit audio codec.
 *
*/
static FORMAT_16_BITS: any;

/**
 * Audio is compressed using IMA ADPCM.
 *
*/
static FORMAT_IMA_ADPCM: any;

/**
 * Audio does not loop.
 *
*/
static LOOP_DISABLED: any;

/**
 * Audio loops the data between [member loop_begin] and [member loop_end], playing forward only.
 *
*/
static LOOP_FORWARD: any;

/**
 * Audio loops the data between [member loop_begin] and [member loop_end], playing back and forth.
 *
*/
static LOOP_PING_PONG: any;

/**
 * Audio loops the data between [member loop_begin] and [member loop_end], playing backward only.
 *
*/
static LOOP_BACKWARD: any;

}

declare class AudioStreamSampleSignals extends AudioStreamSignals {
  
}
