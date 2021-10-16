
/**
 * This object is used to generate previews for resources of files.
 *
 * **Note:** This class shouldn't be instantiated directly. Instead, access the singleton using [method EditorInterface.get_resource_previewer].
 *
*/
declare class EditorResourcePreview extends Node {

  
/**
 * This object is used to generate previews for resources of files.
 *
 * **Note:** This class shouldn't be instantiated directly. Instead, access the singleton using [method EditorInterface.get_resource_previewer].
 *
*/
  "new"(): EditorResourcePreview;
  static "new"(): EditorResourcePreview;




/** Create an own, custom preview generator. */
add_preview_generator(generator: EditorResourcePreviewGenerator): void;

/** Check if the resource changed, if so, it will be invalidated and the corresponding signal emitted. */
check_for_invalidation(path: string): void;

/**
 * Queue the `resource` being edited for preview. Once the preview is ready, the `receiver`'s `receiver_func` will be called. The `receiver_func` must take the following four arguments: [String] path, [Texture] preview, [Texture] thumbnail_preview, [Variant] userdata. `userdata` can be anything, and will be returned when `receiver_func` is called.
 *
 * **Note:** If it was not possible to create the preview the `receiver_func` will still be called, but the preview will be null.
 *
*/
queue_edited_resource_preview(resource: Resource, receiver: Object, receiver_func: string, userdata: any): void;

/**
 * Queue a resource file located at `path` for preview. Once the preview is ready, the `receiver`'s `receiver_func` will be called. The `receiver_func` must take the following four arguments: [String] path, [Texture] preview, [Texture] thumbnail_preview, [Variant] userdata. `userdata` can be anything, and will be returned when `receiver_func` is called.
 *
 * **Note:** If it was not possible to create the preview the `receiver_func` will still be called, but the preview will be null.
 *
*/
queue_resource_preview(path: string, receiver: Object, receiver_func: string, userdata: any): void;

/** Removes a custom preview generator. */
remove_preview_generator(generator: EditorResourcePreviewGenerator): void;

  // connect<T extends SignalsOf<EditorResourcePreview>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<EditorResourcePreviewSignals>>(signal: T, method: SignalFunction<EditorResourcePreviewSignals[T]>): number;




}

declare class EditorResourcePreviewSignals extends NodeSignals {
  /**
 * Emitted if a preview was invalidated (changed). `path` corresponds to the path of the preview.
 *
*/
preview_invalidated: Signal<(path: string) => void>

}
