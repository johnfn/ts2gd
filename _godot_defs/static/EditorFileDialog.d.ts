
/**
*/
declare class EditorFileDialog extends ConfirmationDialog {

  
/**
*/
  "new"(): EditorFileDialog;
  static "new"(): EditorFileDialog;



/** The location from which the user may select a file, including [code]res://[/code], [code]user://[/code], and the local file system. */
access: int;

/** The currently occupied directory. */
current_dir: string;

/** The currently selected file. */
current_file: string;

/** The file system path in the address bar. */
current_path: string;


/** If [code]true[/code], the [EditorFileDialog] will not warn the user before overwriting files. */
disable_overwrite_warning: boolean;

/** The view format in which the [EditorFileDialog] displays resources to the user. */
display_mode: int;

/** The purpose of the [EditorFileDialog], which defines the allowed behaviors. */
mode: int;


/** If [code]true[/code], hidden files and directories will be visible in the [EditorFileDialog]. */
show_hidden_files: boolean;


/**
 * Adds a comma-delimited file extension filter option to the [EditorFileDialog] with an optional semi-colon-delimited label.
 *
 * For example, `"*.tscn, *.scn; Scenes"` results in filter text "Scenes (*.tscn, *.scn)".
 *
*/
add_filter(filter: string): void;

/** Removes all filters except for "All Files (*)". */
clear_filters(): void;

/** Returns the [code]VBoxContainer[/code] used to display the file system. */
get_vbox(): VBoxContainer;

/** Notify the [EditorFileDialog] that its view of the data is no longer accurate. Updates the view contents on next view update. */
invalidate(): void;

  connect<T extends SignalsOf<EditorFileDialog>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * The [EditorFileDialog] can select only one file. Accepting the window will open the file.
 *
*/
static MODE_OPEN_FILE: 0;

/**
 * The [EditorFileDialog] can select multiple files. Accepting the window will open all files.
 *
*/
static MODE_OPEN_FILES: 1;

/**
 * The [EditorFileDialog] can select only one directory. Accepting the window will open the directory.
 *
*/
static MODE_OPEN_DIR: 2;

/**
 * The [EditorFileDialog] can select a file or directory. Accepting the window will open it.
 *
*/
static MODE_OPEN_ANY: 3;

/**
 * The [EditorFileDialog] can select only one file. Accepting the window will save the file.
 *
*/
static MODE_SAVE_FILE: 4;

/**
 * The [EditorFileDialog] can only view `res://` directory contents.
 *
*/
static ACCESS_RESOURCES: 0;

/**
 * The [EditorFileDialog] can only view `user://` directory contents.
 *
*/
static ACCESS_USERDATA: 1;

/**
 * The [EditorFileDialog] can view the entire local file system.
 *
*/
static ACCESS_FILESYSTEM: 2;

/**
 * The [EditorFileDialog] displays resources as thumbnails.
 *
*/
static DISPLAY_THUMBNAILS: 0;

/**
 * The [EditorFileDialog] displays resources as a list of filenames.
 *
*/
static DISPLAY_LIST: 1;


  /**
 * Emitted when a directory is selected.
 *
*/
dir_selected: Signal<(dir: string) => void>

/**
 * Emitted when a file is selected.
 *
*/
file_selected: Signal<(path: string) => void>

/**
 * Emitted when multiple files are selected.
 *
*/
files_selected: Signal<(paths: PoolStringArray) => void>

}
