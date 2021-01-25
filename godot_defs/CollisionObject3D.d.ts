
/**
 * CollisionObject3D is the base class for physics objects. It can hold any number of collision [Shape3D]s. Each shape must be assigned to a **shape owner**. The CollisionObject3D can have any number of shape owners. Shape owners are not nodes and do not appear in the editor, but are accessible through code using the `shape_owner_*` methods.
 *
*/
declare class CollisionObject3D extends Node3D {

  
/**
 * CollisionObject3D is the base class for physics objects. It can hold any number of collision [Shape3D]s. Each shape must be assigned to a **shape owner**. The CollisionObject3D can have any number of shape owners. Shape owners are not nodes and do not appear in the editor, but are accessible through code using the `shape_owner_*` methods.
 *
*/
  "new"(): this;
  static "new"(): this;



/** If [code]true[/code], the [CollisionObject3D] will continue to receive input events as the mouse is dragged across its shapes. */
input_capture_on_drag: boolean;

/** If [code]true[/code], the [CollisionObject3D]'s shapes will respond to [RayCast3D]s. */
input_ray_pickable: boolean;

/** Accepts unhandled [InputEvent]s. [code]click_position[/code] is the clicked location in world space and [code]click_normal[/code] is the normal vector extending from the clicked surface of the [Shape3D] at [code]shape_idx[/code]. Connect to the [code]input_event[/code] signal to easily pick up these events. */
protected _input_event(camera: Object, event: InputEvent, click_position: Vector3, click_normal: Vector3, shape_idx: int): void;

/** Creates a new shape owner for the given object. Returns [code]owner_id[/code] of the new owner for future reference. */
create_shape_owner(owner: Object): int;

/** Returns the object's [RID]. */
get_rid(): RID;

/** Returns an [Array] of [code]owner_id[/code] identifiers. You can use these ids in other methods that take [code]owner_id[/code] as an argument. */
get_shape_owners(): any[];

/** If [code]true[/code], the shape owner and its shapes are disabled. */
is_shape_owner_disabled(owner_id: int): boolean;

/** Removes the given shape owner. */
remove_shape_owner(owner_id: int): void;

/** Returns the [code]owner_id[/code] of the given shape. */
shape_find_owner(shape_index: int): int;

/** Adds a [Shape3D] to the shape owner. */
shape_owner_add_shape(owner_id: int, shape: Shape3D): void;

/** Removes all shapes from the shape owner. */
shape_owner_clear_shapes(owner_id: int): void;

/** Returns the parent object of the given shape owner. */
shape_owner_get_owner(owner_id: int): Object;

/** Returns the [Shape3D] with the given id from the given shape owner. */
shape_owner_get_shape(owner_id: int, shape_id: int): Shape3D;

/** Returns the number of shapes the given shape owner contains. */
shape_owner_get_shape_count(owner_id: int): int;

/** Returns the child index of the [Shape3D] with the given id from the given shape owner. */
shape_owner_get_shape_index(owner_id: int, shape_id: int): int;

/** Returns the shape owner's [Transform]. */
shape_owner_get_transform(owner_id: int): Transform;

/** Removes a shape from the given shape owner. */
shape_owner_remove_shape(owner_id: int, shape_id: int): void;

/** If [code]true[/code], disables the given shape owner. */
shape_owner_set_disabled(owner_id: int, disabled: boolean): void;

/** Sets the [Transform] of the given shape owner. */
shape_owner_set_transform(owner_id: int, transform: Transform): void;

  connect<T extends SignalsOf<CollisionObject3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  /**
 * Emitted when [method _input_event] receives an event. See its description for details.
 *
*/
input_event: Signal<(camera: Node, event: InputEvent, click_position: Vector3, click_normal: Vector3, shape_idx: int) => void>

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


 
