
/**
 * General-purpose proximity detection node.
 *
*/
declare class ProximityGroup3D extends Node3D {

  
/**
 * General-purpose proximity detection node.
 *
*/
  "new"(): this;
  static "new"(): this;






/** No documentation provided. */
broadcast(name: String, parameters: any): void;

  connect<T extends SignalsOf<ProximityGroup3D>, U extends Node>(signal: T, node: U, method: keyof U): number;



/** No documentation provided. */
static MODE_PROXY: 0;

/** No documentation provided. */
static MODE_SIGNAL: 1;


  /**
*/
broadcast: Signal<(group_name: String, parameters: any[]) => void>

}


 
