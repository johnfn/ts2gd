
/**
 * Class representing a planar [PrimitiveMesh]. This flat mesh does not have a thickness. By default, this mesh is aligned on the X and Z axes; this default rotation isn't suited for use with billboarded materials. For billboarded materials, use [QuadMesh] instead.
 *
 * **Note:** When using a large textured [PlaneMesh] (e.g. as a floor), you may stumble upon UV jittering issues depending on the camera angle. To solve this, increase [member subdivide_depth] and [member subdivide_width] until you no longer notice UV jittering.
 *
*/
declare class PlaneMesh extends PrimitiveMesh  {

  
/**
 * Class representing a planar [PrimitiveMesh]. This flat mesh does not have a thickness. By default, this mesh is aligned on the X and Z axes; this default rotation isn't suited for use with billboarded materials. For billboarded materials, use [QuadMesh] instead.
 *
 * **Note:** When using a large textured [PlaneMesh] (e.g. as a floor), you may stumble upon UV jittering issues depending on the camera angle. To solve this, increase [member subdivide_depth] and [member subdivide_width] until you no longer notice UV jittering.
 *
*/
  new(): PlaneMesh; 
  static "new"(): PlaneMesh 


/** Offset from the origin of the generated plane. Useful for particles. */
center_offset: Vector3;

/** Size of the generated plane. */
size: Vector2;

/** Number of subdivision along the Z axis. */
subdivide_depth: int;

/** Number of subdivision along the X axis. */
subdivide_width: int;



  connect<T extends SignalsOf<PlaneMesh>>(signal: T, method: SignalFunction<PlaneMesh[T]>): number;






}

