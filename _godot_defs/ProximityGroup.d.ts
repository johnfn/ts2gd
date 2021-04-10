
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
broadcast(name: string, parameters: any): void;

  connect<T extends SignalsOf<ProximityGroup>, U extends Node>(signal: T, node: U, method: keyof U): number;



/** No documentation provided. */
static MODE_PROXY: 0;

/** No documentation provided. */
static MODE_SIGNAL: 1;


  /**
*/
broadcast: Signal<(group_name: string, parameters: any[]) => void>

}
