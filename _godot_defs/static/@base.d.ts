

declare interface Boolean {

}

// These are the 4 constants found in @GDScript.xml

/**
 * Positive floating-point infinity. This is the result of floating-point
 * division when the divisor is [code]0.0[/code]. For negative infinity, use
 * [code]-INF[/code]. Dividing by [code]-0.0[/code] will result in negative
 * infinity if the numerator is positive, so dividing by [code]0.0[/code] is not
 * the same as dividing by [code]-0.0[/code] (despite [code]0.0 == -0.0[/code]
 * returning [code]true[/code]).
 *
 * [b]Note:[/b] Numeric infinity is only a concept with floating-point numbers,
 * and has no equivalent for integers.  Dividing an integer number by
 * [code]0[/code] will not result in [constant INF] and will result in a
 * run-time error instead.
 */
declare const INF: float;

/**
 * Constant that represents how many times the diameter of a circle fits around
 * its perimeter. This is equivalent to [code]TAU / 2[/code].
 */
declare const PI: float;

/**
 * The circle constant, the circumference of the unit circle in radians. This is
 * equivalent to [code]PI * 2[/code], or 360 degrees in rotations.
 */
declare const TAU: float;

/**
 * "Not a Number", an invalid floating-point value. [constant NAN] has special
 * properties, including that it is not equal to itself ([code]NAN == NAN[/code]
 * returns [code]false[/code]). It is output by some invalid operations, such as
 * dividing floating-point [code]0.0[/code] by [code]0.0[/code].
 *
 * [b]Note:[/b] "Not a Number" is only a concept with floating-point numbers,
 * and has no equivalent for integers. Dividing an integer [code]0[/code] by
 * [code]0[/code] will not result in [constant NAN] and will result in a
 * run-time error instead.
 */
declare const NAN: float;

// Contents of these two interfaces were copied from FuncRef.d.ts

declare interface CallableFunction {
  /** The name of the referenced function. */
  function: string

  /** Calls the referenced function previously set in [member function] or [method @GDScript.funcref]. */
  call_func(...args: any[]): any

  /** Calls the referenced function previously set in [member function] or [method @GDScript.funcref]. Contrarily to [method call_func], this method does not support a variable number of arguments but expects all parameters to be passed via a single [Array]. */
  call_funcv(arg_array: any[]): any

  /** Returns whether the object still exists and has the function assigned. */
  is_valid(): boolean

  /** The object containing the referenced function. This object must be of a type actually inheriting from [Object], not a built-in type such as [int], [Vector2] or [Dictionary]. */
  set_instance(instance: Object): void

  rpc<T extends (...args: any[]) => void>(this: T, ...args: Parameters<T>): void;

  rpc_id<T extends (...args: any[]) => void>(this: T, id: int, ...args: Parameters<T>): void;
}

interface Function {
  /** The name of the referenced function. */
  function: string;

  /** Calls the referenced function previously set in [member function] or [method @GDScript.funcref]. */
  call_func(...args: any[]): any;

  /** Calls the referenced function previously set in [member function] or [method @GDScript.funcref]. Contrarily to [method call_func], this method does not support a variable number of arguments but expects all parameters to be passed via a single [Array]. */
  call_funcv(arg_array: any[]): any;

  /** Returns whether the object still exists and has the function assigned. */
  is_valid(): boolean;

  /** The object containing the referenced function. This object must be of a type actually inheriting from [Object], not a built-in type such as [int], [Vector2] or [Dictionary]. */
  set_instance(instance: Object): void;
}

declare enum ExportHint {
  RANGE,
  EXP,
  FILE,
  DIR,
  GLOBAL,
  MULTILINE,
  EASE,
  RGB,
  RGBA,
  FLAGS,
  LAYERS_2D_PHYSICS,
  LAYERS_2D_RENDER,
  LAYERS_3D_PHYSICS,
  LAYERS_3D_RENDER
}

declare function exports(...args: (ExportHint | string | number)[]): (target: Node, name: string) => void;
declare function exports(target: Node, name: string): void;
declare const export_flags: (...flags: any[]) => (target: Node, name: string) => void
declare function autoload(target: typeof Node): void
declare function tool(target: typeof Node): void;

