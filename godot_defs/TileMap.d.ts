
/**
 * Node for 2D tile-based maps. Tilemaps use a [TileSet] which contain a list of tiles (textures plus optional collision, navigation, and/or occluder shapes) which are used to create grid-based maps.
 *
*/
declare class TileMap extends Node2D {

  
/**
 * Node for 2D tile-based maps. Tilemaps use a [TileSet] which contain a list of tiles (textures plus optional collision, navigation, and/or occluder shapes) which are used to create grid-based maps.
 *
*/
  "new"(): TileMap;
  static "new"(): TileMap;



/** If [code]true[/code], the cell's UVs will be clipped. */
cell_clip_uv: boolean;

/** The custom [Transform2D] to be applied to the TileMap's cells. */
cell_custom_transform: Transform2D;

/** Amount to offset alternating tiles. See [enum HalfOffset] for possible values. */
cell_half_offset: int;

/** The TileMap's quadrant size. Optimizes drawing by batching, using chunks of this size. */
cell_quadrant_size: int;

/** The TileMap's cell size. */
cell_size: Vector2;

/** Position for tile origin. See [enum TileOrigin] for possible values. */
cell_tile_origin: int;

/** If [code]true[/code], the TileMap's children will be drawn in order of their Y coordinate. */
cell_y_sort: boolean;

/**
 * If `true`, the textures will be centered in the middle of each tile. This is useful for certain isometric or top-down modes when textures are made larger or smaller than the tiles (e.g. to avoid flickering on tile edges). The offset is still applied, but from the center of the tile. If used, [member compatibility_mode] is ignored.
 *
 * If `false`, the texture position start in the top-left corner unless [member compatibility_mode] is enabled.
 *
*/
centered_textures: boolean;

/** Bounce value for static body collisions (see [code]collision_use_kinematic[/code]). */
collision_bounce: float;

/** Friction value for static body collisions (see [code]collision_use_kinematic[/code]). */
collision_friction: float;

/** The collision layer(s) for all colliders in the TileMap. See [url=https://docs.godotengine.org/en/latest/tutorials/physics/physics_introduction.html#collision-layers-and-masks]Collision layers and masks[/url] in the documentation for more information. */
collision_layer: int;

/** The collision mask(s) for all colliders in the TileMap. See [url=https://docs.godotengine.org/en/latest/tutorials/physics/physics_introduction.html#collision-layers-and-masks]Collision layers and masks[/url] in the documentation for more information. */
collision_mask: int;

/** If [code]true[/code], TileMap collisions will be handled as a kinematic body. If [code]false[/code], collisions will be handled as static body. */
collision_use_kinematic: boolean;

/** If [code]true[/code], this tilemap's collision shape will be added to the collision shape of the parent. The parent has to be a [CollisionObject2D]. */
collision_use_parent: boolean;

/**
 * If `true`, the compatibility with the tilemaps made in Godot 3.1 or earlier is maintained (textures move when the tile origin changes and rotate if the texture size is not homogeneous). This mode presents problems when doing `flip_h`, `flip_v` and `transpose` tile operations on non-homogeneous isometric tiles (e.g. 2:1), in which the texture could not coincide with the collision, thus it is not recommended for isometric or non-square tiles.
 *
 * If `false`, the textures do not move when doing `flip_h`, `flip_v` operations if no offset is used, nor when changing the tile origin.
 *
 * The compatibility mode doesn't work with the [member centered_textures] option, because displacing textures with the [member cell_tile_origin] option or in irregular tiles is not relevant when centering those textures.
 *
*/
compatibility_mode: boolean;

/** The TileMap orientation mode. See [enum Mode] for possible values. */
mode: int;

/** The light mask assigned to all light occluders in the TileMap. The TileSet's light occluders will cast shadows only from Light2D(s) that have the same light mask(s). */
occluder_light_mask: int;

/** The assigned [TileSet]. */
tile_set: TileSet;

/** Clears all cells. */
clear(): void;

/** Clears cells that do not exist in the tileset. */
fix_invalid_tiles(): void;

/** Returns the tile index of the given cell. If no tile exists in the cell, returns [constant INVALID_CELL]. */
get_cell(x: int, y: int): int;

/** Returns the coordinate (subtile column and row) of the autotile variation in the tileset. Returns a zero vector if the cell doesn't have autotiling. */
get_cell_autotile_coord(x: int, y: int): Vector2;

/** Returns the tile index of the cell given by a Vector2. If no tile exists in the cell, returns [constant INVALID_CELL]. */
get_cellv(position: Vector2): int;

/** Returns [code]true[/code] if the given collision layer bit is set. */
get_collision_layer_bit(bit: int): boolean;

/** Returns [code]true[/code] if the given collision mask bit is set. */
get_collision_mask_bit(bit: int): boolean;

/** Returns a [Vector2] array with the positions of all cells containing a tile from the tileset (i.e. a tile index different from [code]-1[/code]). */
get_used_cells(): any[];

/** Returns an array of all cells with the given tile index specified in [code]id[/code]. */
get_used_cells_by_id(id: int): any[];

/** Returns a rectangle enclosing the used (non-empty) tiles of the map. */
get_used_rect(): Rect2;

/** Returns [code]true[/code] if the given cell is transposed, i.e. the X and Y axes are swapped. */
is_cell_transposed(x: int, y: int): boolean;

/** Returns [code]true[/code] if the given cell is flipped in the X axis. */
is_cell_x_flipped(x: int, y: int): boolean;

/** Returns [code]true[/code] if the given cell is flipped in the Y axis. */
is_cell_y_flipped(x: int, y: int): boolean;

/**
 * Returns the global position corresponding to the given tilemap (grid-based) coordinates.
 *
 * Optionally, the tilemap's half offset can be ignored.
 *
*/
map_to_world(map_position: Vector2, ignore_half_ofs?: boolean): Vector2;

/**
 * Sets the tile index for the cell given by a Vector2.
 *
 * An index of `-1` clears the cell.
 *
 * Optionally, the tile can also be flipped, transposed, or given autotile coordinates. The autotile coordinate refers to the column and row of the subtile.
 *
 * **Note:** Data such as navigation polygons and collision shapes are not immediately updated for performance reasons.
 *
 * If you need these to be immediately updated, you can call [method update_dirty_quadrants].
 *
 * Overriding this method also overrides it internally, allowing custom logic to be implemented when tiles are placed/removed:
 *
 * @example 
 * 
 * func set_cell(x, y, tile, flip_x=false, flip_y=false, transpose=false, autotile_coord=Vector2())
 *     # Write your custom logic here.
 *     # To call the default method:
 *     .set_cell(x, y, tile, flip_x, flip_y, transpose, autotile_coord)
 * @summary 
 * 
 *
*/
set_cell(x: int, y: int, tile: int, flip_x?: boolean, flip_y?: boolean, transpose?: boolean, autotile_coord?: Vector2): void;

/**
 * Sets the tile index for the given cell.
 *
 * An index of `-1` clears the cell.
 *
 * Optionally, the tile can also be flipped or transposed.
 *
 * **Note:** Data such as navigation polygons and collision shapes are not immediately updated for performance reasons.
 *
 * If you need these to be immediately updated, you can call [method update_dirty_quadrants].
 *
*/
set_cellv(position: Vector2, tile: int, flip_x?: boolean, flip_y?: boolean, transpose?: boolean): void;

/** Sets the given collision layer bit. */
set_collision_layer_bit(bit: int, value: boolean): void;

/** Sets the given collision mask bit. */
set_collision_mask_bit(bit: int, value: boolean): void;

/** Applies autotiling rules to the cell (and its adjacent cells) referenced by its grid-based X and Y coordinates. */
update_bitmask_area(position: Vector2): void;

/**
 * Applies autotiling rules to the cells in the given region (specified by grid-based X and Y coordinates).
 *
 * Calling with invalid (or missing) parameters applies autotiling rules for the entire tilemap.
 *
*/
update_bitmask_region(start?: Vector2, end?: Vector2): void;

/** Updates the tile map's quadrants, allowing things such as navigation and collision shapes to be immediately used if modified. */
update_dirty_quadrants(): void;

/** Returns the tilemap (grid-based) coordinates corresponding to the given local position. */
world_to_map(world_position: Vector2): Vector2;

