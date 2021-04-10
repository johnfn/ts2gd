
/**
*/
declare class AudioStreamPlaybackResampled extends AudioStreamPlayback {

  
/**
*/
  "new"(): AudioStreamPlaybackResampled;
  static "new"(): AudioStreamPlaybackResampled;






  connect<T extends SignalsOf<AudioStreamPlaybackResampled>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
