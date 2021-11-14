
/**
 * The [VisualInstance] is used to connect a resource to a visual representation. All visual 3D nodes inherit from the [VisualInstance]. In general, you should not access the [VisualInstance] properties directly as they are accessed and managed by the nodes that inherit from [VisualInstance]. [VisualInstance] is the node representation of the [VisualServer] instance.
 *
*/
declare class VisualInstance extends CullInstance  {

  
/**
 * The [VisualInstance] is used to connect a resource to a visual representation. All visual 3D nodes inherit from the [VisualInstance]. In general, you should not access the [VisualInstance] properties directly as they are accessed and managed by the nodes that inherit from [VisualInstance]. [VisualInstance] is the node representation of the [VisualServer] instance.
 *
*/
  new(): VisualInstance; 
  static "new"(): VisualInstance 


/**
 * The render layer(s) this [VisualInstance] is drawn on.
 *
 * This object will only be visible for [Camera]s whose cull mask includes the render object this [VisualInstance] is set to.
 *
*/
layers: int;

/** Returns the [AABB] (also known as the bounding box) for this [VisualInstance]. See also [method get_transformed_aabb]. */
get_aabb(): AABB;

/** Returns the RID of the resource associated with this [VisualInstance]. For example, if the Node is a [MeshInstance], this will return the RID of the associated [Mesh]. */
get_base(): RID;

/** Returns the RID of this instance. This RID is the same as the RID returned by [method VisualServer.instance_create]. This RID is needed if you want to call [VisualServer] functions directly on this [VisualInstance]. */
get_instance(): RID;

/** Returns [code]true[/code] when the specified layer is enabled in [member layers] and [code]false[/code] otherwise. */
get_layer_mask_bit(layer: int): boolean;

/**
 * Returns the transformed [AABB] (also known as the bounding box) for this [VisualInstance].
 *
 * Transformed in this case means the [AABB] plus the position, rotation, and scale of the [Spatial]'s [Transform]. See also [method get_aabb].
 *
*/
get_transformed_aabb(): AABB;

/** Sets the resource that is instantiated by this [VisualInstance], which changes how the engine handles the [VisualInstance] under the hood. Equivalent to [method VisualServer.instance_set_base]. */
set_base(base: RID): void;

/** Enables a particular layer in [member layers]. */
set_layer_mask_bit(layer: int, enabled: boolean): void;

  connect<T extends SignalsOf<VisualInstance>>(signal: T, method: SignalFunction<VisualInstance[T]>): number;






}

