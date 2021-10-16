
/**
*/
declare class AudioStreamMicrophone extends AudioStream {

  
/**
*/
  "new"(): AudioStreamMicrophone;
  static "new"(): AudioStreamMicrophone;






  // connect<T extends SignalsOf<AudioStreamMicrophone>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AudioStreamMicrophoneSignals>>(signal: T, method: SignalFunction<AudioStreamMicrophoneSignals[T]>): number;




}

declare class AudioStreamMicrophoneSignals extends AudioStreamSignals {
  
}
