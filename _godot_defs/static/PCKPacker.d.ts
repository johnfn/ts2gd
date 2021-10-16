
/**
 * The [PCKPacker] is used to create packages that can be loaded into a running project using [method ProjectSettings.load_resource_pack].
 *
 * @example 
 * 
 * var packer = PCKPacker.new()
 * packer.pck_start("test.pck")
 * packer.add_file("res://text.txt", "text.txt")
 * packer.flush()
 * @summary 
 * 
 *
 * The above [PCKPacker] creates package `test.pck`, then adds a file named `text.txt` at the root of the package.
 *
*/
declare class PCKPacker extends Reference {

  
/**
 * The [PCKPacker] is used to create packages that can be loaded into a running project using [method ProjectSettings.load_resource_pack].
 *
 * @example 
 * 
 * var packer = PCKPacker.new()
 * packer.pck_start("test.pck")
 * packer.add_file("res://text.txt", "text.txt")
 * packer.flush()
 * @summary 
 * 
 *
 * The above [PCKPacker] creates package `test.pck`, then adds a file named `text.txt` at the root of the package.
 *
*/
  "new"(): PCKPacker;
  static "new"(): PCKPacker;




/** Adds the [code]source_path[/code] file to the current PCK package at the [code]pck_path[/code] internal path (should start with [code]res://[/code]). */
add_file(pck_path: string, source_path: string): int;

/** Writes the files specified using all [method add_file] calls since the last flush. If [code]verbose[/code] is [code]true[/code], a list of files added will be printed to the console for easier debugging. */
flush(verbose?: boolean): int;

/** Creates a new PCK file with the name [code]pck_name[/code]. The [code].pck[/code] file extension isn't added automatically, so it should be part of [code]pck_name[/code] (even though it's not required). */
pck_start(pck_name: string, alignment?: int): int;

  // connect<T extends SignalsOf<PCKPacker>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<PCKPackerSignals>>(signal: T, method: SignalFunction<PCKPackerSignals[T]>): number;




}

declare class PCKPackerSignals extends ReferenceSignals {
  
}
