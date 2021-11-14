
/**
*/
declare class EditorFileDialog extends ConfirmationDialog  {

  
/**
*/
  new(): EditorFileDialog; 
  static "new"(): EditorFileDialog 


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

/**
 * Returns the `VBoxContainer` used to display the file system.
 *
 * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their [member CanvasItem.visible] property.
 *
*/
get_vbox(): VBoxContainer;

/** Notify the [EditorFileDialog] that its view of the data is no longer accurate. Updates the view contents on next view update. */
invalidate(): void;

  connect<T extends SignalsOf<EditorFileDialog>>(signal: T, method: SignalFunction<EditorFileDialog[T]>): number;



/**
 * The [EditorFileDialog] can select only one file. Accepting the window will open the file.
 *
*/
static MODE_OPEN_FILE: any;

/**
 * The [EditorFileDialog] can select multiple files. Accepting the window will open all files.
 *
*/
static MODE_OPEN_FILES: any;

/**
 * The [EditorFileDialog] can select only one directory. Accepting the window will open the directory.
 *
*/
static MODE_OPEN_DIR: any;

/**
 * The [EditorFileDialog] can select a file or directory. Accepting the window will open it.
 *
*/
static MODE_OPEN_ANY: any;

/**
 * The [EditorFileDialog] can select only one file. Accepting the window will save the file.
 *
*/
static MODE_SAVE_FILE: any;

/**
 * The [EditorFileDialog] can only view `res://` directory contents.
 *
*/
static ACCESS_RESOURCES: any;

/**
 * The [EditorFileDialog] can only view `user://` directory contents.
 *
*/
static ACCESS_USERDATA: any;

/**
 * The [EditorFileDialog] can view the entire local file system.
 *
*/
static ACCESS_FILESYSTEM: any;

/**
 * The [EditorFileDialog] displays resources as thumbnails.
 *
*/
static DISPLAY_THUMBNAILS: any;

/**
 * The [EditorFileDialog] displays resources as a list of filenames.
 *
*/
static DISPLAY_LIST: any;


/**
 * Emitted when a directory is selected.
 *
*/
$dir_selected: Signal<(dir: string) => void>

/**
 * Emitted when a file is selected.
 *
*/
$file_selected: Signal<(path: string) => void>

/**
 * Emitted when multiple files are selected.
 *
*/
$files_selected: Signal<(paths: PoolStringArray) => void>

}

