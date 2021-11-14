
/**
 * CenterContainer keeps children controls centered. This container keeps all children to their minimum size, in the center.
 *
*/
declare class CenterContainer extends Container  {

  
/**
 * CenterContainer keeps children controls centered. This container keeps all children to their minimum size, in the center.
 *
*/
  new(): CenterContainer; 
  static "new"(): CenterContainer 


/** If [code]true[/code], centers children relative to the [CenterContainer]'s top left corner. */
use_top_left: boolean;



  connect<T extends SignalsOf<CenterContainer>>(signal: T, method: SignalFunction<CenterContainer[T]>): number;






}