  connect<T extends SignalsOf<TileMap>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Returned when a cell doesn't exist.
 *
*/
 static INVALID_CELL: null;

/**
 * Orthogonal orientation mode.
 *
*/
static MODE_SQUARE: 0;

/**
 * Isometric orientation mode.
 *
*/
static MODE_ISOMETRIC: 1;

/**
 * Custom orientation mode.
 *
*/
static MODE_CUSTOM: 2;

/**
 * Half offset on the X coordinate.
 *
*/
static HALF_OFFSET_X: 0;

/**
 * Half offset on the Y coordinate.
 *
*/
static HALF_OFFSET_Y: 1;

/**
 * Half offset disabled.
 *
*/
static HALF_OFFSET_DISABLED: 2;

/**
 * Half offset on the X coordinate (negative).
 *
*/
static HALF_OFFSET_NEGATIVE_X: 3;

/**
 * Half offset on the Y coordinate (negative).
 *
*/
static HALF_OFFSET_NEGATIVE_Y: 4;

/**
 * Tile origin at its top-left corner.
 *
*/
static TILE_ORIGIN_TOP_LEFT: 0;

/**
 * Tile origin at its center.
 *
*/
static TILE_ORIGIN_CENTER: 1;

/**
 * Tile origin at its bottom-left corner.
 *
*/
static TILE_ORIGIN_BOTTOM_LEFT: 2;


  /**
 * Emitted when a tilemap setting has changed.
 *
*/
settings_changed: Signal<() => void>

}
