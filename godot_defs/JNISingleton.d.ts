
/**
*/
declare class JNISingleton extends Object {

  
/**
*/
  "new"(): JNISingleton;
  static "new"(): JNISingleton;






  connect<T extends SignalsOf<JNISingleton>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
