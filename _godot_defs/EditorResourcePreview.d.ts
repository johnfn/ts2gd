
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

/** Queue a resource being edited for preview (using an instance). Once the preview is ready, your receiver.receiver_func will be called either containing the preview texture or an empty texture (if no preview was possible). Callback must have the format: (path,texture,userdata). Userdata can be anything. */
queue_edited_resource_preview(resource: Resource, receiver: Object, receiver_func: string, userdata: any): void;

/** Queue a resource file for preview (using a path). Once the preview is ready, your receiver.receiver_func will be called either containing the preview texture or an empty texture (if no preview was possible). Callback must have the format: (path,texture,userdata). Userdata can be anything. */
queue_resource_preview(path: string, receiver: Object, receiver_func: string, userdata: any): void;

/** Removes a custom preview generator. */
remove_preview_generator(generator: EditorResourcePreviewGenerator): void;

  connect<T extends SignalsOf<EditorResourcePreview>, U extends Node>(signal: T, node: U, method: keyof U): number;





  /**
 * Emitted if a preview was invalidated (changed). `path` corresponds to the path of the preview.
 *
*/
preview_invalidated: Signal<(path: string) => void>

}
