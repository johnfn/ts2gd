
/**
 * This object holds information of all resources in the filesystem, their types, etc.
 *
 * **Note:** This class shouldn't be instantiated directly. Instead, access the singleton using [method EditorInterface.get_resource_filesystem].
 *
*/
declare class EditorFileSystem extends Node  {

  
/**
 * This object holds information of all resources in the filesystem, their types, etc.
 *
 * **Note:** This class shouldn't be instantiated directly. Instead, access the singleton using [method EditorInterface.get_resource_filesystem].
 *
*/
  new(): EditorFileSystem; 
  static "new"(): EditorFileSystem 



/** Returns the resource type of the file, given the full path. This returns a string such as [code]"Resource"[/code] or [code]"GDScript"[/code], [i]not[/i] a file extension such as [code]".gd"[/code]. */
get_file_type(path: string): string;

/** Gets the root directory object. */
get_filesystem(): EditorFileSystemDirectory;

/** Returns a view into the filesystem at [code]path[/code]. */
get_filesystem_path(path: string): EditorFileSystemDirectory;

/** Returns the scan progress for 0 to 1 if the FS is being scanned. */
get_scanning_progress(): float;

/** Returns [code]true[/code] of the filesystem is being scanned. */
is_scanning(): boolean;

/** Scan the filesystem for changes. */
scan(): void;

/** Check if the source of any imported resource changed. */
scan_sources(): void;

/** Update a file information. Call this if an external program (not Godot) modified the file. */
update_file(path: string): void;

/** Scans the script files and updates the list of custom class names. */
update_script_classes(): void;

  connect<T extends SignalsOf<EditorFileSystem>>(signal: T, method: SignalFunction<EditorFileSystem[T]>): number;





/**
 * Emitted if the filesystem changed.
 *
*/
$filesystem_changed: Signal<() => void>

/**
 * Emitted if a resource is reimported.
 *
*/
$resources_reimported: Signal<(resources: PoolStringArray) => void>

/**
 * Emitted if at least one resource is reloaded when the filesystem is scanned.
 *
*/
$resources_reload: Signal<(resources: PoolStringArray) => void>

/**
 * Emitted if the source of any imported file changed.
 *
*/
$sources_changed: Signal<(exist: boolean) => void>

}

