
/**
*/
declare class FileSystemDock extends VBoxContainer  {

  
/**
*/
  new(): FileSystemDock; 
  static "new"(): FileSystemDock 



/** No documentation provided. */
can_drop_data_fw(point: Vector2, data: any, from: Control): boolean;

/** No documentation provided. */
drop_data_fw(point: Vector2, data: any, from: Control): void;

/** No documentation provided. */
get_drag_data_fw(point: Vector2, from: Control): any;

/** No documentation provided. */
navigate_to_path(path: string): void;

  connect<T extends SignalsOf<FileSystemDock>>(signal: T, method: SignalFunction<FileSystemDock[T]>): number;





/**
*/
$display_mode_changed: Signal<() => void>

/**
*/
$file_removed: Signal<(file: string) => void>

/**
*/
$files_moved: Signal<(old_file: string, new_file: string) => void>

/**
*/
$folder_moved: Signal<(old_folder: string, new_file: string) => void>

/**
*/
$folder_removed: Signal<(folder: string) => void>

/**
*/
$inherit: Signal<(file: string) => void>

/**
*/
$instance: Signal<(files: PoolStringArray) => void>

}

