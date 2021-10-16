
/**
 * A weakref can hold a [Reference], without contributing to the reference counter. A weakref can be created from an [Object] using [method @GDScript.weakref]. If this object is not a reference, weakref still works, however, it does not have any effect on the object. Weakrefs are useful in cases where multiple classes have variables that refer to each other. Without weakrefs, using these classes could lead to memory leaks, since both references keep each other from being released. Making part of the variables a weakref can prevent this cyclic dependency, and allows the references to be released.
 *
*/
declare class WeakRef extends Reference {

  
/**
 * A weakref can hold a [Reference], without contributing to the reference counter. A weakref can be created from an [Object] using [method @GDScript.weakref]. If this object is not a reference, weakref still works, however, it does not have any effect on the object. Weakrefs are useful in cases where multiple classes have variables that refer to each other. Without weakrefs, using these classes could lead to memory leaks, since both references keep each other from being released. Making part of the variables a weakref can prevent this cyclic dependency, and allows the references to be released.
 *
*/
  "new"(): WeakRef;
  static "new"(): WeakRef;




/** Returns the [Object] this weakref is referring to. */
get_ref(): any;

  // connect<T extends SignalsOf<WeakRef>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<WeakRefSignals>>(signal: T, method: SignalFunction<WeakRefSignals[T]>): number;




}

declare class WeakRefSignals extends ReferenceSignals {
  
}
