
/**
 * This CSG node allows you to use any mesh resource as a CSG shape, provided it is closed, does not self-intersect, does not contain internal faces and has no edges that connect to more then two faces.
 *
*/
declare class CSGMesh extends CSGPrimitive {

  
/**
 * This CSG node allows you to use any mesh resource as a CSG shape, provided it is closed, does not self-intersect, does not contain internal faces and has no edges that connect to more then two faces.
 *
*/
  "new"(): CSGMesh;
  static "new"(): CSGMesh;



/** The [Material] used in drawing the CSG shape. */
material: Material;

/** The [Mesh] resource to use as a CSG shape. */
mesh: Mesh;



  connect<T extends SignalsOf<CSGMesh>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
