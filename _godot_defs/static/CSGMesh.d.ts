
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

/**
 * The [Mesh] resource to use as a CSG shape.
 *
 * **Note:** When using an [ArrayMesh], avoid meshes with vertex normals unless a flat shader is required. By default, CSGMesh will ignore the mesh's vertex normals and use a smooth shader calculated using the faces' normals. If a flat shader is required, ensure that all faces' vertex normals are parallel.
 *
*/
mesh: Mesh;



  // connect<T extends SignalsOf<CSGMesh>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<CSGMeshSignals>>(signal: T, method: SignalFunction<CSGMeshSignals[T]>): number;




}

declare class CSGMeshSignals extends CSGPrimitiveSignals {
  
}
