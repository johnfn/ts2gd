
/**
 * Plugins are registered via [method EditorPlugin.add_translation_parser_plugin] method. To define the parsing and string extraction logic, override the [method parse_file] method in script.
 *
 * Add the extracted strings to argument `msgids` or `msgids_context_plural` if context or plural is used.
 *
 * When adding to `msgids_context_plural`, you must add the data using the format `["A", "B", "C"]`, where `A` represents the extracted string, `B` represents the context, and `C` represents the plural version of the extracted string. If you want to add only context but not plural, put `""` for the plural slot. The idea is the same if you only want to add plural but not context. See the code below for concrete examples.
 *
 * The extracted strings will be written into a POT file selected by user under "POT Generation" in "Localization" tab in "Project Settings" menu.
 *
 * Below shows an example of a custom parser that extracts strings from a CSV file to write into a POT.
 *
 * @example 
 * 
 * tool
 * extends EditorTranslationParserPlugin
 * func parse_file(path, msgids, msgids_context_plural):
 *     var file = File.new()
 *     file.open(path, File.READ)
 *     var text = file.get_as_text()
 *     var split_strs = text.split(",", false, 0)
 *     for s in split_strs:
 *         msgids.append(s)
 *         #print("Extracted string: " + s)
 * func get_recognized_extensions():
 *     return ["csv"]
 * @summary 
 * 
 *
 * To add a translatable string associated with context or plural, add it to `msgids_context_plural`:
 *
 * @example 
 * 
 * # This will add a message with msgid "Test 1", msgctxt "context", and msgid_plural "test 1 plurals".
 * msgids_context_plural.append(["Test 1", "context", "test 1 plurals"])
 * # This will add a message with msgid "A test without context" and msgid_plural "plurals".
 * msgids_context_plural.append(["A test without context", "", "plurals"])
 * # This will add a message with msgid "Only with context" and msgctxt "a friendly context".
 * msgids_context_plural.append(["Only with context", "a friendly context", ""])
 * @summary 
 * 
 *
 * **Note:** If you override parsing logic for standard script types (GDScript, C#, etc.), it would be better to load the `path` argument using [method ResourceLoader.load]. This is because built-in scripts are loaded as [Resource] type, not [File] type.
 *
 * For example:
 *
 * @example 
 * 
 * func parse_file(path, msgids, msgids_context_plural):
 *     var res = ResourceLoader.load(path, "Script")
 *     var text = res.get_source_code()
 *     # Parsing logic.
 * func get_recognized_extensions():
 *     return ["gd"]
 * @summary 
 * 
 *
*/
declare class EditorTranslationParserPlugin extends Reference {

  
/**
 * Plugins are registered via [method EditorPlugin.add_translation_parser_plugin] method. To define the parsing and string extraction logic, override the [method parse_file] method in script.
 *
 * Add the extracted strings to argument `msgids` or `msgids_context_plural` if context or plural is used.
 *
 * When adding to `msgids_context_plural`, you must add the data using the format `["A", "B", "C"]`, where `A` represents the extracted string, `B` represents the context, and `C` represents the plural version of the extracted string. If you want to add only context but not plural, put `""` for the plural slot. The idea is the same if you only want to add plural but not context. See the code below for concrete examples.
 *
 * The extracted strings will be written into a POT file selected by user under "POT Generation" in "Localization" tab in "Project Settings" menu.
 *
 * Below shows an example of a custom parser that extracts strings from a CSV file to write into a POT.
 *
 * @example 
 * 
 * tool
 * extends EditorTranslationParserPlugin
 * func parse_file(path, msgids, msgids_context_plural):
 *     var file = File.new()
 *     file.open(path, File.READ)
 *     var text = file.get_as_text()
 *     var split_strs = text.split(",", false, 0)
 *     for s in split_strs:
 *         msgids.append(s)
 *         #print("Extracted string: " + s)
 * func get_recognized_extensions():
 *     return ["csv"]
 * @summary 
 * 
 *
 * To add a translatable string associated with context or plural, add it to `msgids_context_plural`:
 *
 * @example 
 * 
 * # This will add a message with msgid "Test 1", msgctxt "context", and msgid_plural "test 1 plurals".
 * msgids_context_plural.append(["Test 1", "context", "test 1 plurals"])
 * # This will add a message with msgid "A test without context" and msgid_plural "plurals".
 * msgids_context_plural.append(["A test without context", "", "plurals"])
 * # This will add a message with msgid "Only with context" and msgctxt "a friendly context".
 * msgids_context_plural.append(["Only with context", "a friendly context", ""])
 * @summary 
 * 
 *
 * **Note:** If you override parsing logic for standard script types (GDScript, C#, etc.), it would be better to load the `path` argument using [method ResourceLoader.load]. This is because built-in scripts are loaded as [Resource] type, not [File] type.
 *
 * For example:
 *
 * @example 
 * 
 * func parse_file(path, msgids, msgids_context_plural):
 *     var res = ResourceLoader.load(path, "Script")
 *     var text = res.get_source_code()
 *     # Parsing logic.
 * func get_recognized_extensions():
 *     return ["gd"]
 * @summary 
 * 
 *
*/
  "new"(): this;
  static "new"(): this;




/** Gets the list of file extensions to associate with this parser, e.g. [code]["csv"][/code]. */
get_recognized_extensions(): any[];

/** Override this method to define a custom parsing logic to extract the translatable strings. */
parse_file(path: String, msgids: any[], msgids_context_plural: any[]): void;

  connect<T extends SignalsOf<EditorTranslationParserPlugin>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
