
/**
 * Occludes light cast by a Light2D, casting shadows. The LightOccluder2D must be provided with an [OccluderPolygon2D] in order for the shadow to be computed.
 *
*/
declare class LightOccluder2D extends Node2D {

  
/**
 * Occludes light cast by a Light2D, casting shadows. The LightOccluder2D must be provided with an [OccluderPolygon2D] in order for the shadow to be computed.
 *
*/
  "new"(): LightOccluder2D;
  static "new"(): LightOccluder2D;



/** The LightOccluder2D's light mask. The LightOccluder2D will cast shadows only from Light2D(s) that have the same light mask(s). */
light_mask: int;

/** The [OccluderPolygon2D] used to compute the shadow. */
occluder: OccluderPolygon2D;



  // connect<T extends SignalsOf<LightOccluder2D>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<LightOccluder2DSignals>>(signal: T, method: SignalFunction<LightOccluder2DSignals[T]>): number;




}

declare class LightOccluder2DSignals extends Node2DSignals {
  
}
