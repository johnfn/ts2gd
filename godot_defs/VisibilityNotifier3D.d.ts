
/**
 * The VisibilityNotifier3D detects when it is visible on the screen. It also notifies when its bounding rectangle enters or exits the screen or a [Camera3D]'s view.
 *
 * If you want nodes to be disabled automatically when they exit the screen, use [VisibilityEnabler3D] instead.
 *
 * **Note:** VisibilityNotifier3D uses an approximate heuristic for performance reasons. It doesn't take walls and other occlusion into account. The heuristic is an implementation detail and may change in future versions. If you need precise visibility checking, use another method such as adding an [Area3D] node as a child of a [Camera3D] node and/or [method Vector3.dot].
 *
*/
declare class VisibilityNotifier3D extends Node3D {

  
/**
 * The VisibilityNotifier3D detects when it is visible on the screen. It also notifies when its bounding rectangle enters or exits the screen or a [Camera3D]'s view.
 *
 * If you want nodes to be disabled automatically when they exit the screen, use [VisibilityEnabler3D] instead.
 *
 * **Note:** VisibilityNotifier3D uses an approximate heuristic for performance reasons. It doesn't take walls and other occlusion into account. The heuristic is an implementation detail and may change in future versions. If you need precise visibility checking, use another method such as adding an [Area3D] node as a child of a [Camera3D] node and/or [method Vector3.dot].
 *
*/
  "new"(): this;
  static "new"(): this;



/** The VisibilityNotifier3D's bounding box. */
aabb: AABB;

/**
 * If `true`, the bounding box is on the screen.
 *
 * **Note:** It takes one frame for the node's visibility to be assessed once added to the scene tree, so this method will return `false` right after it is instantiated, even if it will be on screen in the draw pass.
 *
*/
is_on_screen(): boolean;

  connect<T extends SignalsOf<VisibilityNotifier3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  /**
 * Emitted when the VisibilityNotifier3D enters a [Camera3D]'s view.
 *
*/
camera_entered: Signal<(camera: Camera3D) => void>

/**
 * Emitted when the VisibilityNotifier3D exits a [Camera3D]'s view.
 *
*/
camera_exited: Signal<(camera: Camera3D) => void>

/**
 * Emitted when the VisibilityNotifier3D enters the screen.
 *
*/
screen_entered: Signal<() => void>

/**
 * Emitted when the VisibilityNotifier3D exits the screen.
 *
*/
screen_exited: Signal<() => void>

}


 
