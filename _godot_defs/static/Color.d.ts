
/**
 * A color represented by red, green, blue, and alpha (RGBA) components. The alpha component is often used for transparency. Values are in floating-point and usually range from 0 to 1. Some properties (such as CanvasItem.modulate) may accept values greater than 1 (overbright or HDR colors).
 *
 * You can also create a color from standardized color names by using [method @GDScript.ColorN] or directly using the color constants defined here. The standardized color set is based on the [url=https://en.wikipedia.org/wiki/X11_color_names]X11 color names[/url].
 *
 * If you want to supply values in a range of 0 to 255, you should use [method @GDScript.Color8].
 *
 * **Note:** In a boolean context, a Color will evaluate to `false` if it's equal to `Color(0, 0, 0, 1)` (opaque black). Otherwise, a Color will always evaluate to `true`.
 *
 * [url=https://raw.githubusercontent.com/godotengine/godot-docs/master/img/color_constants.png]Color constants cheatsheet[/url]
 *
*/
declare class Color {

  
/**
 * A color represented by red, green, blue, and alpha (RGBA) components. The alpha component is often used for transparency. Values are in floating-point and usually range from 0 to 1. Some properties (such as CanvasItem.modulate) may accept values greater than 1 (overbright or HDR colors).
 *
 * You can also create a color from standardized color names by using [method @GDScript.ColorN] or directly using the color constants defined here. The standardized color set is based on the [url=https://en.wikipedia.org/wiki/X11_color_names]X11 color names[/url].
 *
 * If you want to supply values in a range of 0 to 255, you should use [method @GDScript.Color8].
 *
 * **Note:** In a boolean context, a Color will evaluate to `false` if it's equal to `Color(0, 0, 0, 1)` (opaque black). Otherwise, a Color will always evaluate to `true`.
 *
 * [url=https://raw.githubusercontent.com/godotengine/godot-docs/master/img/color_constants.png]Color constants cheatsheet[/url]
 *
*/