declare type int = number;
declare type float = number;

declare function int(x: number): number
declare function float(x: number): number

declare type NodePathType = string

/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;

/**
 * From T, pick a set of properties whose keys are in the union K
 */
 type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

type GeneratorReturnType<T extends Generator> = T extends Generator<any, infer R, any> ? R: never;

/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

// Used for typing connect()
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
type KeysOnly<T, V> = { [K in keyof T as T[K] extends V ? K : never]: T[K] }
type KeysMatching<T, V> = {[K in keyof T]-?: T[K] extends V ? K : never}[keyof T];
type SignalsOf<T> = KeysMatching<T, Signal<any>>;
type SignalFunction<T> = T extends Signal<infer R> ? R : never;
type SignalReturnValue<T> = T extends Signal<infer U> ? ReturnType<U> : never;

// Used for typing rpc(), rpc_id() etc
type FunctionsOf<T> = KeysMatching<T, Function>;

interface FunctionConstructor {
  (...args: string[]): Function;
}

interface IArguments {

}

interface NewableFunction {

}

interface Number {

}

interface String {
  [Symbol.iterator](): IterableIterator<string>;
}

interface RegExp {

}

// This puts Dictionary methods on *all* classes, which is incorrect and also
// causes clashes with Node because they have differenty defined duplicate
// methods.
// interface Object extends Dictionary { }

declare function Dict<T>(obj: T): Dictionary<string, any> & T

interface IteratorYieldResult<TYield> {
  done?: false;
  value: TYield;
}

interface IteratorReturnResult<TReturn> {
  done: true;
  value: TReturn;
}

declare const print: (...args: any[]) => void;

type IteratorResult<T, TReturn = any> = IteratorYieldResult<T> | IteratorReturnResult<TReturn>;

interface Iterator<T, TReturn = any, TNext = undefined> extends Object {
  // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
  next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
  return?(value?: TReturn): IteratorResult<T, TReturn>;
  throw?(e?: any): IteratorResult<T, TReturn>;

  $completed: Signal<() => TReturn>;
}

interface Generator<T = unknown, TReturn = any, TNext = unknown> extends Iterator<T, TReturn, TNext> {
  // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
  next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
  return(value: TReturn): IteratorResult<T, TReturn>;
  throw(e: any): IteratorResult<T, TReturn>;
  [Symbol.iterator](): Generator<T, TReturn, TNext>;

  $completed: Signal<() => TReturn>;
}

interface Symbol { }

interface SymbolConstructor {
  /**
   * A method that returns the default iterator for an object. Called by the semantics of the
   * for-of statement.
   */
  readonly iterator: symbol;
}

declare var Symbol: SymbolConstructor;

interface Iterable<T> {
  [Symbol.iterator](): Iterator<T>;
}

interface IterableIterator<T> extends Iterator<T> {
  [Symbol.iterator](): IterableIterator<T>;

  // Generator functions found on GDScriptFunctionState

  is_valid(extended_check: boolean): boolean;
  resume(arg?: any): void;
}



type ReadonlyArray<T> = {

        /** Returns the last element of the array. Prints an error and returns [code]null[/code] if the array is empty.
                [b]Note:[/b] Calling this function is not the same as writing [code]array[-1][/code]. If the array is empty, accessing by index will pause project execution when running from the editor. */
        back(): T;
      
      }

type FlatArray<Arr, Depth extends number> = {
        "done": Arr,
        "recur": Arr extends ReadonlyArray<infer InnerArr>
            ? FlatArray<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]>
            : Arr
    }[Depth extends -1 ? "done" : "recur"];

interface Array<T> {
  /** Appends an element at the end of the array (alias of [method push_back]). */
  append(value: T): void;

  /** Returns the last element of the array. Prints an error and returns [code]null[/code] if the array is empty.
          [b]Note:[/b] Calling this function is not the same as writing [code]array[-1][/code]. If the array is empty, accessing by index will pause project execution when running from the editor. */
  back(): T;

