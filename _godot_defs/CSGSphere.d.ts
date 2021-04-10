
/**
 * This node allows you to create a sphere for use with the CSG system.
 *
*/
declare class CSGSphere extends CSGPrimitive {

  
/**
 * This node allows you to create a sphere for use with the CSG system.
 *
*/
  "new"(): CSGSphere;
  static "new"(): CSGSphere;



/** The material used to render the sphere. */
material: Material;

/** Number of vertical slices for the sphere. */
radial_segments: int;

/** Radius of the sphere. */
radius: float;

/** Number of horizontal slices for the sphere. */
rings: int;

/** If [code]true[/code] the normals of the sphere are set to give a smooth effect making the sphere seem rounded. If [code]false[/code] the sphere will have a flat shaded look. */
smooth_faces: boolean;



  connect<T extends SignalsOf<CSGSphere>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
