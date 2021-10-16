
/**
 * FileDialog is a preset dialog used to choose files and directories in the filesystem. It supports filter masks. The FileDialog automatically sets its window title according to the [member mode]. If you want to use a custom title, disable this by setting [member mode_overrides_title] to `false`.
 *
*/
declare class FileDialog extends ConfirmationDialog {

  
/**
 * FileDialog is a preset dialog used to choose files and directories in the filesystem. It supports filter masks. The FileDialog automatically sets its window title according to the [member mode]. If you want to use a custom title, disable this by setting [member mode_overrides_title] to `false`.
 *
*/
  "new"(): FileDialog;
  static "new"(): FileDialog;



/**
 * The file system access scope. See enum `Access` constants.
 *
 * **Warning:** Currently, in sandboxed environments such as HTML5 builds or sandboxed macOS apps, FileDialog cannot access the host file system. See [url=https://github.com/godotengine/godot-proposals/issues/1123]godot-proposals#1123[/url].
 *
*/
access: int;

/** The current working directory of the file dialog. */
current_dir: string;

/** The currently selected file of the file dialog. */
current_file: string;

/** The currently selected file path of the file dialog. */
current_path: string;


/** The available file type filters. For example, this shows only [code].png[/code] and [code].gd[/code] files: [code]set_filters(PoolStringArray(["*.png ; PNG Images","*.gd ; GDScript Files"]))[/code]. */
filters: PoolStringArray;

/** The dialog's open or save mode, which affects the selection behavior. See enum [code]Mode[/code] constants. */
mode: int;

/** If [code]true[/code], changing the [code]Mode[/code] property will set the window title accordingly (e.g. setting mode to [constant MODE_OPEN_FILE] will change the window title to "Open a File"). */
mode_overrides_title: boolean;

/** If [code]true[/code], the dialog will show hidden files. */
show_hidden_files: boolean;


/** Adds [code]filter[/code] as a custom filter; [code]filter[/code] should be of the form [code]"filename.extension ; Description"[/code]. For example, [code]"*.png ; PNG Images"[/code]. */
add_filter(filter: string): void;

/** Clear all the added filters in the dialog. */
clear_filters(): void;

/** Clear currently selected items in the dialog. */
deselect_items(): void;

/** Returns the LineEdit for the selected file. */
get_line_edit(): LineEdit;

/** Returns the vertical box container of the dialog, custom controls can be added to it. */
get_vbox(): VBoxContainer;

/** Invalidate and update the current dialog content list. */
invalidate(): void;

  // connect<T extends SignalsOf<FileDialog>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<FileDialogSignals>>(signal: T, method: SignalFunction<FileDialogSignals[T]>): number;



/**
 * The dialog allows selecting one, and only one file.
 *
*/
static MODE_OPEN_FILE: any;

/**
 * The dialog allows selecting multiple files.
 *
*/
static MODE_OPEN_FILES: any;

/**
 * The dialog only allows selecting a directory, disallowing the selection of any file.
 *
*/
static MODE_OPEN_DIR: any;

/**
 * The dialog allows selecting one file or directory.
 *
*/
static MODE_OPEN_ANY: any;

/**
 * The dialog will warn when a file exists.
 *
*/
static MODE_SAVE_FILE: any;

/**
 * The dialog only allows accessing files under the [Resource] path (`res://`).
 *
*/
static ACCESS_RESOURCES: any;

/**
 * The dialog only allows accessing files under user data path (`user://`).
 *
*/
static ACCESS_USERDATA: any;

/**
 * The dialog allows accessing files on the whole file system.
 *
*/
static ACCESS_FILESYSTEM: any;

}

declare class FileDialogSignals extends ConfirmationDialogSignals {
  /**
 * Emitted when the user selects a directory.
 *
*/
dir_selected: Signal<(dir: string) => void>

/**
 * Emitted when the user selects a file by double-clicking it or pressing the **OK** button.
 *
*/
file_selected: Signal<(path: string) => void>

/**
 * Emitted when the user selects multiple files.
 *
*/
files_selected: Signal<(paths: PoolStringArray) => void>

}