  constructor(from: string);
  constructor(from: int);
  constructor(r: float, g: float, b: float);
  constructor(r: float, g: float, b: float, a: float);
  static "new"(): Color;



/** The color's alpha (transparency) component, typically on the range of 0 to 1. */
a: float;

/** Wrapper for [member a] that uses the range 0 to 255 instead of 0 to 1. */
a8: int;

/** The color's blue component, typically on the range of 0 to 1. */
b: float;

/** Wrapper for [member b] that uses the range 0 to 255 instead of 0 to 1. */
b8: int;

/** The color's green component, typically on the range of 0 to 1. */
g: float;

/** Wrapper for [member g] that uses the range 0 to 255 instead of 0 to 1. */
g8: int;

/** The HSV hue of this color, on the range 0 to 1. */
h: float;

/** The color's red component, typically on the range of 0 to 1. */
r: float;

/** Wrapper for [member r] that uses the range 0 to 255 instead of 0 to 1. */
r8: int;

/** The HSV saturation of this color, on the range 0 to 1. */
s: float;

/** The HSV value (brightness) of this color, on the range 0 to 1. */
v: float;









/**
 * Returns a new color resulting from blending this color over another. If the color is opaque, the result is also opaque. The second color may have a range of alpha values.
 *
 * @example 
 * 
 * var bg = Color(0.0, 1.0, 0.0, 0.5) # Green with alpha of 50%
 * var fg = Color(1.0, 0.0, 0.0, 0.5) # Red with alpha of 50%
 * var blended_color = bg.blend(fg) # Brown with alpha of 75%
 * @summary 
 * 
 *
*/
blend(over: Color): Color;

/**
 * Returns the most contrasting color.
 *
 * @example 
 * 
 * var c = Color(0.3, 0.4, 0.9)
 * var contrasted_color = c.contrasted() # Equivalent to RGBA(204, 229, 102, 255)
 * @summary 
 * 
 *
*/
contrasted(): Color;

/**
 * Returns a new color resulting from making this color darker by the specified percentage (ratio from 0 to 1).
 *
 * @example 
 * 
 * var green = Color(0.0, 1.0, 0.0)
 * var darkgreen = green.darkened(0.2) # 20% darker than regular green
 * @summary 
 * 
 *
*/
darkened(amount: float): Color;

/**
 * Constructs a color from an HSV profile. `h`, `s`, and `v` are values between 0 and 1.
 *
 * @example 
 * 
 * var c = Color.from_hsv(0.58, 0.5, 0.79, 0.8) # Equivalent to HSV(210, 50, 79, 0.8) or Color8(100, 151, 201, 0.8)
 * @summary 
 * 
 *
*/
from_hsv(h: float, s: float, v: float, a?: float): Color;

/**
 * Returns the color's grayscale representation.
 *
 * The gray value is calculated as `(r + g + b) / 3`.
 *
 * @example 
 * 
 * var c = Color(0.2, 0.45, 0.82)
 * var gray = c.gray() # A value of 0.466667
 * @summary 
 * 
 *
*/
gray(): float;

/**
 * Returns the inverted color `(1 - r, 1 - g, 1 - b, a)`.
 *
 * @example 
 * 
 * var color = Color(0.3, 0.4, 0.9)
 * var inverted_color = color.inverted() # Equivalent to Color(0.7, 0.6, 0.1)
 * @summary 
 * 
 *
*/
inverted(): Color;

/** Returns [code]true[/code] if this color and [code]color[/code] are approximately equal, by running [method @GDScript.is_equal_approx] on each component. */
is_equal_approx(color: Color): boolean;

/**
 * Returns a new color resulting from making this color lighter by the specified percentage (ratio from 0 to 1).
 *
 * @example 
 * 
 * var green = Color(0.0, 1.0, 0.0)
 * var lightgreen = green.lightened(0.2) # 20% lighter than regular green
 * @summary 
 * 
 *
*/
lightened(amount: float): Color;

/**
 * Returns the linear interpolation with another color. The interpolation factor `weight` is between 0 and 1.
 *
 * @example 
 * 
 * var c1 = Color(1.0, 0.0, 0.0)
 * var c2 = Color(0.0, 1.0, 0.0)
 * var li_c = c1.linear_interpolate(c2, 0.5) # Equivalent to Color(0.5, 0.5, 0.0)
 * @summary 
 * 
 *
*/
linear_interpolate(to: Color, weight: float): Color;

/**
 * Returns the color converted to a 32-bit integer in ABGR format (each byte represents a color channel). ABGR is the reversed version of the default format.
 *
 * @example 
 * 
 * var color = Color(1, 0.5, 0.2)
 * print(color.to_abgr32()) # Prints 4281565439
 * @summary 
 * 
 *
*/
to_abgr32(): int;

/**
 * Returns the color converted to a 64-bit integer in ABGR format (each word represents a color channel). ABGR is the reversed version of the default format.
 *
 * @example 
 * 
 * var color = Color(1, 0.5, 0.2)
 * print(color.to_abgr64()) # Prints -225178692812801
 * @summary 
 * 
 *
*/
to_abgr64(): int;

/**
 * Returns the color converted to a 32-bit integer in ARGB format (each byte represents a color channel). ARGB is more compatible with DirectX.
 *
 * @example 
 * 
 * var color = Color(1, 0.5, 0.2)
 * print(color.to_argb32()) # Prints 4294934323
 * @summary 
 * 
 *
*/
to_argb32(): int;

/**
 * Returns the color converted to a 64-bit integer in ARGB format (each word represents a color channel). ARGB is more compatible with DirectX.
 *
 * @example 
 * 
 * var color = Color(1, 0.5, 0.2)
 * print(color.to_argb64()) # Prints -2147470541
 * @summary 
 * 
 *
*/
to_argb64(): int;

/**
 * Returns the color's HTML hexadecimal color string in ARGB format (ex: `ff34f822`).
 *
 * Setting `with_alpha` to `false` excludes alpha from the hexadecimal string.
 *
 * @example 
 * 
 * var c = Color(1, 1, 1, 0.5)
 * var s1 = c.to_html() # Returns "7fffffff"
 * var s2 = c.to_html(false) # Returns "ffffff"
 * @summary 
 * 
 *
*/
to_html(with_alpha?: boolean): string;

/**
 * Returns the color converted to a 32-bit integer in RGBA format (each byte represents a color channel). RGBA is Godot's default format.
 *
 * @example 
 * 
 * var color = Color(1, 0.5, 0.2)
 * print(color.to_rgba32()) # Prints 4286526463
 * @summary 
 * 
 *
*/
to_rgba32(): int;

/**
 * Returns the color converted to a 64-bit integer in RGBA format (each word represents a color channel). RGBA is Godot's default format.
 *
 * @example 
 * 
 * var color = Color(1, 0.5, 0.2)
 * print(color.to_rgba64()) # Prints -140736629309441
 * @summary 
 * 
 *
*/
to_rgba64(): int;

