
/**
 * This node allows you to create a box for use with the CSG system.
 *
*/
declare class CSGBox extends CSGPrimitive  {

  
/**
 * This node allows you to create a box for use with the CSG system.
 *
*/
  new(): CSGBox; 
  static "new"(): CSGBox 


/** Depth of the box measured from the center of the box. */
depth: float;

/** Height of the box measured from the center of the box. */
height: float;

/** The material used to render the box. */
material: Material;

/** Width of the box measured from the center of the box. */
width: float;



  connect<T extends SignalsOf<CSGBox>>(signal: T, method: SignalFunction<CSGBox[T]>): number;






}

