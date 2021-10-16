
/**
 * A line through several points in 2D space.
 *
 * **Note:** By default, Godot can only draw up to 4,096 polygon points at a time. To increase this limit, open the Project Settings and increase [member ProjectSettings.rendering/limits/buffers/canvas_polygon_buffer_size_kb] and [member ProjectSettings.rendering/limits/buffers/canvas_polygon_index_buffer_size_kb].
 *
*/
declare class Line2D extends Node2D {

  
/**
 * A line through several points in 2D space.
 *
 * **Note:** By default, Godot can only draw up to 4,096 polygon points at a time. To increase this limit, open the Project Settings and increase [member ProjectSettings.rendering/limits/buffers/canvas_polygon_buffer_size_kb] and [member ProjectSettings.rendering/limits/buffers/canvas_polygon_index_buffer_size_kb].
 *
*/
  "new"(): Line2D;
  static "new"(): Line2D;



/**
 * If `true`, the line's border will be anti-aliased.
 *
 * **Note:** Line2D is not accelerated by batching when being anti-aliased.
 *
*/
antialiased: boolean;

/** Controls the style of the line's first point. Use [enum LineCapMode] constants. */
begin_cap_mode: int;

/** The line's color. Will not be used if a gradient is set. */
default_color: Color;

/** Controls the style of the line's last point. Use [enum LineCapMode] constants. */
end_cap_mode: int;

/** The gradient is drawn through the whole line from start to finish. The default color will not be used if a gradient is set. */
gradient: Gradient;

/** The style for the points between the start and the end. */
joint_mode: int;

/** The points that form the lines. The line is drawn between every point set in this array. Points are interpreted as local vectors. */
points: PoolVector2Array;

/** The smoothness of the rounded joints and caps. This is only used if a cap or joint is set as round. */
round_precision: int;

/** The direction difference in radians between vector points. This value is only used if [code]joint mode[/code] is set to [constant LINE_JOINT_SHARP]. */
sharp_limit: float;

/** The texture used for the line's texture. Uses [code]texture_mode[/code] for drawing style. */
texture: Texture;

/** The style to render the [code]texture[/code] on the line. Use [enum LineTextureMode] constants. */
texture_mode: int;

/** The line's width. */
width: float;

/** The line's width varies with the curve. The original width is simply multiply by the value of the Curve. */
width_curve: Curve;

/**
 * Adds a point at the `position`. Appends the point at the end of the line.
 *
 * If `at_position` is given, the point is inserted before the point number `at_position`, moving that point (and every point after) after the inserted point. If `at_position` is not given, or is an illegal value (`at_position < 0` or `at_position >= [method get_point_count]`), the point will be appended at the end of the point list.
 *
*/
add_point(position: Vector2, at_position?: int): void;

/** Removes all points from the line. */
clear_points(): void;

/** Returns the Line2D's amount of points. */
get_point_count(): int;

/** Returns point [code]i[/code]'s position. */
get_point_position(i: int): Vector2;

/** Removes the point at index [code]i[/code] from the line. */
remove_point(i: int): void;

/** Overwrites the position in point [code]i[/code] with the supplied [code]position[/code]. */
set_point_position(i: int, position: Vector2): void;

  // connect<T extends SignalsOf<Line2D>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<Line2DSignals>>(signal: T, method: SignalFunction<Line2DSignals[T]>): number;



/**
 * The line's joints will be pointy. If `sharp_limit` is greater than the rotation of a joint, it becomes a bevel joint instead.
 *
*/
static LINE_JOINT_SHARP: any;

/**
 * The line's joints will be bevelled/chamfered.
 *
*/
static LINE_JOINT_BEVEL: any;

/**
 * The line's joints will be rounded.
 *
*/
static LINE_JOINT_ROUND: any;

/**
 * Don't draw a line cap.
 *
*/
static LINE_CAP_NONE: any;

/**
 * Draws the line cap as a box.
 *
*/
static LINE_CAP_BOX: any;

/**
 * Draws the line cap as a circle.
 *
*/
static LINE_CAP_ROUND: any;

/**
 * Takes the left pixels of the texture and renders it over the whole line.
 *
*/
static LINE_TEXTURE_NONE: any;

/**
 * Tiles the texture over the line. The texture must be imported with **Repeat** enabled for it to work properly.
 *
*/
static LINE_TEXTURE_TILE: any;

/**
 * Stretches the texture across the line. Import the texture with **Repeat** disabled for best results.
 *
*/
static LINE_TEXTURE_STRETCH: any;

}

declare class Line2DSignals extends Node2DSignals {
  
}
