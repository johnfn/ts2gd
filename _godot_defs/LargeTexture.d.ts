
/**
 * A [Texture] capable of storing many smaller textures with offsets.
 *
 * You can dynamically add pieces ([Texture]s) to this [LargeTexture] using different offsets.
 *
*/
declare class LargeTexture extends Texture {

  
/**
 * A [Texture] capable of storing many smaller textures with offsets.
 *
 * You can dynamically add pieces ([Texture]s) to this [LargeTexture] using different offsets.
 *
*/
  "new"(): LargeTexture;
  static "new"(): LargeTexture;




/** Adds [code]texture[/code] to this [LargeTexture], starting on offset [code]ofs[/code]. */
add_piece(ofs: Vector2, texture: Texture): int;

/** Clears the [LargeTexture]. */
clear(): void;

/** Returns the number of pieces currently in this [LargeTexture]. */
get_piece_count(): int;

/** Returns the offset of the piece with the index [code]idx[/code]. */
get_piece_offset(idx: int): Vector2;

/** Returns the [Texture] of the piece with the index [code]idx[/code]. */
get_piece_texture(idx: int): Texture;

/** Sets the offset of the piece with the index [code]idx[/code] to [code]ofs[/code]. */
set_piece_offset(idx: int, ofs: Vector2): void;

/** Sets the [Texture] of the piece with index [code]idx[/code] to [code]texture[/code]. */
set_piece_texture(idx: int, texture: Texture): void;

/** Sets the size of this [LargeTexture]. */
set_size(size: Vector2): void;

  connect<T extends SignalsOf<LargeTexture>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
