
/**
 * The VisibilityNotifier2D detects when it is visible on the screen. It also notifies when its bounding rectangle enters or exits the screen or a viewport.
 *
 * If you want nodes to be disabled automatically when they exit the screen, use [VisibilityEnabler2D] instead.
 *
 * **Note:** For performance reasons, VisibilityNotifier2D uses an approximate heuristic with precision determined by [member ProjectSettings.world/2d/cell_size]. If you need precise visibility checking, use another method such as adding an [Area2D] node as a child of a [Camera2D] node.
 *
*/
declare class VisibilityNotifier2D extends Node2D {

  
/**
 * The VisibilityNotifier2D detects when it is visible on the screen. It also notifies when its bounding rectangle enters or exits the screen or a viewport.
 *
 * If you want nodes to be disabled automatically when they exit the screen, use [VisibilityEnabler2D] instead.
 *
 * **Note:** For performance reasons, VisibilityNotifier2D uses an approximate heuristic with precision determined by [member ProjectSettings.world/2d/cell_size]. If you need precise visibility checking, use another method such as adding an [Area2D] node as a child of a [Camera2D] node.
 *
*/
  "new"(): VisibilityNotifier2D;
  static "new"(): VisibilityNotifier2D;



/** The VisibilityNotifier2D's bounding rectangle. */
rect: Rect2;

/**
 * If `true`, the bounding rectangle is on the screen.
 *
 * **Note:** It takes one frame for the node's visibility to be assessed once added to the scene tree, so this method will return `false` right after it is instantiated, even if it will be on screen in the draw pass.
 *
*/
is_on_screen(): boolean;

  // connect<T extends SignalsOf<VisibilityNotifier2D>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisibilityNotifier2DSignals>>(signal: T, method: SignalFunction<VisibilityNotifier2DSignals[T]>): number;




}

declare class VisibilityNotifier2DSignals extends Node2DSignals {
  /**
 * Emitted when the VisibilityNotifier2D enters the screen.
 *
*/
screen_entered: Signal<() => void>

/**
 * Emitted when the VisibilityNotifier2D exits the screen.
 *
*/
screen_exited: Signal<() => void>

/**
 * Emitted when the VisibilityNotifier2D enters a [Viewport]'s view.
 *
*/
viewport_entered: Signal<(viewport: Viewport) => void>

/**
 * Emitted when the VisibilityNotifier2D exits a [Viewport]'s view.
 *
*/
viewport_exited: Signal<(viewport: Viewport) => void>

}
