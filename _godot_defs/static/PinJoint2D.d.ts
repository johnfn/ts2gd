
/**
 * Pin Joint for 2D rigid bodies. It pins two bodies (rigid or static) together.
 *
*/
declare class PinJoint2D extends Joint2D {

  
/**
 * Pin Joint for 2D rigid bodies. It pins two bodies (rigid or static) together.
 *
*/
  "new"(): PinJoint2D;
  static "new"(): PinJoint2D;



/** The higher this value, the more the bond to the pinned partner can flex. */
softness: float;



  // connect<T extends SignalsOf<PinJoint2D>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<PinJoint2DSignals>>(signal: T, method: SignalFunction<PinJoint2DSignals[T]>): number;




}

declare class PinJoint2DSignals extends Joint2DSignals {
  
}
