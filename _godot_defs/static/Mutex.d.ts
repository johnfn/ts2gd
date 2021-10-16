
/**
 * A synchronization mutex (mutual exclusion). This is used to synchronize multiple [Thread]s, and is equivalent to a binary [Semaphore]. It guarantees that only one thread can ever acquire the lock at a time. A mutex can be used to protect a critical section; however, be careful to avoid deadlocks.
 *
*/
declare class Mutex extends Reference {

  
/**
 * A synchronization mutex (mutual exclusion). This is used to synchronize multiple [Thread]s, and is equivalent to a binary [Semaphore]. It guarantees that only one thread can ever acquire the lock at a time. A mutex can be used to protect a critical section; however, be careful to avoid deadlocks.
 *
*/
  "new"(): Mutex;
  static "new"(): Mutex;




/**
 * Locks this [Mutex], blocks until it is unlocked by the current owner.
 *
 * **Note:** This function returns without blocking if the thread already has ownership of the mutex.
 *
*/
lock(): void;

/**
 * Tries locking this [Mutex], but does not block. Returns [constant OK] on success, [constant ERR_BUSY] otherwise.
 *
 * **Note:** This function returns [constant OK] if the thread already has ownership of the mutex.
 *
*/
try_lock(): int;

/**
 * Unlocks this [Mutex], leaving it to other threads.
 *
 * **Note:** If a thread called [method lock] or [method try_lock] multiple times while already having ownership of the mutex, it must also call [method unlock] the same number of times in order to unlock it correctly.
 *
*/
unlock(): void;

  // connect<T extends SignalsOf<Mutex>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<MutexSignals>>(signal: T, method: SignalFunction<MutexSignals[T]>): number;




}

declare class MutexSignals extends ReferenceSignals {
  
}
