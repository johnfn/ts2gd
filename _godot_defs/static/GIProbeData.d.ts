
/**
*/
declare class GIProbeData extends Resource {

  
/**
*/
  "new"(): GIProbeData;
  static "new"(): GIProbeData;
















  // connect<T extends SignalsOf<GIProbeData>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<GIProbeDataSignals>>(signal: T, method: SignalFunction<GIProbeDataSignals[T]>): number;




}

declare class GIProbeDataSignals extends ResourceSignals {
  
}
