
/**
 * Container for splitting two [Control]s vertically or horizontally, with a grabber that allows adjusting the split offset or ratio.
 *
*/
declare class SplitContainer extends Container {

  
/**
 * Container for splitting two [Control]s vertically or horizontally, with a grabber that allows adjusting the split offset or ratio.
 *
*/
  "new"(): SplitContainer;
  static "new"(): SplitContainer;



/** If [code]true[/code], the area of the first [Control] will be collapsed and the dragger will be disabled. */
collapsed: boolean;

/** Determines the dragger's visibility. See [enum DraggerVisibility] for details. */
dragger_visibility: int;

/** The initial offset of the splitting between the two [Control]s, with [code]0[/code] being at the end of the first [Control]. */
split_offset: int;

/** Clamps the [member split_offset] value to not go outside the currently possible minimal and maximum values. */
clamp_split_offset(): void;

  // connect<T extends SignalsOf<SplitContainer>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<SplitContainerSignals>>(signal: T, method: SignalFunction<SplitContainerSignals[T]>): number;



/**
 * The split dragger is visible when the cursor hovers it.
 *
*/
static DRAGGER_VISIBLE: any;

/**
 * The split dragger is never visible.
 *
*/
static DRAGGER_HIDDEN: any;

/**
 * The split dragger is never visible and its space collapsed.
 *
*/
static DRAGGER_HIDDEN_COLLAPSED: any;

}

declare class SplitContainerSignals extends ContainerSignals {
  /**
 * Emitted when the dragger is dragged by user.
 *
*/
dragged: Signal<(offset: int) => void>

}
