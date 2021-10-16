
/**
 * 2D area that detects [CollisionObject2D] nodes overlapping, entering, or exiting. Can also alter or override local physics parameters (gravity, damping) and route audio to a custom audio bus.
 *
*/
declare class Area2D extends CollisionObject2D {

  
/**
 * 2D area that detects [CollisionObject2D] nodes overlapping, entering, or exiting. Can also alter or override local physics parameters (gravity, damping) and route audio to a custom audio bus.
 *
*/
  "new"(): Area2D;
  static "new"(): Area2D;



/**
 * The rate at which objects stop spinning in this area. Represents the angular velocity lost per second.
 *
 * See [member ProjectSettings.physics/2d/default_angular_damp] for more details about damping.
 *
*/
angular_damp: float;

/** The name of the area's audio bus. */
audio_bus_name: string;

/** If [code]true[/code], the area's audio bus overrides the default audio bus. */
audio_bus_override: boolean;

/** The area's gravity intensity (in pixels per second squared). This value multiplies the gravity vector. This is useful to alter the force of gravity without altering its direction. */
gravity: float;

/** The falloff factor for point gravity. The greater the value, the faster gravity decreases with distance. */
gravity_distance_scale: float;

/** If [code]true[/code], gravity is calculated from a point (set via [member gravity_vec]). See also [member space_override]. */
gravity_point: boolean;

/** The area's gravity vector (not normalized). If gravity is a point (see [member gravity_point]), this will be the point of attraction. */
gravity_vec: Vector2;

/**
 * The rate at which objects stop moving in this area. Represents the linear velocity lost per second.
 *
 * See [member ProjectSettings.physics/2d/default_linear_damp] for more details about damping.
 *
*/
linear_damp: float;

/** If [code]true[/code], other monitoring areas can detect this area. */
monitorable: boolean;

/** If [code]true[/code], the area detects bodies or areas entering and exiting it. */
monitoring: boolean;

/** The area's priority. Higher priority areas are processed first. */
priority: float;

/** Override mode for gravity and damping calculations within this area. See [enum SpaceOverride] for possible values. */
space_override: int;

/** Returns a list of intersecting [Area2D]s. For performance reasons (collisions are all processed at the same time) this list is modified once during the physics step, not immediately after objects are moved. Consider using signals instead. */
get_overlapping_areas(): any[];

/** Returns a list of intersecting [PhysicsBody2D]s. For performance reasons (collisions are all processed at the same time) this list is modified once during the physics step, not immediately after objects are moved. Consider using signals instead. */
get_overlapping_bodies(): any[];

/**
 * If `true`, the given area overlaps the Area2D.
 *
 * **Note:** The result of this test is not immediate after moving objects. For performance, the list of overlaps is updated once per frame and before the physics step. Consider using signals instead.
 *
*/
overlaps_area(area: Node): boolean;

/**
 * If `true`, the given physics body overlaps the Area2D.
 *
 * **Note:** The result of this test is not immediate after moving objects. For performance, list of overlaps is updated once per frame and before the physics step. Consider using signals instead.
 *
 * The `body` argument can either be a [PhysicsBody2D] or a [TileMap] instance (while TileMaps are not physics bodies themselves, they register their tiles with collision shapes as a virtual physics body).
 *
*/
overlaps_body(body: Node): boolean;

  // connect<T extends SignalsOf<Area2D>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<Area2DSignals>>(signal: T, method: SignalFunction<Area2DSignals[T]>): number;



/**
 * This area does not affect gravity/damping.
 *
*/
static SPACE_OVERRIDE_DISABLED: any;

/**
 * This area adds its gravity/damping values to whatever has been calculated so far (in [member priority] order).
 *
*/
static SPACE_OVERRIDE_COMBINE: any;

/**
 * This area adds its gravity/damping values to whatever has been calculated so far (in [member priority] order), ignoring any lower priority areas.
 *
*/
static SPACE_OVERRIDE_COMBINE_REPLACE: any;

/**
 * This area replaces any gravity/damping, even the defaults, ignoring any lower priority areas.
 *
*/
static SPACE_OVERRIDE_REPLACE: any;

/**
 * This area replaces any gravity/damping calculated so far (in [member priority] order), but keeps calculating the rest of the areas.
 *
*/
static SPACE_OVERRIDE_REPLACE_COMBINE: any;

}