  /** Finds the index of an existing value (or the insertion index that maintains sorting order, if the value is not yet present in the array) using binary search. Optionally, a [code]before[/code] specifier can be passed. If [code]false[/code], the returned index comes after all existing entries of the value in the array.
          [b]Note:[/b] Calling [method bsearch] on an unsorted array results in unexpected behavior. */
  bsearch(value: T, before?: boolean): number;

  /** Finds the index of an existing value (or the insertion index that maintains sorting order, if the value is not yet present in the array) using binary search and a custom comparison method. Optionally, a [code]before[/code] specifier can be passed. If [code]false[/code], the returned index comes after all existing entries of the value in the array. The custom method receives two arguments (an element from the array and the value searched for) and must return [code]true[/code] if the first argument is less than the second, and return [code]false[/code] otherwise.
          [b]Note:[/b] Calling [method bsearch] on an unsorted array results in unexpected behavior. */
  bsearch_custom(value: T, obj: Object, func: String, before?: boolean): number;

  /** Clears the array. This is equivalent to using [method resize] with a size of [code]0[/code]. */
  clear(): void;

  flatten(): FlatArray<T, 20>[];

  /** Returns the number of times an element is in the array. */
  count(value: T): number;

  /** Returns a copy of the array.
          If [code]deep[/code] is [code]true[/code], a deep copy is performed: all nested arrays and dictionaries are duplicated and will not be shared with the original array. If [code]false[/code], a shallow copy is made and references to the original nested arrays and dictionaries are kept, so that modifying a sub-array or dictionary in the copy will also impact those referenced in the source array. */
  duplicate(deep?: boolean): T[];

  /** Returns [code]true[/code] if the array is empty. */
  empty(): boolean;

  /** Removes the first occurrence of a value from the array. */
  erase(value: T): void;

  /** Searches the array for a value and returns its index or [code]-1[/code] if not found. Optionally, the initial search index can be passed. */
  find(what: T, from?: number): number;

  /** Searches the array in reverse order for a value and returns its index or [code]-1[/code] if not found. */
  find_last(value: T): number;

  /** Returns the first element of the array. Prints an error and returns [code]null[/code] if the array is empty.
          [b]Note:[/b] Calling this function is not the same as writing [code]array[0][/code]. If the array is empty, accessing by index will pause project execution when running from the editor. */
  front(): T;

  /** Returns [code]true[/code] if the array contains the given value.
          [codeblocks]
          [gdscript]
          print(["inside", 7].has("inside")) # True
          print(["inside", 7].has("outside")) # False
          print(["inside", 7].has(7)) # True
          print(["inside", 7].has("7")) # False
          [/gdscript]
          [csharp]
          var arr = new Godot.Collections.Array{"inside", 7};
          // has is renamed to Contains
          GD.Print(arr.Contains("inside")); // True
          GD.Print(arr.Contains("outside")); // False
          GD.Print(arr.Contains(7)); // True
          GD.Print(arr.Contains("7")); // False
          [/csharp]
          [/codeblocks]
  
          [b]Note:[/b] This is equivalent to using the [code]in[/code] operator as follows:
          [codeblocks]
          [gdscript]
          # Will evaluate to `true`.
          if 2 in [2, 4, 6, 8]:
              print("Containes!")
          [/gdscript]
          [csharp]
          // As there is no "in" keyword in C#, you have to use Contains
          var array = new Godot.Collections.Array{2, 4, 6, 8};
          if (array.Contains(2))
          {
              GD.Print("Containes!");
          }
          [/csharp]
          [/codeblocks] */
  has(value: T): boolean;

  /** Returns a hashed integer value representing the array contents. */
  hash(): number;

  /** Inserts a new element at a given position in the array. The position must be valid, or at the end of the array ([code]pos == size()[/code]). */
  insert(position: number, value: T): void;

  /** Reverses the order of the elements in the array. */
  invert(): void;

  map<U>(fn: (elem: T) => U): U[];
  filter(fn: (elem: T) => boolean): T[];

  /** Returns the maximum value contained in the array if all elements are of comparable types. If the elements can't be compared, [code]null[/code] is returned. */
  max(): T | null;

