
/**
 * Simple tabs control, similar to [TabContainer] but is only in charge of drawing tabs, not interact with children.
 *
*/
declare class Tabs extends Control {

  
/**
 * Simple tabs control, similar to [TabContainer] but is only in charge of drawing tabs, not interact with children.
 *
*/
  "new"(): Tabs;
  static "new"(): Tabs;



/** Select tab at index [code]tab_idx[/code]. */
current_tab: int;

/** If [code]true[/code], tabs can be rearranged with mouse drag. */
drag_to_rearrange_enabled: boolean;

/** if [code]true[/code], the mouse's scroll wheel cab be used to navigate the scroll view. */
scrolling_enabled: boolean;

/** The alignment of all tabs. See [enum TabAlign] for details. */
tab_align: int;

/** Sets when the close button will appear on the tabs. See [enum CloseButtonDisplayPolicy] for details. */
tab_close_display_policy: int;

/** Adds a new tab. */
add_tab(title?: string, icon?: Texture): void;

/** Moves the scroll view to make the tab visible. */
ensure_tab_visible(idx: int): void;

/** Returns [code]true[/code] if the offset buttons (the ones that appear when there's not enough space for all tabs) are visible. */
get_offset_buttons_visible(): boolean;

/** Returns [code]true[/code] if select with right mouse button is enabled. */
get_select_with_rmb(): boolean;

/** Returns the number of tabs. */
get_tab_count(): int;

/** Returns [code]true[/code] if the tab at index [code]tab_idx[/code] is disabled. */
get_tab_disabled(tab_idx: int): boolean;

/** Returns the [Texture] for the tab at index [code]tab_idx[/code] or [code]null[/code] if the tab has no [Texture]. */
get_tab_icon(tab_idx: int): Texture;

/** Returns the number of hidden tabs offsetted to the left. */
get_tab_offset(): int;

/** Returns tab [Rect2] with local position and size. */
get_tab_rect(tab_idx: int): Rect2;

/** Returns the title of the tab at index [code]tab_idx[/code]. Tab titles default to the name of the indexed child node, but this can be overridden with [method set_tab_title]. */
get_tab_title(tab_idx: int): string;

/** Returns the [Tabs]' rearrange group ID. */
get_tabs_rearrange_group(): int;

/** Moves a tab from [code]from[/code] to [code]to[/code]. */
move_tab(from: int, to: int): void;

/** Removes the tab at index [code]tab_idx[/code]. */
remove_tab(tab_idx: int): void;

/** If [code]true[/code], enables selecting a tab with the right mouse button. */
set_select_with_rmb(enabled: boolean): void;

/**
 * If `disabled` is `false`, hides the tab at index `tab_idx`.
 *
 * **Note:** Its title text will remain unless it is also removed with [method set_tab_title].
 *
*/
set_tab_disabled(tab_idx: int, disabled: boolean): void;

/** Sets an [code]icon[/code] for the tab at index [code]tab_idx[/code]. */
set_tab_icon(tab_idx: int, icon: Texture): void;

/** Sets a [code]title[/code] for the tab at index [code]tab_idx[/code]. */
set_tab_title(tab_idx: int, title: string): void;

/** Defines the rearrange group ID. Choose for each [Tabs] the same value to dragging tabs between [Tabs]. Enable drag with [code]set_drag_to_rearrange_enabled(true)[/code]. */
set_tabs_rearrange_group(group_id: int): void;

  connect<T extends SignalsOf<Tabs>, U extends Node>(signal: T, node: U, method: keyof U): number;



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
 * Represents the size of the [enum TabAlign] enum.
 *
*/
static ALIGN_MAX: 3;

/**
 * Never show the close buttons.
 *
*/
static CLOSE_BUTTON_SHOW_NEVER: 0;

/**
 * Only show the close button on the currently active tab.
 *
*/
static CLOSE_BUTTON_SHOW_ACTIVE_ONLY: 1;

/**
 * Show the close button on all tabs.
 *
*/
static CLOSE_BUTTON_SHOW_ALWAYS: 2;

/**
 * Represents the size of the [enum CloseButtonDisplayPolicy] enum.
 *
*/
static CLOSE_BUTTON_MAX: 3;


  /**
 * Emitted when the active tab is rearranged via mouse drag. See [member drag_to_rearrange_enabled].
 *
*/
reposition_active_tab_request: Signal<(idx_to: int) => void>

/**
 * Emitted when a tab is right-clicked.
 *
*/
right_button_pressed: Signal<(tab: int) => void>

/**
 * Emitted when switching to another tab.
 *
*/
tab_changed: Signal<(tab: int) => void>

/**
 * Emitted when a tab is clicked, even if it is the current tab.
 *
*/
tab_clicked: Signal<(tab: int) => void>

/**
 * Emitted when a tab is closed.
 *
*/
tab_close: Signal<(tab: int) => void>

/**
 * Emitted when a tab is hovered by the mouse.
 *
*/
tab_hover: Signal<(tab: int) => void>

}
