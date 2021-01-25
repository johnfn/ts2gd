
/**
 * Class representing a planar [PrimitiveMesh]. This flat mesh does not have a thickness. By default, this mesh is aligned on the X and Z axes; this default rotation isn't suited for use with billboarded materials. For billboarded materials, use [QuadMesh] instead.
 *
*/
declare class PlaneMesh extends PrimitiveMesh {

  
/**
 * Class representing a planar [PrimitiveMesh]. This flat mesh does not have a thickness. By default, this mesh is aligned on the X and Z axes; this default rotation isn't suited for use with billboarded materials. For billboarded materials, use [QuadMesh] instead.
 *
*/
  "new"(): PlaneMesh;
  static "new"(): PlaneMesh;



/** Size of the generated plane. */
size: Vector2;

/** Number of subdivision along the Z axis. */
subdivide_depth: int;

/** Number of subdivision along the X axis. */
subdivide_width: int;



  connect<T extends SignalsOf<PlaneMesh>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
