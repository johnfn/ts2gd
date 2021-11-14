
/**
 * An instance of this object represents a device that is tracked, such as a controller or anchor point. HMDs aren't represented here as they are handled internally.
 *
 * As controllers are turned on and the AR/VR interface detects them, instances of this object are automatically added to this list of active tracking objects accessible through the [ARVRServer].
 *
 * The [ARVRController] and [ARVRAnchor] both consume objects of this type and should be used in your project. The positional trackers are just under-the-hood objects that make this all work. These are mostly exposed so that GDNative-based interfaces can interact with them.
 *
*/
declare class ARVRPositionalTracker extends Reference  {

  
/**
 * An instance of this object represents a device that is tracked, such as a controller or anchor point. HMDs aren't represented here as they are handled internally.
 *
 * As controllers are turned on and the AR/VR interface detects them, instances of this object are automatically added to this list of active tracking objects accessible through the [ARVRServer].
 *
 * The [ARVRController] and [ARVRAnchor] both consume objects of this type and should be used in your project. The positional trackers are just under-the-hood objects that make this all work. These are mostly exposed so that GDNative-based interfaces can interact with them.
 *
*/
  new(): ARVRPositionalTracker; 
  static "new"(): ARVRPositionalTracker 


/** The degree to which the tracker rumbles. Ranges from [code]0.0[/code] to [code]1.0[/code] with precision [code].01[/code]. */
rumble: float;

/** Returns the hand holding this tracker, if known. See [enum TrackerHand] constants. */
get_hand(): int;

/** If this is a controller that is being tracked, the controller will also be represented by a joystick entry with this ID. */
get_joy_id(): int;

/** Returns the mesh related to a controller or anchor point if one is available. */
get_mesh(): Mesh;

/** Returns the controller or anchor point's name if available. */
get_name(): string;

/** Returns the controller's orientation matrix. */
get_orientation(): Basis;

/** Returns the world-space controller position. */
get_position(): Vector3;

/** Returns the internal tracker ID. This uniquely identifies the tracker per tracker type and matches the ID you need to specify for nodes such as the [ARVRController] and [ARVRAnchor] nodes. */
get_tracker_id(): int;

/** Returns [code]true[/code] if this device tracks orientation. */
get_tracks_orientation(): boolean;

/** Returns [code]true[/code] if this device tracks position. */
get_tracks_position(): boolean;

/** Returns the transform combining this device's orientation and position. */
get_transform(adjust_by_reference_frame: boolean): Transform;

/** Returns the tracker's type. */
get_type(): int;

  connect<T extends SignalsOf<ARVRPositionalTracker>>(signal: T, method: SignalFunction<ARVRPositionalTracker[T]>): number;



/**
 * The hand this tracker is held in is unknown or not applicable.
 *
*/
static TRACKER_HAND_UNKNOWN: any;

/**
 * This tracker is the left hand controller.
 *
*/
static TRACKER_LEFT_HAND: any;

/**
 * This tracker is the right hand controller.
 *
*/
static TRACKER_RIGHT_HAND: any;



}

