
/**
 * [MultiMeshInstance] is a specialized node to instance [GeometryInstance]s based on a [MultiMesh] resource.
 *
 * This is useful to optimize the rendering of a high amount of instances of a given mesh (for example trees in a forest or grass strands).
 *
*/
declare class MultiMeshInstance extends GeometryInstance {

  
/**
 * [MultiMeshInstance] is a specialized node to instance [GeometryInstance]s based on a [MultiMesh] resource.
 *
 * This is useful to optimize the rendering of a high amount of instances of a given mesh (for example trees in a forest or grass strands).
 *
*/
  "new"(): MultiMeshInstance;
  static "new"(): MultiMeshInstance;



/** The [MultiMesh] resource that will be used and shared among all instances of the [MultiMeshInstance]. */
multimesh: MultiMesh;



  connect<T extends SignalsOf<MultiMeshInstance>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
