
/**
*/
declare class JavaClassWrapperClass extends Object {

  
/**
*/
  "new"(): JavaClassWrapperClass;
  static "new"(): JavaClassWrapperClass;




/** No documentation provided. */
wrap(name: string): JavaClass;

  // connect<T extends SignalsOf<JavaClassWrapperClass>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<JavaClassWrapperClassSignals>>(signal: T, method: SignalFunction<JavaClassWrapperClassSignals[T]>): number;




}

declare class JavaClassWrapperClassSignals extends ObjectSignals {
  
}
