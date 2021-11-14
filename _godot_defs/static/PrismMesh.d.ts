
/**
 * Class representing a prism-shaped [PrimitiveMesh].
 *
*/
declare class PrismMesh extends PrimitiveMesh  {

  
/**
 * Class representing a prism-shaped [PrimitiveMesh].
 *
*/
  new(): PrismMesh; 
  static "new"(): PrismMesh 


/** Displacement of the upper edge along the X axis. 0.0 positions edge straight above the bottom-left edge. */
left_to_right: float;

/** Size of the prism. */
size: Vector3;

/** Number of added edge loops along the Z axis. */
subdivide_depth: int;

/** Number of added edge loops along the Y axis. */
subdivide_height: int;

/** Number of added edge loops along the X axis. */
subdivide_width: int;



  connect<T extends SignalsOf<PrismMesh>>(signal: T, method: SignalFunction<PrismMesh[T]>): number;






}

