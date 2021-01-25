
/**
 * Float built-in type.
 *
*/
declare class float {

  
/**
 * Float built-in type.
 *
*/

  constructor(from: boolean);
  constructor(from: int);
  constructor(from: string);
  static "new"(): float;










  connect<T extends SignalsOf<float>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
