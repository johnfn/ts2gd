
/**
 * Skeleton3D provides a hierarchical interface for managing bones, including pose, rest and animation (see [Animation]). It can also use ragdoll physics.
 *
 * The overall transform of a bone with respect to the skeleton is determined by the following hierarchical order: rest pose, custom pose and pose.
 *
 * Note that "global pose" below refers to the overall transform of the bone with respect to skeleton, so it not the actual global/world transform of the bone.
 *
*/
declare class Skeleton3D extends Node3D {

  
/**
 * Skeleton3D provides a hierarchical interface for managing bones, including pose, rest and animation (see [Animation]). It can also use ragdoll physics.
 *
 * The overall transform of a bone with respect to the skeleton is determined by the following hierarchical order: rest pose, custom pose and pose.
 *
 * Note that "global pose" below refers to the overall transform of the bone with respect to skeleton, so it not the actual global/world transform of the bone.
 *
*/
  "new"(): this;
  static "new"(): this;




/** Adds a bone, with name [code]name[/code]. [method get_bone_count] will become the bone index. */
add_bone(name: String): void;

/** [i]Deprecated soon.[/i] */
bind_child_node_to_bone(bone_idx: int, node: Node): void;

/**
 * Takes the given bone pose/transform and converts it to a world transform, relative to the [Skeleton3D] node.
 *
 * This is useful for using the bone transform in calculations with transforms from [Node3D]-based nodes.
 *
*/
bone_transform_to_world_transform(bone_transform: Transform): Transform;

/** Clear all the bones in this skeleton. */
clear_bones(): void;

/** Removes the global pose override on all bones in the skeleton. */
clear_bones_global_pose_override(): void;

/** Returns the bone index that matches [code]name[/code] as its name. */
find_bone(name: String): int;

/** Returns the amount of bones in the skeleton. */
get_bone_count(): int;

/** Returns the custom pose of the specified bone. Custom pose is applied on top of the rest pose. */
get_bone_custom_pose(bone_idx: int): Transform;

/** Returns the overall transform of the specified bone, with respect to the skeleton. Being relative to the skeleton frame, this is not the actual "global" transform of the bone. */
get_bone_global_pose(bone_idx: int): Transform;

/** Returns the name of the bone at index [code]index[/code]. */
get_bone_name(bone_idx: int): String;

/**
 * Returns the bone index which is the parent of the bone at `bone_idx`. If -1, then bone has no parent.
 *
 * **Note:** The parent bone returned will always be less than `bone_idx`.
 *
*/
get_bone_parent(bone_idx: int): int;

/** Returns the pose transform of the specified bone. Pose is applied on top of the custom pose, which is applied on top the rest pose. */
get_bone_pose(bone_idx: int): Transform;

/** No documentation provided. */
get_bone_process_orders(): PackedInt32Array;

/** Returns the rest transform for a bone [code]bone_idx[/code]. */
get_bone_rest(bone_idx: int): Transform;

/** [i]Deprecated soon.[/i] */
get_bound_child_nodes_to_bone(bone_idx: int): any[];

/** Returns whether the bone rest for the bone at [code]bone_idx[/code] is disabled. */
is_bone_rest_disabled(bone_idx: int): boolean;

/** Returns all bones in the skeleton to their rest poses. */
localize_rests(): void;

/**
 * Adds a collision exception to the physical bone.
 *
 * Works just like the [RigidBody3D] node.
 *
*/
physical_bones_add_collision_exception(exception: RID): void;

/**
 * Removes a collision exception to the physical bone.
 *
 * Works just like the [RigidBody3D] node.
 *
*/
physical_bones_remove_collision_exception(exception: RID): void;

/**
 * Tells the [PhysicalBone3D] nodes in the Skeleton to start simulating and reacting to the physics world.
 *
 * Optionally, a list of bone names can be passed-in, allowing only the passed-in bones to be simulated.
 *
*/
physical_bones_start_simulation(bones?: StringName[]): void;

/** Tells the [PhysicalBone3D] nodes in the Skeleton to stop simulating. */
physical_bones_stop_simulation(): void;

/** Binds the given Skin to the Skeleton. */
register_skin(skin: Skin): SkinReference;

/**
 * Sets the custom pose transform, `custom_pose`, for the bone at `bone_idx`. This pose is an addition to the bone rest pose.
 *
 * **Note**: The pose transform needs to be in bone space. Use [method world_transform_to_bone_transform] to convert a world transform, like one you can get from a [Node3D], to bone space.
 *
*/
set_bone_custom_pose(bone_idx: int, custom_pose: Transform): void;

/** Disables the rest pose for the bone at [code]bone_idx[/code] if [code]true[/code], enables the bone rest if [code]false[/code]. */
set_bone_disable_rest(bone_idx: int, disable: boolean): void;

/**
 * Sets the global pose transform, `pose`, for the bone at `bone_idx`.
 *
 * `amount` is the interpolation strength that will be used when applying the pose, and `persistent` determines if the applied pose will remain.
 *
 * **Note**: The pose transform needs to be in bone space. Use [method world_transform_to_bone_transform] to convert a world transform, like one you can get from a [Node3D], to bone space.
 *
*/
set_bone_global_pose_override(bone_idx: int, pose: Transform, amount: float, persistent?: boolean): void;

/**
 * Sets the bone index `parent_idx` as the parent of the bone at `bone_idx`. If -1, then bone has no parent.
 *
 * **Note:** `parent_idx` must be less than `bone_idx`.
 *
*/
set_bone_parent(bone_idx: int, parent_idx: int): void;

/**
 * Sets the pose transform for bone `bone_idx`.
 *
 * **Note**: The pose transform needs to be in bone space. Use [method world_transform_to_bone_transform] to convert a world transform, like one you can get from a [Node3D], to bone space.
 *
*/
set_bone_pose(bone_idx: int, pose: Transform): void;

/** Sets the rest transform for bone [code]bone_idx[/code]. */
set_bone_rest(bone_idx: int, rest: Transform): void;

/** [i]Deprecated soon.[/i] */
unbind_child_node_from_bone(bone_idx: int, node: Node): void;

/** Unparents the bone at [code]bone_idx[/code] and sets its rest position to that of it's parent prior to being reset. */
unparent_bone_and_rest(bone_idx: int): void;

/**
 * Takes the given world transform, relative to the [Skeleton3D], and converts it to a bone pose/transform.
 *
 * This is useful for using setting bone poses using transforms from [Node3D]-based nodes.
 *
*/
world_transform_to_bone_transform(world_transform: Transform): Transform;

  connect<T extends SignalsOf<Skeleton3D>, U extends Node>(signal: T, node: U, method: keyof U): number;



/** No documentation provided. */
static NOTIFICATION_UPDATE_SKELETON: 50;


  /**
*/
pose_updated: Signal<() => void>

}


 
