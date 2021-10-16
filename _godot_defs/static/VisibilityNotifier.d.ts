
/**
 * The VisibilityNotifier detects when it is visible on the screen. It also notifies when its bounding rectangle enters or exits the screen or a [Camera]'s view.
 *
 * If you want nodes to be disabled automatically when they exit the screen, use [VisibilityEnabler] instead.
 *
 * **Note:** VisibilityNotifier uses an approximate heuristic for performance reasons. It doesn't take walls and other occlusion into account. The heuristic is an implementation detail and may change in future versions. If you need precise visibility checking, use another method such as adding an [Area] node as a child of a [Camera] node and/or [method Vector3.dot].
 *
*/
declare class VisibilityNotifier extends CullInstance {

  
/**
 * The VisibilityNotifier detects when it is visible on the screen. It also notifies when its bounding rectangle enters or exits the screen or a [Camera]'s view.
 *
 * If you want nodes to be disabled automatically when they exit the screen, use [VisibilityEnabler] instead.
 *
 * **Note:** VisibilityNotifier uses an approximate heuristic for performance reasons. It doesn't take walls and other occlusion into account. The heuristic is an implementation detail and may change in future versions. If you need precise visibility checking, use another method such as adding an [Area] node as a child of a [Camera] node and/or [method Vector3.dot].
 *
*/
  "new"(): VisibilityNotifier;
  static "new"(): VisibilityNotifier;



/** The VisibilityNotifier's bounding box. */
aabb: AABB;

/**
 * If `true`, the bounding box is on the screen.
 *
 * **Note:** It takes one frame for the node's visibility to be assessed once added to the scene tree, so this method will return `false` right after it is instantiated, even if it will be on screen in the draw pass.
 *
*/
is_on_screen(): boolean;

  // connect<T extends SignalsOf<VisibilityNotifier>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisibilityNotifierSignals>>(signal: T, method: SignalFunction<VisibilityNotifierSignals[T]>): number;




}

declare class VisibilityNotifierSignals extends CullInstanceSignals {
  /**
 * Emitted when the VisibilityNotifier enters a [Camera]'s view.
 *
*/
camera_entered: Signal<(camera: Camera) => void>

/**
 * Emitted when the VisibilityNotifier exits a [Camera]'s view.
 *
*/
camera_exited: Signal<(camera: Camera) => void>

/**
 * Emitted when the VisibilityNotifier enters the screen.
 *
*/
screen_entered: Signal<() => void>

/**
 * Emitted when the VisibilityNotifier exits the screen.
 *
*/
screen_exited: Signal<() => void>

}
