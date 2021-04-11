
/**
 * Texture-based nine-patch [StyleBox], in a way similar to [NinePatchRect]. This stylebox performs a 3×3 scaling of a texture, where only the center cell is fully stretched. This makes it possible to design bordered styles regardless of the stylebox's size.
 *
*/
declare class StyleBoxTexture extends StyleBox {

  
/**
 * Texture-based nine-patch [StyleBox], in a way similar to [NinePatchRect]. This stylebox performs a 3×3 scaling of a texture, where only the center cell is fully stretched. This makes it possible to design bordered styles regardless of the stylebox's size.
 *
*/
  "new"(): StyleBoxTexture;
  static "new"(): StyleBoxTexture;



/** Controls how the stylebox's texture will be stretched or tiled horizontally. See [enum AxisStretchMode] for possible values. */
axis_stretch_horizontal: int;

/** Controls how the stylebox's texture will be stretched or tiled vertically. See [enum AxisStretchMode] for possible values. */
axis_stretch_vertical: int;

/** If [code]true[/code], the nine-patch texture's center tile will be drawn. */
draw_center: boolean;

/** Expands the bottom margin of this style box when drawing, causing it to be drawn larger than requested. */
expand_margin_bottom: float;

/** Expands the left margin of this style box when drawing, causing it to be drawn larger than requested. */
expand_margin_left: float;

/** Expands the right margin of this style box when drawing, causing it to be drawn larger than requested. */
expand_margin_right: float;

/** Expands the top margin of this style box when drawing, causing it to be drawn larger than requested. */
expand_margin_top: float;

/**
 * Increases the bottom margin of the 3×3 texture box.
 *
 * A higher value means more of the source texture is considered to be part of the bottom border of the 3×3 box.
 *
 * This is also the value used as fallback for [member StyleBox.content_margin_bottom] if it is negative.
 *
*/
margin_bottom: float;

/**
 * Increases the left margin of the 3×3 texture box.
 *
 * A higher value means more of the source texture is considered to be part of the left border of the 3×3 box.
 *
 * This is also the value used as fallback for [member StyleBox.content_margin_left] if it is negative.
 *
*/
margin_left: float;

/**
 * Increases the right margin of the 3×3 texture box.
 *
 * A higher value means more of the source texture is considered to be part of the right border of the 3×3 box.
 *
 * This is also the value used as fallback for [member StyleBox.content_margin_right] if it is negative.
 *
*/
margin_right: float;

/**
 * Increases the top margin of the 3×3 texture box.
 *
 * A higher value means more of the source texture is considered to be part of the top border of the 3×3 box.
 *
 * This is also the value used as fallback for [member StyleBox.content_margin_top] if it is negative.
 *
*/
margin_top: float;

/** Modulates the color of the texture when this style box is drawn. */
modulate_color: Color;

/**
 * The normal map to use when drawing this style box.
 *
 * **Note:** Godot expects the normal map to use X+, Y-, and Z+ coordinates. See [url=http://wiki.polycount.com/wiki/Normal_Map_Technical_Details#Common_Swizzle_Coordinates]this page[/url] for a comparison of normal map coordinates expected by popular engines.
 *
*/
normal_map: Texture;

/**
 * Species a sub-region of the texture to use.
 *
 * This is equivalent to first wrapping the texture in an [AtlasTexture] with the same region.
 *
*/
region_rect: Rect2;

/** The texture to use when drawing this style box. */
texture: Texture;

/** Returns the size of the given [code]margin[/code]'s expand margin. See [enum Margin] for possible values. */
get_expand_margin_size(margin: int): float;

/** Returns the size of the given [code]margin[/code]. See [enum Margin] for possible values. */
get_margin_size(margin: int): float;

/** Sets the expand margin to [code]size[/code] pixels for all margins. */
set_expand_margin_all(size: float): void;

/** Sets the expand margin for each margin to [code]size_left[/code], [code]size_top[/code], [code]size_right[/code], and [code]size_bottom[/code] pixels. */
set_expand_margin_individual(size_left: float, size_top: float, size_right: float, size_bottom: float): void;

/** Sets the expand margin to [code]size[/code] pixels for the given [code]margin[/code]. See [enum Margin] for possible values. */
set_expand_margin_size(margin: int, size: float): void;

/** Sets the margin to [code]size[/code] pixels for the given [code]margin[/code]. See [enum Margin] for possible values. */
set_margin_size(margin: int, size: float): void;

  connect<T extends SignalsOf<StyleBoxTexture>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Stretch the stylebox's texture. This results in visible distortion unless the texture size matches the stylebox's size perfectly.
 *
*/
static AXIS_STRETCH_MODE_STRETCH: 0;

/**
 * Repeats the stylebox's texture to match the stylebox's size according to the nine-patch system.
 *
*/
static AXIS_STRETCH_MODE_TILE: 1;

/**
 * Repeats the stylebox's texture to match the stylebox's size according to the nine-patch system. Unlike [constant AXIS_STRETCH_MODE_TILE], the texture may be slightly stretched to make the nine-patch texture tile seamlessly.
 *
*/
static AXIS_STRETCH_MODE_TILE_FIT: 2;


  /**
 * Emitted when the stylebox's texture is changed.
 *
*/
texture_changed: Signal<() => void>

}
