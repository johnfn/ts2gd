
/**
 * A ScrollContainer node meant to contain a [Control] child. ScrollContainers will automatically create a scrollbar child ([HScrollBar], [VScrollBar], or both) when needed and will only draw the Control within the ScrollContainer area. Scrollbars will automatically be drawn at the right (for vertical) or bottom (for horizontal) and will enable dragging to move the viewable Control (and its children) within the ScrollContainer. Scrollbars will also automatically resize the grabber based on the [member Control.rect_min_size] of the Control relative to the ScrollContainer. Works great with a [Panel] control. You can set `EXPAND` on the children's size flags, so they will upscale to the ScrollContainer's size if it's larger (scroll is invisible for the chosen dimension).
 *
*/
declare class ScrollContainer extends Container  {

  
/**
 * A ScrollContainer node meant to contain a [Control] child. ScrollContainers will automatically create a scrollbar child ([HScrollBar], [VScrollBar], or both) when needed and will only draw the Control within the ScrollContainer area. Scrollbars will automatically be drawn at the right (for vertical) or bottom (for horizontal) and will enable dragging to move the viewable Control (and its children) within the ScrollContainer. Scrollbars will also automatically resize the grabber based on the [member Control.rect_min_size] of the Control relative to the ScrollContainer. Works great with a [Panel] control. You can set `EXPAND` on the children's size flags, so they will upscale to the ScrollContainer's size if it's larger (scroll is invisible for the chosen dimension).
 *
*/
  new(): ScrollContainer; 
  static "new"(): ScrollContainer 


/** If [code]true[/code], the ScrollContainer will automatically scroll to focused children (including indirect children) to make sure they are fully visible. */
follow_focus: boolean;



/** The current horizontal scroll value. */
scroll_horizontal: int;

/** If [code]true[/code], enables horizontal scrolling. */
scroll_horizontal_enabled: boolean;

/** The current vertical scroll value. */
scroll_vertical: int;

/** If [code]true[/code], enables vertical scrolling. */
scroll_vertical_enabled: boolean;

/** Ensures the given [code]control[/code] is visible (must be a direct or indirect child of the ScrollContainer). Used by [member follow_focus]. */
ensure_control_visible(control: Control): void;

/**
 * Returns the horizontal scrollbar [HScrollBar] of this [ScrollContainer].
 *
 * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to disable the horizontal scrollbar, use [member scroll_horizontal_enabled]. If you want to only hide it instead, use its [member CanvasItem.visible] property.
 *
*/
get_h_scrollbar(): HScrollBar;

/**
 * Returns the vertical scrollbar [VScrollBar] of this [ScrollContainer].
 *
 * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to disable the vertical scrollbar, use [member scroll_vertical_enabled]. If you want to only hide it instead, use its [member CanvasItem.visible] property.
 *
*/
get_v_scrollbar(): VScrollBar;

  connect<T extends SignalsOf<ScrollContainer>>(signal: T, method: SignalFunction<ScrollContainer[T]>): number;





/**
 * Emitted when scrolling stops.
 *
*/
$scroll_ended: Signal<() => void>

/**
 * Emitted when scrolling is started.
 *
*/
$scroll_started: Signal<() => void>

}

