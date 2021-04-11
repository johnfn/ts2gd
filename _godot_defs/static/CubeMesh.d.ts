
/**
 * Generate an axis-aligned cuboid [PrimitiveMesh].
 *
 * The cube's UV layout is arranged in a 3×2 layout that allows texturing each face individually. To apply the same texture on all faces, change the material's UV property to `Vector3(3, 2, 1)`.
 *
*/
declare class CubeMesh extends PrimitiveMesh {

  
/**
 * Generate an axis-aligned cuboid [PrimitiveMesh].
 *
 * The cube's UV layout is arranged in a 3×2 layout that allows texturing each face individually. To apply the same texture on all faces, change the material's UV property to `Vector3(3, 2, 1)`.
 *
*/
  "new"(): CubeMesh;
  static "new"(): CubeMesh;



/** Size of the cuboid mesh. */
size: Vector3;

/** Number of extra edge loops inserted along the Z axis. */
subdivide_depth: int;

/** Number of extra edge loops inserted along the Y axis. */
subdivide_height: int;

/** Number of extra edge loops inserted along the X axis. */
subdivide_width: int;



  connect<T extends SignalsOf<CubeMesh>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
