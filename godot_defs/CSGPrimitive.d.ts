
/**
 * Parent class for various CSG primitives. It contains code and functionality that is common between them. It cannot be used directly. Instead use one of the various classes that inherit from it.
 *
*/
declare class CSGPrimitive extends CSGShape {

  
/**
 * Parent class for various CSG primitives. It contains code and functionality that is common between them. It cannot be used directly. Instead use one of the various classes that inherit from it.
 *
*/
  "new"(): CSGPrimitive;
  static "new"(): CSGPrimitive;



/** Invert the faces of the mesh. */
invert_faces: boolean;



  connect<T extends SignalsOf<CSGPrimitive>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
