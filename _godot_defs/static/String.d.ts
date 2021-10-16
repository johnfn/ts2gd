
/**
 * This is the built-in string class (and the one used by GDScript). It supports Unicode and provides all necessary means for string handling. Strings are reference-counted and use a copy-on-write approach, so passing them around is cheap in resources.
 *
*/
declare class String {

  
/**
 * This is the built-in string class (and the one used by GDScript). It supports Unicode and provides all necessary means for string handling. Strings are reference-counted and use a copy-on-write approach, so passing them around is cheap in resources.
 *
*/

  constructor(from: boolean);
  constructor(from: int);
  constructor(from: float);
  constructor(from: Vector2);
  constructor(from: Rect2);
  constructor(from: Vector3);
  constructor(from: Transform2D);
  constructor(from: Plane);
  constructor(from: Quat);
  constructor(from: AABB);
  constructor(from: Basis);
  constructor(from: Transform);
  constructor(from: Color);
  constructor(from: NodePathType);
  constructor(from: RID);
  constructor(from: Dictionary<any, any>);
  constructor(from: any[]);
  constructor(from: PoolByteArray);
  constructor(from: PoolIntArray);
  constructor(from: PoolRealArray);
  constructor(from: PoolStringArray);
  constructor(from: PoolVector2Array);
  constructor(from: PoolVector3Array);
  constructor(from: PoolColorArray);
  static "new"(): String;




















































/** Returns [code]true[/code] if the string begins with the given string. */
begins_with(text: string): boolean;

/** Returns the bigrams (pairs of consecutive letters) of this string. */
bigrams(): PoolStringArray;

/** Returns a copy of the string with special characters escaped using the C language standard. */
c_escape(): string;

/**
 * Returns a copy of the string with escaped characters replaced by their meanings. Supported escape sequences are `\'`, `\"`, `\?`, `\\`, `\a`, `\b`, `\f`, `\n`, `\r`, `\t`, `\v`.
 *
 * **Note:** Unlike the GDScript parser, this method doesn't support the `\uXXXX` escape sequence.
 *
*/
c_unescape(): string;

/** Changes the case of some letters. Replaces underscores with spaces, adds spaces before in-word uppercase characters, converts all letters to lowercase, then capitalizes the first letter and every letter following a space character. For [code]capitalize camelCase mixed_with_underscores[/code], it will return [code]Capitalize Camel Case Mixed With Underscores[/code]. */
capitalize(): string;

/**
 * Performs a case-sensitive comparison to another string. Returns `-1` if less than, `1` if greater than, or `0` if equal. "less than" or "greater than" are determined by the [url=https://en.wikipedia.org/wiki/List_of_Unicode_characters]Unicode code points[/url] of each string, which roughly matches the alphabetical order.
 *
 * **Behavior with different string lengths:** Returns `1` if the "base" string is longer than the `to` string or `-1` if the "base" string is shorter than the `to` string. Keep in mind this length is determined by the number of Unicode codepoints, **not** the actual visible characters.
 *
 * **Behavior with empty strings:** Returns `-1` if the "base" string is empty, `1` if the `to` string is empty or `0` if both strings are empty.
 *
 * To get a boolean result from a string comparison, use the `==` operator instead. See also [method nocasecmp_to].
 *
*/
casecmp_to(to: string): int;

/** Returns the number of occurrences of substring [code]what[/code] between [code]from[/code] and [code]to[/code] positions. If [code]from[/code] and [code]to[/code] equals 0 the whole string will be used. If only [code]to[/code] equals 0 the remained substring will be used. */
count(what: string, from?: int, to?: int): int;

/** Returns the number of occurrences of substring [code]what[/code] (ignoring case) between [code]from[/code] and [code]to[/code] positions. If [code]from[/code] and [code]to[/code] equals 0 the whole string will be used. If only [code]to[/code] equals 0 the remained substring will be used. */
countn(what: string, from?: int, to?: int): int;

/** Returns a copy of the string with indentation (leading tabs and spaces) removed. */
dedent(): string;

/** Returns [code]true[/code] if the length of the string equals [code]0[/code]. */
empty(): boolean;

/** Returns [code]true[/code] if the string ends with the given string. */
ends_with(text: string): boolean;

/** Erases [code]chars[/code] characters from the string starting from [code]position[/code]. */
erase(position: int, chars: int): any;

/**
 * Finds the first occurrence of a substring. Returns the starting position of the substring or `-1` if not found. Optionally, the initial search index can be passed.
 *
 * **Note:** If you just want to know whether a string contains a substring, use the `in` operator as follows:
 *
 * @example 
 * 
 * # Will evaluate to `false`.
 * if "i" in "team":
 *     pass
 * @summary 
 * 
 *
*/
find(what: string, from?: int): int;

/** Finds the last occurrence of a substring. Returns the starting position of the substring or [code]-1[/code] if not found. */
find_last(what: string): int;

/** Finds the first occurrence of a substring, ignoring case. Returns the starting position of the substring or [code]-1[/code] if not found. Optionally, the initial search index can be passed. */
findn(what: string, from?: int): int;

/** Formats the string by replacing all occurrences of [code]placeholder[/code] with [code]values[/code]. */
format(values: any, placeholder?: string): string;

/** If the string is a valid file path, returns the base directory name. */
get_base_dir(): string;

/** If the string is a valid file path, returns the full file path without the extension. */
get_basename(): string;

/**
 * Returns the extension without the leading period character (`.`) if the string is a valid file name or path. If the string does not contain an extension, returns an empty string instead.
 *
 * @example 
 * 
 * print("/path/to/file.txt".get_extension())  # "txt"
 * print("file.txt".get_extension())  # "txt"
 * print("file.sample.txt".get_extension())  # "txt"
 * print(".txt".get_extension())  # "txt"
 * print("file.txt.".get_extension())  # "" (empty string)
 * print("file.txt..".get_extension())  # "" (empty string)
 * print("txt".get_extension())  # "" (empty string)
 * print("".get_extension())  # "" (empty string)
 * @summary 
 * 
 *
*/
get_extension(): string;

/** If the string is a valid file path, returns the filename. */
get_file(): string;

/** Hashes the string and returns a 32-bit integer. */
hash(): int;

/**
 * Converts a string containing a hexadecimal number into an integer. Hexadecimal strings are expected to be prefixed with "`0x`" otherwise `0` is returned.
 *
 * @example 
 * 
 * print("0xff".hex_to_int()) # Print "255"
 * @summary 
 * 
 *
*/
hex_to_int(): int;

/**
 * Escapes (encodes) a string to URL friendly format. Also referred to as 'URL encode'.
 *
 * @example 
 * 
 * print("https://example.org/?escaped=" + "Godot Engine:'docs'".http_escape())
 * @summary 
 * 
 *
*/
http_escape(): string;

/**
 * Unescapes (decodes) a string in URL encoded format. Also referred to as 'URL decode'.
 *
 * @example 
 * 
 * print("https://example.org/?escaped=" + "Godot%20Engine%3A%27docs%27".http_unescape())
 * @summary 
 * 
 *
*/
http_unescape(): string;

/**
 * Converts `size` represented as number of bytes to human-readable format using internationalized set of data size units, namely: B, KiB, MiB, GiB, TiB, PiB, EiB. Note that the next smallest unit is picked automatically to hold at most 1024 units.
 *
 * @example 
 * 
 * var bytes = 133790307
 * var size = String.humanize_size(bytes)
 * print(size) # prints "127.5 MiB"
 * @summary 
 * 
 *
*/
humanize_size(size: int): string;

/** Returns a copy of the string with the substring [code]what[/code] inserted at the given position. */
insert(position: int, what: string): string;

/** If the string is a path to a file or directory, returns [code]true[/code] if the path is absolute. */
is_abs_path(): boolean;

/** If the string is a path to a file or directory, returns [code]true[/code] if the path is relative. */
is_rel_path(): boolean;

/** Returns [code]true[/code] if this string is a subsequence of the given string. */
is_subsequence_of(text: string): boolean;

/** Returns [code]true[/code] if this string is a subsequence of the given string, without considering case. */
is_subsequence_ofi(text: string): boolean;

/**
 * Returns `true` if this string is free from characters that aren't allowed in file names, those being:
 *
 * `: / \ ? * " | % < >`
 *
*/
is_valid_filename(): boolean;

/** Returns [code]true[/code] if this string contains a valid float. */
is_valid_float(): boolean;

/** Returns [code]true[/code] if this string contains a valid hexadecimal number. If [code]with_prefix[/code] is [code]true[/code], then a validity of the hexadecimal number is determined by [code]0x[/code] prefix, for instance: [code]0xDEADC0DE[/code]. */
is_valid_hex_number(with_prefix?: boolean): boolean;

/** Returns [code]true[/code] if this string contains a valid color in hexadecimal HTML notation. Other HTML notations such as named colors or [code]hsl()[/code] colors aren't considered valid by this method and will return [code]false[/code]. */
is_valid_html_color(): boolean;

/** Returns [code]true[/code] if this string is a valid identifier. A valid identifier may contain only letters, digits and underscores ([code]_[/code]) and the first character may not be a digit. */
is_valid_identifier(): boolean;

/** Returns [code]true[/code] if this string contains a valid integer. */
is_valid_integer(): boolean;

/** Returns [code]true[/code] if this string contains only a well-formatted IPv4 or IPv6 address. This method considers [url=https://en.wikipedia.org/wiki/Reserved_IP_addresses]reserved IP addresses[/url] such as [code]0.0.0.0[/code] as valid. */
is_valid_ip_address(): boolean;

/** Returns a copy of the string with special characters escaped using the JSON standard. */
json_escape(): string;

/** Returns a number of characters from the left of the string. */
left(position: int): string;

/** Returns the string's amount of characters. */
length(): int;

/**
 * Returns a copy of the string with characters removed from the left. The `chars` argument is a string specifying the set of characters to be removed.
 *
 * **Note:** The `chars` is not a prefix. See [method trim_prefix] method that will remove a single prefix string rather than a set of characters.
 *
*/
lstrip(chars: string): string;

/** Does a simple case-sensitive expression match, where [code]"*"[/code] matches zero or more arbitrary characters and [code]"?"[/code] matches any single character except a period ([code]"."[/code]). */
match(expr: string): boolean;

/** Does a simple case-insensitive expression match, where [code]"*"[/code] matches zero or more arbitrary characters and [code]"?"[/code] matches any single character except a period ([code]"."[/code]). */
matchn(expr: string): boolean;

/** Returns the MD5 hash of the string as an array of bytes. */
md5_buffer(): PoolByteArray;

/** Returns the MD5 hash of the string as a string. */
md5_text(): string;

/**
 * Performs a case-insensitive **natural order** comparison to another string. Returns `-1` if less than, `1` if greater than, or `0` if equal. "less than" or "greater than" are determined by the [url=https://en.wikipedia.org/wiki/List_of_Unicode_characters]Unicode code points[/url] of each string, which roughly matches the alphabetical order. Internally, lowercase characters will be converted to uppercase during the comparison.
 *
 * When used for sorting, natural order comparison will order suites of numbers as expected by most people. If you sort the numbers from 1 to 10 using natural order, you will get `[1, 2, 3, ...]` instead of `[1, 10, 2, 3, ...]`.
 *
 * **Behavior with different string lengths:** Returns `1` if the "base" string is longer than the `to` string or `-1` if the "base" string is shorter than the `to` string. Keep in mind this length is determined by the number of Unicode codepoints, **not** the actual visible characters.
 *
 * **Behavior with empty strings:** Returns `-1` if the "base" string is empty, `1` if the `to` string is empty or `0` if both strings are empty.
 *
 * To get a boolean result from a string comparison, use the `==` operator instead. See also [method nocasecmp_to] and [method casecmp_to].
 *
*/
naturalnocasecmp_to(to: string): int;

/**
 * Performs a case-insensitive comparison to another string. Returns `-1` if less than, `1` if greater than, or `0` if equal. "less than" or "greater than" are determined by the [url=https://en.wikipedia.org/wiki/List_of_Unicode_characters]Unicode code points[/url] of each string, which roughly matches the alphabetical order. Internally, lowercase characters will be converted to uppercase during the comparison.
 *
 * **Behavior with different string lengths:** Returns `1` if the "base" string is longer than the `to` string or `-1` if the "base" string is shorter than the `to` string. Keep in mind this length is determined by the number of Unicode codepoints, **not** the actual visible characters.
 *
 * **Behavior with empty strings:** Returns `-1` if the "base" string is empty, `1` if the `to` string is empty or `0` if both strings are empty.
 *
 * To get a boolean result from a string comparison, use the `==` operator instead. See also [method casecmp_to].
 *
*/
nocasecmp_to(to: string): int;

/** Returns the character code at position [code]at[/code]. */
ord_at(at: int): int;

/** Formats a number to have an exact number of [code]digits[/code] after the decimal point. */
pad_decimals(digits: int): string;

/** Formats a number to have an exact number of [code]digits[/code] before the decimal point. */
pad_zeros(digits: int): string;

/** Decode a percent-encoded string. See [method percent_encode]. */
percent_decode(): string;

/** Percent-encodes a string. Encodes parameters in a URL when sending a HTTP GET request (and bodies of form-urlencoded POST requests). */
percent_encode(): string;

/** If the string is a path, this concatenates [code]file[/code] at the end of the string as a subpath. E.g. [code]"this/is".plus_file("path") == "this/is/path"[/code]. */
plus_file(file: string): string;

/** Returns original string repeated a number of times. The number of repetitions is given by the argument. */
repeat(count: int): string;

/** Replaces occurrences of a case-sensitive substring with the given one inside the string. */
replace(what: string, forwhat: string): string;

/** Replaces occurrences of a case-insensitive substring with the given one inside the string. */
replacen(what: string, forwhat: string): string;

/** Performs a case-sensitive search for a substring, but starts from the end of the string instead of the beginning. */
rfind(what: string, from?: int): int;

/** Performs a case-insensitive search for a substring, but starts from the end of the string instead of the beginning. */
rfindn(what: string, from?: int): int;

/** Returns the right side of the string from a given position. */
right(position: int): string;

/**
 * Splits the string by a `delimiter` string and returns an array of the substrings, starting from right.
 *
 * The splits in the returned array are sorted in the same order as the original string, from left to right.
 *
 * If `maxsplit` is specified, it defines the number of splits to do from the right up to `maxsplit`. The default value of 0 means that all items are split, thus giving the same result as [method split].
 *
 * Example:
 *
 * @example 
 * 
 * var some_string = "One,Two,Three,Four"
 * var some_array = some_string.rsplit(",", true, 1)
 * print(some_array.size()) # Prints 2
 * print(some_array[0]) # Prints "Four"
 * print(some_array[1]) # Prints "Three,Two,One"
 * @summary 
 * 
 *
*/
rsplit(delimiter: string, allow_empty?: boolean, maxsplit?: int): PoolStringArray;

/**
 * Returns a copy of the string with characters removed from the right. The `chars` argument is a string specifying the set of characters to be removed.
 *
 * **Note:** The `chars` is not a suffix. See [method trim_suffix] method that will remove a single suffix string rather than a set of characters.
 *
*/
rstrip(chars: string): string;

/** Returns the SHA-1 hash of the string as an array of bytes. */
sha1_buffer(): PoolByteArray;

/** Returns the SHA-1 hash of the string as a string. */
sha1_text(): string;

/** Returns the SHA-256 hash of the string as an array of bytes. */
sha256_buffer(): PoolByteArray;

/** Returns the SHA-256 hash of the string as a string. */
sha256_text(): string;

/** Returns the similarity index of the text compared to this string. 1 means totally similar and 0 means totally dissimilar. */
similarity(text: string): float;

/** Returns a simplified canonical path. */
simplify_path(): string;

/**
 * Splits the string by a `delimiter` string and returns an array of the substrings. The `delimiter` can be of any length.
 *
 * If `maxsplit` is specified, it defines the number of splits to do from the left up to `maxsplit`. The default value of `0` means that all items are split.
 *
 * Example:
 *
 * @example 
 * 
 * var some_string = "One,Two,Three,Four"
 * var some_array = some_string.split(",", true, 1)
 * print(some_array.size()) # Prints 2
 * print(some_array[0]) # Prints "One"
 * print(some_array[1]) # Prints "Two,Three,Four"
 * @summary 
 * 
 *
 * If you need to split strings with more complex rules, use the [RegEx] class instead.
 *
*/
split(delimiter: string, allow_empty?: boolean, maxsplit?: int): PoolStringArray;

/**
 * Splits the string in floats by using a delimiter string and returns an array of the substrings.
 *
 * For example, `"1,2.5,3"` will return `[1,2.5,3]` if split by `","`.
 *
*/
split_floats(delimiter: string, allow_empty?: boolean): PoolRealArray;

/** Returns a copy of the string stripped of any non-printable character (including tabulations, spaces and line breaks) at the beginning and the end. The optional arguments are used to toggle stripping on the left and right edges respectively. */
strip_edges(left?: boolean, right?: boolean): string;

/** Returns a copy of the string stripped of any escape character. These include all non-printable control characters of the first page of the ASCII table (< 32), such as tabulation ([code]\t[/code] in C) and newline ([code]\n[/code] and [code]\r[/code]) characters, but not spaces. */
strip_escapes(): string;

/** Returns part of the string from the position [code]from[/code] with length [code]len[/code]. Argument [code]len[/code] is optional and using [code]-1[/code] will return remaining characters from given position. */
substr(from: int, len?: int): string;

/** Converts the String (which is a character array) to [PoolByteArray] (which is an array of bytes). The conversion is faster compared to [method to_utf8], as this method assumes that all the characters in the String are ASCII characters. */
to_ascii(): PoolByteArray;

/** Converts a string containing a decimal number into a [code]float[/code]. */
to_float(): float;

/** Converts a string containing an integer number into an [code]int[/code]. */
to_int(): int;

/** Returns the string converted to lowercase. */
to_lower(): string;

/** Returns the string converted to uppercase. */
to_upper(): string;

/** Converts the String (which is an array of characters) to [PoolByteArray] (which is an array of bytes). The conversion is a bit slower than [method to_ascii], but supports all UTF-8 characters. Therefore, you should prefer this function over [method to_ascii]. */
to_utf8(): PoolByteArray;

/** Converts the String (which is an array of characters) to [PoolByteArray] (which is an array of bytes). */
to_wchar(): PoolByteArray;

/** Removes a given string from the start if it starts with it or leaves the string unchanged. */
trim_prefix(prefix: string): string;

/** Removes a given string from the end if it ends with it or leaves the string unchanged. */
trim_suffix(suffix: string): string;

/** Removes any characters from the string that are prohibited in [Node] names ([code].[/code] [code]:[/code] [code]@[/code] [code]/[/code] [code]"[/code]). */
validate_node_name(): string;

/** Returns a copy of the string with special characters escaped using the XML standard. */
xml_escape(): string;

/** Returns a copy of the string with escaped characters replaced by their meanings according to the XML standard. */
xml_unescape(): string;

  // connect<T extends SignalsOf<String>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<StringSignals>>(signal: T, method: SignalFunction<StringSignals[T]>): number;




}

declare class StringSignals {
  
}
