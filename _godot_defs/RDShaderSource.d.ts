
/**
*/
declare class RDShaderSource extends Reference {

  
/**
*/
  "new"(): this;
  static "new"(): this;









/** No documentation provided. */
get_stage_source(stage: int): String;

/** No documentation provided. */
set_stage_source(stage: int, source: String): void;

  connect<T extends SignalsOf<RDShaderSource>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
