
/**
 * Object that holds the project-independent editor settings. These settings are generally visible in the **Editor > Editor Settings** menu.
 *
 * Property names use slash delimiters to distinguish sections. Setting values can be of any [Variant] type. It's recommended to use `snake_case` for editor settings to be consistent with the Godot editor itself.
 *
 * Accessing the settings can be done using the following methods, such as:
 *
 * @example 
 * 
 * # `settings.set("some/property", value)` also works as this class overrides `_set()` internally.
 * settings.set_setting("some/property",value)
 * # `settings.get("some/property", value)` also works as this class overrides `_get()` internally.
 * settings.get_setting("some/property")
 * var list_of_settings = settings.get_property_list()
 * @summary 
 * 
 *
 * **Note:** This class shouldn't be instantiated directly. Instead, access the singleton using [method EditorInterface.get_editor_settings].
 *
*/
declare class EditorSettings extends Resource {

  
/**
 * Object that holds the project-independent editor settings. These settings are generally visible in the **Editor > Editor Settings** menu.
 *
 * Property names use slash delimiters to distinguish sections. Setting values can be of any [Variant] type. It's recommended to use `snake_case` for editor settings to be consistent with the Godot editor itself.
 *
 * Accessing the settings can be done using the following methods, such as:
 *
 * @example 
 * 
 * # `settings.set("some/property", value)` also works as this class overrides `_set()` internally.
 * settings.set_setting("some/property",value)
 * # `settings.get("some/property", value)` also works as this class overrides `_get()` internally.
 * settings.get_setting("some/property")
 * var list_of_settings = settings.get_property_list()
 * @summary 
 * 
 *
 * **Note:** This class shouldn't be instantiated directly. Instead, access the singleton using [method EditorInterface.get_editor_settings].
 *
*/
  "new"(): EditorSettings;
  static "new"(): EditorSettings;




/**
 * Adds a custom property info to a property. The dictionary must contain:
 *
 * - `name`: [String] (the name of the property)
 *
 * - `type`: [int] (see [enum Variant.Type])
 *
 * - optionally `hint`: [int] (see [enum PropertyHint]) and `hint_string`: [String]
 *
 * **Example:**
 *
 * @example 
 * 
 * editor_settings.set("category/property_name", 0)
 * var property_info = {
 *     "name": "category/property_name",
 *     "type": TYPE_INT,
 *     "hint": PROPERTY_HINT_ENUM,
 *     "hint_string": "one,two,three"
 * }
 * editor_settings.add_property_info(property_info)
 * @summary 
 * 
 *
*/
add_property_info(info: Dictionary<any, any>): void;

/** Erases the setting whose name is specified by [code]property[/code]. */
erase(property: string): void;

/** Returns the list of favorite files and directories for this project. */
get_favorites(): PoolStringArray;

/** Returns project-specific metadata for the [code]section[/code] and [code]key[/code] specified. If the metadata doesn't exist, [code]default[/code] will be returned instead. See also [method set_project_metadata]. */
get_project_metadata(section: string, key: string, _default?: any): any;

/** Returns the project-specific settings path. Projects all have a unique subdirectory inside the settings path where project-specific settings are saved. */
get_project_settings_dir(): string;

/** Returns the list of recently visited folders in the file dialog for this project. */
get_recent_dirs(): PoolStringArray;

/** Returns the value of the setting specified by [code]name[/code]. This is equivalent to using [method Object.get] on the EditorSettings instance. */
get_setting(name: string): any;

/**
 * Gets the global settings path for the engine. Inside this path, you can find some standard paths such as:
 *
 * `settings/tmp` - Used for temporary storage of files
 *
 * `settings/templates` - Where export templates are located
 *
*/
get_settings_dir(): string;

/** Returns [code]true[/code] if the setting specified by [code]name[/code] exists, [code]false[/code] otherwise. */
has_setting(name: string): boolean;

/** Returns [code]true[/code] if the setting specified by [code]name[/code] can have its value reverted to the default value, [code]false[/code] otherwise. When this method returns [code]true[/code], a Revert button will display next to the setting in the Editor Settings. */
property_can_revert(name: string): boolean;

/** Returns the default value of the setting specified by [code]name[/code]. This is the value that would be applied when clicking the Revert button in the Editor Settings. */
property_get_revert(name: string): any;

/** Sets the list of favorite files and directories for this project. */
set_favorites(dirs: PoolStringArray): void;

/** Sets the initial value of the setting specified by [code]name[/code] to [code]value[/code]. This is used to provide a value for the Revert button in the Editor Settings. If [code]update_current[/code] is true, the current value of the setting will be set to [code]value[/code] as well. */
set_initial_value(name: string, value: any, update_current: boolean): void;

/** Sets project-specific metadata with the [code]section[/code], [code]key[/code] and [code]data[/code] specified. This metadata is stored outside the project folder and therefore won't be checked into version control. See also [method get_project_metadata]. */
set_project_metadata(section: string, key: string, data: any): void;

/** Sets the list of recently visited folders in the file dialog for this project. */
set_recent_dirs(dirs: PoolStringArray): void;

/** Sets the [code]value[/code] of the setting specified by [code]name[/code]. This is equivalent to using [method Object.set] on the EditorSettings instance. */
set_setting(name: string, value: any): void;

  // connect<T extends SignalsOf<EditorSettings>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<EditorSettingsSignals>>(signal: T, method: SignalFunction<EditorSettingsSignals[T]>): number;



/**
 * Emitted after any editor setting has changed. It's used by various editor plugins to update their visuals on theme changes or logic on configuration changes.
 *
*/
static NOTIFICATION_EDITOR_SETTINGS_CHANGED: any;

}

declare class EditorSettingsSignals extends ResourceSignals {
  /**
 * Emitted after any editor setting has changed.
 *
*/
settings_changed: Signal<() => void>

}
