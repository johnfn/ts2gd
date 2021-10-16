
/**
 * Utility class which holds a reference to the internal identifier of an [Object] instance, as given by [method Object.get_instance_id]. This ID can then be used to retrieve the object instance with [method @GDScript.instance_from_id].
 *
 * This class is used internally by the editor inspector and script debugger, but can also be used in plugins to pass and display objects as their IDs.
 *
*/
declare class EncodedObjectAsID extends Reference {

  
/**
 * Utility class which holds a reference to the internal identifier of an [Object] instance, as given by [method Object.get_instance_id]. This ID can then be used to retrieve the object instance with [method @GDScript.instance_from_id].
 *
 * This class is used internally by the editor inspector and script debugger, but can also be used in plugins to pass and display objects as their IDs.
 *
*/
  "new"(): EncodedObjectAsID;
  static "new"(): EncodedObjectAsID;



/** The [Object] identifier stored in this [EncodedObjectAsID] instance. The object instance can be retrieved with [method @GDScript.instance_from_id]. */
object_id: int;



  // connect<T extends SignalsOf<EncodedObjectAsID>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<EncodedObjectAsIDSignals>>(signal: T, method: SignalFunction<EncodedObjectAsIDSignals[T]>): number;




}

declare class EncodedObjectAsIDSignals extends ReferenceSignals {
  
}
