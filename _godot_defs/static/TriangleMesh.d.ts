
/**
 * Mesh type used internally for collision calculations.
 *
*/
declare class TriangleMesh extends Reference {

  
/**
 * Mesh type used internally for collision calculations.
 *
*/
  "new"(): TriangleMesh;
  static "new"(): TriangleMesh;






  // connect<T extends SignalsOf<TriangleMesh>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<TriangleMeshSignals>>(signal: T, method: SignalFunction<TriangleMeshSignals[T]>): number;




}

declare class TriangleMeshSignals extends ReferenceSignals {
  
}
