
/**
 * Interactive [Resource] loader. This object is returned by [ResourceLoader] when performing an interactive load. It allows loading resources with high granularity, which makes it mainly useful for displaying loading bars or percentages.
 *
*/
declare class ResourceInteractiveLoader extends Reference {

  
/**
 * Interactive [Resource] loader. This object is returned by [ResourceLoader] when performing an interactive load. It allows loading resources with high granularity, which makes it mainly useful for displaying loading bars or percentages.
 *
*/
  "new"(): ResourceInteractiveLoader;
  static "new"(): ResourceInteractiveLoader;




/** Returns the loaded resource if the load operation completed successfully, [code]null[/code] otherwise. */
get_resource(): Resource;

/** Returns the load stage. The total amount of stages can be queried with [method get_stage_count]. */
get_stage(): int;

/** Returns the total amount of stages (calls to [method poll]) needed to completely load this resource. */
get_stage_count(): int;

/**
 * Polls the loading operation, i.e. loads a data chunk up to the next stage.
 *
 * Returns [constant OK] if the poll is successful but the load operation has not finished yet (intermediate stage). This means [method poll] will have to be called again until the last stage is completed.
 *
 * Returns [constant ERR_FILE_EOF] if the load operation has completed successfully. The loaded resource can be obtained by calling [method get_resource].
 *
 * Returns another [enum Error] code if the poll has failed.
 *
*/
poll(): int;

/**
 * Polls the loading operation successively until the resource is completely loaded or a [method poll] fails.
 *
 * Returns [constant ERR_FILE_EOF] if the load operation has completed successfully. The loaded resource can be obtained by calling [method get_resource].
 *
 * Returns another [enum Error] code if a poll has failed, aborting the operation.
 *
*/
wait(): int;

  // connect<T extends SignalsOf<ResourceInteractiveLoader>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<ResourceInteractiveLoaderSignals>>(signal: T, method: SignalFunction<ResourceInteractiveLoaderSignals[T]>): number;




}

declare class ResourceInteractiveLoaderSignals extends ReferenceSignals {
  
}