declare class Area2DSignals extends CollisionObject2DSignals {
  /**
 * Emitted when another Area2D enters this Area2D. Requires [member monitoring] to be set to `true`.
 *
 * `area` the other Area2D.
 *
*/
area_entered: Signal<(area: Area2D) => void>

/**
 * Emitted when another Area2D exits this Area2D. Requires [member monitoring] to be set to `true`.
 *
 * `area` the other Area2D.
 *
*/
area_exited: Signal<(area: Area2D) => void>

/**
 * Emitted when one of another Area2D's [Shape2D]s enters one of this Area2D's [Shape2D]s. Requires [member monitoring] to be set to `true`.
 *
 * `area_id` the [RID] of the other Area2D's [CollisionObject2D] used by the [Physics2DServer].
 *
 * `area` the other Area2D.
 *
 * `area_shape` the index of the [Shape2D] of the other Area2D used by the [Physics2DServer].
 *
 * `local_shape` the index of the [Shape2D] of this Area2D used by the [Physics2DServer].
 *
*/
area_shape_entered: Signal<(area_rid: RID, area: Area2D, area_shape: int, local_shape: int) => void>

/**
 * Emitted when one of another Area2D's [Shape2D]s exits one of this Area2D's [Shape2D]s. Requires [member monitoring] to be set to `true`.
 *
 * `area_id` the [RID] of the other Area2D's [CollisionObject2D] used by the [Physics2DServer].
 *
 * `area` the other Area2D.
 *
 * `area_shape` the index of the [Shape2D] of the other Area2D used by the [Physics2DServer].
 *
 * `local_shape` the index of the [Shape2D] of this Area2D used by the [Physics2DServer].
 *
*/
area_shape_exited: Signal<(area_rid: RID, area: Area2D, area_shape: int, local_shape: int) => void>

/**
 * Emitted when a [PhysicsBody2D] or [TileMap] enters this Area2D. Requires [member monitoring] to be set to `true`. [TileMap]s are detected if the [TileSet] has Collision [Shape2D]s.
 *
 * `body` the [Node], if it exists in the tree, of the other [PhysicsBody2D] or [TileMap].
 *
*/
body_entered: Signal<(body: Node) => void>

/**
 * Emitted when a [PhysicsBody2D] or [TileMap] exits this Area2D. Requires [member monitoring] to be set to `true`. [TileMap]s are detected if the [TileSet] has Collision [Shape2D]s.
 *
 * `body` the [Node], if it exists in the tree, of the other [PhysicsBody2D] or [TileMap].
 *
*/
body_exited: Signal<(body: Node) => void>

/**
 * Emitted when one of a [PhysicsBody2D] or [TileMap]'s [Shape2D]s enters one of this Area2D's [Shape2D]s. Requires [member monitoring] to be set to `true`. [TileMap]s are detected if the [TileSet] has Collision [Shape2D]s.
 *
 * `body_id` the [RID] of the [PhysicsBody2D] or [TileSet]'s [CollisionObject2D] used by the [Physics2DServer].
 *
 * `body` the [Node], if it exists in the tree, of the [PhysicsBody2D] or [TileMap].
 *
 * `body_shape` the index of the [Shape2D] of the [PhysicsBody2D] or [TileMap] used by the [Physics2DServer].
 *
 * `local_shape` the index of the [Shape2D] of this Area2D used by the [Physics2DServer].
 *
*/
body_shape_entered: Signal<(body_rid: RID, body: Node, body_shape: int, local_shape: int) => void>

/**
 * Emitted when one of a [PhysicsBody2D] or [TileMap]'s [Shape2D]s exits one of this Area2D's [Shape2D]s. Requires [member monitoring] to be set to `true`. [TileMap]s are detected if the [TileSet] has Collision [Shape2D]s.
 *
 * `body_id` the [RID] of the [PhysicsBody2D] or [TileSet]'s [CollisionObject2D] used by the [Physics2DServer].
 *
 * `body` the [Node], if it exists in the tree, of the [PhysicsBody2D] or [TileMap].
 *
 * `body_shape` the index of the [Shape2D] of the [PhysicsBody2D] or [TileMap] used by the [Physics2DServer].
 *
 * `local_shape` the index of the [Shape2D] of this Area2D used by the [Physics2DServer].
 *
*/
body_shape_exited: Signal<(body_rid: RID, body: Node, body_shape: int, local_shape: int) => void>

}
