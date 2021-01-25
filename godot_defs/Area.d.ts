
/**
 * 3D area that detects [CollisionObject] nodes overlapping, entering, or exiting. Can also alter or override local physics parameters (gravity, damping).
 *
*/
declare class Area extends CollisionObject {

  
/**
 * 3D area that detects [CollisionObject] nodes overlapping, entering, or exiting. Can also alter or override local physics parameters (gravity, damping).
 *
*/
  "new"(): Area;
  static "new"(): Area;



/** The rate at which objects stop spinning in this area. Represents the angular velocity lost per second. Values range from [code]0[/code] (no damping) to [code]1[/code] (full damping). */
angular_damp: float;

/** The name of the area's audio bus. */
audio_bus_name: string;

/** If [code]true[/code], the area's audio bus overrides the default audio bus. */
audio_bus_override: boolean;

/** The area's physics layer(s). Collidable objects can exist in any of 32 different layers. A contact is detected if object A is in any of the layers that object B scans, or object B is in any layers that object A scans. See also [member collision_mask]. See [url=https://docs.godotengine.org/en/latest/tutorials/physics/physics_introduction.html#collision-layers-and-masks]Collision layers and masks[/url] in the documentation for more information. */
collision_layer: int;

/** The physics layers this area scans to determine collision detection. See [url=https://docs.godotengine.org/en/latest/tutorials/physics/physics_introduction.html#collision-layers-and-masks]Collision layers and masks[/url] in the documentation for more information. */
collision_mask: int;

/** The area's gravity intensity (ranges from -1024 to 1024). This value multiplies the gravity vector. This is useful to alter the force of gravity without altering its direction. */
gravity: float;

/** The falloff factor for point gravity. The greater the value, the faster gravity decreases with distance. */
gravity_distance_scale: float;

/** If [code]true[/code], gravity is calculated from a point (set via [member gravity_vec]). See also [member space_override]. */
gravity_point: boolean;

/** The area's gravity vector (not normalized). If gravity is a point (see [member gravity_point]), this will be the point of attraction. */
gravity_vec: Vector3;

/** The rate at which objects stop moving in this area. Represents the linear velocity lost per second. Values range from [code]0[/code] (no damping) to [code]1[/code] (full damping). */
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

/** Returns an individual bit on the layer mask. */
get_collision_layer_bit(bit: int): boolean;

/** Returns an individual bit on the collision mask. */
get_collision_mask_bit(bit: int): boolean;

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

/** Set/clear individual bits on the layer mask. This simplifies editing this [Area]'s layers. */
set_collision_layer_bit(bit: int, value: boolean): void;

/** Set/clear individual bits on the collision mask. This simplifies editing which [Area] layers this [Area] scans. */
set_collision_mask_bit(bit: int, value: boolean): void;

  connect<T extends SignalsOf<Area>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * This area does not affect gravity/damping.
 *
*/
static SPACE_OVERRIDE_DISABLED: 0;

/**
 * This area adds its gravity/damping values to whatever has been calculated so far (in [member priority] order).
 *
*/
static SPACE_OVERRIDE_COMBINE: 1;

/**
 * This area adds its gravity/damping values to whatever has been calculated so far (in [member priority] order), ignoring any lower priority areas.
 *
*/
static SPACE_OVERRIDE_COMBINE_REPLACE: 2;

/**
 * This area replaces any gravity/damping, even the defaults, ignoring any lower priority areas.
 *
*/
static SPACE_OVERRIDE_REPLACE: 3;

/**
 * This area replaces any gravity/damping calculated so far (in [member priority] order), but keeps calculating the rest of the areas.
 *
*/
static SPACE_OVERRIDE_REPLACE_COMBINE: 4;


  /**
 * Emitted when another area enters.
 *
*/
area_entered: Signal<(area: Area) => void>

/**
 * Emitted when another area exits.
 *
*/
area_exited: Signal<(area: Area) => void>

/**
 * Emitted when another area enters, reporting which areas overlapped. `shape_owner_get_owner(shape_find_owner(shape))` returns the parent object of the owner of the `shape`.
 *
*/
area_shape_entered: Signal<(area_id: int, area: Area, area_shape: int, self_shape: int) => void>

/**
 * Emitted when another area exits, reporting which areas were overlapping.
 *
*/
area_shape_exited: Signal<(area_id: int, area: Area, area_shape: int, self_shape: int) => void>

/**
 * Emitted when a physics body enters.
 *
 * The `body` argument can either be a [PhysicsBody] or a [GridMap] instance (while GridMaps are not physics body themselves, they register their tiles with collision shapes as a virtual physics body).
 *
*/
body_entered: Signal<(body: Node) => void>

/**
 * Emitted when a physics body exits.
 *
 * The `body` argument can either be a [PhysicsBody] or a [GridMap] instance (while GridMaps are not physics body themselves, they register their tiles with collision shapes as a virtual physics body).
 *
*/
body_exited: Signal<(body: Node) => void>

/**
 * Emitted when a physics body enters, reporting which shapes overlapped.
 *
 * The `body` argument can either be a [PhysicsBody] or a [GridMap] instance (while GridMaps are not physics body themselves, they register their tiles with collision shapes as a virtual physics body).
 *
*/
body_shape_entered: Signal<(body_id: int, body: Node, body_shape: int, area_shape: int) => void>

/**
 * Emitted when a physics body exits, reporting which shapes were overlapping.
 *
 * The `body` argument can either be a [PhysicsBody] or a [GridMap] instance (while GridMaps are not physics body themselves, they register their tiles with collision shapes as a virtual physics body).
 *
*/
body_shape_exited: Signal<(body_id: int, body: Node, body_shape: int, area_shape: int) => void>

}
