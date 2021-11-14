
/**
 * DynamicFont renders vector font files dynamically at runtime instead of using a prerendered texture atlas like [BitmapFont]. This trades the faster loading time of [BitmapFont]s for the ability to change font parameters like size and spacing during runtime. [DynamicFontData] is used for referencing the font file paths. DynamicFont also supports defining one or more fallback fonts, which will be used when displaying a character not supported by the main font.
 *
 * DynamicFont uses the [url=https://www.freetype.org/]FreeType[/url] library for rasterization. Supported formats are TrueType (`.ttf`), OpenType (`.otf`) and Web Open Font Format 1 (`.woff`). Web Open Font Format 2 (`.woff2`) is **not** supported.
 *
 * @example 
 * 
 * var dynamic_font = DynamicFont.new()
 * dynamic_font.font_data = load("res://BarlowCondensed-Bold.ttf")
 * dynamic_font.size = 64
 * $"Label".set("custom_fonts/font", dynamic_font)
 * @summary 
 * 
 *
 * **Note:** DynamicFont doesn't support features such as kerning, right-to-left typesetting, ligatures, text shaping, variable fonts and optional font features yet. If you wish to "bake" an optional font feature into a TTF font file, you can use [url=https://fontforge.org/]FontForge[/url] to do so. In FontForge, use **File > Generate Fonts**, click **Options**, choose the desired features then generate the font.
 *
*/
declare class DynamicFont extends Font  {

  
/**
 * DynamicFont renders vector font files dynamically at runtime instead of using a prerendered texture atlas like [BitmapFont]. This trades the faster loading time of [BitmapFont]s for the ability to change font parameters like size and spacing during runtime. [DynamicFontData] is used for referencing the font file paths. DynamicFont also supports defining one or more fallback fonts, which will be used when displaying a character not supported by the main font.
 *
 * DynamicFont uses the [url=https://www.freetype.org/]FreeType[/url] library for rasterization. Supported formats are TrueType (`.ttf`), OpenType (`.otf`) and Web Open Font Format 1 (`.woff`). Web Open Font Format 2 (`.woff2`) is **not** supported.
 *
 * @example 
 * 
 * var dynamic_font = DynamicFont.new()
 * dynamic_font.font_data = load("res://BarlowCondensed-Bold.ttf")
 * dynamic_font.size = 64
 * $"Label".set("custom_fonts/font", dynamic_font)
 * @summary 
 * 
 *
 * **Note:** DynamicFont doesn't support features such as kerning, right-to-left typesetting, ligatures, text shaping, variable fonts and optional font features yet. If you wish to "bake" an optional font feature into a TTF font file, you can use [url=https://fontforge.org/]FontForge[/url] to do so. In FontForge, use **File > Generate Fonts**, click **Options**, choose the desired features then generate the font.
 *
*/
  new(): DynamicFont; 
  static "new"(): DynamicFont 


/** Extra spacing at the bottom in pixels. */
extra_spacing_bottom: int;

/**
 * Extra spacing for each character in pixels.
 *
 * This can be a negative number to make the distance between characters smaller.
 *
*/
extra_spacing_char: int;

/**
 * Extra spacing for the space character (in addition to [member extra_spacing_char]) in pixels.
 *
 * This can be a negative number to make the distance between words smaller.
 *
*/
extra_spacing_space: int;

/** Extra spacing at the top in pixels. */
extra_spacing_top: int;

/** The font data. */
font_data: DynamicFontData;

/**
 * The font outline's color.
 *
 * **Note:** It's recommended to leave this at the default value so that you can adjust it in individual controls. For example, if the outline is made black here, it won't be possible to change its color using a Label's font outline modulate theme item.
 *
*/
outline_color: Color;

/** The font outline's thickness in pixels (not relative to the font size). */
outline_size: int;

/** The font size in pixels. */
size: int;

/** If [code]true[/code], filtering is used. This makes the font blurry instead of pixelated when scaling it if font oversampling is disabled or ineffective. It's recommended to enable this when using the font in a control whose size changes over time, unless a pixel art aesthetic is desired. */
use_filter: boolean;

/** If [code]true[/code], mipmapping is used. This improves the font's appearance when downscaling it if font oversampling is disabled or ineffective. */
use_mipmaps: boolean;

/** Adds a fallback font. */
add_fallback(data: DynamicFontData): void;

/**
 * Returns a string containing all the characters available in the main and all the fallback fonts.
 *
 * If a given character is included in more than one font, it appears only once in the returned string.
 *
*/
get_available_chars(): string;

/** Returns the fallback font at index [code]idx[/code]. */
get_fallback(idx: int): DynamicFontData;

/** Returns the number of fallback fonts. */
get_fallback_count(): int;

/** Returns the spacing for the given [code]type[/code] (see [enum SpacingType]). */
get_spacing(type: int): int;

/** Removes the fallback font at index [code]idx[/code]. */
remove_fallback(idx: int): void;

/** Sets the fallback font at index [code]idx[/code]. */
set_fallback(idx: int, data: DynamicFontData): void;

/** Sets the spacing for [code]type[/code] (see [enum SpacingType]) to [code]value[/code] in pixels (not relative to the font size). */
set_spacing(type: int, value: int): void;

  connect<T extends SignalsOf<DynamicFont>>(signal: T, method: SignalFunction<DynamicFont[T]>): number;



/**
 * Spacing at the top.
 *
*/
static SPACING_TOP: any;

/**
 * Spacing at the bottom.
 *
*/
static SPACING_BOTTOM: any;

/**
 * Spacing for each character.
 *
*/
static SPACING_CHAR: any;

/**
 * Spacing for the space character.
 *
*/
static SPACING_SPACE: any;



}

