
/**
 * Renders text using `*.fnt` fonts containing texture atlases. Supports distance fields. For using vector font files like TTF directly, see [DynamicFont].
 *
*/
declare class BitmapFont extends Font  {

  
/**
 * Renders text using `*.fnt` fonts containing texture atlases. Supports distance fields. For using vector font files like TTF directly, see [DynamicFont].
 *
*/
  new(): BitmapFont; 
  static "new"(): BitmapFont 


/** Ascent (number of pixels above the baseline). */
ascent: float;

/** If [code]true[/code], distance field hint is enabled. */
distance_field: boolean;

/** The fallback font. */
fallback: BitmapFont;

/** Total font height (ascent plus descent) in pixels. */
height: float;

/** Adds a character to the font, where [code]character[/code] is the Unicode value, [code]texture[/code] is the texture index, [code]rect[/code] is the region in the texture (in pixels!), [code]align[/code] is the (optional) alignment for the character and [code]advance[/code] is the (optional) advance. */
add_char(character: int, texture: int, rect: Rect2, align?: Vector2, advance?: float): void;

/** Adds a kerning pair to the [BitmapFont] as a difference. Kerning pairs are special cases where a typeface advance is determined by the next character. */
add_kerning_pair(char_a: int, char_b: int, kerning: int): void;

/** Adds a texture to the [BitmapFont]. */
add_texture(texture: Texture): void;

/** Clears all the font data and settings. */
clear(): void;

/** Creates a BitmapFont from the [code]*.fnt[/code] file at [code]path[/code]. */
create_from_fnt(path: string): int;

/** Returns a kerning pair as a difference. */
get_kerning_pair(char_a: int, char_b: int): int;

/** Returns the font atlas texture at index [code]idx[/code]. */
get_texture(idx: int): Texture;

/** Returns the number of textures in the BitmapFont atlas. */
get_texture_count(): int;

  connect<T extends SignalsOf<BitmapFont>>(signal: T, method: SignalFunction<BitmapFont[T]>): number;






}

