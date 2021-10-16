
/**
 * EditorImportPlugins provide a way to extend the editor's resource import functionality. Use them to import resources from custom files or to provide alternatives to the editor's existing importers. Register your [EditorPlugin] with [method EditorPlugin.add_import_plugin].
 *
 * EditorImportPlugins work by associating with specific file extensions and a resource type. See [method get_recognized_extensions] and [method get_resource_type]. They may optionally specify some import presets that affect the import process. EditorImportPlugins are responsible for creating the resources and saving them in the `.import` directory.
 *
 * Below is an example EditorImportPlugin that imports a [Mesh] from a file with the extension ".special" or ".spec":
 *
 * @example 
 * 
 * tool
 * extends EditorImportPlugin
 * func get_importer_name():
 *     return "my.special.plugin"
 * func get_visible_name():
 *     return "Special Mesh"
 * func get_recognized_extensions():
 *     return ["special", "spec"]
 * func get_save_extension():
 *     return "mesh"
 * func get_resource_type():
 *     return "Mesh"
 * func get_preset_count():
 *     return 1
 * func get_preset_name(i):
 *     return "Default"
 * func get_import_options(i):
 *     return [{"name": "my_option", "default_value": false}]
 * func import(source_file, save_path, options, platform_variants, gen_files):
 *     var file = File.new()
 *     if file.open(source_file, File.READ) != OK:
 *         return FAILED
 *     var mesh = Mesh.new()
 *     # Fill the Mesh with data read in "file", left as an exercise to the reader
 *     var filename = save_path + "." + get_save_extension()
 *     return ResourceSaver.save(filename, mesh)
 * @summary 
 * 
 *
*/
declare class EditorImportPlugin extends ResourceImporter {

  
/**
 * EditorImportPlugins provide a way to extend the editor's resource import functionality. Use them to import resources from custom files or to provide alternatives to the editor's existing importers. Register your [EditorPlugin] with [method EditorPlugin.add_import_plugin].
 *
 * EditorImportPlugins work by associating with specific file extensions and a resource type. See [method get_recognized_extensions] and [method get_resource_type]. They may optionally specify some import presets that affect the import process. EditorImportPlugins are responsible for creating the resources and saving them in the `.import` directory.
 *
 * Below is an example EditorImportPlugin that imports a [Mesh] from a file with the extension ".special" or ".spec":
 *
 * @example 
 * 
 * tool
 * extends EditorImportPlugin
 * func get_importer_name():
 *     return "my.special.plugin"
 * func get_visible_name():
 *     return "Special Mesh"
 * func get_recognized_extensions():
 *     return ["special", "spec"]
 * func get_save_extension():
 *     return "mesh"
 * func get_resource_type():
 *     return "Mesh"
 * func get_preset_count():
 *     return 1
 * func get_preset_name(i):
 *     return "Default"
 * func get_import_options(i):
 *     return [{"name": "my_option", "default_value": false}]
 * func import(source_file, save_path, options, platform_variants, gen_files):
 *     var file = File.new()
 *     if file.open(source_file, File.READ) != OK:
 *         return FAILED
 *     var mesh = Mesh.new()
 *     # Fill the Mesh with data read in "file", left as an exercise to the reader
 *     var filename = save_path + "." + get_save_extension()
 *     return ResourceSaver.save(filename, mesh)
 * @summary 
 * 
 *
*/
  "new"(): EditorImportPlugin;
  static "new"(): EditorImportPlugin;




/** Gets the options and default values for the preset at this index. Returns an Array of Dictionaries with the following keys: [code]name[/code], [code]default_value[/code], [code]property_hint[/code] (optional), [code]hint_string[/code] (optional), [code]usage[/code] (optional). */
get_import_options(preset: int): any[];

/** Gets the order of this importer to be run when importing resources. Importers with [i]lower[/i] import orders will be called first, and higher values will be called later. Use this to ensure the importer runs after the dependencies are already imported. The default import order is [code]0[/code] unless overridden by a specific importer. See [enum ResourceImporter.ImportOrder] for some predefined values. */
get_import_order(): int;

/** Gets the unique name of the importer. */
get_importer_name(): string;

/**
 * This method can be overridden to hide specific import options if conditions are met. This is mainly useful for hiding options that depend on others if one of them is disabled. For example:
 *
 * @example 
 * 
 * func get_option_visibility(option, options):
 *     # Only show the lossy quality setting if the compression mode is set to "Lossy".
 *     if option == "compress/lossy_quality" and options.has("compress/mode"):
 *         return int(options["compress/mode"]) == COMPRESS_LOSSY
 *     return true
 * @summary 
 * 
 *
 * Return `true` to make all options always visible.
 *
*/
get_option_visibility(option: string, options: Dictionary<any, any>): boolean;

/** Gets the number of initial presets defined by the plugin. Use [method get_import_options] to get the default options for the preset and [method get_preset_name] to get the name of the preset. */
get_preset_count(): int;

/** Gets the name of the options preset at this index. */
get_preset_name(preset: int): string;

/** Gets the priority of this plugin for the recognized extension. Higher priority plugins will be preferred. The default priority is [code]1.0[/code]. */
get_priority(): float;

/** Gets the list of file extensions to associate with this loader (case-insensitive). e.g. [code]["obj"][/code]. */
get_recognized_extensions(): any[];

/** Gets the Godot resource type associated with this loader. e.g. [code]"Mesh"[/code] or [code]"Animation"[/code]. */
get_resource_type(): string;

/** Gets the extension used to save this resource in the [code].import[/code] directory. */
get_save_extension(): string;

/** Gets the name to display in the import window. You should choose this name as a continuation to "Import as", e.g. "Import as Special Mesh". */
get_visible_name(): string;

/**
 * Imports `source_file` into `save_path` with the import `options` specified. The `platform_variants` and `gen_files` arrays will be modified by this function.
 *
 * This method must be overridden to do the actual importing work. See this class' description for an example of overriding this method.
 *
*/
import(source_file: string, save_path: string, options: Dictionary<any, any>, platform_variants: any[], gen_files: any[]): int;

  // connect<T extends SignalsOf<EditorImportPlugin>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<EditorImportPluginSignals>>(signal: T, method: SignalFunction<EditorImportPluginSignals[T]>): number;




}

declare class EditorImportPluginSignals extends ResourceImporterSignals {
  
}
