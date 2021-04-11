
/**
 * Sets the active tab's `visible` property to the value `true`. Sets all other children's to `false`.
 *
 * Ignores non-[Control] children.
 *
 * Individual tabs are always visible unless you use [method set_tab_disabled] and [method set_tab_title] to hide it.
 *
 * To hide only a tab's content, nest the content inside a child [Control], so it receives the [TabContainer]'s visibility setting instead.
 *
*/
declare class TabContainer extends Container {

  
/**
 * Sets the active tab's `visible` property to the value `true`. Sets all other children's to `false`.
 *
 * Ignores non-[Control] children.
 *
 * Individual tabs are always visible unless you use [method set_tab_disabled] and [method set_tab_title] to hide it.
 *
 * To hide only a tab's content, nest the content inside a child [Control], so it receives the [TabContainer]'s visibility setting instead.
 *
*/
  "new"(): TabContainer;
  static "new"(): TabContainer;



/** The current tab index. When set, this index's [Control] node's [code]visible[/code] property is set to [code]true[/code] and all others are set to [code]false[/code]. */
current_tab: int;

/** If [code]true[/code], tabs can be rearranged with mouse drag. */
drag_to_rearrange_enabled: boolean;

/** The alignment of all tabs in the tab container. See the [enum TabAlign] constants for details. */
tab_align: int;

/** If [code]true[/code], tabs are visible. If [code]false[/code], tabs' content and titles are hidden. */
tabs_visible: boolean;

/** If [code]true[/code], children [Control] nodes that are hidden have their minimum size take into account in the total, instead of only the currently visible one. */
use_hidden_tabs_for_min_size: boolean;

/** Returns the child [Control] node located at the active tab index. */
get_current_tab_control(): Control;

/** Returns the [Popup] node instance if one has been set already with [method set_popup]. */
get_popup(): Popup;

/** Returns the previously active tab index. */
get_previous_tab(): int;

/** Returns the [Control] node from the tab at index [code]tab_idx[/code]. */
get_tab_control(tab_idx: int): Control;

/** Returns the number of tabs. */
get_tab_count(): int;

/** Returns [code]true[/code] if the tab at index [code]tab_idx[/code] is disabled. */
get_tab_disabled(tab_idx: int): boolean;

/** Returns the [Texture] for the tab at index [code]tab_idx[/code] or [code]null[/code] if the tab has no [Texture]. */
get_tab_icon(tab_idx: int): Texture;

/** Returns the title of the tab at index [code]tab_idx[/code]. Tab titles default to the name of the indexed child node, but this can be overridden with [method set_tab_title]. */
get_tab_title(tab_idx: int): string;

/** Returns the [TabContainer] rearrange group id. */
get_tabs_rearrange_group(): int;

/** If set on a [Popup] node instance, a popup menu icon appears in the top-right corner of the [TabContainer]. Clicking it will expand the [Popup] node. */
set_popup(popup: Node): void;

/**
 * If `disabled` is `false`, hides the tab at index `tab_idx`.
 *
 * **Note:** Its title text will remain, unless also removed with [method set_tab_title].
 *
*/
set_tab_disabled(tab_idx: int, disabled: boolean): void;

/** Sets an icon for the tab at index [code]tab_idx[/code]. */
set_tab_icon(tab_idx: int, icon: Texture): void;

/** Sets a title for the tab at index [code]tab_idx[/code]. Tab titles default to the name of the indexed child node, but this can be overridden with [method set_tab_title]. */
set_tab_title(tab_idx: int, title: string): void;

/** Defines rearrange group id, choose for each [TabContainer] the same value to enable tab drag between [TabContainer]. Enable drag with [code]set_drag_to_rearrange_enabled(true)[/code]. */
set_tabs_rearrange_group(group_id: int): void;

  connect<T extends SignalsOf<TabContainer>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Align the tabs to the left.
 *
*/
static ALIGN_LEFT: 0;

/**
 * Align the tabs to the center.
 *
*/
static ALIGN_CENTER: 1;

/**
 * Align the tabs to the right.
 *
*/
static ALIGN_RIGHT: 2;


  /**
 * Emitted when the [TabContainer]'s [Popup] button is clicked. See [method set_popup] for details.
 *
*/
pre_popup_pressed: Signal<() => void>

/**
 * Emitted when switching to another tab.
 *
*/
tab_changed: Signal<(tab: int) => void>

/**
 * Emitted when a tab is selected, even if it is the current tab.
 *
*/
tab_selected: Signal<(tab: int) => void>

}
