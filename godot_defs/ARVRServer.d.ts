
/**
 * The AR/VR server is the heart of our Advanced and Virtual Reality solution and handles all the processing.
 *
*/
declare class ARVRServerClass extends Object {

  
/**
 * The AR/VR server is the heart of our Advanced and Virtual Reality solution and handles all the processing.
 *
*/
  "new"(): ARVRServerClass;
  static "new"(): ARVRServerClass;



/** The primary [ARVRInterface] currently bound to the [ARVRServer]. */
primary_interface: ARVRInterface;

/** Allows you to adjust the scale to your game's units. Most AR/VR platforms assume a scale of 1 game world unit = 1 real world meter. */
world_scale: float;

/**
 * This is an important function to understand correctly. AR and VR platforms all handle positioning slightly differently.
 *
 * For platforms that do not offer spatial tracking, our origin point (0,0,0) is the location of our HMD, but you have little control over the direction the player is facing in the real world.
 *
 * For platforms that do offer spatial tracking, our origin point depends very much on the system. For OpenVR, our origin point is usually the center of the tracking space, on the ground. For other platforms, it's often the location of the tracking camera.
 *
 * This method allows you to center your tracker on the location of the HMD. It will take the current location of the HMD and use that to adjust all your tracking data; in essence, realigning the real world to your player's current position in the game world.
 *
 * For this method to produce usable results, tracking information must be available. This often takes a few frames after starting your game.
 *
 * You should call this method after a few seconds have passed. For instance, when the user requests a realignment of the display holding a designated button on a controller for a short period of time, or when implementing a teleport mechanism.
 *
*/
center_on_hmd(rotation_mode: int, keep_height: boolean): void;

/** Finds an interface by its name. For instance, if your project uses capabilities of an AR/VR platform, you can find the interface for that platform by name and initialize it. */
find_interface(name: string): ARVRInterface;

/** Returns the primary interface's transformation. */
get_hmd_transform(): Transform;

/** Returns the interface registered at a given index in our list of interfaces. */
get_interface(idx: int): ARVRInterface;

/** Returns the number of interfaces currently registered with the AR/VR server. If your project supports multiple AR/VR platforms, you can look through the available interface, and either present the user with a selection or simply try to initialize each interface and use the first one that returns [code]true[/code]. */
get_interface_count(): int;

/** Returns a list of available interfaces the ID and name of each interface. */
get_interfaces(): any[];

/** Returns the absolute timestamp (in μs) of the last [ARVRServer] commit of the AR/VR eyes to [VisualServer]. The value comes from an internal call to [method OS.get_ticks_usec]. */
get_last_commit_usec(): int;

/** Returns the duration (in μs) of the last frame. This is computed as the difference between [method get_last_commit_usec] and [method get_last_process_usec] when committing. */
get_last_frame_usec(): int;

/** Returns the absolute timestamp (in μs) of the last [ARVRServer] process callback. The value comes from an internal call to [method OS.get_ticks_usec]. */
get_last_process_usec(): int;

/** Returns the reference frame transform. Mostly used internally and exposed for GDNative build interfaces. */
get_reference_frame(): Transform;

/** Returns the positional tracker at the given ID. */
get_tracker(idx: int): ARVRPositionalTracker;

/** Returns the number of trackers currently registered. */
get_tracker_count(): int;

  connect<T extends SignalsOf<ARVRServerClass>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * The tracker tracks the location of a controller.
 *
*/
static TRACKER_CONTROLLER: 1;

/**
 * The tracker tracks the location of a base station.
 *
*/
static TRACKER_BASESTATION: 2;

/**
 * The tracker tracks the location and size of an AR anchor.
 *
*/
static TRACKER_ANCHOR: 4;

/**
 * Used internally to filter trackers of any known type.
 *
*/
static TRACKER_ANY_KNOWN: 127;

/**
 * Used internally if we haven't set the tracker type yet.
 *
*/
static TRACKER_UNKNOWN: 128;

/**
 * Used internally to select all trackers.
 *
*/
static TRACKER_ANY: 255;

/**
 * Fully reset the orientation of the HMD. Regardless of what direction the user is looking to in the real world. The user will look dead ahead in the virtual world.
 *
*/
static RESET_FULL_ROTATION: 0;

/**
 * Resets the orientation but keeps the tilt of the device. So if we're looking down, we keep looking down but heading will be reset.
 *
*/
static RESET_BUT_KEEP_TILT: 1;

/**
 * Does not reset the orientation of the HMD, only the position of the player gets centered.
 *
*/
static DONT_RESET_ROTATION: 2;


  /**
 * Emitted when a new interface has been added.
 *
*/
interface_added: Signal<(interface_name: string) => void>

/**
 * Emitted when an interface is removed.
 *
*/
interface_removed: Signal<(interface_name: string) => void>

/**
 * Emitted when a new tracker has been added. If you don't use a fixed number of controllers or if you're using [ARVRAnchor]s for an AR solution, it is important to react to this signal to add the appropriate [ARVRController] or [ARVRAnchor] nodes related to this new tracker.
 *
*/
tracker_added: Signal<(tracker_name: string, type: int, id: int) => void>

/**
 * Emitted when a tracker is removed. You should remove any [ARVRController] or [ARVRAnchor] points if applicable. This is not mandatory, the nodes simply become inactive and will be made active again when a new tracker becomes available (i.e. a new controller is switched on that takes the place of the previous one).
 *
*/
tracker_removed: Signal<(tracker_name: string, type: int, id: int) => void>

}
