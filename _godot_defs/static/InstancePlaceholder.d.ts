
/**
 * Turning on the option **Load As Placeholder** for an instanced scene in the editor causes it to be replaced by an InstancePlaceholder when running the game. This makes it possible to delay actually loading the scene until calling [method replace_by_instance]. This is useful to avoid loading large scenes all at once by loading parts of it selectively.
 *
 * The InstancePlaceholder does not have a transform. This causes any child nodes to be positioned relatively to the Viewport from point (0,0), rather than their parent as displayed in the editor. Replacing the placeholder with a scene with a transform will transform children relatively to their parent again.
 *
*/
declare class InstancePlaceholder extends Node {

  
/**
 * Turning on the option **Load As Placeholder** for an instanced scene in the editor causes it to be replaced by an InstancePlaceholder when running the game. This makes it possible to delay actually loading the scene until calling [method replace_by_instance]. This is useful to avoid loading large scenes all at once by loading parts of it selectively.
 *
 * The InstancePlaceholder does not have a transform. This causes any child nodes to be positioned relatively to the Viewport from point (0,0), rather than their parent as displayed in the editor. Replacing the placeholder with a scene with a transform will transform children relatively to their parent again.
 *
*/
  "new"(): InstancePlaceholder;
  static "new"(): InstancePlaceholder;




/** Not thread-safe. Use [method Object.call_deferred] if calling from a thread. */
create_instance(replace?: boolean, custom_scene?: PackedScene<any>): Node;

/** Gets the path to the [PackedScene] resource file that is loaded by default when calling [method replace_by_instance]. Not thread-safe. Use [method Object.call_deferred] if calling from a thread. */
get_instance_path(): string;

/** No documentation provided. */
get_stored_values(with_order?: boolean): Dictionary<any, any>;

/** Replaces this placeholder by the scene handed as an argument, or the original scene if no argument is given. As for all resources, the scene is loaded only if it's not loaded already. By manually loading the scene beforehand, delays caused by this function can be avoided. */
replace_by_instance(custom_scene?: PackedScene<any>): void;

  // connect<T extends SignalsOf<InstancePlaceholder>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<InstancePlaceholderSignals>>(signal: T, method: SignalFunction<InstancePlaceholderSignals[T]>): number;




}

declare class InstancePlaceholderSignals extends NodeSignals {
  
}
