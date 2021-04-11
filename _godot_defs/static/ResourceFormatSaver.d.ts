
/**
 * The engine can save resources when you do it from the editor, or when you use the [ResourceSaver] singleton. This is accomplished thanks to multiple [ResourceFormatSaver]s, each handling its own format and called automatically by the engine.
 *
 * By default, Godot saves resources as `.tres` (text-based), `.res` (binary) or another built-in format, but you can choose to create your own format by extending this class. Be sure to respect the documented return types and values. You should give it a global class name with `class_name` for it to be registered. Like built-in ResourceFormatSavers, it will be called automatically when saving resources of its recognized type(s). You may also implement a [ResourceFormatLoader].
 *
*/
declare class ResourceFormatSaver extends Reference {

  
/**
 * The engine can save resources when you do it from the editor, or when you use the [ResourceSaver] singleton. This is accomplished thanks to multiple [ResourceFormatSaver]s, each handling its own format and called automatically by the engine.
 *
 * By default, Godot saves resources as `.tres` (text-based), `.res` (binary) or another built-in format, but you can choose to create your own format by extending this class. Be sure to respect the documented return types and values. You should give it a global class name with `class_name` for it to be registered. Like built-in ResourceFormatSavers, it will be called automatically when saving resources of its recognized type(s). You may also implement a [ResourceFormatLoader].
 *
*/
  "new"(): ResourceFormatSaver;
  static "new"(): ResourceFormatSaver;




/** Returns the list of extensions available for saving the resource object, provided it is recognized (see [method recognize]). */
get_recognized_extensions(resource: Resource): PoolStringArray;

/** Returns whether the given resource object can be saved by this saver. */
recognize(resource: Resource): boolean;

/**
 * Saves the given resource object to a file at the target `path`. `flags` is a bitmask composed with [enum ResourceSaver.SaverFlags] constants.
 *
 * Returns [constant OK] on success, or an [enum Error] constant in case of failure.
 *
*/
save(path: string, resource: Resource, flags: int): int;

  connect<T extends SignalsOf<ResourceFormatSaver>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
