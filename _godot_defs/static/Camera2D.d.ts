
/**
 * Camera node for 2D scenes. It forces the screen (current layer) to scroll following this node. This makes it easier (and faster) to program scrollable scenes than manually changing the position of [CanvasItem]-based nodes.
 *
 * This node is intended to be a simple helper to get things going quickly, but more functionality may be desired to change how the camera works. To make your own custom camera node, inherit it from [Node2D] and change the transform of the canvas by setting [member Viewport.canvas_transform] in [Viewport] (you can obtain the current [Viewport] by using [method Node.get_viewport]).
 *
 * Note that the [Camera2D] node's `position` doesn't represent the actual position of the screen, which may differ due to applied smoothing or limits. You can use [method get_camera_screen_center] to get the real position.
 *
*/
declare class Camera2D extends Node2D {

  
/**
 * Camera node for 2D scenes. It forces the screen (current layer) to scroll following this node. This makes it easier (and faster) to program scrollable scenes than manually changing the position of [CanvasItem]-based nodes.
 *
 * This node is intended to be a simple helper to get things going quickly, but more functionality may be desired to change how the camera works. To make your own custom camera node, inherit it from [Node2D] and change the transform of the canvas by setting [member Viewport.canvas_transform] in [Viewport] (you can obtain the current [Viewport] by using [method Node.get_viewport]).
 *
 * Note that the [Camera2D] node's `position` doesn't represent the actual position of the screen, which may differ due to applied smoothing or limits. You can use [method get_camera_screen_center] to get the real position.
 *
*/
  "new"(): Camera2D;
  static "new"(): Camera2D;



/** The Camera2D's anchor point. See [enum AnchorMode] constants. */
anchor_mode: int;

/** If [code]true[/code], the camera is the active camera for the current scene. Only one camera can be current, so setting a different camera [code]current[/code] will disable this one. */
current: boolean;

/** The custom [Viewport] node attached to the [Camera2D]. If [code]null[/code] or not a [Viewport], uses the default viewport instead. */
custom_viewport: Node;

/** Bottom margin needed to drag the camera. A value of [code]1[/code] makes the camera move only when reaching the edge of the screen. */
drag_margin_bottom: float;

/** If [code]true[/code], the camera only moves when reaching the horizontal drag margins. If [code]false[/code], the camera moves horizontally regardless of margins. */
drag_margin_h_enabled: boolean;

/** Left margin needed to drag the camera. A value of [code]1[/code] makes the camera move only when reaching the edge of the screen. */
drag_margin_left: float;

/** Right margin needed to drag the camera. A value of [code]1[/code] makes the camera move only when reaching the edge of the screen. */
drag_margin_right: float;

/** Top margin needed to drag the camera. A value of [code]1[/code] makes the camera move only when reaching the edge of the screen. */
drag_margin_top: float;

/** If [code]true[/code], the camera only moves when reaching the vertical drag margins. If [code]false[/code], the camera moves vertically regardless of margins. */
drag_margin_v_enabled: boolean;

/** If [code]true[/code], draws the camera's drag margin rectangle in the editor. */
editor_draw_drag_margin: boolean;

/** If [code]true[/code], draws the camera's limits rectangle in the editor. */
editor_draw_limits: boolean;

/** If [code]true[/code], draws the camera's screen rectangle in the editor. */
editor_draw_screen: boolean;

/** Bottom scroll limit in pixels. The camera stops moving when reaching this value. */
limit_bottom: int;

/** Left scroll limit in pixels. The camera stops moving when reaching this value. */
limit_left: int;

/** Right scroll limit in pixels. The camera stops moving when reaching this value. */
limit_right: int;

/**
 * If `true`, the camera smoothly stops when reaches its limits.
 *
 * This has no effect if smoothing is disabled.
 *
 * **Note:** To immediately update the camera's position to be within limits without smoothing, even with this setting enabled, invoke [method reset_smoothing].
 *
*/
limit_smoothed: boolean;

/** Top scroll limit in pixels. The camera stops moving when reaching this value. */
limit_top: int;

/** The camera's offset, useful for looking around or camera shake animations. */
offset: Vector2;

/**
 * The horizontal offset of the camera, relative to the drag margins.
 *
 * **Note:** Offset H is used only to force offset relative to margins. It's not updated in any way if drag margins are enabled and can be used to set initial offset.
 *
*/
offset_h: float;

/**
 * The vertical offset of the camera, relative to the drag margins.
 *
 * **Note:** Used the same as [member offset_h].
 *
*/
offset_v: float;

/** The camera's process callback. See [enum Camera2DProcessMode]. */
process_mode: int;

/** If [code]true[/code], the camera rotates with the target. */
rotating: boolean;

/** If [code]true[/code], the camera smoothly moves towards the target at [member smoothing_speed]. */
smoothing_enabled: boolean;

/** Speed in pixels per second of the camera's smoothing effect when [member smoothing_enabled] is [code]true[/code]. */
smoothing_speed: float;

/** The camera's zoom relative to the viewport. Values larger than [code]Vector2(1, 1)[/code] zoom out and smaller values zoom in. For an example, use [code]Vector2(0.5, 0.5)[/code] for a 2× zoom-in, and [code]Vector2(4, 4)[/code] for a 4× zoom-out. */
zoom: Vector2;

/** Aligns the camera to the tracked node. */
align(): void;

/** Removes any [Camera2D] from the ancestor [Viewport]'s internal currently-assigned camera. */
clear_current(): void;

/** Forces the camera to update scroll immediately. */
force_update_scroll(): void;

/** Returns the camera position. */
get_camera_position(): Vector2;

/** Returns the location of the [Camera2D]'s screen-center, relative to the origin. */
get_camera_screen_center(): Vector2;

/** Returns the specified margin. See also [member drag_margin_bottom], [member drag_margin_top], [member drag_margin_left], and [member drag_margin_right]. */
get_drag_margin(margin: int): float;

/** Returns the specified camera limit. See also [member limit_bottom], [member limit_top], [member limit_left], and [member limit_right]. */
get_limit(margin: int): int;

/** Make this the current 2D camera for the scene (viewport and layer), in case there are many cameras in the scene. */
make_current(): void;

/**
 * Sets the camera's position immediately to its current smoothing destination.
 *
 * This has no effect if smoothing is disabled.
 *
*/
reset_smoothing(): void;

/** Sets the specified margin. See also [member drag_margin_bottom], [member drag_margin_top], [member drag_margin_left], and [member drag_margin_right]. */
set_drag_margin(margin: int, drag_margin: float): void;

/** Sets the specified camera limit. See also [member limit_bottom], [member limit_top], [member limit_left], and [member limit_right]. */
set_limit(margin: int, limit: int): void;

  // connect<T extends SignalsOf<Camera2D>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<Camera2DSignals>>(signal: T, method: SignalFunction<Camera2DSignals[T]>): number;



/**
 * The camera's position is fixed so that the top-left corner is always at the origin.
 *
*/
static ANCHOR_MODE_FIXED_TOP_LEFT: any;

/**
 * The camera's position takes into account vertical/horizontal offsets and the screen size.
 *
*/
static ANCHOR_MODE_DRAG_CENTER: any;

/**
 * The camera updates with the `_physics_process` callback.
 *
*/
static CAMERA2D_PROCESS_PHYSICS: any;

/**
 * The camera updates with the `_process` callback.
 *
*/
static CAMERA2D_PROCESS_IDLE: any;

}

declare class Camera2DSignals extends Node2DSignals {
  
}
