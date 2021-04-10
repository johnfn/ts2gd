
/**
 * [StringName]s are immutable strings designed for general-purpose represention of unique names. [StringName] ensures that only one instance of a given name exists (so two [StringName]s with the same value are the same object). Comparing them is much faster than with regular [String]s, because only the pointers are compared, not the whole strings.
 *
*/
declare class StringName {

  
/**
 * [StringName]s are immutable strings designed for general-purpose represention of unique names. [StringName] ensures that only one instance of a given name exists (so two [StringName]s with the same value are the same object). Comparing them is much faster than with regular [String]s, because only the pointers are compared, not the whole strings.
 *
*/

  constructor(from: String);
  static "new"(): this;






  connect<T extends SignalsOf<StringName>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
