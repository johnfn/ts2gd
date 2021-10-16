
/**
 * Class representing a capsule-shaped [PrimitiveMesh].
 *
*/
declare class CapsuleMesh extends PrimitiveMesh {

  
/**
 * Class representing a capsule-shaped [PrimitiveMesh].
 *
*/
  "new"(): CapsuleMesh;
  static "new"(): CapsuleMesh;



/**
 * Height of the middle cylindrical part of the capsule (without the hemispherical ends).
 *
 * **Note:** The capsule's total height is equal to [member mid_height] + 2 * [member radius].
 *
*/
mid_height: float;

/** Number of radial segments on the capsule mesh. */
radial_segments: int;

/** Radius of the capsule mesh. */
radius: float;

/** Number of rings along the height of the capsule. */
rings: int;



  // connect<T extends SignalsOf<CapsuleMesh>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<CapsuleMeshSignals>>(signal: T, method: SignalFunction<CapsuleMeshSignals[T]>): number;




}

declare class CapsuleMeshSignals extends PrimitiveMeshSignals {
  
}
