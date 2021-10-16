
/**
 * General-purpose proximity detection node.
 *
*/
declare class ProximityGroup extends Spatial {

  
/**
 * General-purpose proximity detection node.
 *
*/
  "new"(): ProximityGroup;
  static "new"(): ProximityGroup;






/** No documentation provided. */
broadcast(method: string, parameters: any): void;

  // connect<T extends SignalsOf<ProximityGroup>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<ProximityGroupSignals>>(signal: T, method: SignalFunction<ProximityGroupSignals[T]>): number;



/** No documentation provided. */
static MODE_PROXY: any;

/** No documentation provided. */
static MODE_SIGNAL: any;

}

declare class ProximityGroupSignals extends SpatialSignals {
  /**
*/
broadcast: Signal<(method: string, parameters: any[]) => void>

}
