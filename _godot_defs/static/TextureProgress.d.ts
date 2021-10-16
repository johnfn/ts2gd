
/**
 * TextureProgress works like [ProgressBar], but uses up to 3 textures instead of Godot's [Theme] resource. It can be used to create horizontal, vertical and radial progress bars.
 *
*/
declare class TextureProgress extends Range {

  
/**
 * TextureProgress works like [ProgressBar], but uses up to 3 textures instead of Godot's [Theme] resource. It can be used to create horizontal, vertical and radial progress bars.
 *
*/
  "new"(): TextureProgress;
  static "new"(): TextureProgress;



/** The fill direction. See [enum FillMode] for possible values. */
fill_mode: int;


/** If [code]true[/code], Godot treats the bar's textures like in [NinePatchRect]. Use the [code]stretch_margin_*[/code] properties like [member stretch_margin_bottom] to set up the nine patch's 3×3 grid. When using a radial [member fill_mode], this setting will enable stretching. */
nine_patch_stretch: boolean;

/** Offsets [member texture_progress] if [member fill_mode] is [constant FILL_CLOCKWISE] or [constant FILL_COUNTER_CLOCKWISE]. */
radial_center_offset: Vector2;

/**
 * Upper limit for the fill of [member texture_progress] if [member fill_mode] is [constant FILL_CLOCKWISE] or [constant FILL_COUNTER_CLOCKWISE]. When the node's `value` is equal to its `max_value`, the texture fills up to this angle.
 *
 * See [member Range.value], [member Range.max_value].
 *
*/
radial_fill_degrees: float;

/** Starting angle for the fill of [member texture_progress] if [member fill_mode] is [constant FILL_CLOCKWISE] or [constant FILL_COUNTER_CLOCKWISE]. When the node's [code]value[/code] is equal to its [code]min_value[/code], the texture doesn't show up at all. When the [code]value[/code] increases, the texture fills and tends towards [member radial_fill_degrees]. */
radial_initial_angle: float;

/** The height of the 9-patch's bottom row. A margin of 16 means the 9-slice's bottom corners and side will have a height of 16 pixels. You can set all 4 margin values individually to create panels with non-uniform borders. */
stretch_margin_bottom: int;

/** The width of the 9-patch's left column. */
stretch_margin_left: int;

/** The width of the 9-patch's right column. */
stretch_margin_right: int;

/** The height of the 9-patch's top row. */
stretch_margin_top: int;

/** [Texture] that draws over the progress bar. Use it to add highlights or an upper-frame that hides part of [member texture_progress]. */
texture_over: Texture;

/**
 * [Texture] that clips based on the node's `value` and [member fill_mode]. As `value` increased, the texture fills up. It shows entirely when `value` reaches `max_value`. It doesn't show at all if `value` is equal to `min_value`.
 *
 * The `value` property comes from [Range]. See [member Range.value], [member Range.min_value], [member Range.max_value].
 *
*/
texture_progress: Texture;

/** The offset of [member texture_progress]. Useful for [member texture_over] and [member texture_under] with fancy borders, to avoid transparent margins in your progress texture. */
texture_progress_offset: Vector2;

/** [Texture] that draws under the progress bar. The bar's background. */
texture_under: Texture;

/** Multiplies the color of the bar's [code]texture_over[/code] texture. The effect is similar to [member CanvasItem.modulate], except it only affects this specific texture instead of the entire node. */
tint_over: Color;

/** Multiplies the color of the bar's [code]texture_progress[/code] texture. */
tint_progress: Color;

/** Multiplies the color of the bar's [code]texture_under[/code] texture. */
tint_under: Color;

/** No documentation provided. */
get_stretch_margin(margin: int): int;

/** No documentation provided. */
set_stretch_margin(margin: int, value: int): void;

  // connect<T extends SignalsOf<TextureProgress>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<TextureProgressSignals>>(signal: T, method: SignalFunction<TextureProgressSignals[T]>): number;



/**
 * The [member texture_progress] fills from left to right.
 *
*/
static FILL_LEFT_TO_RIGHT: any;

/**
 * The [member texture_progress] fills from right to left.
 *
*/
static FILL_RIGHT_TO_LEFT: any;

/**
 * The [member texture_progress] fills from top to bottom.
 *
*/
static FILL_TOP_TO_BOTTOM: any;

/**
 * The [member texture_progress] fills from bottom to top.
 *
*/
static FILL_BOTTOM_TO_TOP: any;

/**
 * Turns the node into a radial bar. The [member texture_progress] fills clockwise. See [member radial_center_offset], [member radial_initial_angle] and [member radial_fill_degrees] to control the way the bar fills up.
 *
*/
static FILL_CLOCKWISE: any;

/**
 * Turns the node into a radial bar. The [member texture_progress] fills counterclockwise. See [member radial_center_offset], [member radial_initial_angle] and [member radial_fill_degrees] to control the way the bar fills up.
 *
*/
static FILL_COUNTER_CLOCKWISE: any;

/**
 * The [member texture_progress] fills from the center, expanding both towards the left and the right.
 *
*/
static FILL_BILINEAR_LEFT_AND_RIGHT: any;

/**
 * The [member texture_progress] fills from the center, expanding both towards the top and the bottom.
 *
*/
static FILL_BILINEAR_TOP_AND_BOTTOM: any;

/**
 * Turns the node into a radial bar. The [member texture_progress] fills radially from the center, expanding both clockwise and counterclockwise. See [member radial_center_offset], [member radial_initial_angle] and [member radial_fill_degrees] to control the way the bar fills up.
 *
*/
static FILL_CLOCKWISE_AND_COUNTER_CLOCKWISE: any;

}

declare class TextureProgressSignals extends RangeSignals {
  
}
