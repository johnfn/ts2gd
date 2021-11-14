
/**
 * General-purpose proximity detection node.
 *
*/
declare class ProximityGroup extends Spatial  {

  
/**
 * General-purpose proximity detection node.
 *
*/
  new(): ProximityGroup; 
  static "new"(): ProximityGroup 





/** No documentation provided. */
broadcast(method: string, parameters: any): void;

  connect<T extends SignalsOf<ProximityGroup>>(signal: T, method: SignalFunction<ProximityGroup[T]>): number;



/** No documentation provided. */
static MODE_PROXY: any;

/** No documentation provided. */
static MODE_SIGNAL: any;


/**
*/
$broadcast: Signal<(method: string, parameters: any[]) => void>

}

