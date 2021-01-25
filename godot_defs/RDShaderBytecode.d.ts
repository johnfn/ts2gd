
/**
*/
declare class RDShaderBytecode extends Resource {

  
/**
*/
  "new"(): this;
  static "new"(): this;













/** No documentation provided. */
get_stage_bytecode(stage: int): PackedByteArray;

/** No documentation provided. */
get_stage_compile_error(stage: int): String;

/** No documentation provided. */
set_stage_bytecode(stage: int, bytecode: PackedByteArray): void;

/** No documentation provided. */
set_stage_compile_error(stage: int, compile_error: String): void;

  connect<T extends SignalsOf<RDShaderBytecode>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
