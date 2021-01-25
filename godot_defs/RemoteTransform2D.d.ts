
/**
 * RemoteTransform2D pushes its own [Transform2D] to another [CanvasItem] derived Node (called the remote node) in the scene.
 *
 * It can be set to update another Node's position, rotation and/or scale. It can use either global or local coordinates.
 *
*/
declare class RemoteTransform2D extends Node2D {

  
/**
 * RemoteTransform2D pushes its own [Transform2D] to another [CanvasItem] derived Node (called the remote node) in the scene.
 *
 * It can be set to update another Node's position, rotation and/or scale. It can use either global or local coordinates.
 *
*/
  "new"(): RemoteTransform2D;
  static "new"(): RemoteTransform2D;



/** The [NodePath] to the remote node, relative to the RemoteTransform2D's position in the scene. */
remote_path: NodePathType;

/** If [code]true[/code], the remote node's position is updated. */
update_position: boolean;

/** If [code]true[/code], the remote node's rotation is updated. */
update_rotation: boolean;

/** If [code]true[/code], the remote node's scale is updated. */
update_scale: boolean;

/** If [code]true[/code], global coordinates are used. If [code]false[/code], local coordinates are used. */
use_global_coordinates: boolean;

/** [RemoteTransform2D] caches the remote node. It may not notice if the remote node disappears; [method force_update_cache] forces it to update the cache again. */
force_update_cache(): void;

  connect<T extends SignalsOf<RemoteTransform2D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
