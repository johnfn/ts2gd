
/**
 * Editor export plugins are automatically activated whenever the user exports the project. Their most common use is to determine what files are being included in the exported project. For each plugin, [method _export_begin] is called at the beginning of the export process and then [method _export_file] is called for each exported file.
 *
*/
declare class EditorExportPlugin extends Reference  {

  
/**
 * Editor export plugins are automatically activated whenever the user exports the project. Their most common use is to determine what files are being included in the exported project. For each plugin, [method _export_begin] is called at the beginning of the export process and then [method _export_file] is called for each exported file.
 *
*/
  new(): EditorExportPlugin; 
  static "new"(): EditorExportPlugin 



/** Virtual method to be overridden by the user. It is called when the export starts and provides all information about the export. [code]features[/code] is the list of features for the export, [code]is_debug[/code] is [code]true[/code] for debug builds, [code]path[/code] is the target path for the exported project. [code]flags[/code] is only used when running a runnable profile, e.g. when using native run on Android. */
protected _export_begin(features: PoolStringArray, is_debug: boolean, path: string, flags: int): void;

/** Virtual method to be overridden by the user. Called when the export is finished. */
protected _export_end(): void;

/**
 * Virtual method to be overridden by the user. Called for each exported file, providing arguments that can be used to identify the file. `path` is the path of the file, `type` is the [Resource] represented by the file (e.g. [PackedScene]) and `features` is the list of features for the export.
 *
 * Calling [method skip] inside this callback will make the file not included in the export.
 *
*/
protected _export_file(path: string, type: string, features: PoolStringArray): void;

/** Adds a custom file to be exported. [code]path[/code] is the virtual path that can be used to load the file, [code]file[/code] is the binary data of the file. If [code]remap[/code] is [code]true[/code], file will not be exported, but instead remapped to the given [code]path[/code]. */
add_file(path: string, file: PoolByteArray, remap: boolean): void;

/** Adds an iOS bundle file from the given [code]path[/code] to the exported project. */
add_ios_bundle_file(path: string): void;

/** Adds a C++ code to the iOS export. The final code is created from the code appended by each active export plugin. */
add_ios_cpp_code(code: string): void;

/**
 * Adds a dynamic library (*.dylib, *.framework) to Linking Phase in iOS's Xcode project and embeds it into resulting binary.
 *
 * **Note:** For static libraries (*.a) works in same way as [method add_ios_framework].
 *
 * This method should not be used for System libraries as they are already present on the device.
 *
*/
add_ios_embedded_framework(path: string): void;

/** Adds a static library (*.a) or dynamic library (*.dylib, *.framework) to Linking Phase in iOS's Xcode project. */
add_ios_framework(path: string): void;

/** Adds linker flags for the iOS export. */
add_ios_linker_flags(flags: string): void;

/** Adds content for iOS Property List files. */
add_ios_plist_content(plist_content: string): void;

/** Adds a static lib from the given [code]path[/code] to the iOS project. */
add_ios_project_static_lib(path: string): void;

/** Adds a shared object with the given [code]tags[/code] and destination [code]path[/code]. */
add_shared_object(path: string, tags: PoolStringArray): void;

/** To be called inside [method _export_file]. Skips the current file, so it's not included in the export. */
skip(): void;

  connect<T extends SignalsOf<EditorExportPlugin>>(signal: T, method: SignalFunction<EditorExportPlugin[T]>): number;






}

