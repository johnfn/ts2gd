
/**
 * Every class which is not a built-in type inherits from this class.
 *
 * You can construct Objects from scripting languages, using `Object.new()` in GDScript, `new Object` in C#, or the "Construct Object" node in VisualScript.
 *
 * Objects do not manage memory. If a class inherits from Object, you will have to delete instances of it manually. To do so, call the [method free] method from your script or delete the instance from C++.
 *
 * Some classes that extend Object add memory management. This is the case of [Reference], which counts references and deletes itself automatically when no longer referenced. [Node], another fundamental type, deletes all its children when freed from memory.
 *
 * Objects export properties, which are mainly useful for storage and editing, but not really so much in programming. Properties are exported in [method _get_property_list] and handled in [method _get] and [method _set]. However, scripting languages and C++ have simpler means to export them.
 *
 * Property membership can be tested directly in GDScript using `in`:
 *
 * @example 
 * 
 * var n = Node2D.new()
 * print("position" in n) # Prints "True".
 * print("other_property" in n) # Prints "False".
 * @summary 
 * 
 *
 * The `in` operator will evaluate to `true` as long as the key exists, even if the value is `null`.
 *
 * Objects also receive notifications. Notifications are a simple way to notify the object about different events, so they can all be handled together. See [method _notification].
 *
 * **Note:** Unlike references to a [Reference], references to an Object stored in a variable can become invalid without warning. Therefore, it's recommended to use [Reference] for data classes instead of [Object].
 *
 * **Note:** Due to a bug, you can't create a "plain" Object using `Object.new()`. Instead, use `ClassDB.instance("Object")`. This bug only applies to Object itself, not any of its descendents like [Reference].
 *
*/
declare class Object {

  
/**
 * Every class which is not a built-in type inherits from this class.
 *
 * You can construct Objects from scripting languages, using `Object.new()` in GDScript, `new Object` in C#, or the "Construct Object" node in VisualScript.
 *
 * Objects do not manage memory. If a class inherits from Object, you will have to delete instances of it manually. To do so, call the [method free] method from your script or delete the instance from C++.
 *
 * Some classes that extend Object add memory management. This is the case of [Reference], which counts references and deletes itself automatically when no longer referenced. [Node], another fundamental type, deletes all its children when freed from memory.
 *
 * Objects export properties, which are mainly useful for storage and editing, but not really so much in programming. Properties are exported in [method _get_property_list] and handled in [method _get] and [method _set]. However, scripting languages and C++ have simpler means to export them.
 *
 * Property membership can be tested directly in GDScript using `in`:
 *
 * @example 
 * 
 * var n = Node2D.new()
 * print("position" in n) # Prints "True".
 * print("other_property" in n) # Prints "False".
 * @summary 
 * 
 *
 * The `in` operator will evaluate to `true` as long as the key exists, even if the value is `null`.
 *
 * Objects also receive notifications. Notifications are a simple way to notify the object about different events, so they can all be handled together. See [method _notification].
 *
 * **Note:** Unlike references to a [Reference], references to an Object stored in a variable can become invalid without warning. Therefore, it's recommended to use [Reference] for data classes instead of [Object].
 *
 * **Note:** Due to a bug, you can't create a "plain" Object using `Object.new()`. Instead, use `ClassDB.instance("Object")`. This bug only applies to Object itself, not any of its descendents like [Reference].
 *
*/
  new(): Object; 
  static "new"(): Object 



/**
 * Virtual method which can be overridden to customize the return value of [method get].
 *
 * Returns the given property. Returns `null` if the `property` does not exist.
 *
*/
protected _get(property: string): any;

/**
 * Virtual method which can be overridden to customize the return value of [method get_property_list].
 *
 * Returns the object's property list as an [Array] of dictionaries.
 *
 * Each property's [Dictionary] must contain at least `name: String` and `type: int` (see [enum Variant.Type]) entries. Optionally, it can also include `hint: int` (see [enum PropertyHint]), `hint_string: String`, and `usage: int` (see [enum PropertyUsageFlags]).
 *
*/
protected _get_property_list(): any[];

/** Called when the object is initialized. */
protected _init(): void;

/** Called whenever the object receives a notification, which is identified in [code]what[/code] by a constant. The base [Object] has two constants [constant NOTIFICATION_POSTINITIALIZE] and [constant NOTIFICATION_PREDELETE], but subclasses such as [Node] define a lot more notifications which are also received by this method. */
protected _notification(what: int): void;

/**
 * Virtual method which can be overridden to customize the return value of [method set].
 *
 * Sets a property. Returns `true` if the `property` exists.
 *
*/
protected _set(property: string, value: any): boolean;

/**
 * Virtual method which can be overridden to customize the return value of [method to_string], and thus the object's representation where it is converted to a string, e.g. with `print(obj)`.
 *
 * Returns a [String] representing the object. If not overridden, defaults to `"[ClassName:RID]"`.
 *
*/
protected _to_string(): string;

/** Adds a user-defined [code]signal[/code]. Arguments are optional, but can be added as an [Array] of dictionaries, each containing [code]name: String[/code] and [code]type: int[/code] (see [enum Variant.Type]) entries. */
add_user_signal(signal: string, arguments?: any[]): void;

/**
 * Calls the `method` on the object and returns the result. This method supports a variable number of arguments, so parameters are passed as a comma separated list. Example:
 *
 * @example 
 * 
 * call("set", "position", Vector2(42.0, 0.0))
 * @summary 
 * 
 *
 * **Note:** In C#, the method name must be specified as snake_case if it is defined by a built-in Godot node. This doesn't apply to user-defined methods where you should use the same convention as in the C# source (typically PascalCase).
 *
*/
call(...args: any[]): any;

/**
 * Calls the `method` on the object during idle time. This method supports a variable number of arguments, so parameters are passed as a comma separated list. Example:
 *
 * @example 
 * 
 * call_deferred("set", "position", Vector2(42.0, 0.0))
 * @summary 
 * 
 *
 * **Note:** In C#, the method name must be specified as snake_case if it is defined by a built-in Godot node. This doesn't apply to user-defined methods where you should use the same convention as in the C# source (typically PascalCase).
 *
*/
call_deferred(...args: any[]): void;

/**
 * Calls the `method` on the object and returns the result. Contrarily to [method call], this method does not support a variable number of arguments but expects all parameters to be via a single [Array].
 *
 * @example 
 * 
 * callv("set", [ "position", Vector2(42.0, 0.0) ])
 * @summary 
 * 
 *
*/
callv(method: string, arg_array: any[]): any;

/** Returns [code]true[/code] if the object can translate strings. See [method set_message_translation] and [method tr]. */
can_translate_messages(): boolean;



/**
 * Disconnects a `signal` from a `method` on the given `target`.
 *
 * If you try to disconnect a connection that does not exist, the method will throw an error. Use [method is_connected] to ensure that the connection exists.
 *
*/
disconnect(signal: string, target: Object, method: string): void;

/**
 * Emits the given `signal`. The signal must exist, so it should be a built-in signal of this class or one of its parent classes, or a user-defined signal. This method supports a variable number of arguments, so parameters are passed as a comma separated list. Example:
 *
 * @example 
 * 
 * emit_signal("hit", weapon_type, damage)
 * emit_signal("game_over")
 * @summary 
 * 
 *
*/
emit_signal<U extends (...args: Args) => any, T extends Signal<U>, Args extends any[]>(signal: T, ...args: Args): void;

/**
 * Deletes the object from memory immediately. For [Node]s, you may want to use [method Node.queue_free] to queue the node for safe deletion at the end of the current frame.
 *
 * **Important:** If you have a variable pointing to an object, it will **not** be assigned to `null` once the object is freed. Instead, it will point to a **previously freed instance** and you should validate it with [method @GDScript.is_instance_valid] before attempting to call its methods or access its properties.
 *
*/
free(): void;

/**
 * Returns the [Variant] value of the given `property`. If the `property` doesn't exist, this will return `null`.
 *
 * **Note:** In C#, the property name must be specified as snake_case if it is defined by a built-in Godot node. This doesn't apply to user-defined properties where you should use the same convention as in the C# source (typically PascalCase).
 *
*/
get(property: string): any;

/**
 * Returns the object's class as a [String]. See also [method is_class].
 *
 * **Note:** [method get_class] does not take `class_name` declarations into account. If the object has a `class_name` defined, the base class name will be returned instead.
 *
*/
get_class(): string;

/**
 * Returns an [Array] of dictionaries with information about signals that are connected to the object.
 *
 * Each [Dictionary] contains three String entries:
 *
 * - `source` is a reference to the signal emitter.
 *
 * - `signal_name` is the name of the connected signal.
 *
 * - `method_name` is the name of the method to which the signal is connected.
 *
*/
get_incoming_connections(): any[];

/**
 * Gets the object's property indexed by the given [NodePath]. The node path should be relative to the current object and can use the colon character (`:`) to access nested properties. Examples: `"position:x"` or `"material:next_pass:blend_mode"`.
 *
 * **Note:** Even though the method takes [NodePath] argument, it doesn't support actual paths to [Node]s in the scene tree, only colon-separated sub-property paths. For the purpose of nodes, use [method Node.get_node_and_resource] instead.
 *
*/
get_indexed(property: NodePathType): any;

/**
 * Returns the object's unique instance ID.
 *
 * This ID can be saved in [EncodedObjectAsID], and can be used to retrieve the object instance with [method @GDScript.instance_from_id].
 *
*/
get_instance_id(): int;

/** Returns the object's metadata entry for the given [code]name[/code]. */
get_meta(name: string): any;

/** Returns the object's metadata as a [PoolStringArray]. */
get_meta_list(): PoolStringArray;

/** Returns the object's methods and their signatures as an [Array]. */
get_method_list(): any[];

/**
 * Returns the object's property list as an [Array] of dictionaries.
 *
 * Each property's [Dictionary] contain at least `name: String` and `type: int` (see [enum Variant.Type]) entries. Optionally, it can also include `hint: int` (see [enum PropertyHint]), `hint_string: String`, and `usage: int` (see [enum PropertyUsageFlags]).
 *
*/
get_property_list(): any[];

/** Returns the object's [Script] instance, or [code]null[/code] if none is assigned. */
get_script(): Reference;

/** Returns an [Array] of connections for the given [code]signal[/code]. */
get_signal_connection_list(signal: string): any[];

/** Returns the list of signals as an [Array] of dictionaries. */
get_signal_list(): any[];

/** Returns [code]true[/code] if a metadata entry is found with the given [code]name[/code]. */
has_meta(name: string): boolean;

/** Returns [code]true[/code] if the object contains the given [code]method[/code]. */
has_method(method: string): boolean;

/** Returns [code]true[/code] if the given [code]signal[/code] exists. */
has_signal(signal: string): boolean;

/** Returns [code]true[/code] if the given user-defined [code]signal[/code] exists. Only signals added using [method add_user_signal] are taken into account. */
has_user_signal(signal: string): boolean;

/** Returns [code]true[/code] if signal emission blocking is enabled. */
is_blocking_signals(): boolean;

/**
 * Returns `true` if the object inherits from the given `class`. See also [method get_class].
 *
 * **Note:** [method is_class] does not take `class_name` declarations into account. If the object has a `class_name` defined, [method is_class] will return `false` for that name.
 *
*/
is_class(_class: string): boolean;

/** Returns [code]true[/code] if a connection exists for a given [code]signal[/code], [code]target[/code], and [code]method[/code]. */
is_connected(signal: string, target: Object, method: string): boolean;

/** Returns [code]true[/code] if the [method Node.queue_free] method was called for the object. */
is_queued_for_deletion(): boolean;

/**
 * Send a given notification to the object, which will also trigger a call to the [method _notification] method of all classes that the object inherits from.
 *
 * If `reversed` is `true`, [method _notification] is called first on the object's own class, and then up to its successive parent classes. If `reversed` is `false`, [method _notification] is called first on the highest ancestor ([Object] itself), and then down to its successive inheriting classes.
 *
*/
notification(what: int, reversed?: boolean): void;

/** Notify the editor that the property list has changed, so that editor plugins can take the new values into account. Does nothing on export builds. */
property_list_changed_notify(): void;

/** Removes a given entry from the object's metadata. See also [method set_meta]. */
remove_meta(name: string): void;

/**
 * Assigns a new value to the given property. If the `property` does not exist, nothing will happen.
 *
 * **Note:** In C#, the property name must be specified as snake_case if it is defined by a built-in Godot node. This doesn't apply to user-defined properties where you should use the same convention as in the C# source (typically PascalCase).
 *
*/
set(property: string, value: any): void;

/** If set to [code]true[/code], signal emission is blocked. */
set_block_signals(enable: boolean): void;

/**
 * Assigns a new value to the given property, after the current frame's physics step. This is equivalent to calling [method set] via [method call_deferred], i.e. `call_deferred("set", property, value)`.
 *
 * **Note:** In C#, the property name must be specified as snake_case if it is defined by a built-in Godot node. This doesn't apply to user-defined properties where you should use the same convention as in the C# source (typically PascalCase).
 *
*/
set_deferred(property: string, value: any): void;

/**
 * Assigns a new value to the property identified by the [NodePath]. The node path should be relative to the current object and can use the colon character (`:`) to access nested properties. Example:
 *
 * @example 
 * 
 * set_indexed("position", Vector2(42, 0))
 * set_indexed("position:y", -10)
 * print(position) # (42, -10)
 * @summary 
 * 
 *
*/
set_indexed(property: NodePathType, value: any): void;

/** Defines whether the object can translate strings (with calls to [method tr]). Enabled by default. */
set_message_translation(enable: boolean): void;

/**
 * Adds, changes or removes a given entry in the object's metadata. Metadata are serialized and can take any [Variant] value.
 *
 * To remove a given entry from the object's metadata, use [method remove_meta]. Metadata is also removed if its value is set to `null`. This means you can also use `set_meta("name", null)` to remove metadata for `"name"`.
 *
*/
set_meta(name: string, value: any): void;

/**
 * Assigns a script to the object. Each object can have a single script assigned to it, which are used to extend its functionality.
 *
 * If the object already had a script, the previous script instance will be freed and its variables and state will be lost. The new script's [method _init] method will be called.
 *
*/
set_script(script: Reference): void;

/**
 * Returns a [String] representing the object. If not overridden, defaults to `"[ClassName:RID]"`.
 *
 * Override the method [method _to_string] to customize the [String] representation.
 *
*/
to_string(): string;

/**
 * Translates a message using translation catalogs configured in the Project Settings.
 *
 * Only works if message translation is enabled (which it is by default), otherwise it returns the `message` unchanged. See [method set_message_translation].
 *
*/
tr(message: string): string;

  connect<T extends SignalsOf<Object>>(signal: T, method: SignalFunction<Object[T]>): number;



/**
 * Called right when the object is initialized. Not available in script.
 *
*/
static NOTIFICATION_POSTINITIALIZE: any;

/**
 * Called before the object is about to be deleted.
 *
*/
static NOTIFICATION_PREDELETE: any;

/**
 * Connects a signal in deferred mode. This way, signal emissions are stored in a queue, then set on idle time.
 *
*/
static CONNECT_DEFERRED: any;

/**
 * Persisting connections are saved when the object is serialized to file.
 *
*/
static CONNECT_PERSIST: any;

/**
 * One-shot connections disconnect themselves after emission.
 *
*/
static CONNECT_ONESHOT: any;

/**
 * Connect a signal as reference-counted. This means that a given signal can be connected several times to the same target, and will only be fully disconnected once no references are left.
 *
*/
static CONNECT_REFERENCE_COUNTED: any;


/**
 * Emitted whenever the object's script is changed.
 *
*/
$script_changed: Signal<() => void>

}

