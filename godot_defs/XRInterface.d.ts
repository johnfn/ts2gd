
/**
 * This class needs to be implemented to make an AR or VR platform available to Godot and these should be implemented as C++ modules or GDNative modules (note that for GDNative the subclass XRScriptInterface should be used). Part of the interface is exposed to GDScript so you can detect, enable and configure an AR or VR platform.
 *
 * Interfaces should be written in such a way that simply enabling them will give us a working setup. You can query the available interfaces through [XRServer].
 *
*/
declare class XRInterface extends Reference {

  
/**
 * This class needs to be implemented to make an AR or VR platform available to Godot and these should be implemented as C++ modules or GDNative modules (note that for GDNative the subclass XRScriptInterface should be used). Part of the interface is exposed to GDScript so you can detect, enable and configure an AR or VR platform.
 *
 * Interfaces should be written in such a way that simply enabling them will give us a working setup. You can query the available interfaces through [XRServer].
 *
*/
  "new"(): this;
  static "new"(): this;



/** On an AR interface, [code]true[/code] if anchor detection is enabled. */
ar_is_anchor_detection_enabled: boolean;

/** [code]true[/code] if this interface been initialized. */
interface_is_initialized: boolean;

/** [code]true[/code] if this is the primary interface. */
interface_is_primary: boolean;

/** If this is an AR interface that requires displaying a camera feed as the background, this method returns the feed ID in the [CameraServer] for this interface. */
get_camera_feed_id(): int;

/** Returns a combination of [enum Capabilities] flags providing information about the capabilities of this interface. */
get_capabilities(): int;

/** Returns the name of this interface (OpenVR, OpenHMD, ARKit, etc). */
get_name(): StringName;

/** Returns the resolution at which we should render our intermediate results before things like lens distortion are applied by the VR platform. */
get_render_targetsize(): Vector2;

/** If supported, returns the status of our tracking. This will allow you to provide feedback to the user whether there are issues with positional tracking. */
get_tracking_status(): int;

/**
 * Call this to initialize this interface. The first interface that is initialized is identified as the primary interface and it will be used for rendering output.
 *
 * After initializing the interface you want to use you then need to enable the AR/VR mode of a viewport and rendering should commence.
 *
 * **Note:** You must enable the AR/VR mode on the main viewport for any device that uses the main output of Godot, such as for mobile VR.
 *
 * If you do this for a platform that handles its own output (such as OpenVR) Godot will show just one eye without distortion on screen. Alternatively, you can add a separate viewport node to your scene and enable AR/VR on that viewport. It will be used to output to the HMD, leaving you free to do anything you like in the main window, such as using a separate camera as a spectator camera or rendering something completely different.
 *
 * While currently not used, you can activate additional interfaces. You may wish to do this if you want to track controllers from other platforms. However, at this point in time only one interface can render to an HMD.
 *
*/
initialize(): boolean;

/** Returns [code]true[/code] if the current output of this interface is in stereo. */
is_stereo(): boolean;

/** Turns the interface off. */
uninitialize(): void;

  connect<T extends SignalsOf<XRInterface>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * No XR capabilities.
 *
*/
static XR_NONE: 0;

/**
 * This interface can work with normal rendering output (non-HMD based AR).
 *
*/
static XR_MONO: 1;

/**
 * This interface supports stereoscopic rendering.
 *
*/
static XR_STEREO: 2;

/**
 * This interface supports AR (video background and real world tracking).
 *
*/
static XR_AR: 4;

/**
 * This interface outputs to an external device. If the main viewport is used, the on screen output is an unmodified buffer of either the left or right eye (stretched if the viewport size is not changed to the same aspect ratio of [method get_render_targetsize]). Using a separate viewport node frees up the main viewport for other purposes.
 *
*/
static XR_EXTERNAL: 8;

/**
 * Mono output, this is mostly used internally when retrieving positioning information for our camera node or when stereo scopic rendering is not supported.
 *
*/
static EYE_MONO: 0;

/**
 * Left eye output, this is mostly used internally when rendering the image for the left eye and obtaining positioning and projection information.
 *
*/
static EYE_LEFT: 1;

/**
 * Right eye output, this is mostly used internally when rendering the image for the right eye and obtaining positioning and projection information.
 *
*/
static EYE_RIGHT: 2;

/**
 * Tracking is behaving as expected.
 *
*/
static XR_NORMAL_TRACKING: 0;

/**
 * Tracking is hindered by excessive motion (the player is moving faster than tracking can keep up).
 *
*/
static XR_EXCESSIVE_MOTION: 1;

/**
 * Tracking is hindered by insufficient features, it's too dark (for camera-based tracking), player is blocked, etc.
 *
*/
static XR_INSUFFICIENT_FEATURES: 2;

/**
 * We don't know the status of the tracking or this interface does not provide feedback.
 *
*/
static XR_UNKNOWN_TRACKING: 3;

/**
 * Tracking is not functional (camera not plugged in or obscured, lighthouses turned off, etc.).
 *
*/
static XR_NOT_TRACKING: 4;


  
}


 
