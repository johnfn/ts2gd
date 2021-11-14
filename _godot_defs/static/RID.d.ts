
/**
 * The RID type is used to access the unique integer ID of a resource. They are opaque, which means they do not grant access to the associated resource by themselves. They are used by and with the low-level Server classes such as [VisualServer].
 *
*/
declare class RID {

  
/**
 * The RID type is used to access the unique integer ID of a resource. They are opaque, which means they do not grant access to the associated resource by themselves. They are used by and with the low-level Server classes such as [VisualServer].
 *
*/

  new(from: Object): RID;
  static "new"(): RID 





/** Returns the ID of the referenced resource. */
get_id(): int;

  connect<T extends SignalsOf<RID>>(signal: T, method: SignalFunction<RID[T]>): number;






}

