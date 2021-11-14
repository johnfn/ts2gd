
/**
 * A class stored as a resource. A script extends the functionality of all objects that instance it.
 *
 * The `new` method of a script subclass creates a new instance. [method Object.set_script] extends an existing object, if that object's class matches one of the script's base classes.
 *
*/
declare class Script extends Resource  {

  
/**
 * A class stored as a resource. A script extends the functionality of all objects that instance it.
 *
 * The `new` method of a script subclass creates a new instance. [method Object.set_script] extends an existing object, if that object's class matches one of the script's base classes.
 *
*/
  new(): Script; 
  static "new"(): Script 


/** The script source code or an empty string if source code is not available. When set, does not reload the class implementation automatically. */
source_code: string;

/** Returns [code]true[/code] if the script can be instanced. */
can_instance(): boolean;

/** Returns the script directly inherited by this script. */
get_base_script(): Script;

/** Returns the script's base type. */
get_instance_base_type(): string;

/** Returns the default value of the specified property. */
get_property_default_value(property: string): any;

/** Returns a dictionary containing constant names and their values. */
get_script_constant_map(): Dictionary<any, any>;

/** Returns the list of methods in this [Script]. */
get_script_method_list(): any[];

/** Returns the list of properties in this [Script]. */
get_script_property_list(): any[];

/** Returns the list of user signals defined in this [Script]. */
get_script_signal_list(): any[];

/** Returns [code]true[/code] if the script, or a base class, defines a signal with the given name. */
has_script_signal(signal_name: string): boolean;

/** Returns [code]true[/code] if the script contains non-empty source code. */
has_source_code(): boolean;

/** Returns [code]true[/code] if [code]base_object[/code] is an instance of this script. */
instance_has(base_object: Object): boolean;

/** Returns [code]true[/code] if the script is a tool script. A tool script can run in the editor. */
is_tool(): boolean;

/** Reloads the script's class implementation. Returns an error code. */
reload(keep_state?: boolean): int;

  connect<T extends SignalsOf<Script>>(signal: T, method: SignalFunction<Script[T]>): number;






}

