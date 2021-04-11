
/**
*/
declare class TextFile extends Resource {

  
/**
*/
  "new"(): TextFile;
  static "new"(): TextFile;






  connect<T extends SignalsOf<TextFile>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
