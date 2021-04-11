
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
 * The following example shows how to parse an INI-style file from the system, read its contents and store new values in it:
 *
 * @example 
 * 
 * var config = ConfigFile.new()
 * var err = config.load("user://settings.cfg")
 * if err == OK: # If not, something went wrong with the file loading
 *     # Look for the display/width pair, and default to 1024 if missing
 *     var screen_width = config.get_value("display", "width", 1024)
 *     # Store a variable if and only if it hasn't been defined yet
 *     if not config.has_section_key("audio", "mute"):
 *         config.set_value("audio", "mute", false)
 *     # Save the changes by overwriting the previous file
 *     config.save("user://settings.cfg")
 * @summary 
 * 
 *
 * Keep in mind that section and property names can't contain spaces. Anything after a space will be ignored on save and on load.
 *
 * ConfigFiles can also contain manually written comment lines starting with a semicolon (`;`). Those lines will be ignored when parsing the file. Note that comments will be lost when saving the ConfigFile. This can still be useful for dedicated server configuration files, which are typically never overwritten without explicit user action.
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
 * The following example shows how to parse an INI-style file from the system, read its contents and store new values in it:
 *
 * @example 
 * 
 * var config = ConfigFile.new()
 * var err = config.load("user://settings.cfg")
 * if err == OK: # If not, something went wrong with the file loading
 *     # Look for the display/width pair, and default to 1024 if missing
 *     var screen_width = config.get_value("display", "width", 1024)
 *     # Store a variable if and only if it hasn't been defined yet
 *     if not config.has_section_key("audio", "mute"):
 *         config.set_value("audio", "mute", false)
 *     # Save the changes by overwriting the previous file
 *     config.save("user://settings.cfg")
 * @summary 
 * 
 *
 * Keep in mind that section and property names can't contain spaces. Anything after a space will be ignored on save and on load.
 *
 * ConfigFiles can also contain manually written comment lines starting with a semicolon (`;`). Those lines will be ignored when parsing the file. Note that comments will be lost when saving the ConfigFile. This can still be useful for dedicated server configuration files, which are typically never overwritten without explicit user action.
 *
*/
  "new"(): ConfigFile;
  static "new"(): ConfigFile;




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
 * Parses the the passed string as the contents of a config file. The string is parsed and loaded in the ConfigFile object which the method was called on.
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

  connect<T extends SignalsOf<ConfigFile>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
