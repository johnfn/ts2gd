
/**
 * Used by the editor to display VCS extracted information in the editor. The implementation of this API is included in VCS addons, which are essentially GDNative plugins that need to be put into the project folder. These VCS addons are scripts which are attached (on demand) to the object instance of `EditorVCSInterface`. All the functions listed below, instead of performing the task themselves, they call the internally defined functions in the VCS addons to provide a plug-n-play experience.
 *
*/
declare class EditorVCSInterface extends Object  {

  
/**
 * Used by the editor to display VCS extracted information in the editor. The implementation of this API is included in VCS addons, which are essentially GDNative plugins that need to be put into the project folder. These VCS addons are scripts which are attached (on demand) to the object instance of `EditorVCSInterface`. All the functions listed below, instead of performing the task themselves, they call the internally defined functions in the VCS addons to provide a plug-n-play experience.
 *
*/
  new(): EditorVCSInterface; 
  static "new"(): EditorVCSInterface 



/** Creates a version commit if the addon is initialized, else returns without doing anything. Uses the files which have been staged previously, with the commit message set to a value as provided as in the argument. */
commit(msg: string): void;

/**
 * Returns an [Array] of [Dictionary] objects containing the diff output from the VCS in use, if a VCS addon is initialized, else returns an empty [Array] object. The diff contents also consist of some contextual lines which provide context to the observed line change in the file.
 *
 * Each [Dictionary] object has the line diff contents under the keys:
 *
 * - `"content"` to store a [String] containing the line contents
 *
 * - `"status"` to store a [String] which contains `"+"` in case the content is a line addition but it stores a `"-"` in case of deletion and an empty string in the case the line content is neither an addition nor a deletion.
 *
 * - `"new_line_number"` to store an integer containing the new line number of the line content.
 *
 * - `"line_count"` to store an integer containing the number of lines in the line content.
 *
 * - `"old_line_number"` to store an integer containing the old line number of the line content.
 *
 * - `"offset"` to store the offset of the line change since the first contextual line content.
 *
*/
get_file_diff(file_path: string): any[];

/**
 * Returns a [Dictionary] containing the path of the detected file change mapped to an integer signifying what kind of change the corresponding file has experienced.
 *
 * The following integer values are being used to signify that the detected file is:
 *
 * - `0`: New to the VCS working directory
 *
 * - `1`: Modified
 *
 * - `2`: Renamed
 *
 * - `3`: Deleted
 *
 * - `4`: Typechanged
 *
*/
get_modified_files_data(): Dictionary<any, any>;

/** Returns the project name of the VCS working directory. */
get_project_name(): string;

/** Returns the name of the VCS if the VCS has been initialized, else return an empty string. */
get_vcs_name(): string;

/** Initializes the VCS addon if not already. Uses the argument value as the path to the working directory of the project. Creates the initial commit if required. Returns [code]true[/code] if no failure occurs, else returns [code]false[/code]. */
initialize(project_root_path: string): boolean;

/** Returns [code]true[/code] if the addon is ready to respond to function calls, else returns [code]false[/code]. */
is_addon_ready(): boolean;

/** Returns [code]true[/code] if the VCS addon has been initialized, else returns [code]false[/code]. */
is_vcs_initialized(): boolean;

/** Shuts down the VCS addon to allow cleanup code to run on call. Returns [code]true[/code] is no failure occurs, else returns [code]false[/code]. */
shut_down(): boolean;

/** Stages the file which should be committed when [method EditorVCSInterface.commit] is called. Argument should contain the absolute path. */
stage_file(file_path: string): void;

/** Unstages the file which was staged previously to be committed, so that it is no longer committed when [method EditorVCSInterface.commit] is called. Argument should contain the absolute path. */
unstage_file(file_path: string): void;

  connect<T extends SignalsOf<EditorVCSInterface>>(signal: T, method: SignalFunction<EditorVCSInterface[T]>): number;






}

