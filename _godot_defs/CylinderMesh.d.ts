
/**
 * Class representing a cylindrical [PrimitiveMesh]. This class can be used to create cones by setting either the [member top_radius] or [member bottom_radius] properties to 0.0.
 *
*/
declare class CylinderMesh extends PrimitiveMesh {

  
/**
 * Class representing a cylindrical [PrimitiveMesh]. This class can be used to create cones by setting either the [member top_radius] or [member bottom_radius] properties to 0.0.
 *
*/
  "new"(): CylinderMesh;
  static "new"(): CylinderMesh;



/** Bottom radius of the cylinder. */
bottom_radius: float;

/** Full height of the cylinder. */
height: float;

/** Number of radial segments on the cylinder. */
radial_segments: int;

/** Number of edge rings along the height of the cylinder. */
rings: int;

/** Top radius of the cylinder. */
top_radius: float;



  connect<T extends SignalsOf<CylinderMesh>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
