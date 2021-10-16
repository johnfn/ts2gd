
/**
 * The [CameraServer] keeps track of different cameras accessible in Godot. These are external cameras such as webcams or the cameras on your phone.
 *
 * It is notably used to provide AR modules with a video feed from the camera.
 *
*/
declare class CameraServerClass extends Object {

  
/**
 * The [CameraServer] keeps track of different cameras accessible in Godot. These are external cameras such as webcams or the cameras on your phone.
 *
 * It is notably used to provide AR modules with a video feed from the camera.
 *
*/
  "new"(): CameraServerClass;
  static "new"(): CameraServerClass;




/** Adds a camera feed to the camera server. */
add_feed(feed: CameraFeed): void;

/** Returns an array of [CameraFeed]s. */
feeds(): any[];

/** Returns the [CameraFeed] with this id. */
get_feed(index: int): CameraFeed;

/** Returns the number of [CameraFeed]s registered. */
get_feed_count(): int;

/** Removes a [CameraFeed]. */
remove_feed(feed: CameraFeed): void;

  // connect<T extends SignalsOf<CameraServerClass>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<CameraServerClassSignals>>(signal: T, method: SignalFunction<CameraServerClassSignals[T]>): number;



/**
 * The RGBA camera image.
 *
*/
static FEED_RGBA_IMAGE: any;

/**
 * The YCbCr camera image.
 *
*/
static FEED_YCBCR_IMAGE: any;

/**
 * The Y component camera image.
 *
*/
static FEED_Y_IMAGE: any;

/**
 * The CbCr component camera image.
 *
*/
static FEED_CBCR_IMAGE: any;

}

declare class CameraServerClassSignals extends ObjectSignals {
  /**
 * Emitted when a [CameraFeed] is added (e.g. webcam is plugged in).
 *
*/
camera_feed_added: Signal<(id: int) => void>

/**
 * Emitted when a [CameraFeed] is removed (e.g. webcam is unplugged).
 *
*/
camera_feed_removed: Signal<(id: int) => void>

}
