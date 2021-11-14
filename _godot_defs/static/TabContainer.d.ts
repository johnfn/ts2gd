
/**
 * Sets the active tab's `visible` property to the value `true`. Sets all other children's to `false`.
 *
 * Ignores non-[Control] children.
 *
*/
declare class TabContainer extends Container  {

  
/**
 * Sets the active tab's `visible` property to the value `true`. Sets all other children's to `false`.
 *
 * Ignores non-[Control] children.
 *
*/
  new(): TabContainer; 
  static "new"(): TabContainer 


/** If [code]true[/code], all tabs are drawn in front of the panel. If [code]false[/code], inactive tabs are drawn behind the panel. */
all_tabs_in_front: boolean;

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

/**
 * Returns the [Popup] node instance if one has been set already with [method set_popup].
 *
 * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their [member CanvasItem.visible] property.
 *
*/
get_popup(): Popup;

/** Returns the previously active tab index. */
get_previous_tab(): int;

/** Returns the [Control] node from the tab at index [code]tab_idx[/code]. */
get_tab_control(tab_idx: int): Control;

/** Returns the number of tabs. */
get_tab_count(): int;

/** Returns [code]true[/code] if the tab at index [code]tab_idx[/code] is disabled. */
get_tab_disabled(tab_idx: int): boolean;

/** Returns [code]true[/code] if the tab at index [code]tab_idx[/code] is hidden. */
get_tab_hidden(tab_idx: int): boolean;

/** Returns the [Texture] for the tab at index [code]tab_idx[/code] or [code]null[/code] if the tab has no [Texture]. */
get_tab_icon(tab_idx: int): Texture;

/** Returns the index of the tab at local coordinates [code]point[/code]. Returns [code]-1[/code] if the point is outside the control boundaries or if there's no tab at the queried position. */
get_tab_idx_at_point(point: Vector2): int;

/** Returns the title of the tab at index [code]tab_idx[/code]. Tab titles default to the name of the indexed child node, but this can be overridden with [method set_tab_title]. */
get_tab_title(tab_idx: int): string;

/** Returns the [TabContainer] rearrange group id. */
get_tabs_rearrange_group(): int;

/** If set on a [Popup] node instance, a popup menu icon appears in the top-right corner of the [TabContainer]. Clicking it will expand the [Popup] node. */
set_popup(popup: Node): void;

/** If [code]disabled[/code] is [code]true[/code], disables the tab at index [code]tab_idx[/code], making it non-interactable. */
set_tab_disabled(tab_idx: int, disabled: boolean): void;

/** If [code]hidden[/code] is [code]true[/code], hides the tab at index [code]tab_idx[/code], making it disappear from the tab area. */
set_tab_hidden(tab_idx: int, hidden: boolean): void;

/** Sets an icon for the tab at index [code]tab_idx[/code]. */
set_tab_icon(tab_idx: int, icon: Texture): void;

/** Sets a title for the tab at index [code]tab_idx[/code]. Tab titles default to the name of the indexed child node. */
set_tab_title(tab_idx: int, title: string): void;

/** Defines rearrange group id, choose for each [TabContainer] the same value to enable tab drag between [TabContainer]. Enable drag with [member drag_to_rearrange_enabled]. */
set_tabs_rearrange_group(group_id: int): void;

  connect<T extends SignalsOf<TabContainer>>(signal: T, method: SignalFunction<TabContainer[T]>): number;



/**
 * Align the tabs to the left.
 *
*/
static ALIGN_LEFT: any;

/**
 * Align the tabs to the center.
 *
*/
static ALIGN_CENTER: any;

/**
 * Align the tabs to the right.
 *
*/
static ALIGN_RIGHT: any;


/**
 * Emitted when the [TabContainer]'s [Popup] button is clicked. See [method set_popup] for details.
 *
*/
$pre_popup_pressed: Signal<() => void>

/**
 * Emitted when switching to another tab.
 *
*/
$tab_changed: Signal<(tab: int) => void>

/**
 * Emitted when a tab is selected, even if it is the current tab.
 *
*/
$tab_selected: Signal<(tab: int) => void>

}

