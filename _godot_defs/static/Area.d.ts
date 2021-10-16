
/**
 * 3D area that detects [CollisionObject] nodes overlapping, entering, or exiting. Can also alter or override local physics parameters (gravity, damping) and route audio to custom audio buses.
 *
*/
declare class Area extends CollisionObject {

  
/**
 * 3D area that detects [CollisionObject] nodes overlapping, entering, or exiting. Can also alter or override local physics parameters (gravity, damping) and route audio to custom audio buses.
 *
*/
  "new"(): Area;
  static "new"(): Area;



/**
 * The rate at which objects stop spinning in this area. Represents the angular velocity lost per second.
 *
 * See [member ProjectSettings.physics/3d/default_angular_damp] for more details about damping.
 *
*/
angular_damp: float;

/** The name of the area's audio bus. */
audio_bus_name: string;

/** If [code]true[/code], the area's audio bus overrides the default audio bus. */
audio_bus_override: boolean;

/** The area's gravity intensity (in meters per second squared). This value multiplies the gravity vector. This is useful to alter the force of gravity without altering its direction. */
gravity: float;

/** The falloff factor for point gravity. The greater the value, the faster gravity decreases with distance. */
gravity_distance_scale: float;

/** If [code]true[/code], gravity is calculated from a point (set via [member gravity_vec]). See also [member space_override]. */
gravity_point: boolean;

/** The area's gravity vector (not normalized). If gravity is a point (see [member gravity_point]), this will be the point of attraction. */
gravity_vec: Vector3;

/**
 * The rate at which objects stop moving in this area. Represents the linear velocity lost per second.
 *
 * See [member ProjectSettings.physics/3d/default_linear_damp] for more details about damping.
 *
*/
linear_damp: float;

/** If [code]true[/code], other monitoring areas can detect this area. */
monitorable: boolean;

/** If [code]true[/code], the area detects bodies or areas entering and exiting it. */
monitoring: boolean;

/** The area's priority. Higher priority areas are processed first. */
priority: float;

/** The degree to which this area applies reverb to its associated audio. Ranges from [code]0[/code] to [code]1[/code] with [code]0.1[/code] precision. */
reverb_bus_amount: float;

/** If [code]true[/code], the area applies reverb to its associated audio. */
reverb_bus_enable: boolean;

/** The reverb bus name to use for this area's associated audio. */
reverb_bus_name: string;

/** The degree to which this area's reverb is a uniform effect. Ranges from [code]0[/code] to [code]1[/code] with [code]0.1[/code] precision. */
reverb_bus_uniformity: float;

/** Override mode for gravity and damping calculations within this area. See [enum SpaceOverride] for possible values. */
space_override: int;

/** Returns a list of intersecting [Area]s. For performance reasons (collisions are all processed at the same time) this list is modified once during the physics step, not immediately after objects are moved. Consider using signals instead. */
get_overlapping_areas(): any[];

/** Returns a list of intersecting [PhysicsBody]s. For performance reasons (collisions are all processed at the same time) this list is modified once during the physics step, not immediately after objects are moved. Consider using signals instead. */
get_overlapping_bodies(): any[];

/**
 * If `true`, the given area overlaps the Area.
 *
 * **Note:** The result of this test is not immediate after moving objects. For performance, list of overlaps is updated once per frame and before the physics step. Consider using signals instead.
 *
*/
overlaps_area(area: Node): boolean;

/**
 * If `true`, the given physics body overlaps the Area.
 *
 * **Note:** The result of this test is not immediate after moving objects. For performance, list of overlaps is updated once per frame and before the physics step. Consider using signals instead.
 *
 * The `body` argument can either be a [PhysicsBody] or a [GridMap] instance (while GridMaps are not physics body themselves, they register their tiles with collision shapes as a virtual physics body).
 *
*/
overlaps_body(body: Node): boolean;

