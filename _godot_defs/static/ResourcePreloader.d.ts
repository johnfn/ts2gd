
/**
 * This node is used to preload sub-resources inside a scene, so when the scene is loaded, all the resources are ready to use and can be retrieved from the preloader.
 *
 * GDScript has a simplified [method @GDScript.preload] built-in method which can be used in most situations, leaving the use of [ResourcePreloader] for more advanced scenarios.
 *
*/
declare class ResourcePreloader extends Node {

  
/**
 * This node is used to preload sub-resources inside a scene, so when the scene is loaded, all the resources are ready to use and can be retrieved from the preloader.
 *
 * GDScript has a simplified [method @GDScript.preload] built-in method which can be used in most situations, leaving the use of [ResourcePreloader] for more advanced scenarios.
 *
*/
  "new"(): ResourcePreloader;
  static "new"(): ResourcePreloader;




/** Adds a resource to the preloader with the given [code]name[/code]. If a resource with the given [code]name[/code] already exists, the new resource will be renamed to "[code]name[/code] N" where N is an incrementing number starting from 2. */
add_resource(name: string, resource: Resource): void;

/** Returns the resource associated to [code]name[/code]. */
get_resource(name: string): Resource;

/** Returns the list of resources inside the preloader. */
get_resource_list(): PoolStringArray;

/** Returns [code]true[/code] if the preloader contains a resource associated to [code]name[/code]. */
has_resource(name: string): boolean;

/** Removes the resource associated to [code]name[/code] from the preloader. */
remove_resource(name: string): void;

/** Renames a resource inside the preloader from [code]name[/code] to [code]newname[/code]. */
rename_resource(name: string, newname: string): void;

  connect<T extends SignalsOf<ResourcePreloader>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
