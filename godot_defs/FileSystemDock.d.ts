
/**
*/
declare class FileSystemDock extends VBoxContainer {

  
/**
*/
  "new"(): FileSystemDock;
  static "new"(): FileSystemDock;




/** No documentation provided. */
can_drop_data_fw(arg0: Vector2, arg1: any, arg2: Control): boolean;

/** No documentation provided. */
drop_data_fw(arg0: Vector2, arg1: any, arg2: Control): void;

/** No documentation provided. */
get_drag_data_fw(arg0: Vector2, arg1: Control): any;

/** No documentation provided. */
navigate_to_path(arg0: string): void;

  connect<T extends SignalsOf<FileSystemDock>, U extends Node>(signal: T, node: U, method: keyof U): number;





  /**
*/
display_mode_changed: Signal<() => void>

/**
*/
file_removed: Signal<(file: string) => void>

/**
*/
files_moved: Signal<(old_file: string, new_file: string) => void>

/**
*/
folder_moved: Signal<(old_folder: string, new_file: string) => void>

/**
*/
folder_removed: Signal<(folder: string) => void>

/**
*/
inherit: Signal<(file: string) => void>

/**
*/
instance: Signal<(files: PoolStringArray) => void>

}
