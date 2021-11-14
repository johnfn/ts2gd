
/**
*/
declare class AudioStreamMicrophone extends AudioStream  {

  
/**
*/
  new(): AudioStreamMicrophone; 
  static "new"(): AudioStreamMicrophone 





  connect<T extends SignalsOf<AudioStreamMicrophone>>(signal: T, method: SignalFunction<AudioStreamMicrophone[T]>): number;






}

