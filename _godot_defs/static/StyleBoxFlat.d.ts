
/**
 * This [StyleBox] can be used to achieve all kinds of looks without the need of a texture. The following properties are customizable:
 *
 * - Color
 *
 * - Border width (individual width for each border)
 *
 * - Rounded corners (individual radius for each corner)
 *
 * - Shadow (with blur and offset)
 *
 * Setting corner radius to high values is allowed. As soon as corners overlap, the stylebox will switch to a relative system. Example:
 *
 * @example 
 * 
 * height = 30
 * corner_radius_top_left = 50
 * corner_radius_bottom_left = 100
 * @summary 
 * 
 *
 * The relative system now would take the 1:2 ratio of the two left corners to calculate the actual corner width. Both corners added will **never** be more than the height. Result:
 *
 * @example 
 * 
 * corner_radius_top_left: 10
 * corner_radius_bottom_left: 20
 * @summary 
 * 
 *
*/
declare class StyleBoxFlat extends StyleBox  {

  
/**
 * This [StyleBox] can be used to achieve all kinds of looks without the need of a texture. The following properties are customizable:
 *
 * - Color
 *
 * - Border width (individual width for each border)
 *
 * - Rounded corners (individual radius for each corner)
 *
 * - Shadow (with blur and offset)
 *
 * Setting corner radius to high values is allowed. As soon as corners overlap, the stylebox will switch to a relative system. Example:
 *
 * @example 
 * 
 * height = 30
 * corner_radius_top_left = 50
 * corner_radius_bottom_left = 100
 * @summary 
 * 
 *
 * The relative system now would take the 1:2 ratio of the two left corners to calculate the actual corner width. Both corners added will **never** be more than the height. Result:
 *
 * @example 
 * 
 * corner_radius_top_left: 10
 * corner_radius_bottom_left: 20
 * @summary 
 * 
 *
*/
  new(): StyleBoxFlat; 
  static "new"(): StyleBoxFlat 


/**
 * Antialiasing draws a small ring around the edges, which fades to transparency. As a result, edges look much smoother. This is only noticeable when using rounded corners.
 *
 * **Note:** When using beveled corners with 45-degree angles ([member corner_detail] = 1), it is recommended to set [member anti_aliasing] to `false` to ensure crisp visuals and avoid possible visual glitches.
 *
*/
anti_aliasing: boolean;

/** This changes the size of the faded ring. Higher values can be used to achieve a "blurry" effect. */
anti_aliasing_size: float;

/** The background color of the stylebox. */
bg_color: Color;

/** If [code]true[/code], the border will fade into the background color. */
border_blend: boolean;

/** Sets the color of the border. */
border_color: Color;

/** Border width for the bottom border. */
border_width_bottom: int;

/** Border width for the left border. */
border_width_left: int;

/** Border width for the right border. */
border_width_right: int;

/** Border width for the top border. */
border_width_top: int;

/**
 * This sets the number of vertices used for each corner. Higher values result in rounder corners but take more processing power to compute. When choosing a value, you should take the corner radius ([method set_corner_radius_all]) into account.
 *
 * For corner radii less than 10, `4` or `5` should be enough. For corner radii less than 30, values between `8` and `12` should be enough.
 *
 * A corner detail of `1` will result in chamfered corners instead of rounded corners, which is useful for some artistic effects.
 *
*/
corner_detail: int;

/** The bottom-left corner's radius. If [code]0[/code], the corner is not rounded. */
corner_radius_bottom_left: int;

/** The bottom-right corner's radius. If [code]0[/code], the corner is not rounded. */
corner_radius_bottom_right: int;

/** The top-left corner's radius. If [code]0[/code], the corner is not rounded. */
corner_radius_top_left: int;

/** The top-right corner's radius. If [code]0[/code], the corner is not rounded. */
corner_radius_top_right: int;

/** Toggles drawing of the inner part of the stylebox. */
draw_center: boolean;

/** Expands the stylebox outside of the control rect on the bottom edge. Useful in combination with [member border_width_bottom] to draw a border outside the control rect. */
expand_margin_bottom: float;

/** Expands the stylebox outside of the control rect on the left edge. Useful in combination with [member border_width_left] to draw a border outside the control rect. */
expand_margin_left: float;

/** Expands the stylebox outside of the control rect on the right edge. Useful in combination with [member border_width_right] to draw a border outside the control rect. */
expand_margin_right: float;

/** Expands the stylebox outside of the control rect on the top edge. Useful in combination with [member border_width_top] to draw a border outside the control rect. */
expand_margin_top: float;

/** The color of the shadow. This has no effect if [member shadow_size] is lower than 1. */
shadow_color: Color;

/** The shadow offset in pixels. Adjusts the position of the shadow relatively to the stylebox. */
shadow_offset: Vector2;

/** The shadow size in pixels. */
shadow_size: int;

/** Returns the given [code]margin[/code]'s border width. See [enum Margin] for possible values. */
get_border_width(margin: int): int;

/** Returns the smallest border width out of all four borders. */
get_border_width_min(): int;

/** Returns the given [code]corner[/code]'s radius. See [enum Corner] for possible values. */
get_corner_radius(corner: int): int;

/** Returns the size of the given [code]margin[/code]'s expand margin. See [enum Margin] for possible values. */
get_expand_margin(margin: int): float;

/** Sets the border width to [code]width[/code] pixels for the given [code]margin[/code]. See [enum Margin] for possible values. */
set_border_width(margin: int, width: int): void;

/** Sets the border width to [code]width[/code] pixels for all margins. */
set_border_width_all(width: int): void;

/** Sets the corner radius to [code]radius[/code] pixels for the given [code]corner[/code]. See [enum Corner] for possible values. */
set_corner_radius(corner: int, radius: int): void;

/** Sets the corner radius to [code]radius[/code] pixels for all corners. */
set_corner_radius_all(radius: int): void;

/** Sets the corner radius for each corner to [code]radius_top_left[/code], [code]radius_top_right[/code], [code]radius_bottom_right[/code], and [code]radius_bottom_left[/code] pixels. */
set_corner_radius_individual(radius_top_left: int, radius_top_right: int, radius_bottom_right: int, radius_bottom_left: int): void;

/** Sets the expand margin to [code]size[/code] pixels for the given [code]margin[/code]. See [enum Margin] for possible values. */
set_expand_margin(margin: int, size: float): void;

/** Sets the expand margin to [code]size[/code] pixels for all margins. */
set_expand_margin_all(size: float): void;

/** Sets the expand margin for each margin to [code]size_left[/code], [code]size_top[/code], [code]size_right[/code], and [code]size_bottom[/code] pixels. */
set_expand_margin_individual(size_left: float, size_top: float, size_right: float, size_bottom: float): void;

  connect<T extends SignalsOf<StyleBoxFlat>>(signal: T, method: SignalFunction<StyleBoxFlat[T]>): number;






}

