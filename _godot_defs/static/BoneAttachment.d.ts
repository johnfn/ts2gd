
/**
 * This node must be the child of a [Skeleton] node. You can then select a bone for this node to attach to. The BoneAttachment node will copy the transform of the selected bone.
 *
*/
declare class BoneAttachment extends Spatial {

  
/**
 * This node must be the child of a [Skeleton] node. You can then select a bone for this node to attach to. The BoneAttachment node will copy the transform of the selected bone.
 *
*/
  "new"(): BoneAttachment;
  static "new"(): BoneAttachment;



/** The name of the attached bone. */
bone_name: string;



  // connect<T extends SignalsOf<BoneAttachment>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<BoneAttachmentSignals>>(signal: T, method: SignalFunction<BoneAttachmentSignals[T]>): number;




}

declare class BoneAttachmentSignals extends SpatialSignals {
  
}
