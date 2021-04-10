
/**
 * Joints are used to bind together two physics bodies. They have a solver priority and can define if the bodies of the two attached nodes should be able to collide with each other.
 *
*/
declare class Joint3D extends Node3D {

  
/**
 * Joints are used to bind together two physics bodies. They have a solver priority and can define if the bodies of the two attached nodes should be able to collide with each other.
 *
*/
  "new"(): this;
  static "new"(): this;



/** If [code]true[/code], the two bodies of the nodes are not able to collide with each other. */
"collision/exclude_nodes": boolean;

/** The node attached to the first side (A) of the joint. */
"nodes/node_a": NodePathType;

/** The node attached to the second side (B) of the joint. */
"nodes/node_b": NodePathType;

/** The priority used to define which solver is executed first for multiple joints. The lower the value, the higher the priority. */
"solver/priority": int;



  connect<T extends SignalsOf<Joint3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
