
/**
 * Popup is a base [Control] used to show dialogs and popups. It's a subwindow and modal by default (see [Control]) and has helpers for custom popup behavior. All popup methods ensure correct placement within the viewport.
 *
*/
declare class Popup extends Control {

  
/**
 * Popup is a base [Control] used to show dialogs and popups. It's a subwindow and modal by default (see [Control]) and has helpers for custom popup behavior. All popup methods ensure correct placement within the viewport.
 *
*/
  "new"(): Popup;
  static "new"(): Popup;



/**
 * If `true`, the popup will not be hidden when a click event occurs outside of it, or when it receives the `ui_cancel` action event.
 *
 * **Note:** Enabling this property doesn't affect the Close or Cancel buttons' behavior in dialogs that inherit from this class. As a workaround, you can use [method WindowDialog.get_close_button] or [method ConfirmationDialog.get_cancel] and hide the buttons in question by setting their [member CanvasItem.visible] property to `false`.
 *
*/
popup_exclusive: boolean;


/** Popup (show the control in modal form). */
popup(bounds?: Rect2): void;

/** Popup (show the control in modal form) in the center of the screen relative to its current canvas transform, at the current size, or at a size determined by [code]size[/code]. */
popup_centered(size?: Vector2): void;

/** Popup (show the control in modal form) in the center of the screen relative to the current canvas transform, clamping the size to [code]size[/code], then ensuring the popup is no larger than the viewport size multiplied by [code]fallback_ratio[/code]. */
popup_centered_clamped(size?: Vector2, fallback_ratio?: float): void;

/** Popup (show the control in modal form) in the center of the screen relative to the current canvas transform, ensuring the size is never smaller than [code]minsize[/code]. */
popup_centered_minsize(minsize?: Vector2): void;

/** Popup (show the control in modal form) in the center of the screen relative to the current canvas transform, scaled at a ratio of size of the screen. */
popup_centered_ratio(ratio?: float): void;

/** Shrink popup to keep to the minimum size of content. */
set_as_minsize(): void;

  connect<T extends SignalsOf<Popup>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Notification sent right after the popup is shown.
 *
*/
static NOTIFICATION_POST_POPUP: 80;

/**
 * Notification sent right after the popup is hidden.
 *
*/
static NOTIFICATION_POPUP_HIDE: 81;


  /**
 * Emitted when a popup is about to be shown. This is often used in [PopupMenu] to clear the list of options then create a new one according to the current context.
 *
*/
about_to_show: Signal<() => void>

/**
 * Emitted when a popup is hidden.
 *
*/
popup_hide: Signal<() => void>

}
