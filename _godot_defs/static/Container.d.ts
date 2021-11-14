
/**
 * Base node for containers. A [Container] contains other controls and automatically arranges them in a certain way.
 *
 * A Control can inherit this to create custom container classes.
 *
*/
declare class Container extends Control  {

  
/**
 * Base node for containers. A [Container] contains other controls and automatically arranges them in a certain way.
 *
 * A Control can inherit this to create custom container classes.
 *
*/
  new(): Container; 
  static "new"(): Container 



/** Fit a child control in a given rect. This is mainly a helper for creating custom container classes. */
fit_child_in_rect(child: Control, rect: Rect2): void;

/** Queue resort of the contained children. This is called automatically anyway, but can be called upon request. */
queue_sort(): void;

  connect<T extends SignalsOf<Container>>(signal: T, method: SignalFunction<Container[T]>): number;



/**
 * Notification for when sorting the children, it must be obeyed immediately.
 *
*/
static NOTIFICATION_SORT_CHILDREN: any;


/**
 * Emitted when sorting the children is needed.
 *
*/
$sort_children: Signal<() => void>

}

