
/**
 * StyleBox is [Resource] that provides an abstract base class for drawing stylized boxes for the UI. StyleBoxes are used for drawing the styles of buttons, line edit backgrounds, tree backgrounds, etc. and also for testing a transparency mask for pointer signals. If mask test fails on a StyleBox assigned as mask to a control, clicks and motion signals will go through it to the one below.
 *
 * **Note:** For children of [Control] that have **Theme Properties**, the `focus` [StyleBox] is displayed over the `normal`, `hover` or `pressed` [StyleBox]. This makes the `focus` [StyleBox] more reusable across different nodes.
 *
*/
declare class StyleBox extends Resource {

  
/**
 * StyleBox is [Resource] that provides an abstract base class for drawing stylized boxes for the UI. StyleBoxes are used for drawing the styles of buttons, line edit backgrounds, tree backgrounds, etc. and also for testing a transparency mask for pointer signals. If mask test fails on a StyleBox assigned as mask to a control, clicks and motion signals will go through it to the one below.
 *
 * **Note:** For children of [Control] that have **Theme Properties**, the `focus` [StyleBox] is displayed over the `normal`, `hover` or `pressed` [StyleBox]. This makes the `focus` [StyleBox] more reusable across different nodes.
 *
*/
  "new"(): StyleBox;
  static "new"(): StyleBox;



/**
 * The bottom margin for the contents of this style box. Increasing this value reduces the space available to the contents from the bottom.
 *
 * If this value is negative, it is ignored and a child-specific margin is used instead. For example for [StyleBoxFlat] the border thickness (if any) is used instead.
 *
 * It is up to the code using this style box to decide what these contents are: for example, a [Button] respects this content margin for the textual contents of the button.
 *
 * [method get_margin] should be used to fetch this value as consumer instead of reading these properties directly. This is because it correctly respects negative values and the fallback mentioned above.
 *
*/
content_margin_bottom: float;

/**
 * The left margin for the contents of this style box.	Increasing this value reduces the space available to the contents from the left.
 *
 * Refer to [member content_margin_bottom] for extra considerations.
 *
*/
content_margin_left: float;

/**
 * The right margin for the contents of this style box. Increasing this value reduces the space available to the contents from the right.
 *
 * Refer to [member content_margin_bottom] for extra considerations.
 *
*/
content_margin_right: float;

/**
 * The top margin for the contents of this style box. Increasing this value reduces the space available to the contents from the top.
 *
 * Refer to [member content_margin_bottom] for extra considerations.
 *
*/
content_margin_top: float;

/**
 * Draws this stylebox using a [CanvasItem] with given [RID].
 *
 * You can get a [RID] value using [method Object.get_instance_id] on a [CanvasItem]-derived node.
 *
*/
draw(canvas_item: RID, rect: Rect2): void;

/** Returns the size of this [StyleBox] without the margins. */
get_center_size(): Vector2;

/** Returns the [CanvasItem] that handles its [constant CanvasItem.NOTIFICATION_DRAW] or [method CanvasItem._draw] callback at this moment. */
get_current_item_drawn(): CanvasItem;

/** Returns the default value of the specified [enum Margin]. */
get_default_margin(margin: int): float;

/**
 * Returns the content margin offset for the specified [enum Margin].
 *
 * Positive values reduce size inwards, unlike [Control]'s margin values.
 *
*/
get_margin(margin: int): float;

/** Returns the minimum size that this stylebox can be shrunk to. */
get_minimum_size(): Vector2;

/** Returns the "offset" of a stylebox. This helper function returns a value equivalent to [code]Vector2(style.get_margin(MARGIN_LEFT), style.get_margin(MARGIN_TOP))[/code]. */
get_offset(): Vector2;

/** Sets the default value of the specified [enum Margin] to given [code]offset[/code] in pixels. */
set_default_margin(margin: int, offset: float): void;

/** Test a position in a rectangle, return whether it passes the mask test. */
test_mask(point: Vector2, rect: Rect2): boolean;

  // connect<T extends SignalsOf<StyleBox>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<StyleBoxSignals>>(signal: T, method: SignalFunction<StyleBoxSignals[T]>): number;




}

declare class StyleBoxSignals extends ResourceSignals {
  
}
