
/**
 * Singleton for saving Godot-specific resource types to the filesystem.
 *
 * It uses the many [ResourceFormatSaver] classes registered in the engine (either built-in or from a plugin) to save engine-specific resource data to text-based (e.g. `.tres` or `.tscn`) or binary files (e.g. `.res` or `.scn`).
 *
*/
declare class ResourceSaverClass extends Object {

  
/**
 * Singleton for saving Godot-specific resource types to the filesystem.
 *
 * It uses the many [ResourceFormatSaver] classes registered in the engine (either built-in or from a plugin) to save engine-specific resource data to text-based (e.g. `.tres` or `.tscn`) or binary files (e.g. `.res` or `.scn`).
 *
*/
  "new"(): ResourceSaverClass;
  static "new"(): ResourceSaverClass;




/** Returns the list of extensions available for saving a resource of a given type. */
get_recognized_extensions(type: Resource): PoolStringArray;

/**
 * Saves a resource to disk to the given path, using a [ResourceFormatSaver] that recognizes the resource object.
 *
 * The `flags` bitmask can be specified to customize the save behavior.
 *
 * Returns [constant OK] on success.
 *
*/
save(path: string, resource: Resource, flags?: int): int;

  connect<T extends SignalsOf<ResourceSaverClass>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Save the resource with a path relative to the scene which uses it.
 *
*/
static FLAG_RELATIVE_PATHS: 1;

/**
 * Bundles external resources.
 *
*/
static FLAG_BUNDLE_RESOURCES: 2;

/**
 * Changes the [member Resource.resource_path] of the saved resource to match its new location.
 *
*/
static FLAG_CHANGE_PATH: 4;

/**
 * Do not save editor-specific metadata (identified by their `__editor` prefix).
 *
*/
static FLAG_OMIT_EDITOR_PROPERTIES: 8;

/**
 * Save as big endian (see [member File.endian_swap]).
 *
*/
static FLAG_SAVE_BIG_ENDIAN: 16;

/**
 * Compress the resource on save using [constant File.COMPRESSION_ZSTD]. Only available for binary resource types.
 *
*/
static FLAG_COMPRESS: 32;

/**
 * Take over the paths of the saved subresources (see [method Resource.take_over_path]).
 *
*/
static FLAG_REPLACE_SUBRESOURCE_PATHS: 64;


  
}
