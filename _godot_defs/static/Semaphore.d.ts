
/**
 * A synchronization semaphore which can be used to synchronize multiple [Thread]s. Initialized to zero on creation. Be careful to avoid deadlocks. For a binary version, see [Mutex].
 *
*/
declare class Semaphore extends Reference {

  
/**
 * A synchronization semaphore which can be used to synchronize multiple [Thread]s. Initialized to zero on creation. Be careful to avoid deadlocks. For a binary version, see [Mutex].
 *
*/
  "new"(): Semaphore;
  static "new"(): Semaphore;




/** Lowers the [Semaphore], allowing one more thread in. Returns [constant OK] on success, [constant ERR_BUSY] otherwise. */
post(): int;

/** Tries to wait for the [Semaphore], if its value is zero, blocks until non-zero. Returns [constant OK] on success, [constant ERR_BUSY] otherwise. */
wait(): int;

  connect<T extends SignalsOf<Semaphore>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
