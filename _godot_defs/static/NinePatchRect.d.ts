
/**
 * Also known as 9-slice panels, NinePatchRect produces clean panels of any size, based on a small texture. To do so, it splits the texture in a 3×3 grid. When you scale the node, it tiles the texture's sides horizontally or vertically, the center on both axes but it doesn't scale or tile the corners.
 *
*/
declare class NinePatchRect extends Control  {

  
/**
 * Also known as 9-slice panels, NinePatchRect produces clean panels of any size, based on a small texture. To do so, it splits the texture in a 3×3 grid. When you scale the node, it tiles the texture's sides horizontally or vertically, the center on both axes but it doesn't scale or tile the corners.
 *
*/
  new(): NinePatchRect; 
  static "new"(): NinePatchRect 


/** The stretch mode to use for horizontal stretching/tiling. See [enum NinePatchRect.AxisStretchMode] for possible values. */
axis_stretch_horizontal: int;

/** The stretch mode to use for vertical stretching/tiling. See [enum NinePatchRect.AxisStretchMode] for possible values. */
axis_stretch_vertical: int;

/** If [code]true[/code], draw the panel's center. Else, only draw the 9-slice's borders. */
draw_center: boolean;


/** The height of the 9-slice's bottom row. A margin of 16 means the 9-slice's bottom corners and side will have a height of 16 pixels. You can set all 4 margin values individually to create panels with non-uniform borders. */
patch_margin_bottom: int;

/** The width of the 9-slice's left column. A margin of 16 means the 9-slice's left corners and side will have a width of 16 pixels. You can set all 4 margin values individually to create panels with non-uniform borders. */
patch_margin_left: int;

/** The width of the 9-slice's right column. A margin of 16 means the 9-slice's right corners and side will have a width of 16 pixels. You can set all 4 margin values individually to create panels with non-uniform borders. */
patch_margin_right: int;

/** The height of the 9-slice's top row. A margin of 16 means the 9-slice's top corners and side will have a height of 16 pixels. You can set all 4 margin values individually to create panels with non-uniform borders. */
patch_margin_top: int;

/** Rectangular region of the texture to sample from. If you're working with an atlas, use this property to define the area the 9-slice should use. All other properties are relative to this one. If the rect is empty, NinePatchRect will use the whole texture. */
region_rect: Rect2;

/** The node's texture resource. */
texture: Texture;

/** Returns the size of the margin identified by the given [enum Margin] constant. */
get_patch_margin(margin: int): int;

/** Sets the size of the margin identified by the given [enum Margin] constant to [code]value[/code] in pixels. */
set_patch_margin(margin: int, value: int): void;

  connect<T extends SignalsOf<NinePatchRect>>(signal: T, method: SignalFunction<NinePatchRect[T]>): number;



/**
 * Stretches the center texture across the NinePatchRect. This may cause the texture to be distorted.
 *
*/
static AXIS_STRETCH_MODE_STRETCH: any;

/**
 * Repeats the center texture across the NinePatchRect. This won't cause any visible distortion. The texture must be seamless for this to work without displaying artifacts between edges.
 *
 * **Note:** Only supported when using the GLES3 renderer. When using the GLES2 renderer, this will behave like [constant AXIS_STRETCH_MODE_STRETCH].
 *
*/
static AXIS_STRETCH_MODE_TILE: any;

/**
 * Repeats the center texture across the NinePatchRect, but will also stretch the texture to make sure each tile is visible in full. This may cause the texture to be distorted, but less than [constant AXIS_STRETCH_MODE_STRETCH]. The texture must be seamless for this to work without displaying artifacts between edges.
 *
 * **Note:** Only supported when using the GLES3 renderer. When using the GLES2 renderer, this will behave like [constant AXIS_STRETCH_MODE_STRETCH].
 *
*/
static AXIS_STRETCH_MODE_TILE_FIT: any;


/**
 * Emitted when the node's texture changes.
 *
*/
$texture_changed: Signal<() => void>

}

