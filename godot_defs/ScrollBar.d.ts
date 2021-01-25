
/**
 * Scrollbars are a [Range]-based [Control], that display a draggable area (the size of the page). Horizontal ([HScrollBar]) and Vertical ([VScrollBar]) versions are available.
 *
*/
declare class ScrollBar extends Range {

  
/**
 * Scrollbars are a [Range]-based [Control], that display a draggable area (the size of the page). Horizontal ([HScrollBar]) and Vertical ([VScrollBar]) versions are available.
 *
*/
  "new"(): ScrollBar;
  static "new"(): ScrollBar;



/** Overrides the step used when clicking increment and decrement buttons or when using arrow keys when the [ScrollBar] is focused. */
custom_step: float;





  connect<T extends SignalsOf<ScrollBar>, U extends Node>(signal: T, node: U, method: keyof U): number;





  /**
 * Emitted when the scrollbar is being scrolled.
 *
*/
scrolling: Signal<() => void>

}
