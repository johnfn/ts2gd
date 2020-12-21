export const ArrayDefinition = `
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
          # Will evaluate to \`true\`.
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
  max(): T;

  /** Returns the minimum value contained in the array if all elements are of comparable types. If the elements can't be compared, [code]null[/code] is returned. */
  min(): T;

  /** Removes and returns the last element of the array. Returns [code]null[/code] if the array is empty, without printing an error message. */
  pop_back(): T;

  /** Removes and returns the first element of the array. Returns [code]null[/code] if the array is empty, without printing an error message. */
  pop_front(): T;

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

  (from: PackedColorArray): this;
  (from: PackedVector3Array): this;
  (from: PackedVector2Array): this;
  (from: PackedStringArray): this;
  (from: PackedFloat64Array): this;
  (from: PackedFloat32Array): this;
  (from: PackedInt64Array): this;
  (from: PackedInt32Array): this;
  (from: PackedByteArray): this;
  new(): this;

  [n: number]: T;
  [Symbol.iterator](): IterableIterator<T>;
}
`;