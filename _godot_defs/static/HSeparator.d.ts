
/**
 * Horizontal separator. See [Separator]. Even though it looks horizontal, it is used to separate objects vertically.
 *
*/
declare class HSeparator extends Separator  {

  
/**
 * Horizontal separator. See [Separator]. Even though it looks horizontal, it is used to separate objects vertically.
 *
*/
  new(): HSeparator; 
  static "new"(): HSeparator 





  connect<T extends SignalsOf<HSeparator>>(signal: T, method: SignalFunction<HSeparator[T]>): number;






}

