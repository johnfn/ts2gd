
/**
*/
declare class RDUniform extends Reference {

  
/**
*/
  "new"(): this;
  static "new"(): this;





/** No documentation provided. */
add_id(id: RID): void;

/** No documentation provided. */
clear_ids(): void;

/** No documentation provided. */
get_ids(): any[];

  connect<T extends SignalsOf<RDUniform>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
