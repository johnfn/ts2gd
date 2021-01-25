
/**
 * A theme for skinning controls. Controls can be skinned individually, but for complex applications, it's more practical to just create a global theme that defines everything. This theme can be applied to any [Control]; the Control and its children will automatically use it.
 *
 * Theme resources can alternatively be loaded by writing them in a `.theme` file, see the documentation for more information.
 *
*/
declare class Theme extends Resource {

  
/**
 * A theme for skinning controls. Controls can be skinned individually, but for complex applications, it's more practical to just create a global theme that defines everything. This theme can be applied to any [Control]; the Control and its children will automatically use it.
 *
 * Theme resources can alternatively be loaded by writing them in a `.theme` file, see the documentation for more information.
 *
*/
  "new"(): Theme;
  static "new"(): Theme;



/** The theme's default font. */
default_font: Font;

/** Clears all values on the theme. */
clear(): void;

/** Clears the [Color] at [code]name[/code] if the theme has [code]type[/code]. */
clear_color(name: string, type: string): void;

/** Clears the constant at [code]name[/code] if the theme has [code]type[/code]. */
clear_constant(name: string, type: string): void;

/** Clears the [Font] at [code]name[/code] if the theme has [code]type[/code]. */
clear_font(name: string, type: string): void;

/** Clears the icon at [code]name[/code] if the theme has [code]type[/code]. */
clear_icon(name: string, type: string): void;

/** Clears [StyleBox] at [code]name[/code] if the theme has [code]type[/code]. */
clear_stylebox(name: string, type: string): void;

/** Sets the theme's values to a copy of the default theme values. */
copy_default_theme(): void;

/** Sets the theme's values to a copy of a given theme. */
copy_theme(other: Theme): void;

/** Returns the [Color] at [code]name[/code] if the theme has [code]type[/code]. */
get_color(name: string, type: string): Color;

/** Returns all the [Color]s as a [PoolStringArray] filled with each [Color]'s name, for use in [method get_color], if the theme has [code]type[/code]. */
get_color_list(type: string): PoolStringArray;

/** Returns the constant at [code]name[/code] if the theme has [code]type[/code]. */
get_constant(name: string, type: string): int;

/** Returns all the constants as a [PoolStringArray] filled with each constant's name, for use in [method get_constant], if the theme has [code]type[/code]. */
get_constant_list(type: string): PoolStringArray;

/** Returns the [Font] at [code]name[/code] if the theme has [code]type[/code]. */
get_font(name: string, type: string): Font;

/** Returns all the [Font]s as a [PoolStringArray] filled with each [Font]'s name, for use in [method get_font], if the theme has [code]type[/code]. */
get_font_list(type: string): PoolStringArray;

/** Returns the icon [Texture] at [code]name[/code] if the theme has [code]type[/code]. */
get_icon(name: string, type: string): Texture;

/** Returns all the icons as a [PoolStringArray] filled with each [Texture]'s name, for use in [method get_icon], if the theme has [code]type[/code]. */
get_icon_list(type: string): PoolStringArray;

/** Returns the icon [StyleBox] at [code]name[/code] if the theme has [code]type[/code]. */
get_stylebox(name: string, type: string): StyleBox;

/** Returns all the [StyleBox]s as a [PoolStringArray] filled with each [StyleBox]'s name, for use in [method get_stylebox], if the theme has [code]type[/code]. */
get_stylebox_list(type: string): PoolStringArray;

/** Returns all the [StyleBox] types as a [PoolStringArray] filled with each [StyleBox]'s type, for use in [method get_stylebox] and/or [method get_stylebox_list], if the theme has [code]type[/code]. */
get_stylebox_types(): PoolStringArray;

/** Returns all the types in [code]type[/code] as a [PoolStringArray] for use in any of the [code]get_*[/code] functions, if the theme has [code]type[/code]. */
get_type_list(type: string): PoolStringArray;

/**
 * Returns `true` if [Color] with `name` is in `type`.
 *
 * Returns `false` if the theme does not have `type`.
 *
*/
has_color(name: string, type: string): boolean;

/**
 * Returns `true` if constant with `name` is in `type`.
 *
 * Returns `false` if the theme does not have `type`.
 *
*/
has_constant(name: string, type: string): boolean;

/**
 * Returns `true` if [Font] with `name` is in `type`.
 *
 * Returns `false` if the theme does not have `type`.
 *
*/
has_font(name: string, type: string): boolean;

/**
 * Returns `true` if icon [Texture] with `name` is in `type`.
 *
 * Returns `false` if the theme does not have `type`.
 *
*/
has_icon(name: string, type: string): boolean;

/**
 * Returns `true` if [StyleBox] with `name` is in `type`.
 *
 * Returns `false` if the theme does not have `type`.
 *
*/
has_stylebox(name: string, type: string): boolean;

/**
 * Sets the theme's [Color] to `color` at `name` in `type`.
 *
 * Does nothing if the theme does not have `type`.
 *
*/
set_color(name: string, type: string, color: Color): void;

/**
 * Sets the theme's constant to `constant` at `name` in `type`.
 *
 * Does nothing if the theme does not have `type`.
 *
*/
set_constant(name: string, type: string, constant: int): void;

/**
 * Sets the theme's [Font] to `font` at `name` in `type`.
 *
 * Does nothing if the theme does not have `type`.
 *
*/
set_font(name: string, type: string, font: Font): void;

/**
 * Sets the theme's icon [Texture] to `texture` at `name` in `type`.
 *
 * Does nothing if the theme does not have `type`.
 *
*/
set_icon(name: string, type: string, texture: Texture): void;

/**
 * Sets theme's [StyleBox] to `stylebox` at `name` in `type`.
 *
 * Does nothing if the theme does not have `type`.
 *
*/
set_stylebox(name: string, type: string, texture: StyleBox): void;

  connect<T extends SignalsOf<Theme>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
