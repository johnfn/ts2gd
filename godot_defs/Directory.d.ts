
/**
 * Directory type. It is used to manage directories and their content (not restricted to the project folder).
 *
 * When creating a new [Directory], its default opened directory will be `res://`. This may change in the future, so it is advised to always use [method open] to initialize your [Directory] where you want to operate, with explicit error checking.
 *
 * Here is an example on how to iterate through the files of a directory:
 *
 * @example 
 * 
 * func dir_contents(path):
 *     var dir = Directory.new()
 *     if dir.open(path) == OK:
 *         dir.list_dir_begin()
 *         var file_name = dir.get_next()
 *         while file_name != "":
 *             if dir.current_is_dir():
 *                 print("Found directory: " + file_name)
 *             else:
 *                 print("Found file: " + file_name)
 *             file_name = dir.get_next()
 *     else:
 *         print("An error occurred when trying to access the path.")
 * @summary 
 * 
 *
*/
declare class Directory extends Reference {

  
/**
 * Directory type. It is used to manage directories and their content (not restricted to the project folder).
 *
 * When creating a new [Directory], its default opened directory will be `res://`. This may change in the future, so it is advised to always use [method open] to initialize your [Directory] where you want to operate, with explicit error checking.
 *
 * Here is an example on how to iterate through the files of a directory:
 *
 * @example 
 * 
 * func dir_contents(path):
 *     var dir = Directory.new()
 *     if dir.open(path) == OK:
 *         dir.list_dir_begin()
 *         var file_name = dir.get_next()
 *         while file_name != "":
 *             if dir.current_is_dir():
 *                 print("Found directory: " + file_name)
 *             else:
 *                 print("Found file: " + file_name)
 *             file_name = dir.get_next()
 *     else:
 *         print("An error occurred when trying to access the path.")
 * @summary 
 * 
 *
*/
  "new"(): Directory;
  static "new"(): Directory;




/**
 * Changes the currently opened directory to the one passed as an argument. The argument can be relative to the current directory (e.g. `newdir` or `../newdir`), or an absolute path (e.g. `/tmp/newdir` or `res://somedir/newdir`).
 *
 * Returns one of the [enum Error] code constants (`OK` on success).
 *
*/
change_dir(todir: string): int;

/**
 * Copies the `from` file to the `to` destination. Both arguments should be paths to files, either relative or absolute. If the destination file exists and is not access-protected, it will be overwritten.
 *
 * Returns one of the [enum Error] code constants (`OK` on success).
 *
*/
copy(from: string, to: string): int;

/** Returns whether the current item processed with the last [method get_next] call is a directory ([code].[/code] and [code]..[/code] are considered directories). */
current_is_dir(): boolean;

/** Returns whether the target directory exists. The argument can be relative to the current directory, or an absolute path. */
dir_exists(path: string): boolean;

/** Returns whether the target file exists. The argument can be relative to the current directory, or an absolute path. */
file_exists(path: string): boolean;

/** Returns the absolute path to the currently opened directory (e.g. [code]res://folder[/code] or [code]C:\tmp\folder[/code]). */
get_current_dir(): string;

/** Returns the currently opened directory's drive index. See [method get_drive] to convert returned index to the name of the drive. */
get_current_drive(): int;

/** On Windows, returns the name of the drive (partition) passed as an argument (e.g. [code]C:[/code]). On other platforms, or if the requested drive does not existed, the method returns an empty String. */
get_drive(idx: int): string;

/** On Windows, returns the number of drives (partitions) mounted on the current filesystem. On other platforms, the method returns 0. */
get_drive_count(): int;

/**
 * Returns the next element (file or directory) in the current directory (including `.` and `..`, unless `skip_navigational` was given to [method list_dir_begin]).
 *
 * The name of the file or directory is returned (and not its full path). Once the stream has been fully processed, the method returns an empty String and closes the stream automatically (i.e. [method list_dir_end] would not be mandatory in such a case).
 *
*/
get_next(): string;

/** On UNIX desktop systems, returns the available space on the current directory's disk. On other platforms, this information is not available and the method returns 0 or -1. */
get_space_left(): int;

/**
 * Initializes the stream used to list all files and directories using the [method get_next] function, closing the current opened stream if needed. Once the stream has been processed, it should typically be closed with [method list_dir_end].
 *
 * If `skip_navigational` is `true`, `.` and `..` are filtered out.
 *
 * If `skip_hidden` is `true`, hidden files are filtered out.
 *
*/
list_dir_begin(skip_navigational?: boolean, skip_hidden?: boolean): int;

/** Closes the current stream opened with [method list_dir_begin] (whether it has been fully processed with [method get_next] or not does not matter). */
list_dir_end(): void;

/**
 * Creates a directory. The argument can be relative to the current directory, or an absolute path. The target directory should be placed in an already existing directory (to create the full path recursively, see [method make_dir_recursive]).
 *
 * Returns one of the [enum Error] code constants (`OK` on success).
 *
*/
make_dir(path: string): int;

/**
 * Creates a target directory and all necessary intermediate directories in its path, by calling [method make_dir] recursively. The argument can be relative to the current directory, or an absolute path.
 *
 * Returns one of the [enum Error] code constants (`OK` on success).
 *
*/
make_dir_recursive(path: string): int;

/**
 * Opens an existing directory of the filesystem. The `path` argument can be within the project tree (`res://folder`), the user directory (`user://folder`) or an absolute path of the user filesystem (e.g. `/tmp/folder` or `C:\tmp\folder`).
 *
 * Returns one of the [enum Error] code constants (`OK` on success).
 *
*/
open(path: string): int;

/**
 * Deletes the target file or an empty directory. The argument can be relative to the current directory, or an absolute path. If the target directory is not empty, the operation will fail.
 *
 * Returns one of the [enum Error] code constants (`OK` on success).
 *
*/
remove(path: string): int;

/**
 * Renames (move) the `from` file to the `to` destination. Both arguments should be paths to files, either relative or absolute. If the destination file exists and is not access-protected, it will be overwritten.
 *
 * Returns one of the [enum Error] code constants (`OK` on success).
 *
*/
rename(from: string, to: string): int;

  connect<T extends SignalsOf<Directory>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
