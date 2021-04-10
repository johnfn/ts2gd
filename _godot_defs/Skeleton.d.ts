
/**
 * Skeleton provides a hierarchical interface for managing bones, including pose, rest and animation (see [Animation]). It can also use ragdoll physics.
 *
 * The overall transform of a bone with respect to the skeleton is determined by the following hierarchical order: rest pose, custom pose and pose.
 *
 * Note that "global pose" below refers to the overall transform of the bone with respect to skeleton, so it not the actual global/world transform of the bone.
 *
*/
declare class Skeleton extends Spatial {

  
/**
 * Skeleton provides a hierarchical interface for managing bones, including pose, rest and animation (see [Animation]). It can also use ragdoll physics.
 *
 * The overall transform of a bone with respect to the skeleton is determined by the following hierarchical order: rest pose, custom pose and pose.
 *
 * Note that "global pose" below refers to the overall transform of the bone with respect to skeleton, so it not the actual global/world transform of the bone.
 *
*/
  "new"(): Skeleton;
  static "new"(): Skeleton;




/** Adds a bone, with name [code]name[/code]. [method get_bone_count] will become the bone index. */
add_bone(name: string): void;

/** [i]Deprecated soon.[/i] */
bind_child_node_to_bone(bone_idx: int, node: Node): void;

/** Clear all the bones in this skeleton. */
clear_bones(): void;

/** No documentation provided. */
clear_bones_global_pose_override(): void;

/** Returns the bone index that matches [code]name[/code] as its name. */
find_bone(name: string): int;

/** Returns the amount of bones in the skeleton. */
get_bone_count(): int;

/** Returns the custom pose of the specified bone. Custom pose is applied on top of the rest pose. */
get_bone_custom_pose(bone_idx: int): Transform;

/** Returns the overall transform of the specified bone, with respect to the skeleton. Being relative to the skeleton frame, this is not the actual "global" transform of the bone. */
get_bone_global_pose(bone_idx: int): Transform;

/** Returns the name of the bone at index [code]index[/code]. */
get_bone_name(bone_idx: int): string;

/**
 * Returns the bone index which is the parent of the bone at `bone_idx`. If -1, then bone has no parent.
 *
 * **Note:** The parent bone returned will always be less than `bone_idx`.
 *
*/
get_bone_parent(bone_idx: int): int;

/** Returns the pose transform of the specified bone. Pose is applied on top of the custom pose, which is applied on top the rest pose. */
get_bone_pose(bone_idx: int): Transform;

/** Returns the rest transform for a bone [code]bone_idx[/code]. */
get_bone_rest(bone_idx: int): Transform;

/** [i]Deprecated soon.[/i] */
get_bound_child_nodes_to_bone(bone_idx: int): any[];

/** No documentation provided. */
is_bone_rest_disabled(bone_idx: int): boolean;

/** No documentation provided. */
localize_rests(): void;

/** No documentation provided. */
physical_bones_add_collision_exception(exception: RID): void;

/** No documentation provided. */
physical_bones_remove_collision_exception(exception: RID): void;

/** No documentation provided. */
physical_bones_start_simulation(bones?: any[]): void;

/** No documentation provided. */
physical_bones_stop_simulation(): void;

/** No documentation provided. */
register_skin(skin: Skin): SkinReference;

/** No documentation provided. */
set_bone_custom_pose(bone_idx: int, custom_pose: Transform): void;

/** No documentation provided. */
set_bone_disable_rest(bone_idx: int, disable: boolean): void;

/** No documentation provided. */
set_bone_global_pose_override(bone_idx: int, pose: Transform, amount: float, persistent?: boolean): void;

/**
 * Sets the bone index `parent_idx` as the parent of the bone at `bone_idx`. If -1, then bone has no parent.
 *
 * **Note:** `parent_idx` must be less than `bone_idx`.
 *
*/
set_bone_parent(bone_idx: int, parent_idx: int): void;

/** Sets the pose transform for bone [code]bone_idx[/code]. */
set_bone_pose(bone_idx: int, pose: Transform): void;

/** Sets the rest transform for bone [code]bone_idx[/code]. */
set_bone_rest(bone_idx: int, rest: Transform): void;

/** [i]Deprecated soon.[/i] */
unbind_child_node_from_bone(bone_idx: int, node: Node): void;

/** No documentation provided. */
unparent_bone_and_rest(bone_idx: int): void;

  connect<T extends SignalsOf<Skeleton>, U extends Node>(signal: T, node: U, method: keyof U): number;



/** No documentation provided. */
static NOTIFICATION_UPDATE_SKELETON: 50;


  
}
