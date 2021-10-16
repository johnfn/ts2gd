
/**
 * CollisionObject is the base class for physics objects. It can hold any number of collision [Shape]s. Each shape must be assigned to a **shape owner**. The CollisionObject can have any number of shape owners. Shape owners are not nodes and do not appear in the editor, but are accessible through code using the `shape_owner_*` methods.
 *
*/
declare class CollisionObject extends Spatial {

  
/**
 * CollisionObject is the base class for physics objects. It can hold any number of collision [Shape]s. Each shape must be assigned to a **shape owner**. The CollisionObject can have any number of shape owners. Shape owners are not nodes and do not appear in the editor, but are accessible through code using the `shape_owner_*` methods.
 *
*/
  "new"(): CollisionObject;
  static "new"(): CollisionObject;



/**
 * The physics layers this CollisionObject3D is in. Collision objects can exist in one or more of 32 different layers. See also [member collision_mask].
 *
 * **Note:** A contact is detected if object A is in any of the layers that object B scans, or object B is in any layers that object A scans. See [url=https://docs.godotengine.org/en/latest/tutorials/physics/physics_introduction.html#collision-layers-and-masks]Collision layers and masks[/url] in the documentation for more information.
 *
*/
collision_layer: int;

/**
 * The physics layers this CollisionObject3D scans. Collision objects can scan one or more of 32 different layers. See also [member collision_layer].
 *
 * **Note:** A contact is detected if object A is in any of the layers that object B scans, or object B is in any layers that object A scans. See [url=https://docs.godotengine.org/en/latest/tutorials/physics/physics_introduction.html#collision-layers-and-masks]Collision layers and masks[/url] in the documentation for more information.
 *
*/
collision_mask: int;

/** If [code]true[/code], the [CollisionObject] will continue to receive input events as the mouse is dragged across its shapes. */
input_capture_on_drag: boolean;

/** If [code]true[/code], the [CollisionObject]'s shapes will respond to [RayCast]s. */
input_ray_pickable: boolean;

/** Receives unhandled [InputEvent]s. [code]position[/code] is the location in world space of the mouse pointer on the surface of the shape with index [code]shape_idx[/code] and [code]normal[/code] is the normal vector of the surface at that point. Connect to the [signal input_event] signal to easily pick up these events. */
protected _input_event(camera: Object, event: InputEvent, position: Vector3, normal: Vector3, shape_idx: int): void;

/** Creates a new shape owner for the given object. Returns [code]owner_id[/code] of the new owner for future reference. */
create_shape_owner(owner: Object): int;

/** Returns whether or not the specified [code]bit[/code] of the [member collision_layer] is set. */
get_collision_layer_bit(bit: int): boolean;

/** Returns whether or not the specified [code]bit[/code] of the [member collision_mask] is set. */
get_collision_mask_bit(bit: int): boolean;

/** Returns the object's [RID]. */
get_rid(): RID;

/** Returns an [Array] of [code]owner_id[/code] identifiers. You can use these ids in other methods that take [code]owner_id[/code] as an argument. */
get_shape_owners(): any[];

/** If [code]true[/code], the shape owner and its shapes are disabled. */
is_shape_owner_disabled(owner_id: int): boolean;

/** Removes the given shape owner. */
remove_shape_owner(owner_id: int): void;

/**
 * If `value` is `true`, sets the specified `bit` in the the [member collision_layer].
 *
 * If `value` is `false`, clears the specified `bit` in the the [member collision_layer].
 *
*/
set_collision_layer_bit(bit: int, value: boolean): void;

/**
 * If `value` is `true`, sets the specified `bit` in the the [member collision_mask].
 *
 * If `value` is `false`, clears the specified `bit` in the the [member collision_mask].
 *
*/
set_collision_mask_bit(bit: int, value: boolean): void;

/** Returns the [code]owner_id[/code] of the given shape. */
shape_find_owner(shape_index: int): int;

/** Adds a [Shape] to the shape owner. */
shape_owner_add_shape(owner_id: int, shape: Shape): void;

/** Removes all shapes from the shape owner. */
shape_owner_clear_shapes(owner_id: int): void;

/** Returns the parent object of the given shape owner. */
shape_owner_get_owner(owner_id: int): Object;

/** Returns the [Shape] with the given id from the given shape owner. */
shape_owner_get_shape(owner_id: int, shape_id: int): Shape;

/** Returns the number of shapes the given shape owner contains. */
shape_owner_get_shape_count(owner_id: int): int;

/** Returns the child index of the [Shape] with the given id from the given shape owner. */
shape_owner_get_shape_index(owner_id: int, shape_id: int): int;

/** Returns the shape owner's [Transform]. */
shape_owner_get_transform(owner_id: int): Transform;

/** Removes a shape from the given shape owner. */
shape_owner_remove_shape(owner_id: int, shape_id: int): void;

/** If [code]true[/code], disables the given shape owner. */
shape_owner_set_disabled(owner_id: int, disabled: boolean): void;

/** Sets the [Transform] of the given shape owner. */
shape_owner_set_transform(owner_id: int, transform: Transform): void;

  // connect<T extends SignalsOf<CollisionObject>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<CollisionObjectSignals>>(signal: T, method: SignalFunction<CollisionObjectSignals[T]>): number;




}

declare class CollisionObjectSignals extends SpatialSignals {
  /**
 * Emitted when the object receives an unhandled [InputEvent]. `position` is the location in world space of the mouse pointer on the surface of the shape with index `shape_idx` and `normal` is the normal vector of the surface at that point.
 *
*/
input_event: Signal<(camera: Node, event: InputEvent, position: Vector3, normal: Vector3, shape_idx: int) => void>

/**
 * Emitted when the mouse pointer enters any of this object's shapes.
 *
*/
mouse_entered: Signal<() => void>

/**
 * Emitted when the mouse pointer exits all this object's shapes.
 *
*/
mouse_exited: Signal<() => void>

}
