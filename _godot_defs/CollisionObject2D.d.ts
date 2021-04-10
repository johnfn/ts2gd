
/**
 * CollisionObject2D is the base class for 2D physics objects. It can hold any number of 2D collision [Shape2D]s. Each shape must be assigned to a **shape owner**. The CollisionObject2D can have any number of shape owners. Shape owners are not nodes and do not appear in the editor, but are accessible through code using the `shape_owner_*` methods.
 *
*/
declare class CollisionObject2D extends Node2D {

  
/**
 * CollisionObject2D is the base class for 2D physics objects. It can hold any number of 2D collision [Shape2D]s. Each shape must be assigned to a **shape owner**. The CollisionObject2D can have any number of shape owners. Shape owners are not nodes and do not appear in the editor, but are accessible through code using the `shape_owner_*` methods.
 *
*/
  "new"(): CollisionObject2D;
  static "new"(): CollisionObject2D;



/** If [code]true[/code], this object is pickable. A pickable object can detect the mouse pointer entering/leaving, and if the mouse is inside it, report input events. Requires at least one [code]collision_layer[/code] bit to be set. */
input_pickable: boolean;

/** Accepts unhandled [InputEvent]s. Requires [member input_pickable] to be [code]true[/code]. [code]shape_idx[/code] is the child index of the clicked [Shape2D]. Connect to the [code]input_event[/code] signal to easily pick up these events. */
protected _input_event(viewport: Object, event: InputEvent, shape_idx: int): void;

/** Creates a new shape owner for the given object. Returns [code]owner_id[/code] of the new owner for future reference. */
create_shape_owner(owner: Object): int;

/** Returns the object's [RID]. */
get_rid(): RID;

/** Returns the [code]one_way_collision_margin[/code] of the shape owner identified by given [code]owner_id[/code]. */
get_shape_owner_one_way_collision_margin(owner_id: int): float;

/** Returns an [Array] of [code]owner_id[/code] identifiers. You can use these ids in other methods that take [code]owner_id[/code] as an argument. */
get_shape_owners(): any[];

/** If [code]true[/code], the shape owner and its shapes are disabled. */
is_shape_owner_disabled(owner_id: int): boolean;

/** Returns [code]true[/code] if collisions for the shape owner originating from this [CollisionObject2D] will not be reported to collided with [CollisionObject2D]s. */
is_shape_owner_one_way_collision_enabled(owner_id: int): boolean;

/** Removes the given shape owner. */
remove_shape_owner(owner_id: int): void;

/** Returns the [code]owner_id[/code] of the given shape. */
shape_find_owner(shape_index: int): int;

/** Adds a [Shape2D] to the shape owner. */
shape_owner_add_shape(owner_id: int, shape: Shape2D): void;

/** Removes all shapes from the shape owner. */
shape_owner_clear_shapes(owner_id: int): void;

/** Returns the parent object of the given shape owner. */
shape_owner_get_owner(owner_id: int): Object;

/** Returns the [Shape2D] with the given id from the given shape owner. */
shape_owner_get_shape(owner_id: int, shape_id: int): Shape2D;

/** Returns the number of shapes the given shape owner contains. */
shape_owner_get_shape_count(owner_id: int): int;

/** Returns the child index of the [Shape2D] with the given id from the given shape owner. */
shape_owner_get_shape_index(owner_id: int, shape_id: int): int;

/** Returns the shape owner's [Transform2D]. */
shape_owner_get_transform(owner_id: int): Transform2D;

/** Removes a shape from the given shape owner. */
shape_owner_remove_shape(owner_id: int, shape_id: int): void;

/** If [code]true[/code], disables the given shape owner. */
shape_owner_set_disabled(owner_id: int, disabled: boolean): void;

/** If [code]enable[/code] is [code]true[/code], collisions for the shape owner originating from this [CollisionObject2D] will not be reported to collided with [CollisionObject2D]s. */
shape_owner_set_one_way_collision(owner_id: int, enable: boolean): void;

/** Sets the [code]one_way_collision_margin[/code] of the shape owner identified by given [code]owner_id[/code] to [code]margin[/code] pixels. */
shape_owner_set_one_way_collision_margin(owner_id: int, margin: float): void;

/** Sets the [Transform2D] of the given shape owner. */
shape_owner_set_transform(owner_id: int, transform: Transform2D): void;

  connect<T extends SignalsOf<CollisionObject2D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  /**
 * Emitted when an input event occurs. Requires [member input_pickable] to be `true` and at least one `collision_layer` bit to be set. See [method _input_event] for details.
 *
*/
input_event: Signal<(viewport: Node, event: InputEvent, shape_idx: int) => void>

/**
 * Emitted when the mouse pointer enters any of this object's shapes. Requires [member input_pickable] to be `true` and at least one `collision_layer` bit to be set.
 *
*/
mouse_entered: Signal<() => void>

/**
 * Emitted when the mouse pointer exits all this object's shapes. Requires [member input_pickable] to be `true` and at least one `collision_layer` bit to be set.
 *
*/
mouse_exited: Signal<() => void>

}
