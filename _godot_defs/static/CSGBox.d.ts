
/**
 * This node allows you to create a box for use with the CSG system.
 *
*/
declare class CSGBox extends CSGPrimitive {

  
/**
 * This node allows you to create a box for use with the CSG system.
 *
*/
  "new"(): CSGBox;
  static "new"(): CSGBox;



/** Depth of the box measured from the center of the box. */
depth: float;

/** Height of the box measured from the center of the box. */
height: float;

/** The material used to render the box. */
material: Material;

/** Width of the box measured from the center of the box. */
width: float;



  // connect<T extends SignalsOf<CSGBox>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<CSGBoxSignals>>(signal: T, method: SignalFunction<CSGBoxSignals[T]>): number;




}

declare class CSGBoxSignals extends CSGPrimitiveSignals {
  
}
