
/**
 * An editor feature profile can be used to disable specific features of the Godot editor. When disabled, the features won't appear in the editor, which makes the editor less cluttered. This is useful in education settings to reduce confusion or when working in a team. For example, artists and level designers could use a feature profile that disables the script editor to avoid accidentally making changes to files they aren't supposed to edit.
 *
 * To manage editor feature profiles visually, use **Editor > Manage Feature Profiles...** at the top of the editor window.
 *
*/
declare class EditorFeatureProfile extends Reference  {

  
/**
 * An editor feature profile can be used to disable specific features of the Godot editor. When disabled, the features won't appear in the editor, which makes the editor less cluttered. This is useful in education settings to reduce confusion or when working in a team. For example, artists and level designers could use a feature profile that disables the script editor to avoid accidentally making changes to files they aren't supposed to edit.
 *
 * To manage editor feature profiles visually, use **Editor > Manage Feature Profiles...** at the top of the editor window.
 *
*/
  new(): EditorFeatureProfile; 
  static "new"(): EditorFeatureProfile 



/** Returns the specified [code]feature[/code]'s human-readable name. */
get_feature_name(feature: int): string;

/** Returns [code]true[/code] if the class specified by [code]class_name[/code] is disabled. When disabled, the class won't appear in the Create New Node dialog. */
is_class_disabled(class_name: string): boolean;

/** Returns [code]true[/code] if editing for the class specified by [code]class_name[/code] is disabled. When disabled, the class will still appear in the Create New Node dialog but the inspector will be read-only when selecting a node that extends the class. */
is_class_editor_disabled(class_name: string): boolean;

/** Returns [code]true[/code] if [code]property[/code] is disabled in the class specified by [code]class_name[/code]. When a property is disabled, it won't appear in the inspector when selecting a node that extends the class specified by [code]class_name[/code]. */
is_class_property_disabled(class_name: string, property: string): boolean;

/** Returns [code]true[/code] if the [code]feature[/code] is disabled. When a feature is disabled, it will disappear from the editor entirely. */
is_feature_disabled(feature: int): boolean;

/** Loads an editor feature profile from a file. The file must follow the JSON format obtained by using the feature profile manager's [b]Export[/b] button or the [method save_to_file] method. */
load_from_file(path: string): int;

/** Saves the editor feature profile to a file in JSON format. It can then be imported using the feature profile manager's [b]Import[/b] button or the [method load_from_file] button. */
save_to_file(path: string): int;

/** If [code]disable[/code] is [code]true[/code], disables the class specified by [code]class_name[/code]. When disabled, the class won't appear in the Create New Node dialog. */
set_disable_class(class_name: string, disable: boolean): void;

/** If [code]disable[/code] is [code]true[/code], disables editing for the class specified by [code]class_name[/code]. When disabled, the class will still appear in the Create New Node dialog but the inspector will be read-only when selecting a node that extends the class. */
set_disable_class_editor(class_name: string, disable: boolean): void;

/** If [code]disable[/code] is [code]true[/code], disables editing for [code]property[/code] in the class specified by [code]class_name[/code]. When a property is disabled, it won't appear in the inspector when selecting a node that extends the class specified by [code]class_name[/code]. */
set_disable_class_property(class_name: string, property: string, disable: boolean): void;

/** If [code]disable[/code] is [code]true[/code], disables the editor feature specified in [code]feature[/code]. When a feature is disabled, it will disappear from the editor entirely. */
set_disable_feature(feature: int, disable: boolean): void;

  connect<T extends SignalsOf<EditorFeatureProfile>>(signal: T, method: SignalFunction<EditorFeatureProfile[T]>): number;



/**
 * The 3D editor. If this feature is disabled, the 3D editor won't display but 3D nodes will still display in the Create New Node dialog.
 *
*/
static FEATURE_3D: any;

/**
 * The Script tab, which contains the script editor and class reference browser. If this feature is disabled, the Script tab won't display.
 *
*/
static FEATURE_SCRIPT: any;

/**
 * The AssetLib tab. If this feature is disabled, the AssetLib tab won't display.
 *
*/
static FEATURE_ASSET_LIB: any;

/**
 * Scene tree editing. If this feature is disabled, the Scene tree dock will still be visible but will be read-only.
 *
*/
static FEATURE_SCENE_TREE: any;

/**
 * The Node dock. If this feature is disabled, signals and groups won't be visible and modifiable from the editor.
 *
*/
static FEATURE_NODE_DOCK: any;

/**
 * The FileSystem dock. If this feature is disabled, the FileSystem dock won't be visible.
 *
*/
static FEATURE_FILESYSTEM_DOCK: any;

/**
 * The Import dock. If this feature is disabled, the Import dock won't be visible.
 *
*/
static FEATURE_IMPORT_DOCK: any;

/**
 * Represents the size of the [enum Feature] enum.
 *
*/
static FEATURE_MAX: any;



}