  // connect<T extends SignalsOf<Color>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<ColorSignals>>(signal: T, method: SignalFunction<ColorSignals[T]>): number;



/**
 * Alice blue color.
 *
*/
static aliceblue: Color;

/**
 * Antique white color.
 *
*/
static antiquewhite: Color;

/**
 * Aqua color.
 *
*/
static aqua: Color;

/**
 * Aquamarine color.
 *
*/
static aquamarine: Color;

/**
 * Azure color.
 *
*/
static azure: Color;

/**
 * Beige color.
 *
*/
static beige: Color;

/**
 * Bisque color.
 *
*/
static bisque: Color;

/**
 * Black color.
 *
*/
static black: Color;

/**
 * Blanche almond color.
 *
*/
static blanchedalmond: Color;

/**
 * Blue color.
 *
*/
static blue: Color;

/**
 * Blue violet color.
 *
*/
static blueviolet: Color;

/**
 * Brown color.
 *
*/
static brown: Color;

/**
 * Burly wood color.
 *
*/
static burlywood: Color;

/**
 * Cadet blue color.
 *
*/
static cadetblue: Color;

/**
 * Chartreuse color.
 *
*/
static chartreuse: Color;

/**
 * Chocolate color.
 *
*/
static chocolate: Color;

/**
 * Coral color.
 *
*/
static coral: Color;

/**
 * Cornflower color.
 *
*/
static cornflower: Color;

/**
 * Corn silk color.
 *
*/
static cornsilk: Color;

/**
 * Crimson color.
 *
*/
static crimson: Color;

/**
 * Cyan color.
 *
*/
static cyan: Color;

/**
 * Dark blue color.
 *
*/
static darkblue: Color;

/**
 * Dark cyan color.
 *
*/
static darkcyan: Color;

/**
 * Dark goldenrod color.
 *
*/
static darkgoldenrod: Color;

/**
 * Dark gray color.
 *
*/
static darkgray: Color;

/**
 * Dark green color.
 *
*/
static darkgreen: Color;

/**
 * Dark khaki color.
 *
*/
static darkkhaki: Color;

/**
 * Dark magenta color.
 *
*/
static darkmagenta: Color;

/**
 * Dark olive green color.
 *
*/
static darkolivegreen: Color;

/**
 * Dark orange color.
 *
*/
static darkorange: Color;

/**
 * Dark orchid color.
 *
*/
static darkorchid: Color;

/**
 * Dark red color.
 *
*/
static darkred: Color;

/**
 * Dark salmon color.
 *
*/
static darksalmon: Color;

/**
 * Dark sea green color.
 *
*/
static darkseagreen: Color;

/**
 * Dark slate blue color.
 *
*/
static darkslateblue: Color;

/**
 * Dark slate gray color.
 *
*/
static darkslategray: Color;

/**
 * Dark turquoise color.
 *
*/
static darkturquoise: Color;

/**
 * Dark violet color.
 *
*/
static darkviolet: Color;

/**
 * Deep pink color.
 *
*/
static deeppink: Color;

/**
 * Deep sky blue color.
 *
*/
static deepskyblue: Color;

/**
 * Dim gray color.
 *
*/
static dimgray: Color;

/**
 * Dodger blue color.
 *
*/
static dodgerblue: Color;

/**
 * Firebrick color.
 *
*/
static firebrick: Color;

/**
 * Floral white color.
 *
*/
static floralwhite: Color;

/**
 * Forest green color.
 *
*/
static forestgreen: Color;

/**
 * Fuchsia color.
 *
*/
static fuchsia: Color;

/**
 * Gainsboro color.
 *
*/
static gainsboro: Color;

/**
 * Ghost white color.
 *
*/
static ghostwhite: Color;

/**
 * Gold color.
 *
*/
static gold: Color;

/**
 * Goldenrod color.
 *
*/
static goldenrod: Color;

/**
 * Gray color.
 *
*/
static gray: Color;

/**
 * Green color.
 *
*/
static green: Color;

/**
 * Green yellow color.
 *
*/
static greenyellow: Color;

/**
 * Honeydew color.
 *
*/
static honeydew: Color;

/**
 * Hot pink color.
 *
*/
static hotpink: Color;

/**
 * Indian red color.
 *
*/
static indianred: Color;

/**
 * Indigo color.
 *
*/
static indigo: Color;

/**
 * Ivory color.
 *
*/
static ivory: Color;

/**
 * Khaki color.
 *
*/
static khaki: Color;

/**
 * Lavender color.
 *
*/
static lavender: Color;

/**
 * Lavender blush color.
 *
*/
static lavenderblush: Color;

/**
 * Lawn green color.
 *
*/
static lawngreen: Color;

/**
 * Lemon chiffon color.
 *
*/
static lemonchiffon: Color;

/**
 * Light blue color.
 *
*/
static lightblue: Color;

/**
 * Light coral color.
 *
*/
static lightcoral: Color;

/**
 * Light cyan color.
 *
*/
static lightcyan: Color;

/**
 * Light goldenrod color.
 *
*/
static lightgoldenrod: Color;

/**
 * Light gray color.
 *
*/
static lightgray: Color;

/**
 * Light green color.
 *
*/
static lightgreen: Color;

/**
 * Light pink color.
 *
*/
static lightpink: Color;

/**
 * Light salmon color.
 *
*/
static lightsalmon: Color;

/**
 * Light sea green color.
 *
*/
static lightseagreen: Color;

/**
 * Light sky blue color.
 *
*/
static lightskyblue: Color;

/**
 * Light slate gray color.
 *
*/
static lightslategray: Color;

/**
 * Light steel blue color.
 *
*/
static lightsteelblue: Color;

/**
 * Light yellow color.
 *
*/
static lightyellow: Color;

/**
 * Lime color.
 *
*/
static lime: Color;

/**
 * Lime green color.
 *
*/
static limegreen: Color;

/**
 * Linen color.
 *
*/
static linen: Color;

/**
 * Magenta color.
 *
*/
static magenta: Color;

/**
 * Maroon color.
 *
*/
static maroon: Color;

/**
 * Medium aquamarine color.
 *
*/
static mediumaquamarine: Color;

/**
 * Medium blue color.
 *
*/
static mediumblue: Color;

/**
 * Medium orchid color.
 *
*/
static mediumorchid: Color;

/**
 * Medium purple color.
 *
*/
static mediumpurple: Color;

/**
 * Medium sea green color.
 *
*/
static mediumseagreen: Color;

/**
 * Medium slate blue color.
 *
*/
static mediumslateblue: Color;

/**
 * Medium spring green color.
 *
*/
static mediumspringgreen: Color;

/**
 * Medium turquoise color.
 *
*/
static mediumturquoise: Color;

/**
 * Medium violet red color.
 *
*/
static mediumvioletred: Color;

/**
 * Midnight blue color.
 *
*/
static midnightblue: Color;

/**
 * Mint cream color.
 *
*/
static mintcream: Color;

/**
 * Misty rose color.
 *
*/
static mistyrose: Color;

/**
 * Moccasin color.
 *
*/
static moccasin: Color;

/**
 * Navajo white color.
 *
*/
static navajowhite: Color;

/**
 * Navy blue color.
 *
*/
static navyblue: Color;

/**
 * Old lace color.
 *
*/
static oldlace: Color;

/**
 * Olive color.
 *
*/
static olive: Color;

/**
 * Olive drab color.
 *
*/
static olivedrab: Color;

/**
 * Orange color.
 *
*/
static orange: Color;

/**
 * Orange red color.
 *
*/
static orangered: Color;

/**
 * Orchid color.
 *
*/
static orchid: Color;

/**
 * Pale goldenrod color.
 *
*/
static palegoldenrod: Color;

/**
 * Pale green color.
 *
*/
static palegreen: Color;

/**
 * Pale turquoise color.
 *
*/
static paleturquoise: Color;

/**
 * Pale violet red color.
 *
*/
static palevioletred: Color;

/**
 * Papaya whip color.
 *
*/
static papayawhip: Color;

/**
 * Peach puff color.
 *
*/
static peachpuff: Color;

/**
 * Peru color.
 *
*/
static peru: Color;

/**
 * Pink color.
 *
*/
static pink: Color;

/**
 * Plum color.
 *
*/
static plum: Color;

/**
 * Powder blue color.
 *
*/
static powderblue: Color;

/**
 * Purple color.
 *
*/
static purple: Color;

/**
 * Rebecca purple color.
 *
*/
static rebeccapurple: Color;

/**
 * Red color.
 *
*/
static red: Color;

/**
 * Rosy brown color.
 *
*/
static rosybrown: Color;

/**
 * Royal blue color.
 *
*/
static royalblue: Color;

/**
 * Saddle brown color.
 *
*/
static saddlebrown: Color;

/**
 * Salmon color.
 *
*/
static salmon: Color;

/**
 * Sandy brown color.
 *
*/
static sandybrown: Color;

/**
 * Sea green color.
 *
*/
static seagreen: Color;

/**
 * Seashell color.
 *
*/
static seashell: Color;

/**
 * Sienna color.
 *
*/
static sienna: Color;

/**
 * Silver color.
 *
*/
static silver: Color;

/**
 * Sky blue color.
 *
*/
static skyblue: Color;

/**
 * Slate blue color.
 *
*/
static slateblue: Color;

/**
 * Slate gray color.
 *
*/
static slategray: Color;

/**
 * Snow color.
 *
*/
static snow: Color;

/**
 * Spring green color.
 *
*/
static springgreen: Color;

/**
 * Steel blue color.
 *
*/
static steelblue: Color;

/**
 * Tan color.
 *
*/
static tan: Color;

/**
 * Teal color.
 *
*/
static teal: Color;

/**
 * Thistle color.
 *
*/
static thistle: Color;

/**
 * Tomato color.
 *
*/
static tomato: Color;

/**
 * Transparent color (white with no alpha).
 *
*/
static transparent: Color;

/**
 * Turquoise color.
 *
*/
static turquoise: Color;

/**
 * Violet color.
 *
*/
static violet: Color;

/**
 * Web gray color.
 *
*/
static webgray: Color;

/**
 * Web green color.
 *
*/
static webgreen: Color;

/**
 * Web maroon color.
 *
*/
static webmaroon: Color;

/**
 * Web purple color.
 *
*/
static webpurple: Color;

/**
 * Wheat color.
 *
*/
static wheat: Color;

/**
 * White color.
 *
*/
static white: Color;

/**
 * White smoke color.
 *
*/
static whitesmoke: Color;

/**
 * Yellow color.
 *
*/
static yellow: Color;

/**
 * Yellow green color.
 *
*/
static yellowgreen: Color;

}

declare class ColorSignals {
  
}
