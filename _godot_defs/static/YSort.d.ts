
/**
 * Sort all child nodes based on their Y positions. The child node must inherit from [CanvasItem] for it to be sorted. Nodes that have a higher Y position will be drawn later, so they will appear on top of nodes that have a lower Y position.
 *
 * Nesting of YSort nodes is possible. Children YSort nodes will be sorted in the same space as the parent YSort, allowing to better organize a scene or divide it in multiple ones, yet keep the unique sorting.
 *
*/
declare class YSort extends Node2D {

  
/**
 * Sort all child nodes based on their Y positions. The child node must inherit from [CanvasItem] for it to be sorted. Nodes that have a higher Y position will be drawn later, so they will appear on top of nodes that have a lower Y position.
 *
 * Nesting of YSort nodes is possible. Children YSort nodes will be sorted in the same space as the parent YSort, allowing to better organize a scene or divide it in multiple ones, yet keep the unique sorting.
 *
*/
  "new"(): YSort;
  static "new"(): YSort;



/** If [code]true[/code], child nodes are sorted, otherwise sorting is disabled. */
sort_enabled: boolean;



  // connect<T extends SignalsOf<YSort>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<YSortSignals>>(signal: T, method: SignalFunction<YSortSignals[T]>): number;




}

declare class YSortSignals extends Node2DSignals {
  
}