  /** Returns the element in the array for which calling the passed in function on returns the largest value. */
  max_by(fn: (elem: T) => number): T | null

  /** Returns the minimum value contained in the array if all elements are of comparable types. If the elements can't be compared, [code]null[/code] is returned. */
  min(): T | null;

  /** Returns the element in the array for which calling the passed in function on returns the smallest value. */
  min_by(fn: (elem: T) => number): T | null;

  random_element(): T | null;

  join(join_str: string): string;

  /** Removes and returns the last element of the array. Returns [code]null[/code] if the array is empty, without printing an error message. */
  pop_back(): T | null;

  /** Removes and returns the first element of the array. Returns [code]null[/code] if the array is empty, without printing an error message. */
  pop_front(): T | null;

  /** Appends an element at the end of the array. */
  push_back(value: T): void;

  /** Adds an element at the beginning of the array. */
  push_front(value: T): void;

  /** Removes an element from the array by index. If the index does not exist in the array, nothing happens. */
  remove(position: number): void;

  /** Resizes the array to contain a different number of elements. If the array size is smaller, elements are cleared, if bigger, new elements are [code]null[/code]. */
  resize(size: number): void;

  /** Searches the array in reverse order. Optionally, a start search index can be passed. If negative, the start index is considered relative to the end of the array. */
  rfind(what: T, from?: number): number;

  /** Shuffles the array such that the items will have a random order. This method uses the global random number generator common to methods such as [method @GDScript.randi]. Call [method @GDScript.randomize] to ensure that a new seed will be used each time if you want non-reproducible shuffling. */
  shuffle(): void;

  /** Returns the number of elements in the array. */
  size(): number;

  /** Duplicates the subset described in the function and returns it in an array, deeply copying the array if [code]deep[/code] is [code]true[/code]. Lower and upper index are inclusive, with the [code]step[/code] describing the change between indices while slicing. */
  slice(begin: number, end: number, step?: number, deep?: boolean): T[];

  /** Sorts the array.
          [b]Note:[/b] Strings are sorted in alphabetical order (as opposed to natural order). This may lead to unexpected behavior when sorting an array of strings ending with a sequence of numbers. Consider the following example:
          [codeblocks]
          [gdscript]
          var strings = ["string1", "string2", "string10", "string11"]
          strings.sort()
          print(strings) # Prints [string1, string10, string11, string2]
          [/gdscript]
          [csharp]
          // There is no sort support for Godot.Collections.Array
          [/csharp]
          [/codeblocks] */
  sort(): void;

  /** Sorts the array using a custom method. The arguments are an object that holds the method and the name of such method. The custom method receives two arguments (a pair of elements from the array) and must return either [code]true[/code] or [code]false[/code].
          [b]Note:[/b] you cannot randomize the return value as the heapsort algorithm expects a deterministic result. Doing so will result in unexpected behavior.
          [codeblocks]
          [gdscript]
          class MyCustomSorter:
              static func sort_ascending(a, b):
                  if a[0] < b[0]:
                      return true
                  return false
  
          var my_items = [[5, "Potato"], [9, "Rice"], [4, "Tomato"]]
          my_items.sort_custom(MyCustomSorter, "sort_ascending")
          print(my_items) # Prints [[4, Tomato], [5, Potato], [9, Rice]].
          [/gdscript]
          [csharp]
          // There is no custom sort support for Godot.Collections.Array
          [/csharp]
          [/codeblocks] */
  sort_custom(obj: Object, func: String): void;



