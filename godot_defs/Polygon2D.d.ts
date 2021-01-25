
/**
 * A Polygon2D is defined by a set of points. Each point is connected to the next, with the final point being connected to the first, resulting in a closed polygon. Polygon2Ds can be filled with color (solid or gradient) or filled with a given texture.
 *
 * **Note:** By default, Godot can only draw up to 4,096 polygon points at a time. To increase this limit, open the Project Settings and increase [member ProjectSettings.rendering/limits/buffers/canvas_polygon_buffer_size_kb] and [member ProjectSettings.rendering/limits/buffers/canvas_polygon_index_buffer_size_kb].
 *
*/
declare class Polygon2D extends Node2D {

  
/**
 * A Polygon2D is defined by a set of points. Each point is connected to the next, with the final point being connected to the first, resulting in a closed polygon. Polygon2Ds can be filled with color (solid or gradient) or filled with a given texture.
 *
 * **Note:** By default, Godot can only draw up to 4,096 polygon points at a time. To increase this limit, open the Project Settings and increase [member ProjectSettings.rendering/limits/buffers/canvas_polygon_buffer_size_kb] and [member ProjectSettings.rendering/limits/buffers/canvas_polygon_index_buffer_size_kb].
 *
*/
  "new"(): Polygon2D;
  static "new"(): Polygon2D;



/** If [code]true[/code], polygon edges will be anti-aliased. */
antialiased: boolean;


/** The polygon's fill color. If [code]texture[/code] is defined, it will be multiplied by this color. It will also be the default color for vertices not set in [code]vertex_colors[/code]. */
color: Color;


/** Added padding applied to the bounding box when using [code]invert[/code]. Setting this value too small may result in a "Bad Polygon" error. */
invert_border: float;

/** If [code]true[/code], polygon will be inverted, containing the area outside the defined points and extending to the [code]invert_border[/code]. */
invert_enable: boolean;

/** The offset applied to each vertex. */
offset: Vector2;

/**
 * The polygon's list of vertices. The final point will be connected to the first.
 *
 * **Note:** This returns a copy of the [PoolVector2Array] rather than a reference.
 *
*/
polygon: PoolVector2Array;



/** The polygon's fill texture. Use [code]uv[/code] to set texture coordinates. */
texture: Texture;

/** Amount to offset the polygon's [code]texture[/code]. If [code](0, 0)[/code] the texture's origin (its top-left corner) will be placed at the polygon's [code]position[/code]. */
texture_offset: Vector2;

/** The texture's rotation in radians. */
texture_rotation: float;

/** The texture's rotation in degrees. */
texture_rotation_degrees: float;

/** Amount to multiply the [code]uv[/code] coordinates when using a [code]texture[/code]. Larger values make the texture smaller, and vice versa. */
texture_scale: Vector2;

/** Texture coordinates for each vertex of the polygon. There should be one [code]uv[/code] per polygon vertex. If there are fewer, undefined vertices will use [code](0, 0)[/code]. */
uv: PoolVector2Array;

/** Color for each vertex. Colors are interpolated between vertices, resulting in smooth gradients. There should be one per polygon vertex. If there are fewer, undefined vertices will use [code]color[/code]. */
vertex_colors: PoolColorArray;

/** Adds a bone with the specified [code]path[/code] and [code]weights[/code]. */
add_bone(path: NodePathType, weights: PoolRealArray): void;

/** Removes all bones from this [Polygon2D]. */
clear_bones(): void;

/** Removes the specified bone from this [Polygon2D]. */
erase_bone(index: int): void;

/** Returns the number of bones in this [Polygon2D]. */
get_bone_count(): int;

/** Returns the path to the node associated with the specified bone. */
get_bone_path(index: int): NodePathType;

/** Returns the height values of the specified bone. */
get_bone_weights(index: int): PoolRealArray;

/** Sets the path to the node associated with the specified bone. */
set_bone_path(index: int, path: NodePathType): void;

/** Sets the weight values for the specified bone. */
set_bone_weights(index: int, weights: PoolRealArray): void;

  connect<T extends SignalsOf<Polygon2D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