  // connect<T extends SignalsOf<Area>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AreaSignals>>(signal: T, method: SignalFunction<AreaSignals[T]>): number;



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

declare class AreaSignals extends CollisionObjectSignals {
  /**
 * Emitted when another Area enters this Area. Requires [member monitoring] to be set to `true`.
 *
 * `area` the other Area.
 *
*/
area_entered: Signal<(area: Area) => void>

/**
 * Emitted when another Area exits this Area. Requires [member monitoring] to be set to `true`.
 *
 * `area` the other Area.
 *
*/
area_exited: Signal<(area: Area) => void>

/**
 * Emitted when one of another Area's [Shape]s enters one of this Area's [Shape]s. Requires [member monitoring] to be set to `true`.
 *
 * `area_id` the [RID] of the other Area's [CollisionObject] used by the [PhysicsServer].
 *
 * `area` the other Area.
 *
 * `area_shape` the index of the [Shape] of the other Area used by the [PhysicsServer].
 *
 * `local_shape` the index of the [Shape] of this Area used by the [PhysicsServer].
 *
*/
area_shape_entered: Signal<(area_rid: RID, area: Area, area_shape: int, local_shape: int) => void>

/**
 * Emitted when one of another Area's [Shape]s enters one of this Area's [Shape]s. Requires [member monitoring] to be set to `true`.
 *
 * `area_id` the [RID] of the other Area's [CollisionObject] used by the [PhysicsServer].
 *
 * `area` the other Area.
 *
 * `area_shape` the index of the [Shape] of the other Area used by the [PhysicsServer].
 *
 * `local_shape` the index of the [Shape] of this Area used by the [PhysicsServer].
 *
*/
area_shape_exited: Signal<(area_rid: RID, area: Area, area_shape: int, local_shape: int) => void>

/**
 * Emitted when a [PhysicsBody] or [GridMap] enters this Area. Requires [member monitoring] to be set to `true`. [GridMap]s are detected if the [MeshLibrary] has Collision [Shape]s.
 *
 * `body` the [Node], if it exists in the tree, of the other [PhysicsBody] or [GridMap].
 *
*/
body_entered: Signal<(body: Node) => void>

/**
 * Emitted when a [PhysicsBody] or [GridMap] exits this Area. Requires [member monitoring] to be set to `true`. [GridMap]s are detected if the [MeshLibrary] has Collision [Shape]s.
 *
 * `body` the [Node], if it exists in the tree, of the other [PhysicsBody] or [GridMap].
 *
*/
body_exited: Signal<(body: Node) => void>

/**
 * Emitted when one of a [PhysicsBody] or [GridMap]'s [Shape]s enters one of this Area's [Shape]s. Requires [member monitoring] to be set to `true`. [GridMap]s are detected if the [MeshLibrary] has Collision [Shape]s.
 *
 * `body_id` the [RID] of the [PhysicsBody] or [MeshLibrary]'s [CollisionObject] used by the [PhysicsServer].
 *
 * `body` the [Node], if it exists in the tree, of the [PhysicsBody] or [GridMap].
 *
 * `body_shape` the index of the [Shape] of the [PhysicsBody] or [GridMap] used by the [PhysicsServer].
 *
 * `local_shape` the index of the [Shape] of this Area used by the [PhysicsServer].
 *
*/
body_shape_entered: Signal<(body_rid: RID, body: Node, body_shape: int, local_shape: int) => void>

/**
 * Emitted when one of a [PhysicsBody] or [GridMap]'s [Shape]s enters one of this Area's [Shape]s. Requires [member monitoring] to be set to `true`. [GridMap]s are detected if the [MeshLibrary] has Collision [Shape]s.
 *
 * `body_id` the [RID] of the [PhysicsBody] or [MeshLibrary]'s [CollisionObject] used by the [PhysicsServer].
 *
 * `body` the [Node], if it exists in the tree, of the [PhysicsBody] or [GridMap].
 *
 * `body_shape` the index of the [Shape] of the [PhysicsBody] or [GridMap] used by the [PhysicsServer].
 *
 * `local_shape` the index of the [Shape] of this Area used by the [PhysicsServer].
 *
*/
body_shape_exited: Signal<(body_rid: RID, body: Node, body_shape: int, local_shape: int) => void>

}
