
/**
 * For complex arrangements of shapes, it is sometimes needed to add structure to your CSG nodes. The CSGCombiner node allows you to create this structure. The node encapsulates the result of the CSG operations of its children. In this way, it is possible to do operations on one set of shapes that are children of one CSGCombiner node, and a set of separate operations on a second set of shapes that are children of a second CSGCombiner node, and then do an operation that takes the two end results as its input to create the final shape.
 *
*/
declare class CSGCombiner extends CSGShape {

  
/**
 * For complex arrangements of shapes, it is sometimes needed to add structure to your CSG nodes. The CSGCombiner node allows you to create this structure. The node encapsulates the result of the CSG operations of its children. In this way, it is possible to do operations on one set of shapes that are children of one CSGCombiner node, and a set of separate operations on a second set of shapes that are children of a second CSGCombiner node, and then do an operation that takes the two end results as its input to create the final shape.
 *
*/
  "new"(): CSGCombiner;
  static "new"(): CSGCombiner;






  connect<T extends SignalsOf<CSGCombiner>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
