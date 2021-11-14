
/**
 * A RayCast represents a line from its origin to its destination position, `cast_to`. It is used to query the 3D space in order to find the closest object along the path of the ray.
 *
 * RayCast can ignore some objects by adding them to the exception list via `add_exception` or by setting proper filtering with collision layers and masks.
 *
 * RayCast can be configured to report collisions with [Area]s ([member collide_with_areas]) and/or [PhysicsBody]s ([member collide_with_bodies]).
 *
 * Only enabled raycasts will be able to query the space and report collisions.
 *
 * RayCast calculates intersection every physics frame (see [Node]), and the result is cached so it can be used later until the next frame. If multiple queries are required between physics frames (or during the same frame), use [method force_raycast_update] after adjusting the raycast.
 *
*/
declare class RayCast extends Spatial  {

  
/**
 * A RayCast represents a line from its origin to its destination position, `cast_to`. It is used to query the 3D space in order to find the closest object along the path of the ray.
 *
 * RayCast can ignore some objects by adding them to the exception list via `add_exception` or by setting proper filtering with collision layers and masks.
 *
 * RayCast can be configured to report collisions with [Area]s ([member collide_with_areas]) and/or [PhysicsBody]s ([member collide_with_bodies]).
 *
 * Only enabled raycasts will be able to query the space and report collisions.
 *
 * RayCast calculates intersection every physics frame (see [Node]), and the result is cached so it can be used later until the next frame. If multiple queries are required between physics frames (or during the same frame), use [method force_raycast_update] after adjusting the raycast.
 *
*/
  new(): RayCast; 
  static "new"(): RayCast 


/** The ray's destination point, relative to the RayCast's [code]position[/code]. */
cast_to: Vector3;

/** If [code]true[/code], collision with [Area]s will be reported. */
collide_with_areas: boolean;

/** If [code]true[/code], collision with [PhysicsBody]s will be reported. */
collide_with_bodies: boolean;

/** The ray's collision mask. Only objects in at least one collision layer enabled in the mask will be detected. See [url=https://docs.godotengine.org/en/3.4/tutorials/physics/physics_introduction.html#collision-layers-and-masks]Collision layers and masks[/url] in the documentation for more information. */
collision_mask: int;

/**
 * The custom color to use to draw the shape in the editor and at run-time if **Visible Collision Shapes** is enabled in the **Debug** menu. This color will be highlighted at run-time if the [RayCast] is colliding with something.
 *
 * If set to `Color(0.0, 0.0, 0.0)` (by default), the color set in [member ProjectSettings.debug/shapes/collision/shape_color] is used.
 *
*/
debug_shape_custom_color: Color;

/** If set to [code]1[/code], a line is used as the debug shape. Otherwise, a truncated pyramid is drawn to represent the [RayCast]. Requires [b]Visible Collision Shapes[/b] to be enabled in the [b]Debug[/b] menu for the debug shape to be visible at run-time. */
debug_shape_thickness: float;

/** If [code]true[/code], collisions will be reported. */
enabled: boolean;

/** If [code]true[/code], collisions will be ignored for this RayCast's immediate parent. */
exclude_parent: boolean;

/** Adds a collision exception so the ray does not report collisions with the specified node. */
add_exception(node: Object): void;

/** Adds a collision exception so the ray does not report collisions with the specified [RID]. */
add_exception_rid(rid: RID): void;

/** Removes all collision exceptions for this ray. */
clear_exceptions(): void;

/**
 * Updates the collision information for the ray.
 *
 * Use this method to update the collision information immediately instead of waiting for the next `_physics_process` call, for example if the ray or its parent has changed state.
 *
 * **Note:** `enabled` is not required for this to work.
 *
*/
force_raycast_update(): void;

/** Returns the first object that the ray intersects, or [code]null[/code] if no object is intersecting the ray (i.e. [method is_colliding] returns [code]false[/code]). */
get_collider(): Object;

/** Returns the shape ID of the first object that the ray intersects, or [code]0[/code] if no object is intersecting the ray (i.e. [method is_colliding] returns [code]false[/code]). */
get_collider_shape(): int;

/**
 * Returns `true` if the bit index passed is turned on.
 *
 * **Note:** Bit indices range from 0-19.
 *
*/
get_collision_mask_bit(bit: int): boolean;

/** Returns the normal of the intersecting object's shape at the collision point. */
get_collision_normal(): Vector3;

/**
 * Returns the collision point at which the ray intersects the closest object.
 *
 * **Note:** This point is in the **global** coordinate system.
 *
*/
get_collision_point(): Vector3;

/** Returns whether any object is intersecting with the ray's vector (considering the vector length). */
is_colliding(): boolean;

/** Removes a collision exception so the ray does report collisions with the specified node. */
remove_exception(node: Object): void;

/** Removes a collision exception so the ray does report collisions with the specified [RID]. */
remove_exception_rid(rid: RID): void;

/**
 * Sets the bit index passed to the `value` passed.
 *
 * **Note:** Bit indexes range from 0-19.
 *
*/
set_collision_mask_bit(bit: int, value: boolean): void;

  connect<T extends SignalsOf<RayCast>>(signal: T, method: SignalFunction<RayCast[T]>): number;






}

