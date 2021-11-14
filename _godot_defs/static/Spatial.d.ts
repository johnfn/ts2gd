
/**
 * Most basic 3D game object, with a 3D [Transform] and visibility settings. All other 3D game objects inherit from Spatial. Use [Spatial] as a parent node to move, scale, rotate and show/hide children in a 3D project.
 *
 * Affine operations (rotate, scale, translate) happen in parent's local coordinate system, unless the [Spatial] object is set as top-level. Affine operations in this coordinate system correspond to direct affine operations on the [Spatial]'s transform. The word local below refers to this coordinate system. The coordinate system that is attached to the [Spatial] object itself is referred to as object-local coordinate system.
 *
 * **Note:** Unless otherwise specified, all methods that have angle parameters must have angles specified as **radians**. To convert degrees to radians, use [method @GDScript.deg2rad].
 *
*/
declare class Spatial extends Node  {

  
/**
 * Most basic 3D game object, with a 3D [Transform] and visibility settings. All other 3D game objects inherit from Spatial. Use [Spatial] as a parent node to move, scale, rotate and show/hide children in a 3D project.
 *
 * Affine operations (rotate, scale, translate) happen in parent's local coordinate system, unless the [Spatial] object is set as top-level. Affine operations in this coordinate system correspond to direct affine operations on the [Spatial]'s transform. The word local below refers to this coordinate system. The coordinate system that is attached to the [Spatial] object itself is referred to as object-local coordinate system.
 *
 * **Note:** Unless otherwise specified, all methods that have angle parameters must have angles specified as **radians**. To convert degrees to radians, use [method @GDScript.deg2rad].
 *
*/
  new(): Spatial; 
  static "new"(): Spatial 


/** The [SpatialGizmo] for this node. Used for example in [EditorSpatialGizmo] as custom visualization and editing handles in Editor. */
gizmo: SpatialGizmo;

/** World space (global) [Transform] of this node. */
global_transform: Transform;

/**
 * Rotation part of the local transformation in radians, specified in terms of YXZ-Euler angles in the format (X angle, Y angle, Z angle).
 *
 * **Note:** In the mathematical sense, rotation is a matrix and not a vector. The three Euler angles, which are the three independent parameters of the Euler-angle parametrization of the rotation matrix, are stored in a [Vector3] data structure not because the rotation is a vector, but only because [Vector3] exists as a convenient data-structure to store 3 floating-point numbers. Therefore, applying affine operations on the rotation "vector" is not meaningful.
 *
*/
rotation: Vector3;

/** Rotation part of the local transformation in degrees, specified in terms of YXZ-Euler angles in the format (X angle, Y angle, Z angle). */
rotation_degrees: Vector3;

/** Scale part of the local transformation. */
scale: Vector3;

/** Local space [Transform] of this node, with respect to the parent node. */
transform: Transform;

/** Local translation of this node. */
translation: Vector3;

/** If [code]true[/code], this node is drawn. The node is only visible if all of its antecedents are visible as well (in other words, [method is_visible_in_tree] must return [code]true[/code]). */
visible: boolean;

/** Forces the transform to update. Transform changes in physics are not instant for performance reasons. Transforms are accumulated and then set. Use this if you need an up-to-date transform when doing physics operations. */
force_update_transform(): void;

/** Returns the parent [Spatial], or an empty [Object] if no parent exists or parent is not of type [Spatial]. */
get_parent_spatial(): Spatial;

/** Returns the current [World] resource this [Spatial] node is registered to. */
get_world(): World;

/** Rotates the global (world) transformation around axis, a unit [Vector3], by specified angle in radians. The rotation axis is in global coordinate system. */
global_rotate(axis: Vector3, angle: float): void;

/** Scales the global (world) transformation by the given [Vector3] scale factors. */
global_scale(scale: Vector3): void;

/** Moves the global (world) transformation by [Vector3] offset. The offset is in global coordinate system. */
global_translate(offset: Vector3): void;

/** Disables rendering of this node. Changes [member visible] to [code]false[/code]. */
hide(): void;

/** Returns whether node notifies about its local transformation changes. [Spatial] will not propagate this by default. */
is_local_transform_notification_enabled(): boolean;

/** Returns whether this node uses a scale of [code](1, 1, 1)[/code] or its local transformation scale. */
is_scale_disabled(): boolean;

/** Returns whether this node is set as Toplevel, that is whether it ignores its parent nodes transformations. */
is_set_as_toplevel(): boolean;

/** Returns whether the node notifies about its global and local transformation changes. [Spatial] will not propagate this by default. */
is_transform_notification_enabled(): boolean;

/** Returns [code]true[/code] if the node is present in the [SceneTree], its [member visible] property is [code]true[/code] and all its antecedents are also visible. If any antecedent is hidden, this node will not be visible in the scene tree. */
is_visible_in_tree(): boolean;

/**
 * Rotates itself so that the local -Z axis points towards the `target` position.
 *
 * The transform will first be rotated around the given `up` vector, and then fully aligned to the target by a further rotation around an axis perpendicular to both the `target` and `up` vectors.
 *
 * Operations take place in global space.
 *
*/
look_at(target: Vector3, up: Vector3): void;

/** Moves the node to the specified [code]position[/code], and then rotates itself to point toward the [code]target[/code] as per [method look_at]. Operations take place in global space. */
look_at_from_position(position: Vector3, target: Vector3, up: Vector3): void;

/** Resets this node's transformations (like scale, skew and taper) preserving its rotation and translation by performing Gram-Schmidt orthonormalization on this node's [Transform]. */
orthonormalize(): void;

/** Rotates the local transformation around axis, a unit [Vector3], by specified angle in radians. */
rotate(axis: Vector3, angle: float): void;

/** Rotates the local transformation around axis, a unit [Vector3], by specified angle in radians. The rotation axis is in object-local coordinate system. */
rotate_object_local(axis: Vector3, angle: float): void;

/** Rotates the local transformation around the X axis by angle in radians. */
rotate_x(angle: float): void;

/** Rotates the local transformation around the Y axis by angle in radians. */
rotate_y(angle: float): void;

/** Rotates the local transformation around the Z axis by angle in radians. */
rotate_z(angle: float): void;

/** Scales the local transformation by given 3D scale factors in object-local coordinate system. */
scale_object_local(scale: Vector3): void;

/** Makes the node ignore its parents transformations. Node transformations are only in global space. */
set_as_toplevel(enable: boolean): void;

/** Sets whether the node uses a scale of [code](1, 1, 1)[/code] or its local transformation scale. Changes to the local transformation scale are preserved. */
set_disable_scale(disable: boolean): void;

/** Reset all transformations for this node (sets its [Transform] to the identity matrix). */
set_identity(): void;

/** Sets whether the node ignores notification that its transformation (global or local) changed. */
set_ignore_transform_notification(enabled: boolean): void;

/** Sets whether the node notifies about its local transformation changes. [Spatial] will not propagate this by default. */
set_notify_local_transform(enable: boolean): void;

/** Sets whether the node notifies about its global and local transformation changes. [Spatial] will not propagate this by default, unless it is in the editor context and it has a valid gizmo. */
set_notify_transform(enable: boolean): void;

/** Enables rendering of this node. Changes [member visible] to [code]true[/code]. */
show(): void;

/** Transforms [code]local_point[/code] from this node's local space to world space. */
to_global(local_point: Vector3): Vector3;

/** Transforms [code]global_point[/code] from world space to this node's local space. */
to_local(global_point: Vector3): Vector3;

/**
 * Changes the node's position by the given offset [Vector3].
 *
 * Note that the translation `offset` is affected by the node's scale, so if scaled by e.g. `(10, 1, 1)`, a translation by an offset of `(2, 0, 0)` would actually add 20 (`2 * 10`) to the X coordinate.
 *
*/
translate(offset: Vector3): void;

/** Changes the node's position by the given offset [Vector3] in local space. */
translate_object_local(offset: Vector3): void;

/** Updates the [SpatialGizmo] of this node. */
update_gizmo(): void;

