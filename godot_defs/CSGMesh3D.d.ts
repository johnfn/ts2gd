
/**
 * This CSG node allows you to use any mesh resource as a CSG shape, provided it is closed, does not self-intersect, does not contain internal faces and has no edges that connect to more then two faces.
 *
*/
declare class CSGMesh3D extends CSGPrimitive3D {

  
/**
 * This CSG node allows you to use any mesh resource as a CSG shape, provided it is closed, does not self-intersect, does not contain internal faces and has no edges that connect to more then two faces.
 *
*/
  "new"(): this;
  static "new"(): this;



/** The [Material] used in drawing the CSG shape. */
material: Material;

/** The [Mesh] resource to use as a CSG shape. */
mesh: Mesh;



  connect<T extends SignalsOf<CSGMesh3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
