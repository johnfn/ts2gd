
/**
*/
declare class EditorExportPlugin extends Reference {

  
/**
*/
  "new"(): EditorExportPlugin;
  static "new"(): EditorExportPlugin;




/** Virtual method to be overridden by the user. It is called when the export starts and provides all information about the export. */
protected _export_begin(features: PoolStringArray, is_debug: boolean, path: string, flags: int): void;

/** Virtual method to be overridden by the user. Called when the export is finished. */
protected _export_end(): void;

/** No documentation provided. */
protected _export_file(path: string, type: string, features: PoolStringArray): void;

/** No documentation provided. */
add_file(path: string, file: PoolByteArray, remap: boolean): void;

/** No documentation provided. */
add_ios_bundle_file(path: string): void;

/** No documentation provided. */
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

/** No documentation provided. */
add_ios_linker_flags(flags: string): void;

/** No documentation provided. */
add_ios_plist_content(plist_content: string): void;

/** No documentation provided. */
add_ios_project_static_lib(path: string): void;

/** No documentation provided. */
add_shared_object(path: string, tags: PoolStringArray): void;

/** No documentation provided. */
skip(): void;

  connect<T extends SignalsOf<EditorExportPlugin>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