  /** Generic array which can contain several elements of any type, accessible by a numerical index starting at 0. Negative indices can be used to count from the back, like in Python (-1 is the last element, -2 the second to last, etc.).
      [b]Example:[/b]
      [codeblocks]
      [gdscript]
      var array = ["One", 2, 3, "Four"]
      print(array[0]) # One.
      print(array[2]) # 3.
      print(array[-1]) # Four.
      array[2] = "Three"
      print(array[-2]) # Three.
      [/gdscript]
      [csharp]
      var array = new Godot.Collections.Array{"One", 2, 3, "Four"};
      GD.Print(array[0]); // One.
      GD.Print(array[2]); // 3.
      GD.Print(array[array.Count - 1]); // Four.
      array[2] = "Three";
      GD.Print(array[array.Count - 2]); // Three.
      [/csharp]
      [/codeblocks]
      Arrays can be concatenated using the [code]+[/code] operator:
      [codeblocks]
      [gdscript]
      var array1 = ["One", 2]
      var array2 = [3, "Four"]
      print(array1 + array2) # ["One", 2, 3, "Four"]
      [/gdscript]
      [csharp]
      // Array concatenation is not possible with C# arrays, but is with Godot.Collections.Array.
      var array1 = new Godot.Collections.Array("One", 2);
      var array2 = new Godot.Collections.Array(3, "Four");
      GD.Print(array1 + array2); // Prints [One, 2, 3, Four]
      [/csharp]
      [/codeblocks]
      [b]Note:[/b] Arrays are always passed by reference. To get a copy of an array which can be modified independently of the original array, use [method duplicate]. */

//   (from: PackedColorArray): this;
//   (from: PackedVector3Array): this;
//   (from: PackedVector2Array): this;
//   (from: PackedStringArray): this;
//   (from: PackedFloat64Array): this;
//   (from: PackedFloat32Array): this;
//   (from: PackedInt64Array): this;
//   (from: PackedInt32Array): this;
//   (from: PackedByteArray): this;
  new(): this;

  [n: number]: T;
  [Symbol.iterator](): IterableIterator<T>;
}


/**
 * Dictionary type. Associative container which contains values referenced by unique keys. Dictionaries are composed of pairs of keys (which must be unique) and values. Dictionaries will preserve the insertion order when adding elements, even though this may not be reflected when printing the dictionary. In other programming languages, this data structure is sometimes referred to as an hash map or associative array.
 *
 * You can define a dictionary by placing a comma-separated list of `key: value` pairs in curly braces `{}`.
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
 * You can access a dictionary's values by referencing the appropriate key. In the above example, `points_dir["White"]` will return `50`. You can also write `points_dir.White`, which is equivalent. However, you'll have to use the bracket syntax if the key you're accessing the dictionary with isn't a fixed string (such as a number or variable).
 *
 * @example 
 * 
 * export(String, "White", "Yellow", "Orange") var my_color
 * var points_dir = {"White": 50, "Yellow": 75, "Orange": 100}
 * func _ready():
 *     # We can't use dot syntax here as `my_color` is a variable.
 *     var points = points_dir[my_color]
 * @summary 
 * 
 *
 * In the above code, `points` will be assigned the value that is paired with the appropriate color selected in `my_color`.
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
 * # To access the string "Nested value" below, use `my_dir.sub_dir.sub_key` or `my_dir["sub_dir"]["sub_key"]`.
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
 * You can define a dictionary by placing a comma-separated list of `key: value` pairs in curly braces `{}`.
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
 * You can access a dictionary's values by referencing the appropriate key. In the above example, `points_dir["White"]` will return `50`. You can also write `points_dir.White`, which is equivalent. However, you'll have to use the bracket syntax if the key you're accessing the dictionary with isn't a fixed string (such as a number or variable).
 *
 * @example 
 * 
 * export(String, "White", "Yellow", "Orange") var my_color
 * var points_dir = {"White": 50, "Yellow": 75, "Orange": 100}
 * func _ready():
 *     # We can't use dot syntax here as `my_color` is a variable.
 *     var points = points_dir[my_color]
 * @summary 
 * 
 *
 * In the above code, `points` will be assigned the value that is paired with the appropriate color selected in `my_color`.
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
 * # To access the string "Nested value" below, use `my_dir.sub_dir.sub_key` or `my_dir["sub_dir"]["sub_key"]`.
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
 * Returns `true` if the dictionary has a given key.
 *
 * **Note:** This is equivalent to using the `in` operator as follows:
 *
 * @example 
 * 
 * # Will evaluate to `true`.
 * if "godot" in {"godot": "engine"}:
 *     pass
 * @summary 
 * 
 *
 * This method (like the `in` operator) will evaluate to `true` as long as the key exists, even if the associated value is `null`.
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
 * # The line below prints `true`, whereas it would have printed `false` if both variables were compared directly.
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

/** Returns the list of key, value tuples in the [Dictionary]. */
entries(): [K, V][];
  
}

