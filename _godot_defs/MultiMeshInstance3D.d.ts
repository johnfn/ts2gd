
/**
 * [MultiMeshInstance3D] is a specialized node to instance [GeometryInstance3D]s based on a [MultiMesh] resource.
 *
 * This is useful to optimize the rendering of a high amount of instances of a given mesh (for example trees in a forest or grass strands).
 *
*/
declare class MultiMeshInstance3D extends GeometryInstance3D {

  
/**
 * [MultiMeshInstance3D] is a specialized node to instance [GeometryInstance3D]s based on a [MultiMesh] resource.
 *
 * This is useful to optimize the rendering of a high amount of instances of a given mesh (for example trees in a forest or grass strands).
 *
*/
  "new"(): this;
  static "new"(): this;



/** The [MultiMesh] resource that will be used and shared among all instances of the [MultiMeshInstance3D]. */
multimesh: MultiMesh;



  connect<T extends SignalsOf<MultiMeshInstance3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
