
/**
 * Base class of anything 2D. Canvas items are laid out in a tree; children inherit and extend their parent's transform. [CanvasItem] is extended by [Control] for anything GUI-related, and by [Node2D] for anything related to the 2D engine.
 *
 * Any [CanvasItem] can draw. For this, [method update] must be called, then [constant NOTIFICATION_DRAW] will be received on idle time to request redraw. Because of this, canvas items don't need to be redrawn on every frame, improving the performance significantly. Several functions for drawing on the [CanvasItem] are provided (see `draw_*` functions). However, they can only be used inside the [method Object._notification], signal or [method _draw] virtual functions.
 *
 * Canvas items are drawn in tree order. By default, children are on top of their parents so a root [CanvasItem] will be drawn behind everything. This behavior can be changed on a per-item basis.
 *
 * A [CanvasItem] can also be hidden, which will also hide its children. It provides many ways to change parameters such as modulation (for itself and its children) and self modulation (only for itself), as well as its blend mode.
 *
 * Ultimately, a transform notification can be requested, which will notify the node that its global position changed in case the parent tree changed.
 *
 * **Note:** Unless otherwise specified, all methods that have angle parameters must have angles specified as **radians**. To convert degrees to radians, use [method @GDScript.deg2rad].
 *
*/
declare class CanvasItem extends Node  {

  
/**
 * Base class of anything 2D. Canvas items are laid out in a tree; children inherit and extend their parent's transform. [CanvasItem] is extended by [Control] for anything GUI-related, and by [Node2D] for anything related to the 2D engine.
 *
 * Any [CanvasItem] can draw. For this, [method update] must be called, then [constant NOTIFICATION_DRAW] will be received on idle time to request redraw. Because of this, canvas items don't need to be redrawn on every frame, improving the performance significantly. Several functions for drawing on the [CanvasItem] are provided (see `draw_*` functions). However, they can only be used inside the [method Object._notification], signal or [method _draw] virtual functions.
 *
 * Canvas items are drawn in tree order. By default, children are on top of their parents so a root [CanvasItem] will be drawn behind everything. This behavior can be changed on a per-item basis.
 *
 * A [CanvasItem] can also be hidden, which will also hide its children. It provides many ways to change parameters such as modulation (for itself and its children) and self modulation (only for itself), as well as its blend mode.
 *
 * Ultimately, a transform notification can be requested, which will notify the node that its global position changed in case the parent tree changed.
 *
 * **Note:** Unless otherwise specified, all methods that have angle parameters must have angles specified as **radians**. To convert degrees to radians, use [method @GDScript.deg2rad].
 *
*/
  new(): CanvasItem; 
  static "new"(): CanvasItem 


/** The rendering layers in which this [CanvasItem] responds to [Light2D] nodes. */
light_mask: int;

/** The material applied to textures on this [CanvasItem]. */
material: Material;

/** The color applied to textures on this [CanvasItem]. */
modulate: Color;

/** The color applied to textures on this [CanvasItem]. This is not inherited by children [CanvasItem]s. */
self_modulate: Color;

/** If [code]true[/code], the object draws behind its parent. */
show_behind_parent: boolean;

/** If [code]true[/code], the object draws on top of its parent. */
show_on_top: boolean;

/** If [code]true[/code], the parent [CanvasItem]'s [member material] property is used as this one's material. */
use_parent_material: boolean;

/**
 * If `true`, this [CanvasItem] is drawn. The node is only visible if all of its antecedents are visible as well (in other words, [method is_visible_in_tree] must return `true`).
 *
 * **Note:** For controls that inherit [Popup], the correct way to make them visible is to call one of the multiple `popup*()` functions instead.
 *
*/
visible: boolean;

/** Overridable function called by the engine (if defined) to draw the canvas item. */
protected _draw(): void;

/** Draws an arc between the given angles. The larger the value of [code]point_count[/code], the smoother the curve. */
draw_arc(center: Vector2, radius: float, start_angle: float, end_angle: float, point_count: int, color: Color, width?: float, antialiased?: boolean): void;

/** Draws a string character using a custom font. Returns the advance, depending on the character width and kerning with an optional next character. */
draw_char(font: Font, position: Vector2, char: string, next: string, modulate?: Color): float;

/** Draws a colored circle. */
draw_circle(position: Vector2, radius: float, color: Color): void;

/** Draws a colored polygon of any amount of points, convex or concave. */
draw_colored_polygon(points: PoolVector2Array, color: Color, uvs?: PoolVector2Array, texture?: Texture, normal_map?: Texture, antialiased?: boolean): void;

/** Draws a line from a 2D point to another, with a given color and width. It can be optionally antialiased. */
draw_line(from: Vector2, to: Vector2, color: Color, width?: float, antialiased?: boolean): void;

/** Draws a [Mesh] in 2D, using the provided texture. See [MeshInstance2D] for related documentation. */
draw_mesh(mesh: Mesh, texture: Texture, normal_map?: Texture, transform?: Transform2D, modulate?: Color): void;

/**
 * Draws multiple, parallel lines with a uniform `color`.
 *
 * **Note:** `width` and `antialiased` are currently not implemented and have no effect.
 *
*/
draw_multiline(points: PoolVector2Array, color: Color, width?: float, antialiased?: boolean): void;

/**
 * Draws multiple, parallel lines with a uniform `width` and segment-by-segment coloring. Colors assigned to line segments match by index between `points` and `colors`.
 *
 * **Note:** `width` and `antialiased` are currently not implemented and have no effect.
 *
*/
draw_multiline_colors(points: PoolVector2Array, colors: PoolColorArray, width?: float, antialiased?: boolean): void;

/** Draws a [MultiMesh] in 2D with the provided texture. See [MultiMeshInstance2D] for related documentation. */
draw_multimesh(multimesh: MultiMesh, texture: Texture, normal_map?: Texture): void;

/** Draws a polygon of any amount of points, convex or concave. */
draw_polygon(points: PoolVector2Array, colors: PoolColorArray, uvs?: PoolVector2Array, texture?: Texture, normal_map?: Texture, antialiased?: boolean): void;

/** Draws interconnected line segments with a uniform [code]color[/code] and [code]width[/code] and optional antialiasing. */
draw_polyline(points: PoolVector2Array, color: Color, width?: float, antialiased?: boolean): void;

/** Draws interconnected line segments with a uniform [code]width[/code], segment-by-segment coloring, and optional antialiasing. Colors assigned to line segments match by index between [code]points[/code] and [code]colors[/code]. */
draw_polyline_colors(points: PoolVector2Array, colors: PoolColorArray, width?: float, antialiased?: boolean): void;

/** Draws a custom primitive. 1 point for a point, 2 points for a line, 3 points for a triangle and 4 points for a quad. */
draw_primitive(points: PoolVector2Array, colors: PoolColorArray, uvs: PoolVector2Array, texture?: Texture, width?: float, normal_map?: Texture): void;

/**
 * Draws a rectangle. If `filled` is `true`, the rectangle will be filled with the `color` specified. If `filled` is `false`, the rectangle will be drawn as a stroke with the `color` and `width` specified. If `antialiased` is `true`, the lines will be antialiased.
 *
 * **Note:** `width` and `antialiased` are only effective if `filled` is `false`.
 *
*/
draw_rect(rect: Rect2, color: Color, filled?: boolean, width?: float, antialiased?: boolean): void;

/** Sets a custom transform for drawing via components. Anything drawn afterwards will be transformed by this. */
draw_set_transform(position: Vector2, rotation: float, scale: Vector2): void;

/** Sets a custom transform for drawing via matrix. Anything drawn afterwards will be transformed by this. */
draw_set_transform_matrix(xform: Transform2D): void;

/**
 * Draws `text` using the specified `font` at the `position` (bottom-left corner using the baseline of the font). The text will have its color multiplied by `modulate`. If `clip_w` is greater than or equal to 0, the text will be clipped if it exceeds the specified width.
 *
 * **Example using the default project font:**
 *
 * @example 
 * 
 * # If using this method in a script that redraws constantly, move the
 * # `default_font` declaration to a member variable assigned in `_ready()`
 * # so the Control is only created once.
 * var default_font = Control.new().get_font("font")
 * draw_string(default_font, Vector2(64, 64), "Hello world")
 * @summary 
 * 
 *
 * See also [method Font.draw].
 *
*/
draw_string(font: Font, position: Vector2, text: string, modulate?: Color, clip_w?: int): void;

/** Draws a styled rectangle. */
draw_style_box(style_box: StyleBox, rect: Rect2): void;

/** Draws a texture at a given position. */
draw_texture(texture: Texture, position: Vector2, modulate?: Color, normal_map?: Texture): void;

/** Draws a textured rectangle at a given position, optionally modulated by a color. If [code]transpose[/code] is [code]true[/code], the texture will have its X and Y coordinates swapped. */
draw_texture_rect(texture: Texture, rect: Rect2, tile: boolean, modulate?: Color, transpose?: boolean, normal_map?: Texture): void;

/** Draws a textured rectangle region at a given position, optionally modulated by a color. If [code]transpose[/code] is [code]true[/code], the texture will have its X and Y coordinates swapped. */
draw_texture_rect_region(texture: Texture, rect: Rect2, src_rect: Rect2, modulate?: Color, transpose?: boolean, normal_map?: Texture, clip_uv?: boolean): void;

/** Forces the transform to update. Transform changes in physics are not instant for performance reasons. Transforms are accumulated and then set. Use this if you need an up-to-date transform when doing physics operations. */
force_update_transform(): void;

/** Returns the [RID] of the [World2D] canvas where this item is in. */
get_canvas(): RID;

/** Returns the canvas item RID used by [VisualServer] for this item. */
get_canvas_item(): RID;

/** Returns the transform matrix of this item's canvas. */
get_canvas_transform(): Transform2D;

/** Returns the global position of the mouse. */
get_global_mouse_position(): Vector2;

/** Returns the global transform matrix of this item. */
get_global_transform(): Transform2D;

/** Returns the global transform matrix of this item in relation to the canvas. */
get_global_transform_with_canvas(): Transform2D;

/** Returns the mouse position relative to this item's position. */
get_local_mouse_position(): Vector2;

/** Returns the transform matrix of this item. */
get_transform(): Transform2D;

/** Returns the viewport's boundaries as a [Rect2]. */
get_viewport_rect(): Rect2;

/** Returns this item's transform in relation to the viewport. */
get_viewport_transform(): Transform2D;

/** Returns the [World2D] where this item is in. */
get_world_2d(): World2D;

/** Hide the [CanvasItem] if it's currently visible. */
hide(): void;

/** Returns [code]true[/code] if local transform notifications are communicated to children. */
is_local_transform_notification_enabled(): boolean;

/** Returns [code]true[/code] if the node is set as top-level. See [method set_as_toplevel]. */
is_set_as_toplevel(): boolean;

/** Returns [code]true[/code] if global transform notifications are communicated to children. */
is_transform_notification_enabled(): boolean;

/** Returns [code]true[/code] if the node is present in the [SceneTree], its [member visible] property is [code]true[/code] and all its antecedents are also visible. If any antecedent is hidden, this node will not be visible in the scene tree. */
is_visible_in_tree(): boolean;

/** Assigns [code]screen_point[/code] as this node's new local transform. */
make_canvas_position_local(screen_point: Vector2): Vector2;

make_input_local<T extends InputEvent>(event: T): T

/** If [code]enable[/code] is [code]true[/code], the node won't inherit its transform from parent canvas items. */
set_as_toplevel(enable: boolean): void;

/** If [code]enable[/code] is [code]true[/code], children will be updated with local transform data. */
set_notify_local_transform(enable: boolean): void;

/** If [code]enable[/code] is [code]true[/code], children will be updated with global transform data. */
set_notify_transform(enable: boolean): void;

/** Show the [CanvasItem] if it's currently hidden. For controls that inherit [Popup], the correct way to make them visible is to call one of the multiple [code]popup*()[/code] functions instead. */
show(): void;

/** Queue the [CanvasItem] for update. [constant NOTIFICATION_DRAW] will be called on idle time to request redraw. */
update(): void;

