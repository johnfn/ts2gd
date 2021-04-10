
/**
*/
declare class RDShaderFile extends Resource {

  
/**
*/
  "new"(): this;
  static "new"(): this;




/** No documentation provided. */
get_bytecode(version?: StringName): RDShaderBytecode;

/** No documentation provided. */
get_version_list(): PackedStringArray;

/** No documentation provided. */
set_bytecode(bytecode: RDShaderBytecode, version?: StringName): void;

  connect<T extends SignalsOf<RDShaderFile>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
