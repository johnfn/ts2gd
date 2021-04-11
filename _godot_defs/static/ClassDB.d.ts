
/**
 * Provides access to metadata stored for every available class.
 *
*/
declare class ClassDBClass extends Object {

  
/**
 * Provides access to metadata stored for every available class.
 *
*/
  "new"(): ClassDBClass;
  static "new"(): ClassDBClass;




/** Returns [code]true[/code] if you can instance objects from the specified [code]class[/code], [code]false[/code] in other case. */
can_instance(_class: string): boolean;

/** Returns whether the specified [code]class[/code] is available or not. */
class_exists(_class: string): boolean;

/** Returns a category associated with the class for use in documentation and the Asset Library. Debug mode required. */
class_get_category(_class: string): string;

/** Returns the value of the integer constant [code]name[/code] of [code]class[/code] or its ancestry. Always returns 0 when the constant could not be found. */
class_get_integer_constant(_class: string, name: string): int;

/** Returns an array with the names all the integer constants of [code]class[/code] or its ancestry. */
class_get_integer_constant_list(_class: string, no_inheritance?: boolean): PoolStringArray;

/** Returns an array with all the methods of [code]class[/code] or its ancestry if [code]no_inheritance[/code] is [code]false[/code]. Every element of the array is a [Dictionary] with the following keys: [code]args[/code], [code]default_args[/code], [code]flags[/code], [code]id[/code], [code]name[/code], [code]return: (class_name, hint, hint_string, name, type, usage)[/code]. */
class_get_method_list(_class: string, no_inheritance?: boolean): any[];

/** Returns the value of [code]property[/code] of [code]class[/code] or its ancestry. */
class_get_property(object: Object, property: string): any;

/** Returns an array with all the properties of [code]class[/code] or its ancestry if [code]no_inheritance[/code] is [code]false[/code]. */
class_get_property_list(_class: string, no_inheritance?: boolean): any[];

/** Returns the [code]signal[/code] data of [code]class[/code] or its ancestry. The returned value is a [Dictionary] with the following keys: [code]args[/code], [code]default_args[/code], [code]flags[/code], [code]id[/code], [code]name[/code], [code]return: (class_name, hint, hint_string, name, type, usage)[/code]. */
class_get_signal(_class: string, signal: string): Dictionary;

/** Returns an array with all the signals of [code]class[/code] or its ancestry if [code]no_inheritance[/code] is [code]false[/code]. Every element of the array is a [Dictionary] as described in [method class_get_signal]. */
class_get_signal_list(_class: string, no_inheritance?: boolean): any[];

/** Returns whether [code]class[/code] or its ancestry has an integer constant called [code]name[/code] or not. */
class_has_integer_constant(_class: string, name: string): boolean;

/** Returns whether [code]class[/code] (or its ancestry if [code]no_inheritance[/code] is [code]false[/code]) has a method called [code]method[/code] or not. */
class_has_method(_class: string, method: string, no_inheritance?: boolean): boolean;

/** Returns whether [code]class[/code] or its ancestry has a signal called [code]signal[/code] or not. */
class_has_signal(_class: string, signal: string): boolean;

/** Sets [code]property[/code] value of [code]class[/code] to [code]value[/code]. */
class_set_property(object: Object, property: string, value: any): int;

/** Returns the names of all the classes available. */
get_class_list(): PoolStringArray;

/** Returns the names of all the classes that directly or indirectly inherit from [code]class[/code]. */
get_inheriters_from_class(_class: string): PoolStringArray;

/** Returns the parent class of [code]class[/code]. */
get_parent_class(_class: string): string;

/** Creates an instance of [code]class[/code]. */
instance(_class: string): any;

/** Returns whether this [code]class[/code] is enabled or not. */
is_class_enabled(_class: string): boolean;

/** Returns whether [code]inherits[/code] is an ancestor of [code]class[/code] or not. */
is_parent_class(_class: string, inherits: string): boolean;

  connect<T extends SignalsOf<ClassDBClass>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
