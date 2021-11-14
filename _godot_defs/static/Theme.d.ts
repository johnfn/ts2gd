
/**
 * A theme for skinning controls. Controls can be skinned individually, but for complex applications, it's more practical to just create a global theme that defines everything. This theme can be applied to any [Control]; the Control and its children will automatically use it.
 *
 * Theme resources can alternatively be loaded by writing them in a `.theme` file, see the documentation for more information.
 *
*/
declare class Theme extends Resource  {

  
/**
 * A theme for skinning controls. Controls can be skinned individually, but for complex applications, it's more practical to just create a global theme that defines everything. This theme can be applied to any [Control]; the Control and its children will automatically use it.
 *
 * Theme resources can alternatively be loaded by writing them in a `.theme` file, see the documentation for more information.
 *
*/
  new(): Theme; 
  static "new"(): Theme 


/**
 * The default font of this [Theme] resource. Used as a fallback value for font items defined in this theme, but having invalid values. If this value is also invalid, the global default value is used.
 *
 * Use [method has_default_font] to check if this value is valid.
 *
*/
default_font: Font;

/** Clears all values on the theme. */
clear(): void;

/** Clears the [Color] at [code]name[/code] if the theme has [code]node_type[/code]. */
clear_color(name: string, node_type: string): void;

/** Clears the constant at [code]name[/code] if the theme has [code]node_type[/code]. */
clear_constant(name: string, node_type: string): void;

/** Clears the [Font] at [code]name[/code] if the theme has [code]node_type[/code]. */
clear_font(name: string, node_type: string): void;

/** Clears the icon at [code]name[/code] if the theme has [code]node_type[/code]. */
clear_icon(name: string, node_type: string): void;

/** Clears [StyleBox] at [code]name[/code] if the theme has [code]node_type[/code]. */
clear_stylebox(name: string, node_type: string): void;

/** Clears the theme item of [code]data_type[/code] at [code]name[/code] if the theme has [code]node_type[/code]. */
clear_theme_item(data_type: int, name: string, node_type: string): void;

/** Sets the theme's values to a copy of the default theme values. */
copy_default_theme(): void;

/** Sets the theme's values to a copy of a given theme. */
copy_theme(other: Theme): void;

/** Returns the [Color] at [code]name[/code] if the theme has [code]node_type[/code]. */
get_color(name: string, node_type: string): Color;

/** Returns all the [Color]s as a [PoolStringArray] filled with each [Color]'s name, for use in [method get_color], if the theme has [code]node_type[/code]. */
get_color_list(node_type: string): PoolStringArray;

/** Returns all the [Color] types as a [PoolStringArray] filled with unique type names, for use in [method get_color] and/or [method get_color_list]. */
get_color_types(): PoolStringArray;

/** Returns the constant at [code]name[/code] if the theme has [code]node_type[/code]. */
get_constant(name: string, node_type: string): int;

/** Returns all the constants as a [PoolStringArray] filled with each constant's name, for use in [method get_constant], if the theme has [code]node_type[/code]. */
get_constant_list(node_type: string): PoolStringArray;

/** Returns all the constant types as a [PoolStringArray] filled with unique type names, for use in [method get_constant] and/or [method get_constant_list]. */
get_constant_types(): PoolStringArray;

/** Returns the [Font] at [code]name[/code] if the theme has [code]node_type[/code]. */
get_font(name: string, node_type: string): Font;

/** Returns all the [Font]s as a [PoolStringArray] filled with each [Font]'s name, for use in [method get_font], if the theme has [code]node_type[/code]. */
get_font_list(node_type: string): PoolStringArray;

/** Returns all the [Font] types as a [PoolStringArray] filled with unique type names, for use in [method get_font] and/or [method get_font_list]. */
get_font_types(): PoolStringArray;

/** Returns the icon [Texture] at [code]name[/code] if the theme has [code]node_type[/code]. */
get_icon(name: string, node_type: string): Texture;

/** Returns all the icons as a [PoolStringArray] filled with each [Texture]'s name, for use in [method get_icon], if the theme has [code]node_type[/code]. */
get_icon_list(node_type: string): PoolStringArray;

/** Returns all the icon types as a [PoolStringArray] filled with unique type names, for use in [method get_icon] and/or [method get_icon_list]. */
get_icon_types(): PoolStringArray;

/**
 * Returns the [StyleBox] at `name` if the theme has `node_type`.
 *
 * Valid `name`s may be found using [method get_stylebox_list]. Valid `node_type`s may be found using [method get_stylebox_types].
 *
*/
get_stylebox(name: string, node_type: string): StyleBox;

/**
 * Returns all the [StyleBox]s as a [PoolStringArray] filled with each [StyleBox]'s name, for use in [method get_stylebox], if the theme has `node_type`.
 *
 * Valid `node_type`s may be found using [method get_stylebox_types].
 *
*/
get_stylebox_list(node_type: string): PoolStringArray;

/** Returns all the [StyleBox] types as a [PoolStringArray] filled with unique type names, for use in [method get_stylebox] and/or [method get_stylebox_list]. */
get_stylebox_types(): PoolStringArray;

/**
 * Returns the theme item of `data_type` at `name` if the theme has `node_type`.
 *
 * Valid `name`s may be found using [method get_theme_item_list] or a data type specific method. Valid `node_type`s may be found using [method get_theme_item_types] or a data type specific method.
 *
*/
get_theme_item(data_type: int, name: string, node_type: string): any;

/**
 * Returns all the theme items of `data_type` as a [PoolStringArray] filled with each theme items's name, for use in [method get_theme_item] or a data type specific method, if the theme has `node_type`.
 *
 * Valid `node_type`s may be found using [method get_theme_item_types] or a data type specific method.
 *
*/
get_theme_item_list(data_type: int, node_type: string): PoolStringArray;

/** Returns all the theme items of [code]data_type[/code] types as a [PoolStringArray] filled with unique type names, for use in [method get_theme_item], [method get_theme_item_list] or data type specific methods. */
get_theme_item_types(data_type: int): PoolStringArray;

/**
 * Returns all the theme types as a [PoolStringArray] filled with unique type names, for use in other `get_*` functions of this theme.
 *
 * **Note:** `node_type` has no effect and will be removed in future version.
 *
*/
get_type_list(node_type: string): PoolStringArray;

/**
 * Returns `true` if [Color] with `name` is in `node_type`.
 *
 * Returns `false` if the theme does not have `node_type`.
 *
*/
has_color(name: string, node_type: string): boolean;

/**
 * Returns `true` if constant with `name` is in `node_type`.
 *
 * Returns `false` if the theme does not have `node_type`.
 *
*/
has_constant(name: string, node_type: string): boolean;

/** Returns [code]true[/code] if this theme has a valid [member default_font] value. */
has_default_font(): boolean;

/**
 * Returns `true` if [Font] with `name` is in `node_type`.
 *
 * Returns `false` if the theme does not have `node_type`.
 *
*/
has_font(name: string, node_type: string): boolean;

/**
 * Returns `true` if icon [Texture] with `name` is in `node_type`.
 *
 * Returns `false` if the theme does not have `node_type`.
 *
*/
has_icon(name: string, node_type: string): boolean;

/**
 * Returns `true` if [StyleBox] with `name` is in `node_type`.
 *
 * Returns `false` if the theme does not have `node_type`.
 *
*/
has_stylebox(name: string, node_type: string): boolean;

/**
 * Returns `true` if a theme item of `data_type` with `name` is in `node_type`.
 *
 * Returns `false` if the theme does not have `node_type`.
 *
*/
has_theme_item(data_type: int, name: string, node_type: string): boolean;

/**
 * Adds missing and overrides existing definitions with values from the `other` [Theme].
 *
 * **Note:** This modifies the current theme. If you want to merge two themes together without modifying either one, create a new empty theme and merge the other two into it one after another.
 *
*/
merge_with(other: Theme): void;

/** Renames the [Color] at [code]old_name[/code] to [code]name[/code] if the theme has [code]node_type[/code]. If [code]name[/code] is already taken, this method fails. */
rename_color(old_name: string, name: string, node_type: string): void;

/** Renames the constant at [code]old_name[/code] to [code]name[/code] if the theme has [code]node_type[/code]. If [code]name[/code] is already taken, this method fails. */
rename_constant(old_name: string, name: string, node_type: string): void;

/** Renames the [Font] at [code]old_name[/code] to [code]name[/code] if the theme has [code]node_type[/code]. If [code]name[/code] is already taken, this method fails. */
rename_font(old_name: string, name: string, node_type: string): void;

/** Renames the icon at [code]old_name[/code] to [code]name[/code] if the theme has [code]node_type[/code]. If [code]name[/code] is already taken, this method fails. */
rename_icon(old_name: string, name: string, node_type: string): void;

/** Renames [StyleBox] at [code]old_name[/code] to [code]name[/code] if the theme has [code]node_type[/code]. If [code]name[/code] is already taken, this method fails. */
rename_stylebox(old_name: string, name: string, node_type: string): void;

/** Renames the theme item of [code]data_type[/code] at [code]old_name[/code] to [code]name[/code] if the theme has [code]node_type[/code]. If [code]name[/code] is already taken, this method fails. */
rename_theme_item(data_type: int, old_name: string, name: string, node_type: string): void;

/**
 * Sets the theme's [Color] to `color` at `name` in `node_type`.
 *
 * Creates `node_type` if the theme does not have it.
 *
*/
set_color(name: string, node_type: string, color: Color): void;

/**
 * Sets the theme's constant to `constant` at `name` in `node_type`.
 *
 * Creates `node_type` if the theme does not have it.
 *
*/
set_constant(name: string, node_type: string, constant: int): void;

/**
 * Sets the theme's [Font] to `font` at `name` in `node_type`.
 *
 * Creates `node_type` if the theme does not have it.
 *
*/
set_font(name: string, node_type: string, font: Font): void;

/**
 * Sets the theme's icon [Texture] to `texture` at `name` in `node_type`.
 *
 * Creates `node_type` if the theme does not have it.
 *
*/
set_icon(name: string, node_type: string, texture: Texture): void;

/**
 * Sets theme's [StyleBox] to `stylebox` at `name` in `node_type`.
 *
 * Creates `node_type` if the theme does not have it.
 *
*/
set_stylebox(name: string, node_type: string, texture: StyleBox): void;

/**
 * Sets the theme item of `data_type` to `value` at `name` in `node_type`.
 *
 * Does nothing if the `value` type does not match `data_type`.
 *
 * Creates `node_type` if the theme does not have it.
 *
*/
set_theme_item(data_type: int, name: string, node_type: string, value: any): void;

  connect<T extends SignalsOf<Theme>>(signal: T, method: SignalFunction<Theme[T]>): number;



/**
 * Theme's [Color] item type.
 *
*/
static DATA_TYPE_COLOR: any;

/**
 * Theme's constant item type.
 *
*/
static DATA_TYPE_CONSTANT: any;

/**
 * Theme's [Font] item type.
 *
*/
static DATA_TYPE_FONT: any;

/**
 * Theme's icon [Texture] item type.
 *
*/
static DATA_TYPE_ICON: any;

/**
 * Theme's [StyleBox] item type.
 *
*/
static DATA_TYPE_STYLEBOX: any;

/**
 * Maximum value for the DataType enum.
 *
*/
static DATA_TYPE_MAX: any;



}

