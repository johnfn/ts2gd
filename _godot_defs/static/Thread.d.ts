
/**
 * A unit of execution in a process. Can run methods on [Object]s simultaneously. The use of synchronization via [Mutex] or [Semaphore] is advised if working with shared objects.
 *
 * **Note:** Breakpoints won't break on code if it's running in a thread. This is a current limitation of the GDScript debugger.
 *
*/
declare class Thread extends Reference  {

  
/**
 * A unit of execution in a process. Can run methods on [Object]s simultaneously. The use of synchronization via [Mutex] or [Semaphore] is advised if working with shared objects.
 *
 * **Note:** Breakpoints won't break on code if it's running in a thread. This is a current limitation of the GDScript debugger.
 *
*/
  new(): Thread; 
  static "new"(): Thread 



/** Returns the current [Thread]'s ID, uniquely identifying it among all threads. If the [Thread] is not running this returns an empty string. */
get_id(): string;

/** Returns [code]true[/code] if this [Thread] has been started. Once started, this will return [code]true[/code] until it is joined using [method wait_to_finish]. For checking if a [Thread] is still executing its task, use [method is_alive]. */
is_active(): boolean;

/**
 * Returns `true` if this [Thread] is currently running. This is useful for determining if [method wait_to_finish] can be called without blocking the calling thread.
 *
 * To check if a [Thread] is joinable, use [method is_active].
 *
*/
is_alive(): boolean;

/**
 * Starts a new [Thread] that runs `method` on object `instance` with `userdata` passed as an argument. Even if no userdata is passed, `method` must accept one argument and it will be null. The `priority` of the [Thread] can be changed by passing a value from the [enum Priority] enum.
 *
 * Returns [constant OK] on success, or [constant ERR_CANT_CREATE] on failure.
 *
*/
start(instance: Object, method: string, userdata?: any, priority?: int): int;

/**
 * Joins the [Thread] and waits for it to finish. Returns the output of the method passed to [method start].
 *
 * Should either be used when you want to retrieve the value returned from the method called by the [Thread] or before freeing the instance that contains the [Thread].
 *
 * To determine if this can be called without blocking the calling thread, check if [method is_alive] is `false`.
 *
 * **Note:** After the [Thread] finishes joining it will be disposed. If you want to use it again you will have to create a new instance of it.
 *
*/
wait_to_finish(): any;

  connect<T extends SignalsOf<Thread>>(signal: T, method: SignalFunction<Thread[T]>): number;



/**
 * A thread running with lower priority than normally.
 *
*/
static PRIORITY_LOW: any;

/**
 * A thread with a standard priority.
 *
*/
static PRIORITY_NORMAL: any;

/**
 * A thread running with higher priority than normally.
 *
*/
static PRIORITY_HIGH: any;



}

