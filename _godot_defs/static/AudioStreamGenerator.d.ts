
/**
*/
declare class AudioStreamGenerator extends AudioStream {

  
/**
*/
  "new"(): AudioStreamGenerator;
  static "new"(): AudioStreamGenerator;







  connect<T extends SignalsOf<AudioStreamGenerator>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
