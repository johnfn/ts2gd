
/**
 * Skeleton2D parents a hierarchy of [Bone2D] objects. It is a requirement of [Bone2D]. Skeleton2D holds a reference to the rest pose of its children and acts as a single point of access to its bones.
 *
*/
declare class Skeleton2D extends Node2D  {

  
/**
 * Skeleton2D parents a hierarchy of [Bone2D] objects. It is a requirement of [Bone2D]. Skeleton2D holds a reference to the rest pose of its children and acts as a single point of access to its bones.
 *
*/
  new(): Skeleton2D; 
  static "new"(): Skeleton2D 



/** Returns a [Bone2D] from the node hierarchy parented by Skeleton2D. The object to return is identified by the parameter [code]idx[/code]. Bones are indexed by descending the node hierarchy from top to bottom, adding the children of each branch before moving to the next sibling. */
get_bone(idx: int): Bone2D;

/** Returns the number of [Bone2D] nodes in the node hierarchy parented by Skeleton2D. */
get_bone_count(): int;

/** Returns the [RID] of a Skeleton2D instance. */
get_skeleton(): RID;

  connect<T extends SignalsOf<Skeleton2D>>(signal: T, method: SignalFunction<Skeleton2D[T]>): number;





/**
*/
$bone_setup_changed: Signal<() => void>

}

