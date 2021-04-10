
/**
 * This node must be the child of a [Skeleton3D] node. You can then select a bone for this node to attach to. The BoneAttachment3D node will copy the transform of the selected bone.
 *
*/
declare class BoneAttachment3D extends Node3D {

  
/**
 * This node must be the child of a [Skeleton3D] node. You can then select a bone for this node to attach to. The BoneAttachment3D node will copy the transform of the selected bone.
 *
*/
  "new"(): this;
  static "new"(): this;



/** The name of the attached bone. */
bone_name: String;



  connect<T extends SignalsOf<BoneAttachment3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
