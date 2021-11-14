
/**
 * Separator is a [Control] used for separating other controls. It's purely a visual decoration. Horizontal ([HSeparator]) and Vertical ([VSeparator]) versions are available.
 *
*/
declare class Separator extends Control  {

  
/**
 * Separator is a [Control] used for separating other controls. It's purely a visual decoration. Horizontal ([HSeparator]) and Vertical ([VSeparator]) versions are available.
 *
*/
  new(): Separator; 
  static "new"(): Separator 





  connect<T extends SignalsOf<Separator>>(signal: T, method: SignalFunction<Separator[T]>): number;






}

