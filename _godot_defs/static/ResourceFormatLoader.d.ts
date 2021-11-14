
/**
 * Godot loads resources in the editor or in exported games using ResourceFormatLoaders. They are queried automatically via the [ResourceLoader] singleton, or when a resource with internal dependencies is loaded. Each file type may load as a different resource type, so multiple ResourceFormatLoaders are registered in the engine.
 *
 * Extending this class allows you to define your own loader. Be sure to respect the documented return types and values. You should give it a global class name with `class_name` for it to be registered. Like built-in ResourceFormatLoaders, it will be called automatically when loading resources of its handled type(s). You may also implement a [ResourceFormatSaver].
 *
 * **Note:** You can also extend [EditorImportPlugin] if the resource type you need exists but Godot is unable to load its format. Choosing one way over another depends on if the format is suitable or not for the final exported game. For example, it's better to import `.png` textures as `.stex` ([StreamTexture]) first, so they can be loaded with better efficiency on the graphics card.
 *
*/
declare class ResourceFormatLoader extends Reference  {

  
/**
 * Godot loads resources in the editor or in exported games using ResourceFormatLoaders. They are queried automatically via the [ResourceLoader] singleton, or when a resource with internal dependencies is loaded. Each file type may load as a different resource type, so multiple ResourceFormatLoaders are registered in the engine.
 *
 * Extending this class allows you to define your own loader. Be sure to respect the documented return types and values. You should give it a global class name with `class_name` for it to be registered. Like built-in ResourceFormatLoaders, it will be called automatically when loading resources of its handled type(s). You may also implement a [ResourceFormatSaver].
 *
 * **Note:** You can also extend [EditorImportPlugin] if the resource type you need exists but Godot is unable to load its format. Choosing one way over another depends on if the format is suitable or not for the final exported game. For example, it's better to import `.png` textures as `.stex` ([StreamTexture]) first, so they can be loaded with better efficiency on the graphics card.
 *
*/
  new(): ResourceFormatLoader; 
  static "new"(): ResourceFormatLoader 



/**
 * If implemented, gets the dependencies of a given resource. If `add_types` is `true`, paths should be appended `::TypeName`, where `TypeName` is the class name of the dependency.
 *
 * **Note:** Custom resource types defined by scripts aren't known by the [ClassDB], so you might just return `"Resource"` for them.
 *
*/
get_dependencies(path: string, add_types: string): void;

/** Gets the list of extensions for files this loader is able to read. */
get_recognized_extensions(): PoolStringArray;

/**
 * Gets the class name of the resource associated with the given path. If the loader cannot handle it, it should return `""`.
 *
 * **Note:** Custom resource types defined by scripts aren't known by the [ClassDB], so you might just return `"Resource"` for them.
 *
*/
get_resource_type(path: string): string;

/**
 * Tells which resource class this loader can load.
 *
 * **Note:** Custom resource types defined by scripts aren't known by the [ClassDB], so you might just handle `"Resource"` for them.
 *
*/
handles_type(typename: string): boolean;

/** Loads a resource when the engine finds this loader to be compatible. If the loaded resource is the result of an import, [code]original_path[/code] will target the source file. Returns a [Resource] object on success, or an [enum Error] constant in case of failure. */
load(path: string, original_path: string): any;

/**
 * If implemented, renames dependencies within the given resource and saves it. `renames` is a dictionary `{ String => String }` mapping old dependency paths to new paths.
 *
 * Returns [constant OK] on success, or an [enum Error] constant in case of failure.
 *
*/
rename_dependencies(path: string, renames: string): int;

  connect<T extends SignalsOf<ResourceFormatLoader>>(signal: T, method: SignalFunction<ResourceFormatLoader[T]>): number;






}

