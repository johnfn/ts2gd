
/**
 * Generate an axis-aligned cuboid [PrimitiveMesh].
 *
 * The cube's UV layout is arranged in a 3×2 layout that allows texturing each face individually. To apply the same texture on all faces, change the material's UV property to `Vector3(3, 2, 1)`.
 *
 * **Note:** When using a large textured [CubeMesh] (e.g. as a floor), you may stumble upon UV jittering issues depending on the camera angle. To solve this, increase [member subdivide_depth], [member subdivide_height] and [member subdivide_width] until you no longer notice UV jittering.
 *
*/
declare class CubeMesh extends PrimitiveMesh  {

  
/**
 * Generate an axis-aligned cuboid [PrimitiveMesh].
 *
 * The cube's UV layout is arranged in a 3×2 layout that allows texturing each face individually. To apply the same texture on all faces, change the material's UV property to `Vector3(3, 2, 1)`.
 *
 * **Note:** When using a large textured [CubeMesh] (e.g. as a floor), you may stumble upon UV jittering issues depending on the camera angle. To solve this, increase [member subdivide_depth], [member subdivide_height] and [member subdivide_width] until you no longer notice UV jittering.
 *
*/
  new(): CubeMesh; 
  static "new"(): CubeMesh 


/** Size of the cuboid mesh. */
size: Vector3;

/** Number of extra edge loops inserted along the Z axis. */
subdivide_depth: int;

/** Number of extra edge loops inserted along the Y axis. */
subdivide_height: int;

/** Number of extra edge loops inserted along the X axis. */
subdivide_width: int;



  connect<T extends SignalsOf<CubeMesh>>(signal: T, method: SignalFunction<CubeMesh[T]>): number;






}

