
/**
 * Resource is the base class for all Godot-specific resource types, serving primarily as data containers. Unlike [Object]s, they are reference-counted and freed when no longer in use. They are also cached once loaded from disk, so that any further attempts to load a resource from a given path will return the same reference (all this in contrast to a [Node], which is not reference-counted and can be instanced from disk as many times as desired). Resources can be saved externally on disk or bundled into another object, such as a [Node] or another resource.
 *
*/
declare class Resource extends Reference {

  
/**
 * Resource is the base class for all Godot-specific resource types, serving primarily as data containers. Unlike [Object]s, they are reference-counted and freed when no longer in use. They are also cached once loaded from disk, so that any further attempts to load a resource from a given path will return the same reference (all this in contrast to a [Node], which is not reference-counted and can be instanced from disk as many times as desired). Resources can be saved externally on disk or bundled into another object, such as a [Node] or another resource.
 *
*/
  "new"(): Resource;
  static "new"(): Resource;



/** If [code]true[/code], the resource will be made unique in each instance of its local scene. It can thus be modified in a scene instance without impacting other instances of that same scene. */
resource_local_to_scene: boolean;

/** The name of the resource. This is an optional identifier. */
resource_name: string;

/** The path to the resource. In case it has its own file, it will return its filepath. If it's tied to the scene, it will return the scene's path, followed by the resource's index. */
resource_path: string;

/** Virtual function which can be overridden to customize the behavior value of [method setup_local_to_scene]. */
protected _setup_local_to_scene(): void;

/**
 * Duplicates the resource, returning a new resource. By default, sub-resources are shared between resource copies for efficiency. This can be changed by passing `true` to the `subresources` argument which will copy the subresources.
 *
 * **Note:** If `subresources` is `true`, this method will only perform a shallow copy. Nested resources within subresources will not be duplicated and will still be shared.
 *
*/
duplicate(subresources?: boolean): Resource;

/** If [member resource_local_to_scene] is enabled and the resource was loaded from a [PackedScene] instantiation, returns the local scene where this resource's unique copy is in use. Otherwise, returns [code]null[/code]. */
get_local_scene(): Node;

/** Returns the RID of the resource (or an empty RID). Many resources (such as [Texture], [Mesh], etc) are high-level abstractions of resources stored in a server, so this function will return the original RID. */
get_rid(): RID;

/**
 * This method is called when a resource with [member resource_local_to_scene] enabled is loaded from a [PackedScene] instantiation. Its behavior can be customized by overriding [method _setup_local_to_scene] from script.
 *
 * For most resources, this method performs no base logic. [ViewportTexture] performs custom logic to properly set the proxy texture and flags in the local viewport.
 *
*/
setup_local_to_scene(): void;

/** Sets the path of the resource, potentially overriding an existing cache entry for this path. This differs from setting [member resource_path], as the latter would error out if another resource was already cached for the given path. */
take_over_path(path: string): void;

  connect<T extends SignalsOf<Resource>, U extends Node>(signal: T, node: U, method: keyof U): number;





  /**
 * Emitted whenever the resource changes.
 *
*/
changed: Signal<() => void>

}
