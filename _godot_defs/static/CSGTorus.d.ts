
/**
 * This node allows you to create a torus for use with the CSG system.
 *
*/
declare class CSGTorus extends CSGPrimitive {

  
/**
 * This node allows you to create a torus for use with the CSG system.
 *
*/
  "new"(): CSGTorus;
  static "new"(): CSGTorus;



/** The inner radius of the torus. */
inner_radius: float;

/** The material used to render the torus. */
material: Material;

/** The outer radius of the torus. */
outer_radius: float;

/** The number of edges each ring of the torus is constructed of. */
ring_sides: int;

/** The number of slices the torus is constructed of. */
sides: int;

/** If [code]true[/code] the normals of the torus are set to give a smooth effect making the torus seem rounded. If [code]false[/code] the torus will have a flat shaded look. */
smooth_faces: boolean;



  connect<T extends SignalsOf<CSGTorus>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
