
/**
 * A more generalized, low-level variation of the directory concept.
 *
*/
declare class EditorFileSystemDirectory extends Object {

  
/**
 * A more generalized, low-level variation of the directory concept.
 *
*/
  "new"(): EditorFileSystemDirectory;
  static "new"(): EditorFileSystemDirectory;




/** Returns the index of the directory with name [code]name[/code] or [code]-1[/code] if not found. */
find_dir_index(name: string): int;

/** Returns the index of the file with name [code]name[/code] or [code]-1[/code] if not found. */
find_file_index(name: string): int;

/** Returns the name of the file at index [code]idx[/code]. */
get_file(idx: int): string;

/** Returns the number of files in this directory. */
get_file_count(): int;

/** Returns [code]true[/code] if the file at index [code]idx[/code] imported properly. */
get_file_import_is_valid(idx: int): boolean;

/** Returns the path to the file at index [code]idx[/code]. */
get_file_path(idx: int): string;

/** Returns the base class of the script class defined in the file at index [code]idx[/code]. If the file doesn't define a script class using the [code]class_name[/code] syntax, this will return an empty string. */
get_file_script_class_extends(idx: int): string;

/** Returns the name of the script class defined in the file at index [code]idx[/code]. If the file doesn't define a script class using the [code]class_name[/code] syntax, this will return an empty string. */
get_file_script_class_name(idx: int): string;

/** Returns the resource type of the file at index [code]idx[/code]. This returns a string such as [code]"Resource"[/code] or [code]"GDScript"[/code], [i]not[/i] a file extension such as [code]".gd"[/code]. */
get_file_type(idx: int): string;

/** Returns the name of this directory. */
get_name(): string;

/** Returns the parent directory for this directory or [code]null[/code] if called on a directory at [code]res://[/code] or [code]user://[/code]. */
get_parent(): EditorFileSystemDirectory;

/** Returns the path to this directory. */
get_path(): string;

/** Returns the subdirectory at index [code]idx[/code]. */
get_subdir(idx: int): EditorFileSystemDirectory;

/** Returns the number of subdirectories in this directory. */
get_subdir_count(): int;

  // connect<T extends SignalsOf<EditorFileSystemDirectory>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<EditorFileSystemDirectorySignals>>(signal: T, method: SignalFunction<EditorFileSystemDirectorySignals[T]>): number;




}

declare class EditorFileSystemDirectorySignals extends ObjectSignals {
  
}