  connect<T extends SignalsOf<CanvasItem>>(signal: T, method: SignalFunction<CanvasItem[T]>): number;



/**
 * Mix blending mode. Colors are assumed to be independent of the alpha (opacity) value.
 *
*/
static BLEND_MODE_MIX: any;

/**
 * Additive blending mode.
 *
*/
static BLEND_MODE_ADD: any;

/**
 * Subtractive blending mode.
 *
*/
static BLEND_MODE_SUB: any;

/**
 * Multiplicative blending mode.
 *
*/
static BLEND_MODE_MUL: any;

/**
 * Mix blending mode. Colors are assumed to be premultiplied by the alpha (opacity) value.
 *
*/
static BLEND_MODE_PREMULT_ALPHA: any;

/**
 * Disables blending mode. Colors including alpha are written as-is. Only applicable for render targets with a transparent background. No lighting will be applied.
 *
*/
static BLEND_MODE_DISABLED: any;

/**
 * The [CanvasItem]'s transform has changed. This notification is only received if enabled by [method set_notify_transform] or [method set_notify_local_transform].
 *
*/
static NOTIFICATION_TRANSFORM_CHANGED: any;

/**
 * The [CanvasItem] is requested to draw.
 *
*/
static NOTIFICATION_DRAW: any;

/**
 * The [CanvasItem]'s visibility has changed.
 *
*/
static NOTIFICATION_VISIBILITY_CHANGED: any;

/**
 * The [CanvasItem] has entered the canvas.
 *
*/
static NOTIFICATION_ENTER_CANVAS: any;

/**
 * The [CanvasItem] has exited the canvas.
 *
*/
static NOTIFICATION_EXIT_CANVAS: any;


/**
 * Emitted when the [CanvasItem] must redraw. This can only be connected realtime, as deferred will not allow drawing.
 *
*/
$draw: Signal<() => void>

/**
 * Emitted when becoming hidden.
 *
*/
$hide: Signal<() => void>

/**
 * Emitted when the item's [Rect2] boundaries (position or size) have changed, or when an action is taking place that may have impacted these boundaries (e.g. changing [member Sprite.texture]).
 *
*/
$item_rect_changed: Signal<() => void>

/**
 * Emitted when the visibility (hidden/visible) changes.
 *
*/
$visibility_changed: Signal<() => void>

}

