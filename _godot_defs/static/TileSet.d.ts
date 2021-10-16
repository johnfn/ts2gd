
/**
 * A TileSet is a library of tiles for a [TileMap]. It contains a list of tiles, each consisting of a sprite and optional collision shapes.
 *
 * Tiles are referenced by a unique integer ID.
 *
*/
declare class TileSet extends Resource {

  
/**
 * A TileSet is a library of tiles for a [TileMap]. It contains a list of tiles, each consisting of a sprite and optional collision shapes.
 *
 * Tiles are referenced by a unique integer ID.
 *
*/
  "new"(): TileSet;
  static "new"(): TileSet;




/** No documentation provided. */
protected _forward_atlas_subtile_selection(atlastile_id: int, tilemap: Object, tile_location: Vector2): Vector2;

/** No documentation provided. */
protected _forward_subtile_selection(autotile_id: int, bitmask: int, tilemap: Object, tile_location: Vector2): Vector2;

/**
 * Determines when the auto-tiler should consider two different auto-tile IDs to be bound together.
 *
 * **Note:** `neighbor_id` will be `-1` ([constant TileMap.INVALID_CELL]) when checking a tile against an empty neighbor tile.
 *
*/
protected _is_tile_bound(drawn_id: int, neighbor_id: int): boolean;

/** Clears all bitmask information of the autotile. */
autotile_clear_bitmask_map(id: int): void;

/**
 * Returns the bitmask of the subtile from an autotile given its coordinates.
 *
 * The value is the sum of the values in [enum AutotileBindings] present in the subtile (e.g. a value of 5 means the bitmask has bindings in both the top left and top right).
 *
*/
autotile_get_bitmask(id: int, coord: Vector2): int;

/** Returns the [enum BitmaskMode] of the autotile. */
autotile_get_bitmask_mode(id: int): int;

/**
 * Returns the subtile that's being used as an icon in an atlas/autotile given its coordinates.
 *
 * The subtile defined as the icon will be used as a fallback when the atlas/autotile's bitmask information is incomplete. It will also be used to represent it in the TileSet editor.
 *
*/
autotile_get_icon_coordinate(id: int): Vector2;

/** Returns the light occluder of the subtile from an atlas/autotile given its coordinates. */
autotile_get_light_occluder(id: int, coord: Vector2): OccluderPolygon2D;

/** Returns the navigation polygon of the subtile from an atlas/autotile given its coordinates. */
autotile_get_navigation_polygon(id: int, coord: Vector2): NavigationPolygon;

/** Returns the size of the subtiles in an atlas/autotile. */
autotile_get_size(id: int): Vector2;

/** Returns the spacing between subtiles of the atlas/autotile. */
autotile_get_spacing(id: int): int;

/**
 * Returns the priority of the subtile from an autotile given its coordinates.
 *
 * When more than one subtile has the same bitmask value, one of them will be picked randomly for drawing. Its priority will define how often it will be picked.
 *
*/
autotile_get_subtile_priority(id: int, coord: Vector2): int;

/** Returns the drawing index of the subtile from an atlas/autotile given its coordinates. */
autotile_get_z_index(id: int, coord: Vector2): int;

/**
 * Sets the bitmask of the subtile from an autotile given its coordinates.
 *
 * The value is the sum of the values in [enum AutotileBindings] present in the subtile (e.g. a value of 5 means the bitmask has bindings in both the top left and top right).
 *
*/
autotile_set_bitmask(id: int, bitmask: Vector2, flag: int): void;

/** Sets the [enum BitmaskMode] of the autotile. */
autotile_set_bitmask_mode(id: int, mode: int): void;

/**
 * Sets the subtile that will be used as an icon in an atlas/autotile given its coordinates.
 *
 * The subtile defined as the icon will be used as a fallback when the atlas/autotile's bitmask information is incomplete. It will also be used to represent it in the TileSet editor.
 *
*/
autotile_set_icon_coordinate(id: int, coord: Vector2): void;

/** Sets the light occluder of the subtile from an atlas/autotile given its coordinates. */
autotile_set_light_occluder(id: int, light_occluder: OccluderPolygon2D, coord: Vector2): void;

/** Sets the navigation polygon of the subtile from an atlas/autotile given its coordinates. */
autotile_set_navigation_polygon(id: int, navigation_polygon: NavigationPolygon, coord: Vector2): void;

/** Sets the size of the subtiles in an atlas/autotile. */
autotile_set_size(id: int, size: Vector2): void;

/** Sets the spacing between subtiles of the atlas/autotile. */
autotile_set_spacing(id: int, spacing: int): void;

/**
 * Sets the priority of the subtile from an autotile given its coordinates.
 *
 * When more than one subtile has the same bitmask value, one of them will be picked randomly for drawing. Its priority will define how often it will be picked.
 *
*/
autotile_set_subtile_priority(id: int, coord: Vector2, priority: int): void;

/** Sets the drawing index of the subtile from an atlas/autotile given its coordinates. */
autotile_set_z_index(id: int, coord: Vector2, z_index: int): void;

/** Clears all tiles. */
clear(): void;

/** Creates a new tile with the given ID. */
create_tile(id: int): void;

/** Returns the first tile matching the given name. */
find_tile_by_name(name: string): int;

/** Returns the ID following the last currently used ID, useful when creating a new tile. */
get_last_unused_tile_id(): int;

/** Returns an array of all currently used tile IDs. */
get_tiles_ids(): any[];

/** Removes the given tile ID. */
remove_tile(id: int): void;

/** Adds a shape to the tile. */
tile_add_shape(id: int, shape: Shape2D, shape_transform: Transform2D, one_way?: boolean, autotile_coord?: Vector2): void;

/** Returns the tile's light occluder. */
tile_get_light_occluder(id: int): OccluderPolygon2D;

/** Returns the tile's material. */
tile_get_material(id: int): ShaderMaterial;

/** Returns the tile's modulation color. */
tile_get_modulate(id: int): Color;

/** Returns the tile's name. */
tile_get_name(id: int): string;

/** Returns the navigation polygon of the tile. */
tile_get_navigation_polygon(id: int): NavigationPolygon;

/** Returns the offset of the tile's navigation polygon. */
tile_get_navigation_polygon_offset(id: int): Vector2;

/** Returns the tile's normal map texture. */
tile_get_normal_map(id: int): Texture;

/** Returns the offset of the tile's light occluder. */
tile_get_occluder_offset(id: int): Vector2;

/** Returns the tile sub-region in the texture. */
tile_get_region(id: int): Rect2;

/** Returns a tile's given shape. */
tile_get_shape(id: int, shape_id: int): Shape2D;

/** Returns the number of shapes assigned to a tile. */
tile_get_shape_count(id: int): int;

/** Returns the offset of a tile's shape. */
tile_get_shape_offset(id: int, shape_id: int): Vector2;

/** Returns the one-way collision value of a tile's shape. */
tile_get_shape_one_way(id: int, shape_id: int): boolean;

/** No documentation provided. */
tile_get_shape_one_way_margin(id: int, shape_id: int): float;

/** Returns the [Transform2D] of a tile's shape. */
tile_get_shape_transform(id: int, shape_id: int): Transform2D;

/**
 * Returns an array of dictionaries describing the tile's shapes.
 *
 * **Dictionary structure in the array returned by this method:**
 *
 * @example 
 * 
 * {
 *     "autotile_coord": Vector2,
 *     "one_way": bool,
 *     "one_way_margin": int,
 *     "shape": CollisionShape2D,
 *     "shape_transform": Transform2D,
 * }
 * @summary 
 * 
 *
*/
tile_get_shapes(id: int): {
  autotile_coord: Vector2,
  one_way: bool,
  one_way_margin: int,
  shape: CollisionShape2D,
  shape_transform: Transform2D,
}[];

/** Returns the tile's texture. */
tile_get_texture(id: int): Texture;

/** Returns the texture offset of the tile. */
tile_get_texture_offset(id: int): Vector2;

/** Returns the tile's [enum TileMode]. */
tile_get_tile_mode(id: int): int;

/** Returns the tile's Z index (drawing layer). */
tile_get_z_index(id: int): int;

/** Sets a light occluder for the tile. */
tile_set_light_occluder(id: int, light_occluder: OccluderPolygon2D): void;

/** Sets the tile's material. */
tile_set_material(id: int, material: ShaderMaterial): void;

/** Sets the tile's modulation color. */
tile_set_modulate(id: int, color: Color): void;

/** Sets the tile's name. */
tile_set_name(id: int, name: string): void;

/** Sets the tile's navigation polygon. */
tile_set_navigation_polygon(id: int, navigation_polygon: NavigationPolygon): void;

/** Sets an offset for the tile's navigation polygon. */
tile_set_navigation_polygon_offset(id: int, navigation_polygon_offset: Vector2): void;

/**
 * Sets the tile's normal map texture.
 *
 * **Note:** Godot expects the normal map to use X+, Y-, and Z+ coordinates. See [url=http://wiki.polycount.com/wiki/Normal_Map_Technical_Details#Common_Swizzle_Coordinates]this page[/url] for a comparison of normal map coordinates expected by popular engines.
 *
*/
tile_set_normal_map(id: int, normal_map: Texture): void;

/** Sets an offset for the tile's light occluder. */
tile_set_occluder_offset(id: int, occluder_offset: Vector2): void;

/** Sets the tile's sub-region in the texture. This is common in texture atlases. */
tile_set_region(id: int, region: Rect2): void;

/** Sets a shape for the tile, enabling collision. */
tile_set_shape(id: int, shape_id: int, shape: Shape2D): void;

/** Sets the offset of a tile's shape. */
tile_set_shape_offset(id: int, shape_id: int, shape_offset: Vector2): void;

/** Enables one-way collision on a tile's shape. */
tile_set_shape_one_way(id: int, shape_id: int, one_way: boolean): void;

/** No documentation provided. */
tile_set_shape_one_way_margin(id: int, shape_id: int, one_way: float): void;

/** Sets a [Transform2D] on a tile's shape. */
tile_set_shape_transform(id: int, shape_id: int, shape_transform: Transform2D): void;

/** Sets an array of shapes for the tile, enabling collision. */
tile_set_shapes(id: int, shapes: any[]): void;

/** Sets the tile's texture. */
tile_set_texture(id: int, texture: Texture): void;

/** Sets the tile's texture offset. */
tile_set_texture_offset(id: int, texture_offset: Vector2): void;

/** Sets the tile's [enum TileMode]. */
tile_set_tile_mode(id: int, tilemode: int): void;

/** Sets the tile's drawing index. */
tile_set_z_index(id: int, z_index: int): void;

  // connect<T extends SignalsOf<TileSet>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<TileSetSignals>>(signal: T, method: SignalFunction<TileSetSignals[T]>): number;



/** No documentation provided. */
static BITMASK_2X2: any;

/** No documentation provided. */
static BITMASK_3X3_MINIMAL: any;

/** No documentation provided. */
static BITMASK_3X3: any;

/** No documentation provided. */
static BIND_TOPLEFT: any;

/** No documentation provided. */
static BIND_TOP: any;

/** No documentation provided. */
static BIND_TOPRIGHT: any;

/** No documentation provided. */
static BIND_LEFT: any;

/** No documentation provided. */
static BIND_CENTER: any;

/** No documentation provided. */
static BIND_RIGHT: any;

/** No documentation provided. */
static BIND_BOTTOMLEFT: any;

/** No documentation provided. */
static BIND_BOTTOM: any;

/** No documentation provided. */
static BIND_BOTTOMRIGHT: any;

/** No documentation provided. */
static SINGLE_TILE: any;

/** No documentation provided. */
static AUTO_TILE: any;

/** No documentation provided. */
static ATLAS_TILE: any;

}

declare class TileSetSignals extends ResourceSignals {
  
}
