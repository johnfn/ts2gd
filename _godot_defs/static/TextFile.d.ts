
/**
*/
declare class TextFile extends Resource  {

  
/**
*/
  new(): TextFile; 
  static "new"(): TextFile 





  connect<T extends SignalsOf<TextFile>>(signal: T, method: SignalFunction<TextFile[T]>): number;






}

