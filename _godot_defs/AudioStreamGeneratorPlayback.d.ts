
/**
*/
declare class AudioStreamGeneratorPlayback extends AudioStreamPlaybackResampled {

  
/**
*/
  "new"(): AudioStreamGeneratorPlayback;
  static "new"(): AudioStreamGeneratorPlayback;




/** No documentation provided. */
can_push_buffer(amount: int): boolean;

/** No documentation provided. */
clear_buffer(): void;

/** No documentation provided. */
get_frames_available(): int;

/** No documentation provided. */
get_skips(): int;

/** No documentation provided. */
push_buffer(frames: PoolVector2Array): boolean;

/** No documentation provided. */
push_frame(frame: Vector2): boolean;

  connect<T extends SignalsOf<AudioStreamGeneratorPlayback>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
