
/**
 * The [VisualInstance3D] is used to connect a resource to a visual representation. All visual 3D nodes inherit from the [VisualInstance3D]. In general, you should not access the [VisualInstance3D] properties directly as they are accessed and managed by the nodes that inherit from [VisualInstance3D]. [VisualInstance3D] is the node representation of the [RenderingServer] instance.
 *
*/
declare class VisualInstance3D extends Node3D {

  
/**
 * The [VisualInstance3D] is used to connect a resource to a visual representation. All visual 3D nodes inherit from the [VisualInstance3D]. In general, you should not access the [VisualInstance3D] properties directly as they are accessed and managed by the nodes that inherit from [VisualInstance3D]. [VisualInstance3D] is the node representation of the [RenderingServer] instance.
 *
*/
  "new"(): this;
  static "new"(): this;



/**
 * The render layer(s) this [VisualInstance3D] is drawn on.
 *
 * This object will only be visible for [Camera3D]s whose cull mask includes the render object this [VisualInstance3D] is set to.
 *
*/
layers: int;

/** Returns the [AABB] (also known as the bounding box) for this [VisualInstance3D]. See also [method get_transformed_aabb]. */
get_aabb(): AABB;

/** Returns the RID of the resource associated with this [VisualInstance3D]. For example, if the Node is a [MeshInstance3D], this will return the RID of the associated [Mesh]. */
get_base(): RID;

/** Returns the RID of this instance. This RID is the same as the RID returned by [method RenderingServer.instance_create]. This RID is needed if you want to call [RenderingServer] functions directly on this [VisualInstance3D]. */
get_instance(): RID;

/** Returns [code]true[/code] when the specified layer is enabled in [member layers] and [code]false[/code] otherwise. */
get_layer_mask_bit(layer: int): boolean;

/**
 * Returns the transformed [AABB] (also known as the bounding box) for this [VisualInstance3D].
 *
 * Transformed in this case means the [AABB] plus the position, rotation, and scale of the [Node3D]'s [Transform]. See also [method get_aabb].
 *
*/
get_transformed_aabb(): AABB;

/** Sets the resource that is instantiated by this [VisualInstance3D], which changes how the engine handles the [VisualInstance3D] under the hood. Equivalent to [method RenderingServer.instance_set_base]. */
set_base(base: RID): void;

/** Enables a particular layer in [member layers]. */
set_layer_mask_bit(layer: int, enabled: boolean): void;

  connect<T extends SignalsOf<VisualInstance3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
