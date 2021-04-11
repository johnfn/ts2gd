
/**
 * A library of meshes. Contains a list of [Mesh] resources, each with a name and ID. Each item can also include collision and navigation shapes. This resource is used in [GridMap].
 *
*/
declare class MeshLibrary extends Resource {

  
/**
 * A library of meshes. Contains a list of [Mesh] resources, each with a name and ID. Each item can also include collision and navigation shapes. This resource is used in [GridMap].
 *
*/
  "new"(): MeshLibrary;
  static "new"(): MeshLibrary;




/** Clears the library. */
clear(): void;

/**
 * Creates a new item in the library with the given ID.
 *
 * You can get an unused ID from [method get_last_unused_item_id].
 *
*/
create_item(id: int): void;

/** Returns the first item with the given name. */
find_item_by_name(name: string): int;

/** Returns the list of item IDs in use. */
get_item_list(): PoolIntArray;

/** Returns the item's mesh. */
get_item_mesh(id: int): Mesh;

/** Returns the item's name. */
get_item_name(id: int): string;

/** Returns the item's navigation mesh. */
get_item_navmesh(id: int): NavigationMesh;

/** Returns the transform applied to the item's navigation mesh. */
get_item_navmesh_transform(id: int): Transform;

/** When running in the editor, returns a generated item preview (a 3D rendering in isometric perspective). When used in a running project, returns the manually-defined item preview which can be set using [method set_item_preview]. Returns an empty [Texture] if no preview was manually set in a running project. */
get_item_preview(id: int): Texture;

/**
 * Returns an item's collision shapes.
 *
 * The array consists of each [Shape] followed by its [Transform].
 *
*/
get_item_shapes(id: int): any[];

/** Gets an unused ID for a new item. */
get_last_unused_item_id(): int;

/** Removes the item. */
remove_item(id: int): void;

/** Sets the item's mesh. */
set_item_mesh(id: int, mesh: Mesh): void;

/**
 * Sets the item's name.
 *
 * This name is shown in the editor. It can also be used to look up the item later using [method find_item_by_name].
 *
*/
set_item_name(id: int, name: string): void;

/** Sets the item's navigation mesh. */
set_item_navmesh(id: int, navmesh: NavigationMesh): void;

/** Sets the transform to apply to the item's navigation mesh. */
set_item_navmesh_transform(id: int, navmesh: Transform): void;

/** Sets a texture to use as the item's preview icon in the editor. */
set_item_preview(id: int, texture: Texture): void;

/**
 * Sets an item's collision shapes.
 *
 * The array should consist of [Shape] objects, each followed by a [Transform] that will be applied to it. For shapes that should not have a transform, use [constant Transform.IDENTITY].
 *
*/
set_item_shapes(id: int, shapes: any[]): void;

  connect<T extends SignalsOf<MeshLibrary>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
