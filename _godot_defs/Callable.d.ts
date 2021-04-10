
/**
 * [Callable] is a first class object which can be held in variables and passed to functions. It represents a given method in an [Object], and is typically used for signal callbacks.
 *
 * **Example:**
 *
 * @example 
 * 
 * 
 * var callable = Callable(self, "print_args")
 * func print_args(arg1, arg2, arg3 = ""):
 *     prints(arg1, arg2, arg3)
 * func test():
 *     callable.call("hello", "world")  # Prints "hello world".
 *     callable.call(Vector2.UP, 42, callable)  # Prints "(0, -1) 42 Node(Node.gd)::print_args".
 *     callable.call("invalid")  # Invalid call, should have at least 2 arguments.
 * 
 * 
 * Callable callable = new Callable(this, "print_args");
 * public void PrintArgs(object arg1, object arg2, object arg3 = "")
 * {
 *     GD.PrintS(arg1, arg2, arg3);
 * }
 * public void Test()
 * {
 *     callable.Call("hello", "world"); // Prints "hello world".
 *     callable.Call(Vector2.Up, 42, callable); // Prints "(0, -1) 42 Node(Node.gd)::print_args".
 *     callable.Call("invalid"); // Invalid call, should have at least 2 arguments.
 * }
 * 
 * @summary 
 * 
 *
*/
declare class Callable {

  
/**
 * [Callable] is a first class object which can be held in variables and passed to functions. It represents a given method in an [Object], and is typically used for signal callbacks.
 *
 * **Example:**
 *
 * @example 
 * 
 * 
 * var callable = Callable(self, "print_args")
 * func print_args(arg1, arg2, arg3 = ""):
 *     prints(arg1, arg2, arg3)
 * func test():
 *     callable.call("hello", "world")  # Prints "hello world".
 *     callable.call(Vector2.UP, 42, callable)  # Prints "(0, -1) 42 Node(Node.gd)::print_args".
 *     callable.call("invalid")  # Invalid call, should have at least 2 arguments.
 * 
 * 
 * Callable callable = new Callable(this, "print_args");
 * public void PrintArgs(object arg1, object arg2, object arg3 = "")
 * {
 *     GD.PrintS(arg1, arg2, arg3);
 * }
 * public void Test()
 * {
 *     callable.Call("hello", "world"); // Prints "hello world".
 *     callable.Call(Vector2.Up, 42, callable); // Prints "(0, -1) 42 Node(Node.gd)::print_args".
 *     callable.Call("invalid"); // Invalid call, should have at least 2 arguments.
 * }
 * 
 * @summary 
 * 
 *
*/

  constructor(object: Object, method_name: StringName);
  static "new"(): this;






/** No documentation provided. */
bind(): void;

/** Calls the method represented by this [Callable]. Arguments can be passed and should match the method's signature. */
call(): any;

/** Calls the method represented by this [Callable] in deferred mode, i.e. during the idle frame. Arguments can be passed and should match the method's signature. */
call_deferred(): void;

/** Returns the name of the method represented by this [Callable]. */
get_method(): StringName;

/** Returns the object on which this [Callable] is called. */
get_object(): Object;

/** Returns the ID of this [Callable]'s object (see [method Object.get_instance_id]). */
get_object_id(): int;

/** No documentation provided. */
hash(): int;

/** No documentation provided. */
is_custom(): boolean;

/** No documentation provided. */
is_null(): boolean;

/** No documentation provided. */
is_standard(): boolean;

/** No documentation provided. */
unbind(argcount: int): Callable;

  connect<T extends SignalsOf<Callable>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
