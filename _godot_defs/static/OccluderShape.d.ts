
/**
 * [Occluder]s can use any primitive shape derived from [OccluderShape].
 *
*/
declare class OccluderShape extends Resource  {

  
/**
 * [Occluder]s can use any primitive shape derived from [OccluderShape].
 *
*/
  new(): OccluderShape; 
  static "new"(): OccluderShape 





  connect<T extends SignalsOf<OccluderShape>>(signal: T, method: SignalFunction<OccluderShape[T]>): number;






}

