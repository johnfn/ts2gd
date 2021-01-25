
/**
 * Singleton used to load resource files from the filesystem.
 *
 * It uses the many [ResourceFormatLoader] classes registered in the engine (either built-in or from a plugin) to load files into memory and convert them to a format that can be used by the engine.
 *
 * GDScript has a simplified [method @GDScript.load] built-in method which can be used in most situations, leaving the use of [ResourceLoader] for more advanced scenarios.
 *
*/
declare class ResourceLoaderClass extends Object {

  
/**
 * Singleton used to load resource files from the filesystem.
 *
 * It uses the many [ResourceFormatLoader] classes registered in the engine (either built-in or from a plugin) to load files into memory and convert them to a format that can be used by the engine.
 *
 * GDScript has a simplified [method @GDScript.load] built-in method which can be used in most situations, leaving the use of [ResourceLoader] for more advanced scenarios.
 *
*/
  "new"(): ResourceLoaderClass;
  static "new"(): ResourceLoaderClass;




/**
 * Returns whether a recognized resource exists for the given `path`.
 *
 * An optional `type_hint` can be used to further specify the [Resource] type that should be handled by the [ResourceFormatLoader].
 *
*/
exists(path: string, type_hint?: string): boolean;

/** Returns the dependencies for the resource at the given [code]path[/code]. */
get_dependencies(path: string): PoolStringArray;

/** Returns the list of recognized extensions for a resource type. */
get_recognized_extensions_for_type(type: string): PoolStringArray;

/** [i]Deprecated method.[/i] Use [method has_cached] or [method exists] instead. */
has(path: string): boolean;

/**
 * Returns whether a cached resource is available for the given `path`.
 *
 * Once a resource has been loaded by the engine, it is cached in memory for faster access, and future calls to the [method load] or [method load_interactive] methods will use the cached version. The cached resource can be overridden by using [method Resource.take_over_path] on a new resource for that same path.
 *
*/
has_cached(path: string): boolean;

/**
 * Loads a resource at the given `path`, caching the result for further access.
 *
 * The registered [ResourceFormatLoader]s are queried sequentially to find the first one which can handle the file's extension, and then attempt loading. If loading fails, the remaining ResourceFormatLoaders are also attempted.
 *
 * An optional `type_hint` can be used to further specify the [Resource] type that should be handled by the [ResourceFormatLoader].
 *
 * If `no_cache` is `true`, the resource cache will be bypassed and the resource will be loaded anew. Otherwise, the cached resource will be returned if it exists.
 *
 * Returns an empty resource if no ResourceFormatLoader could handle the file.
 *
*/
load(path: string, type_hint?: string, no_cache?: boolean): Resource;

/**
 * Starts loading a resource interactively. The returned [ResourceInteractiveLoader] object allows to load with high granularity, calling its [method ResourceInteractiveLoader.poll] method successively to load chunks.
 *
 * An optional `type_hint` can be used to further specify the [Resource] type that should be handled by the [ResourceFormatLoader].
 *
*/
load_interactive(path: string, type_hint?: string): ResourceInteractiveLoader;

/** Changes the behavior on missing sub-resources. The default behavior is to abort loading. */
set_abort_on_missing_resources(abort: boolean): void;

  connect<T extends SignalsOf<ResourceLoaderClass>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
