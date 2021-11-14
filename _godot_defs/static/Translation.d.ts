
/**
 * Translations are resources that can be loaded and unloaded on demand. They map a string to another string.
 *
*/
declare class Translation extends Resource  {

  
/**
 * Translations are resources that can be loaded and unloaded on demand. They map a string to another string.
 *
*/
  new(): Translation; 
  static "new"(): Translation 


/** The locale of the translation. */
locale: string;

/** Virtual method to override [method get_message]. */
protected _get_message(src_message: string): string;

/** Adds a message if nonexistent, followed by its translation. */
add_message(src_message: string, xlated_message: string): void;

/** Erases a message. */
erase_message(src_message: string): void;

/** Returns a message's translation. */
get_message(src_message: string): string;

/** Returns the number of existing messages. */
get_message_count(): int;

/** Returns all the messages (keys). */
get_message_list(): PoolStringArray;

  connect<T extends SignalsOf<Translation>>(signal: T, method: SignalFunction<Translation[T]>): number;






}

