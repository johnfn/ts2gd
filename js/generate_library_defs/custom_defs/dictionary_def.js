"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DictionaryDefinition = void 0;
exports.DictionaryDefinition = `
/**
 * Dictionary type. Associative container which contains values referenced by unique keys. Dictionaries are composed of pairs of keys (which must be unique) and values. Dictionaries will preserve the insertion order when adding elements, even though this may not be reflected when printing the dictionary. In other programming languages, this data structure is sometimes referred to as an hash map or associative array.
 *
 * You can define a dictionary by placing a comma-separated list of \`key: value\` pairs in curly braces \`{}\`.
 *
 * Erasing elements while iterating over them **is not supported** and will result in undefined behavior.
 *
 * **Note:** Dictionaries are always passed by reference. To get a copy of a dictionary which can be modified independently of the original dictionary, use [method duplicate].
 *
 * Creating a dictionary:
 *
 * @example 
 * 
 * var my_dir = {} # Creates an empty dictionary.
 * var points_dir = {"White": 50, "Yellow": 75, "Orange": 100}
 * var another_dir = {
 *     key1: value1,
 *     key2: value2,
 *     key3: value3,
 * }
 * @summary 
 * 
 *
 * You can access a dictionary's values by referencing the appropriate key. In the above example, \`points_dir["White"]\` will return \`50\`. You can also write \`points_dir.White\`, which is equivalent. However, you'll have to use the bracket syntax if the key you're accessing the dictionary with isn't a fixed string (such as a number or variable).
 *
 * @example 
 * 
 * export(String, "White", "Yellow", "Orange") var my_color
 * var points_dir = {"White": 50, "Yellow": 75, "Orange": 100}
 * func _ready():
 *     # We can't use dot syntax here as \`my_color\` is a variable.
 *     var points = points_dir[my_color]
 * @summary 
 * 
 *
 * In the above code, \`points\` will be assigned the value that is paired with the appropriate color selected in \`my_color\`.
 *
 * Dictionaries can contain more complex data:
 *
 * @example 
 * 
 * my_dir = {"First Array": [1, 2, 3, 4]} # Assigns an Array to a String key.
 * @summary 
 * 
 *
 * To add a key to an existing dictionary, access it like an existing key and assign to it:
 *
 * @example 
 * 
 * var points_dir = {"White": 50, "Yellow": 75, "Orange": 100}
 * points_dir["Blue"] = 150 # Add "Blue" as a key and assign 150 as its value.
 * @summary 
 * 
 *
 * Finally, dictionaries can contain different types of keys and values in the same dictionary:
 *
 * @example 
 * 
 * # This is a valid dictionary.
 * # To access the string "Nested value" below, use \`my_dir.sub_dir.sub_key\` or \`my_dir["sub_dir"]["sub_key"]\`.
 * # Indexing styles can be mixed and matched depending on your needs.
 * var my_dir = {
 *     "String Key": 5,
 *     4: [1, 2, 3],
 *     7: "Hello",
 *     "sub_dir": {"sub_key": "Nested value"},
 * }
 * @summary 
 * 
 *
 * **Note:** Unlike [Array]s, you can't compare dictionaries directly:
 *
 * @example 
 * 
 * array1 = [1, 2, 3]
 * array2 = [1, 2, 3]
 * func compare_arrays():
 *     print(array1 == array2) # Will print true.
 * dir1 = {"a": 1, "b": 2, "c": 3}
 * dir2 = {"a": 1, "b": 2, "c": 3}
 * func compare_dictionaries():
 *     print(dir1 == dir2) # Will NOT print true.
 * @summary 
 * 
 *
 * You need to first calculate the dictionary's hash with [method hash] before you can compare them:
 *
 * @example 
 * 
 * dir1 = {"a": 1, "b": 2, "c": 3}
 * dir2 = {"a": 1, "b": 2, "c": 3}
 * func compare_dictionaries():
 *     print(dir1.hash() == dir2.hash()) # Will print true.
 * @summary 
 * 
 *
*/
declare class Dictionary<K, V> {

  
/**
 * Dictionary type. Associative container which contains values referenced by unique keys. Dictionaries are composed of pairs of keys (which must be unique) and values. Dictionaries will preserve the insertion order when adding elements, even though this may not be reflected when printing the dictionary. In other programming languages, this data structure is sometimes referred to as an hash map or associative array.
 *
 * You can define a dictionary by placing a comma-separated list of \`key: value\` pairs in curly braces \`{}\`.
 *
 * Erasing elements while iterating over them **is not supported** and will result in undefined behavior.
 *
 * **Note:** Dictionaries are always passed by reference. To get a copy of a dictionary which can be modified independently of the original dictionary, use [method duplicate].
 *
 * Creating a dictionary:
 *
 * @example 
 * 
 * var my_dir = {} # Creates an empty dictionary.
 * var points_dir = {"White": 50, "Yellow": 75, "Orange": 100}
 * var another_dir = {
 *     key1: value1,
 *     key2: value2,
 *     key3: value3,
 * }
 * @summary 
 * 
 *
 * You can access a dictionary's values by referencing the appropriate key. In the above example, \`points_dir["White"]\` will return \`50\`. You can also write \`points_dir.White\`, which is equivalent. However, you'll have to use the bracket syntax if the key you're accessing the dictionary with isn't a fixed string (such as a number or variable).
 *
 * @example 
 * 
 * export(String, "White", "Yellow", "Orange") var my_color
 * var points_dir = {"White": 50, "Yellow": 75, "Orange": 100}
 * func _ready():
 *     # We can't use dot syntax here as \`my_color\` is a variable.
 *     var points = points_dir[my_color]
 * @summary 
 * 
 *
 * In the above code, \`points\` will be assigned the value that is paired with the appropriate color selected in \`my_color\`.
 *
 * Dictionaries can contain more complex data:
 *
 * @example 
 * 
 * my_dir = {"First Array": [1, 2, 3, 4]} # Assigns an Array to a String key.
 * @summary 
 * 
 *
 * To add a key to an existing dictionary, access it like an existing key and assign to it:
 *
 * @example 
 * 
 * var points_dir = {"White": 50, "Yellow": 75, "Orange": 100}
 * points_dir["Blue"] = 150 # Add "Blue" as a key and assign 150 as its value.
 * @summary 
 * 
 *
 * Finally, dictionaries can contain different types of keys and values in the same dictionary:
 *
 * @example 
 * 
 * # This is a valid dictionary.
 * # To access the string "Nested value" below, use \`my_dir.sub_dir.sub_key\` or \`my_dir["sub_dir"]["sub_key"]\`.
 * # Indexing styles can be mixed and matched depending on your needs.
 * var my_dir = {
 *     "String Key": 5,
 *     4: [1, 2, 3],
 *     7: "Hello",
 *     "sub_dir": {"sub_key": "Nested value"},
 * }
 * @summary 
 * 
 *
 * **Note:** Unlike [Array]s, you can't compare dictionaries directly:
 *
 * @example 
 * 
 * array1 = [1, 2, 3]
 * array2 = [1, 2, 3]
 * func compare_arrays():
 *     print(array1 == array2) # Will print true.
 * dir1 = {"a": 1, "b": 2, "c": 3}
 * dir2 = {"a": 1, "b": 2, "c": 3}
 * func compare_dictionaries():
 *     print(dir1 == dir2) # Will NOT print true.
 * @summary 
 * 
 *
 * You need to first calculate the dictionary's hash with [method hash] before you can compare them:
 *
 * @example 
 * 
 * dir1 = {"a": 1, "b": 2, "c": 3}
 * dir2 = {"a": 1, "b": 2, "c": 3}
 * func compare_dictionaries():
 *     print(dir1.hash() == dir2.hash()) # Will print true.
 * @summary 
 * 
 *
*/
  "new"(): Dictionary<K, V>;
  static "new"(): Dictionary<K, V>;




/** Clear the dictionary, removing all key/value pairs. */
clear(): void;

/** Creates a copy of the dictionary, and returns it. The [code]deep[/code] parameter causes inner dictionaries and arrays to be copied recursively, but does not apply to objects. */
duplicate(deep?: boolean): Dictionary<K, V>;

/** Returns [code]true[/code] if the dictionary is empty. */
empty(): boolean;

/** Erase a dictionary key/value pair by key. Returns [code]true[/code] if the given key was present in the dictionary, [code]false[/code] otherwise. Does not erase elements while iterating over the dictionary. */
erase(key: K): boolean;

/** Returns the current value for the specified key in the [Dictionary]. If the key does not exist, the method returns the value of the optional default argument, or [code]null[/code] if it is omitted. */
get(key: K, _default?: K): V;

/**
 * Returns \`true\` if the dictionary has a given key.
 *
 * **Note:** This is equivalent to using the \`in\` operator as follows:
 *
 * @example 
 * 
 * # Will evaluate to \`true\`.
 * if "godot" in {"godot": "engine"}:
 *     pass
 * @summary 
 * 
 *
 * This method (like the \`in\` operator) will evaluate to \`true\` as long as the key exists, even if the associated value is \`null\`.
 *
*/
has(key: K): boolean;

put(key: K, val: V): void;

/** Returns [code]true[/code] if the dictionary has all of the keys in the given array. */
has_all(keys: K[]): boolean;

/**
 * Returns a hashed integer value representing the dictionary contents. This can be used to compare dictionaries by value:
 *
 * @example 
 * 
 * var dict1 = {0: 10}
 * var dict2 = {0: 10}
 * # The line below prints \`true\`, whereas it would have printed \`false\` if both variables were compared directly.
 * print(dict1.hash() == dict2.hash())
 * @summary 
 * 
 *
 * **Note:** Dictionaries with the same keys/values but in a different order will have a different hash.
 *
*/
hash(): int;

/** Returns the list of keys in the [Dictionary]. */
keys(): K[];

/** Returns the size of the dictionary (in pairs). */
size(): int;

/** Returns the list of values in the [Dictionary]. */
values(): V[];


  
}

declare const todict: <K extends string | number | symbol, V>(obj: { [key in K]: V }) => Dictionary<K, V>;
`;
//# sourceMappingURL=dictionary_def.js.map