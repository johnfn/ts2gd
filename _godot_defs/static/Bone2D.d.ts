
/**
 * Use a hierarchy of `Bone2D` bound to a [Skeleton2D] to control, and animate other [Node2D] nodes.
 *
 * You can use `Bone2D` and `Skeleton2D` nodes to animate 2D meshes created with the Polygon 2D UV editor.
 *
 * Each bone has a [member rest] transform that you can reset to with [method apply_rest]. These rest poses are relative to the bone's parent.
 *
 * If in the editor, you can set the rest pose of an entire skeleton using a menu option, from the code, you need to iterate over the bones to set their individual rest poses.
 *
*/
declare class Bone2D extends Node2D {

  
/**
 * Use a hierarchy of `Bone2D` bound to a [Skeleton2D] to control, and animate other [Node2D] nodes.
 *
 * You can use `Bone2D` and `Skeleton2D` nodes to animate 2D meshes created with the Polygon 2D UV editor.
 *
 * Each bone has a [member rest] transform that you can reset to with [method apply_rest]. These rest poses are relative to the bone's parent.
 *
 * If in the editor, you can set the rest pose of an entire skeleton using a menu option, from the code, you need to iterate over the bones to set their individual rest poses.
 *
*/
  "new"(): Bone2D;
  static "new"(): Bone2D;



/** Length of the bone's representation drawn in the editor's viewport in pixels. */
default_length: float;

/** Rest transform of the bone. You can reset the node's transforms to this value using [method apply_rest]. */
rest: Transform2D;

/** Stores the node's current transforms in [member rest]. */
apply_rest(): void;

/** Returns the node's index as part of the entire skeleton. See [Skeleton2D]. */
get_index_in_skeleton(): int;

/** Returns the node's [member rest] [code]Transform2D[/code] if it doesn't have a parent, or its rest pose relative to its parent. */
get_skeleton_rest(): Transform2D;

  // connect<T extends SignalsOf<Bone2D>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<Bone2DSignals>>(signal: T, method: SignalFunction<Bone2DSignals[T]>): number;




}

declare class Bone2DSignals extends Node2DSignals {
  
}