declare const todict: <K extends string | number | symbol, V>(obj: { [key in K]: V }) => Dictionary<K, V>;


declare class PackedScene<T> extends Resource {

  
  /** A simplified interface to a scene file. Provides access to operations and checks that can be performed on the scene resource itself.
      Can be used to save a node to a file. When saving, the node as well as all the node it owns get saved (see [code]owner[/code] property on [Node]).
      [b]Note:[/b] The node doesn't need to own itself.
      [b]Example of loading a saved scene:[/b]
      [codeblock]
      # Use `load()` instead of `preload()` if the path isn't known at compile-time.
      var scene = preload("res://scene.tscn").instance()
      # Add the node as a child of the node the script is attached to.
      add_child(scene)
      [/codeblock]
      [b]Example of saving a node with different owners:[/b] The following example creates 3 objects: [code]Node2D[/code] ([code]node[/code]), [code]RigidBody2D[/code] ([code]rigid[/code]) and [code]CollisionObject2D[/code] ([code]collision[/code]). [code]collision[/code] is a child of [code]rigid[/code] which is a child of [code]node[/code]. Only [code]rigid[/code] is owned by [code]node[/code] and [code]pack[/code] will therefore only save those two nodes, but not [code]collision[/code].
      [codeblock]
      # Create the objects.
      var node = Node2D.new()
      var rigid = RigidBody2D.new()
      var collision = CollisionShape2D.new()
  
      # Create the object hierarchy.
      rigid.add_child(collision)
      node.add_child(rigid)
  
      # Change owner of `rigid`, but not of `collision`.
      rigid.owner = node
  
      var scene = PackedScene.new()
      # Only `node` and `rigid` are now packed.
      var result = scene.pack(node)
      if result == OK:
          var error = ResourceSaver.save("res://path/name.scn", scene)  # Or "user://..."
          if error != OK:
              push_error("An error occurred while saving the scene to disk.")
      [/codeblock] */
    "new"(): PackedScene<T>
  
  
  
  
  
  /** A dictionary representation of the scene contents.
        Available keys include "rnames" and "variants" for resources, "node_count", "nodes", "node_paths" for nodes, "editable_instances" for base scene children overrides, "conn_count" and "conns" for signal connections, and "version" for the format style of the PackedScene. */
  _bundled: Dictionary<any, any>;
  
  
  
  /** Returns [code]true[/code] if the scene file has nodes. */
  can_instance(): boolean;
  
  /** Returns the [code]SceneState[/code] representing the scene file contents. */
  get_state(): SceneState;
  
  /** Instantiates the scene's node hierarchy. Triggers child scene instantiation(s). Triggers a [constant Node.NOTIFICATION_INSTANCED] notification on the root node. */
  instance(edit_state?: number): T;
  
  /** Pack will ignore any sub-nodes not owned by given node. See [member Node.owner]. */
  pack(path: Node): number;
  
  
  
  /** If passed to [method instance], blocks edits to the scene state. */
  static GEN_EDIT_STATE_DISABLED: 0;
  
  /** If passed to [method instance], provides local scene resources to the local scene.
        [b]Note:[/b] Only available in editor builds. */
  static GEN_EDIT_STATE_INSTANCE: 1;
  
  /** If passed to [method instance], provides local scene resources to the local scene. Only the main scene should receive the main edit state.
        [b]Note:[/b] Only available in editor builds. */
  static GEN_EDIT_STATE_MAIN: 2;
  
  }


declare class Signal<T extends (...args: any[]) => any = () => void> {
  /** This lets us yield* this signal. */
  [Symbol.iterator](): Generator<T, ReturnType<T>, any>;

  /** Connect a callback to this signal. */
  connect(callback: T): void

  /** Emit this signal. */
  emit(...args: Parameters<T>): void;
}