  connect<T extends SignalsOf<Spatial>>(signal: T, method: SignalFunction<Spatial[T]>): number;



/**
 * Spatial nodes receives this notification when their global transform changes. This means that either the current or a parent node changed its transform.
 *
 * In order for [constant NOTIFICATION_TRANSFORM_CHANGED] to work, users first need to ask for it, with [method set_notify_transform]. The notification is also sent if the node is in the editor context and it has a valid gizmo.
 *
*/
static NOTIFICATION_TRANSFORM_CHANGED: any;

/**
 * Spatial nodes receives this notification when they are registered to new [World] resource.
 *
*/
static NOTIFICATION_ENTER_WORLD: any;

/**
 * Spatial nodes receives this notification when they are unregistered from current [World] resource.
 *
*/
static NOTIFICATION_EXIT_WORLD: any;

/**
 * Spatial nodes receives this notification when their visibility changes.
 *
*/
static NOTIFICATION_VISIBILITY_CHANGED: any;

/**
 * Spatial nodes receives this notification if the portal system gameplay monitor detects they have entered the gameplay area.
 *
*/
static NOTIFICATION_ENTER_GAMEPLAY: any;

/**
 * Spatial nodes receives this notification if the portal system gameplay monitor detects they have exited the gameplay area.
 *
*/
static NOTIFICATION_EXIT_GAMEPLAY: any;


/**
 * Emitted by portal system gameplay monitor when a node enters the gameplay area.
 *
*/
$gameplay_entered: Signal<() => void>

/**
 * Emitted by portal system gameplay monitor when a node exits the gameplay area.
 *
*/
$gameplay_exited: Signal<() => void>

/**
 * Emitted when node visibility changes.
 *
*/
$visibility_changed: Signal<() => void>

}

