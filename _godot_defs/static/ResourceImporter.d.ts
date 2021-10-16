
/**
 * This is the base class for the resource importers implemented in core. To implement your own resource importers using editor plugins, see [EditorImportPlugin].
 *
*/
declare class ResourceImporter extends Reference {

  
/**
 * This is the base class for the resource importers implemented in core. To implement your own resource importers using editor plugins, see [EditorImportPlugin].
 *
*/
  "new"(): ResourceImporter;
  static "new"(): ResourceImporter;






  // connect<T extends SignalsOf<ResourceImporter>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<ResourceImporterSignals>>(signal: T, method: SignalFunction<ResourceImporterSignals[T]>): number;



/**
 * The default import order.
 *
*/
static IMPORT_ORDER_DEFAULT: any;

/**
 * The import order for scenes, which ensures scenes are imported **after** all other core resources such as textures. Custom importers should generally have an import order lower than `100` to avoid issues when importing scenes that rely on custom resources.
 *
*/
static IMPORT_ORDER_SCENE: any;

}

declare class ResourceImporterSignals extends ReferenceSignals {
  
}
