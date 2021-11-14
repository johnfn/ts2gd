
/**
 * Class representing a square [PrimitiveMesh]. This flat mesh does not have a thickness. By default, this mesh is aligned on the X and Y axes; this default rotation is more suited for use with billboarded materials. Unlike [PlaneMesh], this mesh doesn't provide subdivision options.
 *
*/
declare class QuadMesh extends PrimitiveMesh  {

  
/**
 * Class representing a square [PrimitiveMesh]. This flat mesh does not have a thickness. By default, this mesh is aligned on the X and Y axes; this default rotation is more suited for use with billboarded materials. Unlike [PlaneMesh], this mesh doesn't provide subdivision options.
 *
*/
  new(): QuadMesh; 
  static "new"(): QuadMesh 


/** Offset of the generated Quad. Useful for particles. */
center_offset: Vector3;

/** Size on the X and Y axes. */
size: Vector2;



  connect<T extends SignalsOf<QuadMesh>>(signal: T, method: SignalFunction<QuadMesh[T]>): number;






}

