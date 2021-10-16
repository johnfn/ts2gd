
/**
 * This helper class can be used to store [Variant] values on the filesystem using INI-style formatting. The stored values are identified by a section and a key:
 *
 * @example 
 * 
 * [section]
 * some_key=42
 * string_example="Hello World!"
 * a_vector=Vector3( 1, 0, 2 )
 * @summary 
 * 
 *
 * The stored data can be saved to or parsed from a file, though ConfigFile objects can also be used directly without accessing the filesystem.
 *
 * The following example shows how to create a simple [ConfigFile] and save it on disk:
 *
 * @example 
 * 
 * # Create new ConfigFile object.
 * var config = ConfigFile.new()
 * # Store some values.
 * config.set_value("Player1", "player_name", "Steve")
 * config.set_value("Player1", "best_score", 10)
 * config.set_value("Player2", "player_name", "V3geta")
 * config.set_value("Player2", "best_score", 9001)
 * # Save it to a file (overwrite if already exists).
 * config.save("user://scores.cfg")
 * @summary 
 * 
 *
 * This example shows how the above file could be loaded:
 *
 * @example 
 * 
 * var score_data = {}
 * var config = ConfigFile.new()
 * # Load data from a file.
 * var err = config.load("user://scores.cfg")
 * # If the file didn't load, ignore it.
 * if err != OK:
 *     return
 * # Iterate over all sections.
 * for player in config.get_sections():
 *     # Fetch the data for each section.
 *     var player_name = config.get_value(player, "player_name")
 *     var player_score = config.get_value(player, "best_score")
 *     score_data[player_name] = player_score
 * @summary 
 * 
 *
 * Any operation that mutates the ConfigFile such as [method set_value], [method clear], or [method erase_section], only changes what is loaded in memory. If you want to write the change to a file, you have to save the changes with [method save], [method save_encrypted], or [method save_encrypted_pass].
 *
 * Keep in mind that section and property names can't contain spaces. Anything after a space will be ignored on save and on load.
 *
 * ConfigFiles can also contain manually written comment lines starting with a semicolon (`;`). Those lines will be ignored when parsing the file. Note that comments will be lost when saving the ConfigFile. This can still be useful for dedicated server configuration files, which are typically never overwritten without explicit user action.
 *
 * **Note:** The file extension given to a ConfigFile does not have any impact on its formatting or behavior. By convention, the `.cfg` extension is used here, but any other extension such as `.ini` is also valid. Since neither `.cfg` nor `.ini` are standardized, Godot's ConfigFile formatting may differ from files written by other programs.
 *
*/
declare class ConfigFile extends Reference {

  
/**
 * This helper class can be used to store [Variant] values on the filesystem using INI-style formatting. The stored values are identified by a section and a key:
 *
 * @example 
 * 
 * [section]
 * some_key=42
 * string_example="Hello World!"
 * a_vector=Vector3( 1, 0, 2 )
 * @summary 
 * 
 *
 * The stored data can be saved to or parsed from a file, though ConfigFile objects can also be used directly without accessing the filesystem.
 *
 * The following example shows how to create a simple [ConfigFile] and save it on disk:
 *
 * @example 
 * 
 * # Create new ConfigFile object.
 * var config = ConfigFile.new()
 * # Store some values.
 * config.set_value("Player1", "player_name", "Steve")
 * config.set_value("Player1", "best_score", 10)
 * config.set_value("Player2", "player_name", "V3geta")
 * config.set_value("Player2", "best_score", 9001)
 * # Save it to a file (overwrite if already exists).
 * config.save("user://scores.cfg")
 * @summary 
 * 
 *
 * This example shows how the above file could be loaded:
 *
 * @example 
 * 
 * var score_data = {}
 * var config = ConfigFile.new()
 * # Load data from a file.
 * var err = config.load("user://scores.cfg")
 * # If the file didn't load, ignore it.
 * if err != OK:
 *     return
 * # Iterate over all sections.
 * for player in config.get_sections():
 *     # Fetch the data for each section.
 *     var player_name = config.get_value(player, "player_name")
 *     var player_score = config.get_value(player, "best_score")
 *     score_data[player_name] = player_score
 * @summary 
 * 
 *
 * Any operation that mutates the ConfigFile such as [method set_value], [method clear], or [method erase_section], only changes what is loaded in memory. If you want to write the change to a file, you have to save the changes with [method save], [method save_encrypted], or [method save_encrypted_pass].
 *
 * Keep in mind that section and property names can't contain spaces. Anything after a space will be ignored on save and on load.
 *
 * ConfigFiles can also contain manually written comment lines starting with a semicolon (`;`). Those lines will be ignored when parsing the file. Note that comments will be lost when saving the ConfigFile. This can still be useful for dedicated server configuration files, which are typically never overwritten without explicit user action.
 *
 * **Note:** The file extension given to a ConfigFile does not have any impact on its formatting or behavior. By convention, the `.cfg` extension is used here, but any other extension such as `.ini` is also valid. Since neither `.cfg` nor `.ini` are standardized, Godot's ConfigFile formatting may differ from files written by other programs.
 *
*/
  "new"(): ConfigFile;
  static "new"(): ConfigFile;




/** Removes the entire contents of the config. */
clear(): void;

/** Deletes the specified section along with all the key-value pairs inside. Raises an error if the section does not exist. */
erase_section(section: string): void;

/** Deletes the specified key in a section. Raises an error if either the section or the key do not exist. */
erase_section_key(section: string, key: string): void;

/** Returns an array of all defined key identifiers in the specified section. Raises an error and returns an empty array if the section does not exist. */
get_section_keys(section: string): PoolStringArray;

/** Returns an array of all defined section identifiers. */
get_sections(): PoolStringArray;

/** Returns the current value for the specified section and key. If either the section or the key do not exist, the method returns the fallback [code]default[/code] value. If [code]default[/code] is not specified or set to [code]null[/code], an error is also raised. */
get_value(section: string, key: string, _default?: any): any;

/** Returns [code]true[/code] if the specified section exists. */
has_section(section: string): boolean;

/** Returns [code]true[/code] if the specified section-key pair exists. */
has_section_key(section: string, key: string): boolean;

/**
 * Loads the config file specified as a parameter. The file's contents are parsed and loaded in the [ConfigFile] object which the method was called on.
 *
 * Returns one of the [enum Error] code constants (`OK` on success).
 *
*/
load(path: string): int;

/**
 * Loads the encrypted config file specified as a parameter, using the provided `key` to decrypt it. The file's contents are parsed and loaded in the [ConfigFile] object which the method was called on.
 *
 * Returns one of the [enum Error] code constants (`OK` on success).
 *
*/
load_encrypted(path: string, key: PoolByteArray): int;

/**
 * Loads the encrypted config file specified as a parameter, using the provided `password` to decrypt it. The file's contents are parsed and loaded in the [ConfigFile] object which the method was called on.
 *
 * Returns one of the [enum Error] code constants (`OK` on success).
 *
*/
load_encrypted_pass(path: string, password: string): int;

/**
 * Parses the passed string as the contents of a config file. The string is parsed and loaded in the ConfigFile object which the method was called on.
 *
 * Returns one of the [enum Error] code constants (`OK` on success).
 *
*/
parse(data: string): int;

/**
 * Saves the contents of the [ConfigFile] object to the file specified as a parameter. The output file uses an INI-style structure.
 *
 * Returns one of the [enum Error] code constants (`OK` on success).
 *
*/
save(path: string): int;

/**
 * Saves the contents of the [ConfigFile] object to the AES-256 encrypted file specified as a parameter, using the provided `key` to encrypt it. The output file uses an INI-style structure.
 *
 * Returns one of the [enum Error] code constants (`OK` on success).
 *
*/
save_encrypted(path: string, key: PoolByteArray): int;

/**
 * Saves the contents of the [ConfigFile] object to the AES-256 encrypted file specified as a parameter, using the provided `password` to encrypt it. The output file uses an INI-style structure.
 *
 * Returns one of the [enum Error] code constants (`OK` on success).
 *
*/
save_encrypted_pass(path: string, password: string): int;

/** Assigns a value to the specified key of the specified section. If either the section or the key do not exist, they are created. Passing a [code]null[/code] value deletes the specified key if it exists, and deletes the section if it ends up empty once the key has been removed. */
set_value(section: string, key: string, value: any): void;

  // connect<T extends SignalsOf<ConfigFile>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<ConfigFileSignals>>(signal: T, method: SignalFunction<ConfigFileSignals[T]>): number;




}

declare class ConfigFileSignals extends ReferenceSignals {
  
}
