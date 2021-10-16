
/**
 * [Occluder]s can use any primitive shape derived from [OccluderShape].
 *
*/
declare class OccluderShape extends Resource {

  
/**
 * [Occluder]s can use any primitive shape derived from [OccluderShape].
 *
*/
  "new"(): OccluderShape;
  static "new"(): OccluderShape;






  // connect<T extends SignalsOf<OccluderShape>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<OccluderShapeSignals>>(signal: T, method: SignalFunction<OccluderShapeSignals[T]>): number;




}

declare class OccluderShapeSignals extends ResourceSignals {
  
}
