
/**
*/
declare class JavaClass extends Reference  {

  
/**
*/
  new(): JavaClass; 
  static "new"(): JavaClass 





  connect<T extends SignalsOf<JavaClass>>(signal: T, method: SignalFunction<JavaClass[T]>): number;






}

