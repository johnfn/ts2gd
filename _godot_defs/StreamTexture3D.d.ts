
/**
*/
declare class StreamTexture3D extends Texture3D {

  
/**
*/
  "new"(): this;
  static "new"(): this;




/** No documentation provided. */
load(path: String): int;

  connect<T extends SignalsOf<StreamTexture3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
